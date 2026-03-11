# Statut des Routes de l'API

Voici un récapitulatif de l'utilisation des routes de l'API dans le projet frontend.

## Auth

- `POST /api/auth/activation`: **À faire**
- `POST /api/auth/login`: **Utilisée** (dans `services/authService.js` et `contexts/AuthContext.js` - avec redirection par rôle et persistance)
- `POST /api/auth/logout`: **À faire** (Déconnexion gérée côté client pour l'instant via suppression du token)
- `GET /api/auth/me`: **Utilisée** (dans `services/authService.js` et `contexts/AuthContext.js` - pour maintenir la session)
- `POST /api/auth/register`: **À faire**

## AnneeFormation

- `POST /api/admin/annees`: **À faire**
- `DELETE /api/admin/annees/{id}`: **À faire**
- `PATCH /api/admin/annees/{id}`: **À faire**
- `GET /api/annees`: **À faire**
- `GET /api/annees/{id}`: **À faire**

## Atelier

- `GET /api/ateliers`: **À faire** (données mockées dans `services/mockAdminService.js`)
- `POST /api/ateliers`: **À faire**
- `GET /api/ateliers/{id}`: **À faire**
- `DELETE /api/ateliers/{id}`: **À faire**
- `PATCH /api/ateliers/{id}`: **À faire**
- `GET /api/ateliers/{id}/inscriptions`: **À faire**
- `POST /api/ateliers/{id}/inscriptions`: **À faire**

## Categorie

- `POST /api/admin/categories`: **À faire**
- `DELETE /api/admin/categories/{id}`: **À faire**
- `PATCH /api/admin/categories/{id}`: **À faire**
- `GET /api/categories`: **Utilisée** (dans `app/categories/page.js`)
- `GET /api/categories/{id}`: **À faire**

## Formation

- `PATCH /api/admin/formations/{id}/reject`: **À faire**
- `PATCH /api/admin/formations/{id}/validate`: **À faire**
- `GET /api/formateur/formations`: **À faire** (le dashboard formateur utilise `GET /api/formations` et filtre côté client)
- `POST /api/formateur/formations`: **À faire**
- `GET /api/formateur/formations/{id}`: **À faire**
- `PUT /api/formateur/formations/{id}`: **À faire**
- `DELETE /api/formateur/formations/{id}`: **À faire**
- `GET /api/formations`: **Utilisée** (dans `services/formationService.js`, utilisée pour les listes et comme fallback pour les détails)
- `GET /api/formations/pending`: **Partiellement utilisée** (le dashboard admin utilise `GET /api/formations` et filtre côté client)
- `GET /api/formations/{id}`: **Utilisée avec Fallback** (dans `services/formationService.js` - le frontend bascule sur la liste complète si cet endpoint échoue)

## Presence

- `GET /api/admin/presences`: **À faire**
- `POST /api/admin/presences`: **À faire**
- `GET /api/admin/presences/{id}`: **À faire**
- `DELETE /api/admin/presences/{id}`: **À faire**
- `PATCH /api/admin/presences/{id}`: **À faire**
- `POST /api/formateur/presences`: **À faire**
- `DELETE /api/formateur/presences/{id}`: **À faire**
- `PATCH /api/formateur/presences/{id}`: **À faire**

## Apprenant

- `POST /api/apprenants/{id}/generate-code`: **À faire**

## Personne

- `GET /api/users`: **À faire** (données mockées dans `services/mockAdminService.js`)
- `POST /api/users`: **À faire**
- `GET /api/users/{id}`: **À faire**
- `PUT /api/users/{id}`: **À faire**
- `DELETE /api/users/{id}`: **À faire**
- `PATCH /api/users/{id}`: **À faire**
- `GET /api/users/{id}/inscriptions`: **À faire** (données mockées dans `services/mockLearnerService.js`)
