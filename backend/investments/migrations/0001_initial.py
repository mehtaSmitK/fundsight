# Generated by Django 5.0 on 2025-03-24 22:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fund',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('color', models.CharField(max_length=7)),
            ],
        ),
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=100)),
                ('current_value', models.DecimalField(decimal_places=2, max_digits=12)),
                ('initial_value', models.DecimalField(decimal_places=2, max_digits=12)),
                ('best_performing_scheme', models.CharField(max_length=200, null=True)),
                ('best_performance_change', models.CharField(max_length=10, null=True)),
                ('worst_performing_scheme', models.CharField(max_length=200, null=True)),
                ('worst_performance_change', models.CharField(max_length=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='PerformanceHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('value', models.DecimalField(decimal_places=2, max_digits=12)),
                ('investment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='performance_history', to='investments.investment')),
            ],
        ),
        migrations.CreateModel(
            name='SectorAllocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('percentage', models.CharField(max_length=20)),
                ('bgcolor', models.CharField(max_length=7)),
                ('investment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sector_allocations', to='investments.investment')),
            ],
        ),
        migrations.CreateModel(
            name='FundStockHolding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.IntegerField()),
                ('fund', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='holdings', to='investments.fund')),
                ('stock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='funds', to='investments.stock')),
            ],
            options={
                'unique_together': {('fund', 'stock')},
            },
        ),
    ]
