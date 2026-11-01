# Plan de test PIM - Employés

## Application Overview

Plan minimal pour OrangeHRM OS 5.9, limité au module PIM : création d'un employé, recherche par nom et suppression. Chaque scénario est autonome et utilise un nom unique pour éviter les collisions. Le navigateur a été initialisé avec seed.spec.ts; aucune donnée n'a été modifiée pendant l'exploration.

## Test Scenarios

### 1. PIM - Employés

**Seed:** `seed.spec.ts`

#### 1.1. Ajouter un employé

**File:** `specs/pim-employes.md`

**Steps:**
  1. Depuis Employee List du module PIM, cliquer sur Add.
    - expect: Le formulaire Add Employee s'affiche.
  2. Renseigner les champs obligatoires du nom complet avec un prénom et un nom uniques; laisser l'ID employé généré automatiquement.
    - expect: Le nom complet est renseigné et l'ID employé est présent.
  3. Cliquer sur Save.
    - expect: La fiche de l'employé nouvellement créé s'affiche avec le nom saisi.

#### 1.2. Rechercher un employé

**File:** `specs/pim-employes.md`

**Steps:**
  1. Préparation du scénario : depuis PIM > Employee List, créer et enregistrer un employé avec un nom unique via Add puis Save.
    - expect: L'employé de test est créé.
  2. Dans Employee Name, saisir le nom unique de l'employé, sélectionner la suggestion correspondante si elle est proposée, puis cliquer sur Search.
    - expect: La liste affiche l'employé correspondant au nom recherché.
    - expect: Aucun employé sans correspondance n'est présenté comme résultat.

#### 1.3. Supprimer un employé

**File:** `specs/pim-employes.md`

**Steps:**
  1. Préparation du scénario : depuis PIM > Employee List, créer et enregistrer un employé avec un nom unique via Add puis Save.
    - expect: L'employé de test est créé.
  2. Rechercher cet employé par son nom unique dans Employee Name, puis cliquer sur Search.
    - expect: La liste contient la ligne de l'employé de test.
  3. Dans la ligne correspondante, cliquer sur l'action de suppression (icône corbeille), puis confirmer dans la boîte de dialogue.
    - expect: La boîte de confirmation de suppression s'affiche avant validation.
  4. Après confirmation, vérifier le message de succès puis rechercher de nouveau l'employé.
    - expect: La suppression est confirmée par un message de succès.
    - expect: La recherche ne retourne plus l'employé supprimé.
