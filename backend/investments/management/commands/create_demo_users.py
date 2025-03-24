from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Command(BaseCommand):
    help = 'Creates demo users for testing'

    def handle(self, *args, **kwargs):
        # Create demo user
        if not User.objects.filter(email='demo@fundsight.com').exists():
            user = User.objects.create_user(
                username='demo',
                email='demo@fundsight.com',
                password='SecurePass123!',  # Using a more secure password
                first_name='Demo',
                last_name='User'
            )
            # Create token for the user - important for token authentication
            token, _ = Token.objects.get_or_create(user=user)
            self.stdout.write(self.style.SUCCESS(f'Created demo user: demo@fundsight.com / SecurePass123! with token {token.key}'))
        else:
            user = User.objects.get(email='demo@fundsight.com')
            token, _ = Token.objects.get_or_create(user=user)
            self.stdout.write(self.style.WARNING(f'Demo user already exists with token {token.key}'))

        # Create admin user if needed
        if not User.objects.filter(username='admin').exists():
            admin = User.objects.create_superuser(
                username='admin',
                email='admin@fundsight.com',
                password='AdminSecurePass123!'  # Using a more secure password
            )
            # Create token for the admin
            token, _ = Token.objects.get_or_create(user=admin)
            self.stdout.write(self.style.SUCCESS(f'Created admin user: admin@fundsight.com / AdminSecurePass123! with token {token.key}'))
        else:
            admin = User.objects.get(username='admin')
            token, _ = Token.objects.get_or_create(user=admin)
            self.stdout.write(self.style.WARNING(f'Admin user already exists with token {token.key}'))
