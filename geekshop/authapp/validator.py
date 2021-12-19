from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _



def validate_name(value):
    if value.isdigit():
        raise ValidationError(
            _(f"Имя не может быть только цифрами"),
            params={'value': value},
        )
    if not value.isalpha():
        raise ValidationError(
            _(f"Имя не может содержать цифры"),
            params={'value': value},
        )


