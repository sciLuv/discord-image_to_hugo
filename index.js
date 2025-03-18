import fs from 'fs';
import dotenv from 'dotenv';
import { Client, GatewayIntentBits, Events } from 'discord.js';

dotenv.config();

// Initialisation du client Discord avec les intents nécessaires
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Fonction pour récupérer tous les messages d'un salon
async function fetchAllMessages(channel) {
  let allMessages = [];
  let lastMessageId = null;

  while (true) {
    const options = { limit: 100 };
    if (lastMessageId) options.before = lastMessageId;

    const messages = await channel.messages.fetch(options);
    if (messages.size === 0) break;

    allMessages = allMessages.concat(Array.from(messages.values()));
    lastMessageId = messages.last().id;
  }

  return allMessages;
}

// Une fois que le bot est prêt
client.once(Events.ClientReady, async () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}!`);

  try {
    const targetChannel = await client.channels.fetch(process.env.CHANNEL_ID);
    if (!targetChannel || (!targetChannel.isTextBased() && !targetChannel.isThread())) {
      console.error('❌ Le salon ou fil est introuvable ou non valide.');
      return;
    }

    console.log(`📥 Chargement des messages depuis : ${targetChannel.name}`);

    const allMessages = await fetchAllMessages(targetChannel);
    
    const imageData = [];

    // Parcours des messages pour extraire les images
    allMessages.forEach(msg => {
      if (msg.attachments.size > 0) { // Si le message contient des pièces jointes
        const imageUrl = msg.attachments.first().url; // Récupère l'URL de l'image
        const createdAt = msg.createdAt; // Date de création du message

        // Ajoute les données dans le tableau imageData
        imageData.unshift({
          date: createdAt.toISOString(), // Format ISO de la date
          url: imageUrl // URL de l'image
        });
      }
    });

    // Sauvegarde des données dans le fichier JSON
    fs.writeFile('data.json', JSON.stringify(imageData, null, 2), (err) => {
      if (err) {
        console.error('❌ Erreur lors de l\'enregistrement dans le fichier :', err);
        process.exit(1);
      } else {
        console.log('✅ Données enregistrées dans data.json');
        process.exit(0);
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors du chargement des messages :', error);
    process.exit(1);
  }
});

// Connexion du bot
client.login(process.env.DISCORD_TOKEN);