# API Hopital && Projet Hopital

API utilisée par la plateforme Hopital en Symfony

# Prérequis

Installer Symfony

Installer node

# Installation

Installation node.js : https://nodejs.org/fr/download/

cd projects/

git clone ...

cd my-project/

composer install

npm install

php -S localhost:8000 -t public/

npm run dev-server

# URLs

- L'API => 127.0.0.1:8000/api
- Url de l'application => 127.0.0.1:8 000/#/

# Détails BDD

Adresse 217.160.10.186

# Commandes

Pour Creer un entité Symfony :

`php bin/console make:entity`

Pour créer la migration, nous devons exécuter la commande ci-dessous

`php bin/console make:migration`

Cette commande génère un fichier dans le dossier src/Migrations

Une fois ce fichier créé, nous exécutons les requêtes au moyen de la commande

`php bin/console doctrine:migrations:migrate`

Vider le cache

`php bin/console cache:pool:clear cache.global_clearer`
