from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime
from django.utils import timezone
import dateutil



# Create your models here.

class User(AbstractUser):
    # Create your models here.
    address = models.CharField(max_length=200,blank=True, null=True)
    city = models.CharField(max_length=25,blank=True, null=True)
    province = models.CharField(max_length=2,default="AB",choices=( ("AB","AB"),("BC","BC"),("MB","MB"),("NB","NB"),("NL","NL"),("NS","NS"),("ON","ON"),("PE","PE"),("SK","SK"),("QC","QC")))
    postal_code=models.CharField(max_length=6,blank=True, null=True)
    phone=models.CharField(max_length=10,blank=True, null=True)
    company = models.CharField(max_length=200,blank=True, null=True)
    annual_family_income=  models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    total_expenses= models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    existing_loan_payments= models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    assets_total=  models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    credit_rating= models.IntegerField(default=0,blank=True, null=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address": self.address,
            "city": self.city,
            "province": self.province,
            "postal_code": self.postal_code,
            "phone": self.phone,
            "company": self.company,
            "annual_family_income": self.annual_family_income,
            "total_expenses": self.total_expenses,
            "existing_loan_payments": self.existing_loan_payments,
            "assets_total": self.assets_total,
            "credit_rating": self.credit_rating 
        }

class LoanOffer(models.Model):
    category= models.CharField(max_length=25)
    description=models.CharField(max_length=200,blank=True, null=True)
    payment_frequency= models.CharField(max_length=25)
    rate=models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    min_credit=models.IntegerField(default=0,blank=True, null=True)
    min_amount=models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    max_amount=models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    max_tenure=models.IntegerField(default=0,blank=True, null=True)

    
    def serialize(self):
        return {
            "id": self.id,
            "category": self.category,
            "description": self.description,
            "payment_frequency": self.payment_frequency,
            "rate": self.rate,
            "min_credit": self.min_credit,
            "min_amount": self.min_amount,
            "max_amount": self.max_amount,
            "max_tenure": self.max_tenure  
            }

class Application(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, related_name="applicant")
    loan_applied_for = models.ForeignKey(LoanOffer, on_delete=models.CASCADE,null=True, related_name="loan_applied_for")
    requested_amount = models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    date_applied= models.DateTimeField(auto_now_add=True)
    APPLICATION_STATUS = (
        ('Applied', 'Applied'),
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    )
    status = models.CharField(
        max_length=20,
        choices=APPLICATION_STATUS,
        blank=True,
        default='Applied',
        help_text='Loan Application Status',
    )

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "loan_applied_for": self.loan_applied_for.category,
            "requested_amount": self.requested_amount,
            "date_applied": self.date_applied.strftime("%b %d %Y, %I:%M %p"),
            "status": self.status
        }


class Loan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, related_name="borrower")
    application = models.OneToOneField(Application, on_delete=models.CASCADE,related_name="application")
    application_status = models.CharField(max_length=20,blank=True,default='Applied')
    amount_approved=models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    date_approved=models.DateTimeField(default=datetime.now)
    payment_starting_date=models.DateTimeField(default=datetime.now)
    payment_ending_date=models.DateTimeField(default=datetime.now)
    payment_frequency= models.CharField(max_length=25)
    payment_amount=models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    interest_rate=models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    num_of_months=models.IntegerField(default=0)
    no_of_payments=models.IntegerField(default=0)
    payments_made=models.IntegerField(default=0)
    payments_remaining=models.IntegerField(default=0)
    balance_owing=models.DecimalField(max_digits=20, decimal_places=2,default=00.00)
    
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "application_id": self.application.id,
            "application_status": self.application.status,
            "amount_approved": self.amount_approved,
            "date_approved": self.date_approved.strftime("%d-%m-%Y"),
            "payment_starting_date": self.payment_starting_date.strftime("%d-%m-%Y"),
            "payment_ending_date": self.payment_ending_date.strftime("%d-%m-%Y"),
            "payment_frequency": self.payment_frequency,
            "payment_amount": self.payment_amount,
            "interest_rate": self.interest_rate,
            "num_of_months": self.num_of_months,
            "no_of_payments": self.no_of_payments,
            "payments_made": self.payments_made,
            "payments_remaining": self.payments_remaining,
            "balance_owing": self.balance_owing
        }

class ContactNotification(models.Model):
    fullname= models.CharField(max_length=25)
    email= models.CharField(max_length=25)
    postal_code=models.CharField(max_length=6,blank=True, null=True)
    phone=models.CharField(max_length=10,blank=True, null=True)
    message=models.CharField(max_length=200,blank=True, default="Loan application", null=True)
    date_of_contact= models.DateTimeField(auto_now_add=True)

    @property
    def get_message_age(self):
        date_format = "%m/%d/%Y"
        today= datetime.strptime(timezone.now().strftime("%m/%d/%Y"), date_format)
        date_of_Contact = datetime.strptime(self.date_of_contact.strftime("%m/%d/%Y"), date_format)
        diff =(today-date_of_Contact)
        return (diff.days)

    def serialize(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "email": self.email,
            "phone": self.phone,
            "postal_code": self.postal_code,
            "message": self.message,
            "date_of_contact": self.date_of_contact.strftime("%b %d %Y, %I:%M %p"),
        }