from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvestmentViewSet, FundViewSet
from .auth_views import LoginView, LogoutView, UserView, CSRFTokenView, TokenView

router = DefaultRouter()
router.register(r'investments', InvestmentViewSet)
router.register(r'funds', FundViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/user/', UserView.as_view(), name='user'),
    path('auth/csrf/', CSRFTokenView.as_view(), name='csrf'),
    path('auth/token/', TokenView.as_view(), name='token'),
]