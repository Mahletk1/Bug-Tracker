# Generated by Django 4.1.5 on 2023-01-04 14:50

import bug_tracker.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug_tracker', '0003_alter_user_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.FileField(blank=True, null=True, upload_to=bug_tracker.models.upload_to),
        ),
    ]
