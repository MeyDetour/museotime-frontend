# Projet React – Installation et lancement

Ce projet est le frontend de Museotime, développé avec React et Vite. Ce guide explique comment installer les outils nécessaires et lancer l'application en développement.

### Prérequis



Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** : environnement pour exécuter JavaScript côté serveur (https://nodejs.org)
- **npm** : gestionnaire de paquets fourni avec Node.js (ou yarn)
- **Un éditeur de code** comme VSCode (pour écrire et modifier le code)

 

# Installer NPM et Node.Js
- Linux
```
sudo apt update
sudo apt install nodejs npm    
```

- Window
```
Aller sur https://nodejs.org
Télécharger l’installateur LTS ou Current
Lancer l’installateur → npm est installé automatiquement
```

- Mac 

Installer Node.js (npm inclus)
```
brew install node
```

# Vérifier les versions
- Linux, Windows, Mac
```
node -v
npm -v
```
   



# Cloner le projet

```
  git clone https://github.com/MeyDetour/museotime-frontend.git
  cd <museotile-frontend>
```

# Installer les dépendances


Une dépendance est un paquet de code externe dont votre projet a besoin pour fonctionner.  
Pour installer toutes les dépendances, exécutez :

```
npm install
```

- Toujours vérifier la version de Node.js (`>=18`)
- Ne pas modifier le dossier `node_modules/`
- Si `npm install` plante, essayez de supprimer `node_modules/` et `package-lock.json` puis relancer `npm install`

Lancer l’application

```
npm run dev  
```

un lien apparaitra dans la console. il vous permettra d'afficher le projet dans votre navigateur.

Structure du projet
```
my-app/
├─ public/ 
├─ src/ # code source avec toutes les pages
│ ├─ App.jsx
│ └─ main.jsx
├─ package.json
└─ vite.config.js (si Vite)
```
 
# Lancer le serveur de développement (Vite)
```
npm run dev 
``` 


# Générer la version production
Le contenu sera généré dans le dossier dist/ (pour Vite) et peut être déployé sur un serveur.
``` 
npm run build  
```  
