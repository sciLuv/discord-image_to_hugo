import fs from 'fs';
import dotenv from 'dotenv';
import { Client, GatewayIntentBits, Events } from 'discord.js';

// Chargement des variables d'environnement
dotenv.config();

// Client Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Récupère tous les messages d'un salon/thread
async function fetchAllMessages(channel) {
  let allMessages = [];
  let lastId = null;
  while (true) {
    const options = { limit: 100, before: lastId };
    const msgs = await channel.messages.fetch(options);
    if (msgs.size === 0) break;
    allMessages.push(...msgs.values());
    lastId = msgs.last().id;
  }
  return allMessages;
}

// Vérifications modulaires avant collecte des images
function shouldProcessMessage(msg) {
  // Vérification par auteur spécifique (si USER_IDS est défini)
  if (process.env.USER_IDS) {
    const allowedUsers = process.env.USER_IDS.split(',').map(id => id.trim());
    if (!allowedUsers.includes(msg.author.id)) return false;
  }

  // Vérification par patterns ignorés (si IGNORE_PATTERNS est défini)
  if (process.env.IGNORE_PATTERNS) {
    const ignorePatterns = process.env.IGNORE_PATTERNS.split(',').map(p => p.trim());
    for (const pattern of ignorePatterns) {
      if (msg.content.includes(pattern)) return false;
    }
  }

  return true;
}

client.once(Events.ClientReady, async () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);

  const chan = await client.channels.fetch(process.env.CHANNEL_ID);
  if (!chan || (!chan.isTextBased() && !chan.isThread())) {
    console.error('❌ Salon introuvable ou non-textuel');
    process.exit(1);
  }

  console.log(`📥 Chargement des messages depuis : ${chan.name}`);
  const messages = await fetchAllMessages(chan);
  const images = [];

  for (const msg of messages) {
    if (!shouldProcessMessage(msg)) continue;
    if (msg.attachments.size === 0) continue;
    msg.attachments.forEach(att => {
      if (att.contentType?.startsWith('image/')) {
        images.unshift({ date: msg.createdAt.toISOString(), url: att.url });
      }
    });
  }

  fs.writeFileSync('data.json', JSON.stringify(images, null, 2));
  console.log(`✅ ${images.length} images enregistrées dans data.json`);
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);

