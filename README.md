
## Dependencies
* [python3](https://www.python.org/downloads/release/python-368/) version 3.8 or greater, python3-dev
* [Django](https://docs.djangoproject.com/en/4.2/releases/4.2.1/#) version 4.2.1 or greater

## Description:
RGMLoans is a simplae loan processing application that allows users to get different types of loans.To apply for a loan, user has to  register.Once registered, a loan application is started automatically and the user can login to access their application or apply for other loans.The admin user is the super user who is allowed to access,review and/or modify all applications,loans and profiles.The admin user updates applications and loans and also approves loan based on the information provided by the applicant.To keep it simple, we allow only admin to have full control of loan object.
The contact form allows users(both registered and non-registered) to connect with the admin.The contact form when submitted will show up as notification when the  admin logs in.The admin can contact the person and assuming that the admin did, they can then delete the notification.
The admin is also allowed to create a new loan type that is offered to avail.

## Distinctiveness and Complexity:

This project is disctint from all 6  CS50 Web projects that were completed as part of the course since its not related to the concepts of any of those projects.This project is neither an auction, e-commerce,social network or any other network, email or similar, or wikipedia  or anything related to any of these applications. 
The complexity of this project is shown by the features of the project and feel and design of the application. The number of templates and static files in this project is higher than my all previous projects that I have sumbitted under CS50 Web course
What’s contained in each file you created:

Templates:
1. login.html-index page or home page when the application is first run and no user or admin is logged in- shows login form,contact form and different loans offered and links to register page and contact page
2. regster.html: page that shows when register link is clicked on login.html ,allows users to register and apply for a loan
3. admin_index.html: web page to show when admin logs in- shows notifications,create new loan offer form,existing loans offered for admin to refer when approving a loan application and links to all existing applications, loans and user profiles
4. index.html: web page to show when user logs in- shows user's applications and loans , if any and form to apply for a new form and a link to their profile ,allows user to withdraw an application in "Applied" or "Pendig" status
5. applications.html:page to show when the admin clicks on applications link on their index page,shows all applications and their details, allows admin to update application status
6. loans.html:page to show when the admin clicks on loans link on their index page,shows all loans and their details and allows admin to make changes to the loan
7.users.html:page to show when the admin clicks on users link on their index page,shows all users and their profile details for admin to view only
8.profile.html:shows the profile of the user who is logged in and also allows to edit the profile details
9. contact.html: page that shows when the "Contact Us" link ic clicked, shows contact details and contact form
10. layout.html: basic layout that is extended in every template

Static files:
1. index.js is script for   mainly for index.html and admin_index.html, but also helps login.html and       contact.html
2. loans.js is script for   mainly for loans.html
3. application.js is script for   mainly for applications.html
4. profile.js is script for   mainly for profile.html and user.html
5. user.js is script for  user.html

Views.py:
1. Most functions are used to show the views or calls for API routes.
2. The getter functions in views.py do the backend calculations of some fields of loan object based on other fields of loan object when created or updated.
3. The is_date function checks if a string has a date value.


## Running and Testing
How to run your application: first install the developer dependencies:
pip install -r requirements.txt
Do the  migrations(if needed) and run the app as other Django apps
The application is hosted at the link below until Feb, 2024 if you want to test it first hand:
https://ranjitr27.pythonanywhere.com/

## Steps of loan processing:
1. Transaction entry point:Register as a user does this:
    * creates the user profile
    * creates the  first application with status "Applied"
2. Loan initialization:Admin changes the application status from "Applied" to "Pending" that:
    * creates the corresponding loan object,every  loan and application have one-to-one relationship
    * allows admin to make changes to loan object like interest rate, amount approved,loan duration, payment frequency and payment starting date
3. Loan approval:admin approves the loan by:
    * change/review the loan details based on applicant profile and loan details
    * change the application status from "Pending" to "Approved"
4. Applicant/User update: when a loan is approved:
  * the loan shows up under the list of loans when the user logs in
5. Loan updates after approval: Admin can change loan details is needed after the user is able to see the details when they login.

## Admin only features:
1.Loan Processing:Steps described above
2.Connect Form: When admin logs in, they see the notification of a connect request and take action and/or deletes the notification
3.Loans Offered: Admin can add and delete loans offered and the details

For simplicity,RGM loans charges ZERO fees for taking a loan and used simple interest processs.

There are a couple of use cases where someone might use RGM loans:
+ Personal loans
+ Student loans
+ Debt Consolidation
+ Mortgage
+ Pay day loan
+ Emergency funds

## Support
For any dev related questions and support,plese reach out at my profile at  https://github.com/ranjitgrewal 


