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
        port: 16911,                      // Replace with your server port
        username: getRandomUsername(),
        version: '1.19.4'                 // Specify the Minecraft version
    });

    bot.on('login', () => {
        console.log(`Bot connected with username: ${bot.username}`);
    });

    bot.on('death', () => {
        console.log('Bot died, respawning...');
        bot.chat('/respawn');  // Send respawn command
    });

    bot.on('error', (err) => {
        console.error('Bot encountered an error:', err);
        // Handle specific error types if needed
    });

    bot.on('end', () => {
        console.log('Bot disconnected, reconnecting in 10 minutes...');
        setTimeout(() => {
            console.log('Reconnecting...');
            connectBot();
        }, 600000); // Reconnect after 10 minutes
    });

    // Schedule the bot to disconnect and reconnect during the night
    schedule.scheduleJob('*/10 * * * *', () => {
        const now = new Date();
        if (now.getHours() >= 22 || now.getHours() < 6) { // Between 10 PM and 6 AM
            console.log('Disconnecting for the night.');
            bot.quit();
            setTimeout(() => {
                console.log('Reconnecting after 25 seconds.');
                connectBot();
            }, 25000); // Reconnect after 25 seconds
        }
    });
}

// Connect the bot immediately when the script starts
connectBot();
