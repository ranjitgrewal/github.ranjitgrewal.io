from django.contrib import admin
from .models import User, LoanOffer,Application,Loan,ContactNotification

# Register your models here.
admin.site.register(User)
admin.site.register(LoanOffer)
admin.site.register(Application)
admin.site.register(Loan)
admin.site.register(ContactNotification)
