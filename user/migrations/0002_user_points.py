# Generated by Django 3.1.2 on 2020-10-19 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='points',
            field=models.FloatField(default=0.0),
        ),
    ]