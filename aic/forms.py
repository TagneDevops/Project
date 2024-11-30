from django import forms
from .models import Etablissement

class EtablissementForm(forms.ModelForm):
    class Meta:
        model = Etablissement
        fields = ['nom_etablissement', 'devise', 'contact', 'logo', 'cachet', 'periode_academique']
