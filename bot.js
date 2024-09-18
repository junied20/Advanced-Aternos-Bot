const mineflayer = require('mineflayer');
const schedule = require('node-schedule');

function getRandomUsername() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 10; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return 'Bot_' + username;
}

function connectBot() {
    const bot = mineflayer.createBot({
        host: 'onlyforlegends.aternos.me', // Replace with your server address
        port: 16911,                 // Replace with your server port
        username: getRandomUsername(),
        version: '1.19.4'            // Specify the Minecraft version
    });

    bot.on('login', () => {
        console.log(`Bot connected with username: ${bot.username}`);
    });

    // Listen for death and auto-respawn
    bot.on('death', () => {
        console.log('Bot died, respawning...');
        bot.chat('/respawn');  // Send respawn command
    });

    bot.on('end', () => {
        console.log('Bot disconnected, reconnecting in 10 minutes...');
    });
}

// Schedule the bot to reconnect every 10 minutes
schedule.scheduleJob('*/10 * * * *', () => {
    console.log('Attempting to connect bot...');
    connectBot();
});

// Connect the bot immediately when the script starts
connectBot();
