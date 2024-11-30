from django.shortcuts import render

# Create your views here.

def blank(request):

    return render(request, 'pages/classe.html')

def header(request):
    return render(request, 'pages/index.html')


def testapp(request):
    return render(request, 'pages/app.html')

def UserClass(request):
    return render(request, 'pages/classeUser.html')

def EtablissementClass(request):
    return render(request, 'pages/classeEtablissement.html')

def CartClass(request):
        return render(request, 'pages/classeCart.html')

def Classe(request):
    return render(request, 'pages/classe.html')


def liste_etablissements(request):
    etablissements = Etablissement.objects.all()
    return render(request, 'etablissements/liste.html', {'etablissements': etablissements})

def ajouter_etablissement(request):
    if request.method == 'POST':
        form = EtablissementForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('liste_etablissements')
    else:
        form = EtablissementForm()
    return render(request, 'etablissements/ajouter.html', {'form': form})

def modifier_etablissement(request, pk):
    etablissement = Etablissement.objects.get(pk=pk)
    if request.method == 'POST':
        form = EtablissementForm(request.POST, request.FILES, instance=etablissement)
        if form.is_valid():
            form.save()
            return redirect('liste_etablissements')
    else:
        form = EtablissementForm(instance=etablissement)
    return render(request, 'etablissements/modifier.html', {'form': form})
