from django.db import models

class Etablissement(models.Model):
    nom_etablissement = models.CharField(max_length=255)
    devise = models.CharField(max_length=50)
    contact = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/')
    cachet = models.ImageField(upload_to='cachets/')
    periode_academique = models.CharField(max_length=50)

    def __str__(self):
        return self.nom_etablissement


class Classe(models.Model):
    nom_classe = models.CharField(max_length=100)
    etablissement = models.ForeignKey(Etablissement, related_name='classes', on_delete=models.CASCADE)
    liste_eleves = models.ManyToManyField('Eleve', related_name='classes')

    def __str__(self):
        return self.nom_classe

class Eleve(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    age = models.IntegerField()
    sexe = models.CharField(max_length=10)
    # Il n'y a pas de relation explicite à une classe, car on l'associe à travers ManyToManyField dans Classe

    def __str__(self):
        return f"{self.prenom} {self.nom}"

class Fichier(models.Model):
    nom = models.CharField(max_length=255)
    reference = models.CharField(max_length=100, unique=True)
    # Un fichier peut être associé à un établissement (par exemple, un document administratif de l'établissement)
    etablissement = models.ForeignKey(Etablissement, related_name='fichiers', on_delete=models.CASCADE)
    # Un fichier peut être manipulé par plusieurs utilisateurs
    utilisateurs = models.ManyToManyField('User', related_name='fichiers')

    def __str__(self):
        return self.nom

class User(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField(unique=True)
    mdp = models.CharField(max_length=255)  # À vous de gérer le hashage du mot de passe

    def __str__(self):
        return f"{self.prenom} {self.nom}"


