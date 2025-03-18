# Discord To Hugo

## But et fonctionnement : 
Ce projet permet de regrouper sur une page web statique (via Hugo) les images postées par les utilisateurs d'un salon ou d'un fil Discord. Initialement conçu pour mieux organiser et visualiser les pages de bd poster par une connaissance sur un salon discord particuler, il offre une solution pratique pour consulter l’ensemble des images d'un salon en un seul endroit.

**Remarque** : Il peut être nécessaire d'ajuster les permissions des salons Discord pour s’assurer que le bot puisse récupérer uniquement les images souhaitées.

## Création d’un bot Discord  

1. **Passer un compte Discord en mode développeur**  
2. **Créer une application/bot**  
   - Accédez au [portail des développeurs Discord](https://discord.com/developers/applications)  
   - Créez une nouvelle application  
   - Dans l'onglet **Bot**, ajoutez un bot à cette application  
3. **Configurer les permissions du bot**  
   - Rendez-vous dans la section **OAuth2 > URL Generator**  
   - Cochez le scope **bot**  
   - Dans **Bot Permissions**, cochez administrator 
4. **Ajouter le bot à un serveur Discord**  
   - Copiez l'URL générée et ouvrez-la dans un navigateur  
   - Sélectionnez le serveur et autorisez le bot  
5. **Configurer le bot**  
   - Rendez-vous dans l'onglet **Bot** de votre application  
   - **Générez et copiez** le **token du bot** (gardez-le confidentiel)  
   - **Activez** l’option **Message Content Intent**  

---

## Déploiement sur GitHub Pages  

1. **Cloner le dépôt GitHub**  
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   ```
2. **Configurer GitHub Actions**  
   - Allez dans **Settings > Actions > General > Workflow permissions** et sélectionnez **Read and Write permissions**  
   - Configurez **Settings > Pages > Build and Deployment** sur **GitHub Actions**  
   - Ajoutez les variables d’environnement dans **Settings > Security > Secrets and variables > Actions >  Repository secrets** en vous aidant les instructions données dans la section suivante.

---

## Configuration des variables d’environnement  

mettres ces informations dans **repository secrets** comme vu dans la section précédente, chaque variable doit etre mis dans une nouvelle repository secret, nommé exactement de la même maniere que celle suivante :

**APPLICATION_ID** # Disponible dans Settings > General Information sur le portail des développeurs Discord  
**DISCORD_TOKEN** # Token généré dans Settings > Bot  
**SERVER_ID** # ID du serveur, récupérable en mode développeur (clic droit sur le serveur > Copier l'ID)  
**CHANNEL_ID** # ID du salon, récupérable en mode développeur (clic droit sur le salon > Copier l'ID)  


---
