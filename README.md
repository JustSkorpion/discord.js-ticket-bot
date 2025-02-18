# Discord Bot - Console Commands

Requirements
Node.js version 16.9.0 or higher <br>
A Discord account <br>
A code editor (e.g., Visual Studio Code) <br>
### It is recommended to purchase a Discord VPS Server to keep the bot running 24/7 <br>

## Installation
Install Node.js: Make sure you have the latest version of Node.js installed. You can download it from the official Node.js website.

## Create a new folder for the project:

```
mkdir discord-bot-console
cd discord-bot-console
```


## Initialize a new Node.js project:
```
npm init -y
```

## Install the discord.js library:
```
npm install discord.js
```

## Creating a Bot on Discord
Go to the <a href="https://discord.com/developers/applications">Discord Developer Portal</a>.

### Create a new application:

Click "New Application".
Enter a name for the application and click "Create".

### Add a bot:

Go to the "Bot" tab.
Click "Add Bot" and confirm.

### Copy the bot token:

In the "Token" section, click "Copy". You will need this in your code.

### Set bot permissions:

In the "Privileged Gateway Intents" section, enable "Message Content Intent".

### Invite the bot to your server:

Go to the "OAuth2" tab.
In the "URL Generator" section, check "bot" under "Scopes" and select the appropriate permissions under "Bot Permissions".
Copy the generated URL and open it in your browser to invite the bot to your server.

## Project configuration

Replace YOUR_BOT_TOKEN with the token of your bot that you copied earlier.

## Running the Bot
Run the bot in the terminal:

```
node .
```
## Enter commands in the console:
```
ping
```
 - The bot will respond with "Pong!".
```
shutdown
```
- The bot will shut down.

## How to get message on channel from bot
If you delet `ALLOWED_CHANNEL_ID` write `!start` on any channel you want, but u can change `!start` to any word.
But if you haven't deleted it copy `ID channel` from Discord server and paste it to: `TICKET_ALLOWED_CHANNEL`.

To create ticket, you must copy `ID category` from Discord server and pase it to: `YOUR_TICKET_CATEGORY_ID`.
