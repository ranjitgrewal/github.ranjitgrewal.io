from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import redirect
import json
from .models import User,LoanOffer,Loan,Application,ContactNotification
from decimal import Decimal
from django.utils import timezone
import datetime
from django.utils.timezone import get_current_timezone
from datetime import datetime
from datetime import date
import datetime
from dateutil.relativedelta import *
import datetime as dt
from dateutil.parser import parse
import time



# Create your views here.
def index(request):
    if request.user.is_authenticated :
        if request.user.is_superuser:
            notifications=ContactNotification.objects.all()
            for notification in notifications:
                if (notification.get_message_age >7):
                    notification.delete()
            notifications=ContactNotification.objects.all()
            all_notifications = notifications.order_by("date_of_contact").all()
            return render(request, "rgmloans/admin_index.html", {
                "notifications": all_notifications,
            })
        else:
            approved_loans=[]
            categories=LoanOffer.objects.values_list('category', flat=True).distinct()
            applications = Application.objects.filter(user=request.user)
            loans = Loan.objects.filter(user=request.user)
            for loan in loans:
                #app_id=loan.application.
                #application = Application.objects.get(id=loan.application)
                if loan.application.status=="Approved":
                    approved_loans.append(loan)
            return render(request, "rgmloans/index.html", {
                "applications": applications,
                "loans": approved_loans,
                "categories": categories,
            })
    return render(request, "rgmloans/login.html")

@login_required    
def applications(request):
    if request.user.is_authenticated :
        all_applications = Application.objects.all()
        statuses=Application.status.field.choices
        return render(request, "rgmloans/applications.html", {
                "applications": all_applications,
                "statuses": statuses
            })
    return render(request, "rgmloans/login.html")

@login_required    
def users(request):
    if request.user.is_authenticated :
        all_users = User.objects.all()
        return render(request, "rgmloans/users.html", {
                "users": all_users,
            })
    return render(request, "rgmloans/login.html")


@login_required
def loans(request):
    if request.user.is_authenticated :
        if request.user.is_superuser:
            all_loans = Loan.objects.all()
            return render(request, "rgmloans/loans.html", {
                "loans": all_loans
            })  
    return render(request, "rgmloans/login.html")

@csrf_exempt
@login_required
def application(request,id):

    # Query for requested application
    try:
        application = Application.objects.get(id=id)
    except Application.DoesNotExist:
        return JsonResponse({"error": "Application not found."}, status=404)

    # Return application contents
    if request.method == "GET":
        return JsonResponse(application.serialize())
    elif request.method == "PUT":
        data = json.loads(request.body)
        if  data.get("status") is not None:
            application.status = data["status"]
            application.save()
            if application.status=="Pending":
                amt_approved=Decimal(application.requested_amount)
                freq=application.loan_applied_for.payment_frequency
                new_loan = Loan(
                    user= application.user,
                    application=application,
                    date_approved=timezone.now(),
                    #payment_starting_date=timezone.now().strftime("%Y-%m-%d"),
                    payment_starting_date=timezone.now(),
                    payment_frequency= "Monthly",
                    num_of_months=application.loan_applied_for.max_tenure,
                    amount_approved=amt_approved,
                    interest_rate=application.loan_applied_for.rate)
                new_loan.payment_amount,new_loan.no_of_payments=get_payment_amt(freq,amt_approved,application.loan_applied_for.rate,application.loan_applied_for.max_tenure)
                new_loan.payment_ending_date=get_payment_ending_date(freq,new_loan.payment_starting_date,new_loan.no_of_payments)
                new_loan.payments_made=get_payments_made(new_loan.payment_starting_date,new_loan.no_of_payments,new_loan.payment_frequency) 
                new_loan.balance_owing=get_balance_owing(new_loan.payment_starting_date,new_loan.payments_made,new_loan.payment_amount,new_loan.amount_approved,application.loan_applied_for.rate)
                new_loan.payments_remaining=int(new_loan.no_of_payments)- int(new_loan.payments_made)
                new_loan.save()
                return HttpResponse(status=204)

    elif request.method== "DELETE":
        try:
            application.delete()
            return JsonResponse({"message": "application deleted successfully."}, status=201)
        except Application.DoesNotExist:
            return JsonResponse({"error": "Application  not  found "}, status=404)
  
    # Application must be via GET or PUT or DELETE
    else:
        return JsonResponse({
            "error": "GET or PUT or DELETE request required."
        }, status=400)


@csrf_exempt
@login_required
def loan(request,id):
    # Query for requested loan
    try:
        loan = Loan.objects.get(id=id)
    except Loan.DoesNotExist:
        return JsonResponse({"error": "Loan not found."}, status=404)

    if request.method == "GET":
        return JsonResponse(loan.serialize())
    elif request.method == "PUT":
        data = json.loads(request.body)
        if data["payment_starting_date"] is not None or  data["payment_frequency"] is not None or data["interest_rate"] is not None or data["amount_approved"] or data["num_of_months"] is not None:
            if  data["payment_frequency"] is not None and data["payment_frequency"] !='':
                freq = data["payment_frequency"]
                loan.payment_frequency = data["payment_frequency"]
            else:
                freq=loan.payment_frequency
            if  data["payment_starting_date"] is not None:
                if is_date(data["payment_starting_date"], fuzzy=False):
                    datetime_obj = datetime.datetime.strptime(data["payment_starting_date"], "%Y-%m-%d")
                    tz = timezone.get_current_timezone()
                    start_date = datetime_obj.replace(tzinfo=tz)
                    loan.payment_starting_date=start_date

                
            if data.get("interest_rate"):
                r=data["interest_rate"]
                loan.interest_rate= data["interest_rate"]
            else:
                r=loan.interest_rate
            if data.get("num_of_months"):
                tenure=data["num_of_months"]
                loan.num_of_months= data["num_of_months"]
            else:
                tenure=loan.num_of_months
            if data.get("amount_approved"):
                p=data["amount_approved"]
                loan.amount_approved= data["amount_approved"]
            else:
                p=loan.amount_approved
            loan.payment_amount,loan.no_of_payments=get_payment_amt(freq,p,r,tenure)
            loan.date_approved=date.today()
            loan.payment_ending_date=get_payment_ending_date(freq,loan.payment_starting_date,loan.no_of_payments)
            loan.payments_made=get_payments_made(loan.payment_starting_date,loan.no_of_payments,loan.payment_frequency) 
            loan.balance_owing=get_balance_owing(loan.payment_starting_date,loan.payments_made,loan.payment_amount,loan.amount_approved,loan.interest_rate)
            loan.payments_remaining=int(loan.no_of_payments) - int(loan.payments_made)
            loan.save()
            return HttpResponse(status=204)
    # Application must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)

def get_payments_made(payment_starting_date,no_of_payments,payment_frequency):  
    if timezone.now()>payment_starting_date:
        if payment_frequency=="Monthly":
            d1=timezone.now()
            d2=payment_starting_date
            months_gone= (d1.year - d2.year) * 12 + d1.month - d2.month
            payments_made=months_gone
        elif payment_frequency=="Weekly":
            d1=timezone.now()
            d2=payment_starting_date
            diff = d1 - d2
            days_gone=diff.days
            payments_made=days_gone/7
        else:
            d1=timezone.now()
            d2=payment_starting_date
            diff = d1 - d2
            days_gone=diff.days
            payments_made=days_gone/14    
        return payments_made+1
    else:
        return 0

def get_balance_owing(payment_starting_date,payments_made,payment_amount,p,r): 
    interest=Decimal(Decimal(p)*Decimal(r)/100)
    loan_total=Decimal(Decimal(p)+interest) 
    if timezone.now()>payment_starting_date:
        balance_owing=Decimal(loan_total)-(Decimal(payments_made)*Decimal(payment_amount))
    else:
        balance_owing=loan_total
    return balance_owing

def is_date(string, fuzzy=False):
    """
    Return whether the string can be interpreted as a date.

    :param string: str, string to check for date
    :param fuzzy: bool, ignore unknown tokens in string if True
    """
    try: 
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False

def get_payment_amt(freq,p,r,tenure):  
    interest=Decimal(Decimal(p)*Decimal(r)/100)
    loan_total=Decimal(Decimal(p)+interest)

    if freq=="Monthly":
        no_of_payments=tenure
        payment=Decimal(loan_total/Decimal(tenure))
    elif freq=="Weekly":
        no_of_payments=Decimal(52 * (Decimal(tenure)/12))
        payment=Decimal((loan_total)/(no_of_payments))
    #if frequency=bi-weekly
    else:
        no_of_payments=Decimal(26 * (Decimal(tenure)/12))
        payment=Decimal((loan_total)/(no_of_payments))
    return payment,no_of_payments

def get_payment_ending_date(payment_frequency,payment_starting_date,no_of_payments):
    start_date=payment_starting_date.strftime("%Y-%m-%d") 
    datearr=start_date.split("-")
    y=int(datearr[0].replace("\'",""))
    m=int(datearr[1].replace("\'",""))
    d=int(datearr[2].replace("\'",""))
    d2 = dt.datetime(y,m,d)
    if payment_frequency=="Monthly":
        payment_ending_date=d2 + relativedelta(months=int(no_of_payments))
    elif payment_frequency=="Weekly":
        payment_ending_date=d2 + relativedelta(days=int(no_of_payments*7))
    else:
        payment_ending_date=d2 + relativedelta(days=int(no_of_payments*14))
    tz = timezone.get_current_timezone()
    payment_ending_date = payment_ending_date.replace(tzinfo=tz)
    return payment_ending_date

@csrf_exempt
@login_required
def user(request,username):

    # Query for requested user
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found."}, status=404)

    # Return user profile
    if request.method == "GET":
        return JsonResponse(user.serialize(),safe=False)

    # Update whether user is read or should be archived
    elif request.method == "PUT":
        data = json.loads(request.body)
        if data("status") is not None:
            user.status = data["status"]
            user.save()
            return HttpResponse(status=204)

    # Application must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)

def all_offered_loans(request):
    """
    Method to return all offered_loans in the database.
    """
    if  request.user.is_authenticated:
        if  not  request.user.is_active:
            logout(request)
            return HttpResponseRedirect(reverse("index"))
    all_offered_loans = LoanOffer.objects.all()
    return JsonResponse({
        "offered_loans": [offered_loans.serialize() for offered_loans in all_offered_loans]
     }, safe=False)

@login_required
def all_applications(request):
    """
    Method to return all all_applications in the database.
    """
    if  request.user.is_authenticated:
        if   request.user.is_superuser:
            all_applications = Application.objects.all()
            return JsonResponse({
                "all_applications": [application.serialize() for application in all_applications]
                }, safe=False)

@login_required
def all_loans(request):
    """
    Method to return all all_loans in the database.
    """
    if  request.user.is_authenticated:
        if   request.user.is_superuser:
            all_loans = Loan.objects.all()
            return JsonResponse({
                "all_loans": [loan.serialize() for loan in all_loans]
                }, safe=False)

@login_required
def all_users(request):
    """
    Method to return all users in the database.
    """
    if  request.user.is_authenticated:
        if  request.user.is_superuser:
            all_users = User.objects.all()
            return JsonResponse({
                "all_users": [user.serialize() for user in all_users]
                }, safe=False)

@csrf_exempt
@login_required
def loan_offer(request):    
    data = json.loads(request.body)
    if request.method == "POST":
        category =  data["category"]
        description =  data["description"]
        rate =  data["rate"]
        payment_frequency =  data["payment_frequency"]
        min_credit =  data["min_credit"]
        min_amount =  data["min_amount"]
        max_amount =  data["max_amount"]
        max_tenure =  data["max_tenure"]

    # Try to create one offered_loan
        try:
            offered_loan = LoanOffer(
            category=category,
            description=description,
            payment_frequency=payment_frequency,
            rate=rate,
            min_credit=min_credit,
            min_amount=min_amount,
            max_amount=max_amount,
            max_tenure=max_tenure   
            )
            offered_loan.save()
            return JsonResponse({"message": "offered_loans added successfully."}, status=201)
        except LoanOffer.DoesNotExist:
            return JsonResponse({"error": "LoanOffer  not created "}, status=404)
    elif request.method== "DELETE":
        try:
            id=data["id"]
            loan_offer = LoanOffer.objects.get(id=id)
            loan_offer.delete()
            return JsonResponse({"message": "LoanOffer deleted successfully."}, status=201)
        except LoanOffer.DoesNotExist:
            return JsonResponse({"error": "LoanOffer  not  found "}, status=404)
  
    # Application must be via POST  or DELETE
    else:
        return JsonResponse({
            "error": "POST or DELETE request required."
        }, status=400)
    
@csrf_exempt
@login_required
def add_application(request):    
    data = json.loads(request.body)
    if request.method == "POST":
        category =  data["category"].strip()
        username =  data["username"].strip()
        amount =  data["amount"].strip()
        user =User.objects.get(username=username)
        loan_applied_for=LoanOffer.objects.get(category=category)
    # Try to create one offered_loan
    try:
        new_application=Application.objects.create(loan_applied_for=loan_applied_for,user=user,requested_amount=amount,date_applied=timezone.now())
        new_application.save()
        return JsonResponse({"message": "application created successfully."}, status=201)
    except User.DoesNotExist:
        return JsonResponse({"error": "Application not created."}, status=404)
    


@login_required
def profiles(request,username):
    if request.user.is_authenticated:
        profile =User.objects.get(username=username)
        provinces=User.province.field.choices
        return render(request, "rgmloans/profile.html", {
                "profile": profile,
                "provinces":provinces
            })  
    return render(request, "rgmloans/login.html")

@csrf_exempt
@login_required
def profile(request,username):
    # Query for requested profile
    try:
        profile = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found."}, status=404)
    if request.method == "GET":
        return JsonResponse(profile.serialize())
    elif request.method == "PUT" :
        data = json.loads(request.body)
        if  data.get("first_name"):
            profile.first_name = data["first_name"]
            profile.save()
        if  data.get("last_name"):
            profile.last_name = data["last_name"]
            profile.save()
        if  data.get("address"):
            profile.address = data["address"]
            profile.save()
        if  data.get("city"):
            profile.city = data["city"]
            profile.save()
        if  data.get("province"):
            profile.province = data["province"]
            profile.save()
        if  data.get("postal_code"):
            profile.postal_code = data["postal_code"]
            profile.save()
        if  data.get("phone"):
            profile.phone = data["phone"]
            profile.save()
        if  data.get("company"):
            profile.company = data["company"]
            profile.save()
        if  data.get("annual_family_income"):
            profile.annual_family_income = data["annual_family_income"]
            profile.save()
        if  data.get("total_expenses"):
            profile.total_expenses = data["total_expenses"]
            profile.save()
        if  data.get("existing_loan_payments"):
            profile.existing_loan_payments = data["existing_loan_payments"]
            profile.save()
        if  data.get("assets_total"):
            profile.assets_total = data["assets_total"]
            profile.save()
        if  data.get("credit_rating"):
            profile.credit_rating = data["credit_rating"]
            profile.save()
        return HttpResponse(status=204)
    #  must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "rgmloans/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "rgmloans/login.html")


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

 
def register(request):
    provinces=User.province.field.choices
    categories=LoanOffer.objects.values_list('category', flat=True).distinct()
    if request.method == "POST":
        username = request.POST["username"]
        firstName = request.POST["first_name"]
        lastName = request.POST["last_name"]
        email = request.POST["email"]
        address = request.POST["address"]
        city = request.POST["city"]
        province = request.POST["province"]
        postal_code = request.POST["postal_code"]
        phone = request.POST["phone"]
        company = request.POST["company"]
        category = request.POST["category"]
        annual_family_income = Decimal(request.POST["annual_family_income"])
        total_expenses = Decimal(request.POST["monthly_expenses"])
        existing_loan_payments = Decimal(request.POST["existing_loan_payments"])
        assets_total = Decimal(request.POST["assets_total"])
        credit_rating = request.POST["credit_rating"]
        requested_amount =Decimal(request.POST["requested_amount"])

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "rgmloans/register.html", {
                "message": "Passwords must match.",
                "provinces": provinces,
                "categories": categories
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            user.first_name=firstName
            user.last_name=lastName
            user.address=address
            user.city=city
            user.province=province
            user.postal_code=postal_code
            user.phone=phone
            user.company=company
            user.annual_family_income=annual_family_income
            user.total_expenses=total_expenses 
            user.existing_loan_payments=existing_loan_payments
            user.assets_total=assets_total
            user.credit_rating=credit_rating
            user.save()
        except IntegrityError:
            return render(request, "rgmloans/register.html", {
                "message": "Username already taken.",
                "provinces": provinces,
                "categories": categories

            })
        try:
            loan_applied_for = LoanOffer.objects.get(category=category)
            user = User.objects.get(username=username)
            new_application=Application.objects.create(loan_applied_for=loan_applied_for,user=user,requested_amount=requested_amount,date_applied=timezone.now())
            new_application.save()
        except IntegrityError:
            return render(request, "rgmloans/register.html", {
                "message": "Registration error",
                "provinces": provinces,
                "categories": categories

            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request,  "rgmloans/register.html", {
                "provinces": provinces,
                "categories": categories

                })

@csrf_exempt
def contact_notification(request):    
    data = json.loads(request.body)
    if request.method == "POST":
        fullname =  data["fullname"]
        email =  data["email"]
        phone =  data["phone"]
        postal_code =  data["postal_code"]
        message =  data["message"]
        date_of_contact =timezone.now(),

        # Try to create one contact_notification
        try:
            contact_notification = ContactNotification(
            fullname=fullname,
            email=email,
            phone=phone,
            postal_code=postal_code,
            message = message,
            date_of_contact=date_of_contact
            )
            contact_notification.save()
            return JsonResponse({"message": "contact_notification added successfully."}, status=201)
        except ContactNotification.DoesNotExist:
            return JsonResponse({"error": "contact_notification  not created or deleted"}, status=404)
    elif request.method== "DELETE":
        id =  data["id"]
        try:
            notification =ContactNotification.objects.get(id=id)
            notification.delete()
            return JsonResponse({"message": "contact_notification deleted successfully."}, status=201)
        except ContactNotification.DoesNotExist:
            return JsonResponse({"error": "contact_notification  not  found "}, status=404)
  
    else:
        return JsonResponse({
            "error": "POST or DELETE request required."
        }, status=400)

    
@csrf_exempt
def contact(request):
    return render(request, "rgmloans/contact.html")
