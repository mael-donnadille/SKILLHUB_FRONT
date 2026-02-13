# 🚀 SkillHub - Plateforme de Formation et d'Ateliers

SkillHub est une application web moderne de gestion de formations en ligne et d'ateliers présentiels. Elle connecte apprenants, formateurs et administrateurs via une interface intuitive et performante.

---

## 📑 Sommaire
- [Fonctionnalités](#-fonctionnalités)
  - [Espace Public](#espace-public)
  - [Espace Apprenant](#espace-apprenant)
  - [Espace Administrateur](#espace-administrateur)
- [Architecture Technique](#%EF%B8%8F-architecture-technique)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation et Démarrage](#-installation-et-démarrage)
- [Structure du Projet](#-structure-du-projet)

---

## ✨ Fonctionnalités

### Espace Public
- **Landing Page "Wahou"** : Design moderne avec animations fluides (Framer Motion), grille Bento pour les fonctionnalités, et cartes interactives 3D.
- **Catalogue** : Consultation des formations disponibles.
- **Authentification** : Connexion et inscription sécurisées avec redirection selon le rôle.

### Espace Apprenant
*Route : `/apprenant`*
- **Tableau de Bord** : Vue d'ensemble de l'abonnement annuel et du prochain atelier planifié.
- **Mes Formations** : Liste des formations pour lesquelles l'apprenant s'est inscrit à un atelier.
- **Mon Planning** : Calendrier des ateliers à venir (regroupés par mois), avec détails (lieu, horaire, formateur).
- **Profil** : Gestion des informations personnelles (Mock).

### Espace Administrateur
*Route : `/administrateur`*
- **Dashboard** : Statistiques clés (utilisateurs, formations actives, validations en attente).
- **Gestion Utilisateurs** : Liste filtrable des apprenants et formateurs.
- **Gestion Formations** : Validation des formations proposées par les formateurs.
- **Planning** : Vue globale de tous les ateliers planifiés.
- **Paramètres** : Configuration de la plateforme (Maintenance, Notifications).

---

## 🛠️ Architecture Technique

### Frontend
- **Framework** : [Next.js 15+](https://nextjs.org/) (App Router)
- **Langage** : JavaScript / React
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Gestion d'État** : React Hooks / Context API

### Backend (API)
- **Framework** : Symfony (API Platform)
- **Base de Données** : MySQL / PostgreSQL
- **Authentification** : JWT (JSON Web Tokens)
*(Note: Le frontend utilise actuellement des services de données simulées (`mockService`) en attendant l'intégration finale avec l'API).*

---

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votre-repo/skillhub-front.git
   cd skillhub-front
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

4. Accéder à l'application sur [http://localhost:3000](http://localhost:3000).

---

## 📂 Structure du Projet

```
/app
  /administrateur    # Routes et pages de l'espace admin
  /apprenant         # Routes et pages de l'espace apprenant
  /connexion         # Page de connexion
  /inscription       # Page d'inscription
  layout.js          # Layout racine
  page.js            # Landing page
/components
  /admin             # Composants spécifiques admin (Sidebar, Stats...)
  /landing           # Composants de la landing page (Hero, Bento...)
  /layout            # Composants globaux (Navbar, Footer...)
  /learner           # Composants spécifiques apprenant
/services
  mockAdminService.js   # Données simulées pour l'admin
  mockLearnerService.js # Données simulées pour l'apprenant
```

---

*Développé avec ❤️ par l'équipe SkillHub.*
