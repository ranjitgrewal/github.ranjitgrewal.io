from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("contact", views.contact, name="contact"),
    path("applications", views.applications, name="applications"),
    path("users", views.users, name="users"),
    path("profiles/<str:username>", views.profiles, name="profiles"),
    path("loans", views.loans, name="loans"),
    #API routes
    path("offered_loans", views.all_offered_loans, name="all_offered_loans"),
    path("loan_offer", views.loan_offer, name="loan_offer"),
    path("new-application", views.add_application, name="new-application"),
    path("contact_notification", views.contact_notification, name="contact_notification"),
    path("applications/<int:id>", views.application, name="application"),
    path("loan/<int:id>", views.loan, name="loan"),
    path("users/<str:username>", views.user, name="user"),
    path("users/all", views.users, name="all_users"),
    path("applications/all", views.all_applications, name="all_applications"),
    path("loans/all", views.all_loans, name="all_loans"),
    path("profile/<str:username>", views.profile, name="profile"),

 ]