# Generated by Django 4.1.5 on 2023-01-04 11:55

import bug_tracker.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug_tracker', '0002_rename_users_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to=bug_tracker.models.upload_to),
        ),
    ]
