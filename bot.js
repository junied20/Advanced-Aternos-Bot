const mineflayer = require('mineflayer');
const schedule = require('node-schedule');

// Function to generate random usernames
function getRandomUsername() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 10; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return 'Bot_' + username; // Prefix for all bot usernames
}

// Function to create a bot and connect to the server
function connectBot() {
    const bot = mineflayer.createBot({
        host: 'onlyforlegends.aternos.me', // Aternos server IP
        port: 16911, // Server port
        username: getRandomUsername(), // Random username
    });

    bot.on('login', () => {
        console.log(`Bot connected with username: ${bot.username}`);
    });

    bot.on('end', () => {
        console.log('Bot disconnected, reconnecting in 10 minutes...');
    });
}

// Schedule bot to connect every 10 minutes
schedule.scheduleJob('*/10 * * * *', () => {
    console.log('Attempting to connect bot...');
    connectBot();
});

// Connect bot immediately when the script starts
connectBot();
