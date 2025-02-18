const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

const TOKEN = 'YOUR_BOT_TOKEN'; //Enter your bot token
const TICKET_CATEGORY_ID = 'YOUR_TICKET_CATEGORY_ID'; //Enter your ticket category id
const ALLOWED_CHANNEL_ID = 'YOUR_ALLOWED_CHANNEL_ID'; //Enter your allowed channel id, delete this line if you want to allow all channels

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//to start bot, send !start in allowed channel
client.on('messageCreate', async (message) => {
    if (message.content === '!start' && message.channel.id === ALLOWED_CHANNEL_ID) { //u can change !start to any word
        const contactMessage = `
//Enter your message here
        `;

        const dropdown = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('ticket_menu')
                .setPlaceholder('Select recipient')
                .addOptions([
                    { label: 'Enter your label here', value: 'enter-your-value-here', description: 'Enter your description here' },
                    { label: 'Enter your label here', value: 'enter-your-value-here', description: 'Enter your description here' },
                    { label: 'Enter your label here', value: 'enter-your-value-here' }
                ])
        );

        await message.channel.send({ content: contactMessage, components: [dropdown] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.values[0] === 'reset') {
        await interaction.reply({ content: 'Selection reset!', ephemeral: true });
        return;
    }

    const ticketName = `${interaction.values[0]}-${interaction.user.username}`;
    try {
        await interaction.deferReply({ ephemeral: true });
        
        const channel = await interaction.guild.channels.create({
            name: ticketName,
            type: 0, 
            parent: TICKET_CATEGORY_ID,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['ViewChannel']
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'SendMessages']
                }
            ]
        });

        const closeButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close')
                .setStyle(ButtonStyle.Danger)
        );

        await channel.send({
            content: `Welcome ${interaction.user}, describe your problem and wait for the answer!`,
            components: [closeButton]
        });

        await interaction.editReply({ 
            content: `Ticket created: ${channel}`
        });

    } catch (error) {
        console.error(error);
        await interaction.editReply({ 
            content: '**Error!** Failed to create a ticket.'
        });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'close_ticket') {
        await interaction.channel.delete();
    }
});

client.login(TOKEN);