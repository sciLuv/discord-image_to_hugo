# Discord To Hugo  

## Purpose and Functionality  

This project allows users to gather images posted in a specific Discord channel or thread and display them on a static web page using Hugo. Initially designed to better organize and view comic pages posted by an acquaintance in a particular Discord channel, it provides a convenient solution for accessing all images from a channel in one place.  

The goal is to use GitHub Pages to avoid self-hosting anything while also exploring GitHub Actions as a learning experience.

**Note**: You may need to adjust Discord channel permissions to ensure the bot can retrieve only the desired images.  

## Creating a Discord Bot  

1. **Enable Developer Mode on a Discord Account**  
2. **Create an Application/Bot**  
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications)  
   - Create a new application  
   - In the **Bot** tab, add a bot to this application  
3. **Set Up Bot Permissions**  
   - Navigate to **OAuth2 > URL Generator**  
   - Check the **bot** scope  
   - Under **Bot Permissions**, select **Administrator**  
4. **Add the Bot to a Discord Server**  
   - Copy the generated URL and open it in a browser  
   - Select the server and authorize the bot  
5. **Configure the Bot**  
   - Go to the **Bot** tab in your application  
   - **Generate and copy** the **bot token** (keep it confidential)  
   - **Enable** the **Message Content Intent** option  

---

## Deployment on GitHub Pages  

1. **Fork this GitHub Repository**  
2. **Configure GitHub Actions**  
   - Go to **Settings > Actions > General > Workflow permissions** and select **Read and Write permissions**  
   - In **Settings > Pages > Build and Deployment**, set the deployment method to **GitHub Actions**  
   - Add environment variables in **Settings > Security > Secrets and variables > Actions > Repository secrets**, following the instructions in the next section.  

---

## Configuring Environment Variables  

Store the following information in **repository secrets**, as mentioned in the previous section. Each variable must be added as a separate repository secret, named exactly as shown below:  

- **APPLICATION_ID** – Available in **Settings > General Information** on the Discord Developer Portal  
- **DISCORD_TOKEN** – Token generated in **Settings > Bot**  
- **SERVER_ID** – Server ID, retrievable in Developer Mode (Right-click on the server > Copy ID)  
- **CHANNEL_ID** – Channel ID, retrievable in Developer Mode (Right-click on the channel > Copy ID)  

---

## Configuration : 
1) You have to modify hugo.toml file to change the title of the website in it interface.
2) by default the github action is set to user triggered, you have to uncomment lines :
```yml
  schedule:
    - cron: '* */6 * * *' 
```
here, the github action is triggered every 6 hours but you can change the cron command as you want

---

## License

Do what you want ! (ツ)