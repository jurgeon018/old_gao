from django.db import models 


class TimestampMixin(models.Model):
    created = models.DateTimeField(verbose_name="Створено", auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(verbose_name="Оновлено", auto_now_add=False, auto_now=True)

    class Meta:
        abstract = True 


class DaysMixin(models.Model):
    monday       = models.BooleanField(verbose_name="Понеділок робочий день?", default=True)
    tuesday      = models.BooleanField(verbose_name="Вівторок робочий день?", default=True)
    wednesday    = models.BooleanField(verbose_name="Середа робочий день?", default=True)
    thursday     = models.BooleanField(verbose_name="Четвер робочий день?", default=True)
    friday       = models.BooleanField(verbose_name="Пятниця робочий день?", default=True)
    saturday     = models.BooleanField(verbose_name="Субота робочий день?", default=False)
    sunday       = models.BooleanField(verbose_name="Неділя робочий день?", default=False)

    monday_from    = models.TimeField(verbose_name="Початок робочого дня в понеділок", blank=True, null=True)
    monday_to      = models.TimeField(verbose_name="Закінчення робочого дня в понеділок", blank=True, null=True)

    tuesday_from   = models.TimeField(verbose_name="Початок робочого дня в вівторок", blank=True, null=True)
    tuesday_to     = models.TimeField(verbose_name="Закінчення робочого дня в вівторок", blank=True, null=True)

    wednesday_from = models.TimeField(verbose_name="Початок робочого дня в середу", blank=True, null=True)
    wednesday_to   = models.TimeField(verbose_name="Закінчення робочого дня в середу", blank=True, null=True)

    thursday_from  = models.TimeField(verbose_name="Початок робочого дня в четвер", blank=True, null=True)
    thursday_to    = models.TimeField(verbose_name="Закінчення робочого дня в четвер", blank=True, null=True)

    friday_from    = models.TimeField(verbose_name="Початок робочого дня в пятницю", blank=True, null=True)
    friday_to      = models.TimeField(verbose_name="Закінчення робочого дня в пятницю", blank=True, null=True)

    saturday_from  = models.TimeField(verbose_name="Початок робочого дня в субботу", blank=True, null=True)
    saturday_to    = models.TimeField(verbose_name="Закінчення робочого дня в субботу", blank=True, null=True)

    sunday_from    = models.TimeField(verbose_name="Початок робочого дня в неділю", blank=True, null=True)
    sunday_to      = models.TimeField(verbose_name="Закінчення робочого дня в неділю", blank=True, null=True)

    class Meta:
        abstract = True 

