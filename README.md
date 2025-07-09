# 🚀 Projet CI/CD - Tests, Intégration et Déploiement

## 👥 Équipe de développement
- **WOTOBE Eliel** 
- **ALIEBONG** 

---

## 📋 Description du projet

Ce projet implémente une application web complète avec :
- **Frontend React** : Interface utilisateur pour l'inscription d'utilisateurs
- **Backend Python/FastAPI** : API REST pour la gestion des utilisateurs
- **Base de données MySQL** : Stockage persistant des données
- **Tests automatisés** : Tests unitaires, d'intégration et E2E
- **CI/CD** : Pipeline GitHub Actions avec déploiement automatique

---

## 🏗️ Architecture Docker

### Services inclus dans `docker-compose.yml` :

1. **MySQL Database** (`db`)
   - Port : 3306 (interne)
   - Image : `mysql:9.2`
   - Initialisation : Scripts SQL dans `/sqlfiles`

2. **Adminer** (Interface de gestion DB)
   - Port : `8081:8080`
   - Interface web pour gérer la base MySQL

3. **API Python/FastAPI** (`api-python`)
   - Port : `8000:8000`
   - Dépendances : `requirements.txt`
   - Framework : FastAPI avec Uvicorn

4. **Application React** (`react`)
   - Port : `3000:3000`
   - Dépendances : `package.json`
   - Hot reload activé

---

## 🚀 Comment lancer l'architecture Docker

### Prérequis
- Docker et Docker Compose installés
- Git cloné

### Étape 1 : Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
# Base de données MySQL
MYSQL_ROOT_PASSWORD=votre_mot_de_passe_root
MYSQL_DATABASE=nom_de_votre_base
MYSQL_USER=nom_utilisateur_db
MYSQL_HOST=db

# API
REACT_APP_SERVER_URL=http://localhost:8000
```

### Étape 2 : Lancer l'architecture complète

```bash
# Construire et démarrer tous les services
docker-compose up -d

# Vérifier que tous les services sont en cours d'exécution
docker-compose ps

# Voir les logs en temps réel
docker-compose logs -f
```

### Étape 3 : Accéder aux services

- **Application React** : http://localhost:3000
- **API Backend** : http://localhost:8000
- **Adminer (DB)** : http://localhost:8081
- **Documentation API** : http://localhost:8000/docs

### Étape 4 : Arrêter l'architecture

```bash
# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes (attention : données perdues)
docker-compose down -v
```

---

## 🧪 Tests

### Tests Frontend (React)

#### Tests unitaires
```bash
cd my-app
npm test
```

#### Tests E2E avec Cypress
```bash
cd my-app
npm run cypress
# ou
npx cypress open
```

#### Tests API côté frontend
```bash
cd my-app
npm test src/api.test.js
```

### Tests Backend (Python)

#### Tests unitaires
```bash
cd server
python -m pytest
```

#### Tests d'intégration API
```bash
cd my-app
npm test src/app.test.js
```

### Tests complets avec Docker

```bash
# Lancer l'architecture
docker-compose up -d

# Attendre que les services soient prêts
sleep 30

# Lancer les tests Cypress
cd my-app
npm run cypress:run
```

---

## 📁 Structure du projet

```
repo-tests-integration-deploiement/
├── .github/workflows/          # Pipeline CI/CD
├── my-app/                     # Application React
│   ├── src/                    # Code source
│   ├── cypress/               # Tests E2E
│   ├── public/                # Assets statiques
│   └── package.json           # Dépendances Node.js
├── server/                     # API Python/FastAPI
│   ├── server.py              # Point d'entrée API
│   ├── requirements.txt       # Dépendances Python
│   └── Dockerfile             # Image Docker
├── sqlfiles/                   # Scripts d'initialisation DB
├── docker-compose.yml         # Architecture Docker
└── README.md                  # Documentation
```

---

## 🔧 Scripts utiles

### Développement local
```bash
# Frontend uniquement
cd my-app && npm start

# Backend uniquement
cd server && python server.py

# Architecture complète
docker-compose up -d
```

### Tests
```bash
# Tests unitaires React
cd my-app && npm test

# Tests E2E
cd my-app && npm run cypress

# Tests API
cd my-app && npm test src/app.test.js
```

### Build et déploiement
```bash
# Build React
cd my-app && npm run build

# Build Docker
docker-compose build

# Déploiement (via GitHub Actions)
git push origin main
```

---

## 🌐 Déploiement

### Environnements disponibles
- **GitHub Pages** : Interface utilisateur
- **Vercel** : Application complète
- **Terraform** : Infrastructure (déclenché automatiquement)

### Pipeline CI/CD
Le pipeline GitHub Actions s'exécute automatiquement sur :
- Push vers `main`
- Pull Request vers `main`
- Déclenchement manuel

### Variables d'environnement requises
- `REACT_APP_SERVER_URL`
- `MYSQL_DATABASE`
- `MYSQL_USER`
- `MYSQL_ROOT_PASSWORD`
- `PERSONAL_ACCESS_TOKEN`

---

## 🐛 Dépannage

### Problèmes courants

#### Services ne démarrent pas
```bash
# Vérifier les logs
docker-compose logs

# Reconstruire les images
docker-compose build --no-cache
docker-compose up -d
```

#### Tests Cypress échouent
```bash
# Vérifier que l'API est accessible
curl http://localhost:8000/users

# Attendre que les services soient prêts
docker-compose logs api-python
```

#### Base de données non accessible
```bash
# Vérifier l'état du service MySQL
docker-compose ps db

# Se connecter à Adminer
# URL: http://localhost:8081
# Serveur: db
# Utilisateur: root
# Mot de passe: (celui défini dans .env)
```

---

## 📚 Documentation supplémentaire

- **API Documentation** : http://localhost:8000/docs (Swagger UI)
- **Tests Coverage** : Généré automatiquement par Jest
- **Logs Docker** : `docker-compose logs [service]`

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

---

## 📄 Licence

Ce projet est développé dans le cadre du cours d'Intégration et Déploiement.

---

*Dernière mise à jour : Décembre 2024*