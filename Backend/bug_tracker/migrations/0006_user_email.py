# Generated by Django 4.1.5 on 2023-01-06 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug_tracker', '0005_alter_user_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]