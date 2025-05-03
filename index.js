import fs from 'fs';
import dotenv from 'dotenv';
import { Client, GatewayIntentBits, Events } from 'discord.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

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

    allMessages.forEach(msg => {
      if (msg.attachments.size > 0) {
        msg.attachments.forEach(attachment => {
          if (attachment.contentType && attachment.contentType.startsWith('image/')) {
            imageData.unshift({
              date: msg.createdAt.toISOString(),
              url: attachment.url
            });
          }
        });
      }
    });

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

client.login(process.env.DISCORD_TOKEN);
