'use strict';

const connection = require('../../lib/connectAMQP.js');

const queueName = 'thumbnail_queue';
let connected = false;
let channel = null;


async function createConnection() {
    const conn = await connection;

    channel = await conn.createChannel();

    // Check if exists queue
    await channel.assertQueue(queueName, {
        durable: true
    });

    connected = true;
}

const createThumbnail = async message => {    
    await createConnection().catch( error => console.log('Error while connecting to RabbitMQ', error));
    
    if (!connected) {
        console.log('ERROR: RabbitMQ connection does not exist!');
        return;
    }

    channel.sendToQueue(
        queueName, 
        Buffer.from(JSON.stringify(message)),
        { persistent: true } // Message survives if broker is restarted
    );
    console.log(`Published new thumbnail work: ${message.info}`);
};

module.exports = createThumbnail;