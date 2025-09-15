# Datavizta - Calculateur d'Impact Environnemental Numérique

Une application web moderne pour calculer et visualiser l'impact environnemental des appareils numériques en utilisant l'API Boavizta.

## 🌱 À propos

Datavizta est une interface intuitive qui permet d'évaluer l'empreinte carbone et l'impact environnemental de différents appareils numériques (serveurs, ordinateurs portables, smartphones, tablettes, etc.). L'application utilise l'API publique de Boavizta pour fournir des données précises sur :

- **GWP** (Global Warming Potential) - Potentiel de réchauffement climatique en kgCO2eq
- **ADPE** (Abiotic Depletion Potential) - Épuisement des ressources abiotiques en kgSbeq  
- **PE** (Primary Energy) - Consommation d'énergie primaire

## ✨ Fonctionnalités

- 📱 **Support multi-appareils** : Serveurs, ordinateurs portables/bureau, smartphones, tablettes, télévisions, box
- 🌍 **Localisation géographique** : Prise en compte de l'emplacement pour le calcul de l'impact énergétique
- ⚙️ **Configuration personnalisée** : Paramètres d'usage (puissance, durée de vie, temps d'utilisation)
- 📊 **Calculs détaillés** : Impact intégré (fabrication) et d'usage séparés
- 🔄 **Interface interactive** : Configuration et comparaison de multiple appareils

## 🛠 Technologies

Ce projet est construit avec la [T3 Stack](https://create.t3.gg/) :

- **[Next.js](https://nextjs.org)** - Framework React full-stack
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[tRPC](https://trpc.io)** - API type-safe
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utilitaire
- **[Zod](https://zod.dev)** - Validation de schémas TypeScript

## 🚀 Installation et Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

1. Clonez le repository :

```bash
git clone https://github.com/milocartal/boavizta.git
cd boavizta
```

2. Installez les dépendances :

```bash
npm install
```

3. Démarrez le serveur de développement :

```bash
npm run dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📖 Utilisation

### Configuration d'un appareil

1. **Sélectionnez le type d'appareil** dans la liste déroulante
2. **Choisissez un archétype** correspondant aux spécifications de votre appareil
3. **Configurez les paramètres d'usage** :
   - Localisation géographique
   - Puissance moyenne (watts)
   - Durée de vie (années)
   - Temps d'utilisation quotidien (heures)

### Calcul d'impact

L'application calcule automatiquement :

- L'impact de fabrication (embedded)
- L'impact d'usage (use)  
- L'impact total pour chaque critère (GWP, ADPE, PE)

## 🏗 Structure du Projet

```text
src/
├── pages/
│   ├── index.tsx          # Page principale de l'application
│   ├── _app.tsx           # Configuration de l'app Next.js
│   └── api/
│       └── trpc/          # Endpoints tRPC
├── server/
│   └── api/
│       ├── root.ts        # Router principal
│       └── routers/
│           ├── devices.ts    # API pour les appareils
│           ├── archetypes.ts # API pour les archétypes
│           └── country.ts    # API pour les codes pays
├── utils/
│   ├── api.ts            # Configuration client tRPC
│   └── type.ts           # Types TypeScript
└── styles/
    └── globals.css       # Styles globaux
```

## 🔌 API Boavizta

Cette application utilise l'[API Boavizta](https://api.boavizta.org/docs) pour :

- Récupérer les archétypes d'appareils disponibles
- Calculer l'impact environnemental basé sur les paramètres d'usage
- Obtenir les codes pays pour la localisation

### Endpoints utilisés

- `GET /v1/{device_type}/archetypes` - Liste des archétypes
- `GET /v1/{device_type}` - Impact avec archétype par défaut
- `POST /v1/{device_type}` - Impact avec paramètres personnalisés
- `GET /v1/utils/country_code` - Codes pays disponibles

## 🎨 Types d'Appareils Supportés

- **Serveur** (`server`)
- **Ordinateur Portable** (`terminal/laptop`)
- **Ordinateur de Bureau** (`terminal/desktop`)
- **Smartphone** (`terminal/smartphone`)
- **Tablette** (`terminal/tablet`)
- **Télévision** (`terminal/television`)
- **Box Internet** (`terminal/box`)

## 📝 Scripts Disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Build de production
npm run start    # Démarre le serveur de production
npm run lint     # Vérifie la qualité du code
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔗 Liens Utiles

- [API Boavizta](https://api.boavizta.org/docs)
- [Documentation T3 Stack](https://create.t3.gg/)
- [Boavizta.org](https://boavizta.org/)

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.
