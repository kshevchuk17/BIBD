# Generated by Django 3.1.7 on 2021-04-25 17:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0003_auto_20210412_0139'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='User',
            new_name='user',
        ),
    ]
