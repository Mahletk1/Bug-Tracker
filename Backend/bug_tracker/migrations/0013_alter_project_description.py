# Generated by Django 4.1.5 on 2023-01-21 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bug_tracker', '0012_alter_ticket_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='description',
            field=models.TextField(),
        ),
    ]
