'use strict';

const Jimp = require('jimp');
const path = require('path');

const rootPath = path.join(__dirname, '..', '..');

require('dotenv').config({ path: path.join(rootPath, '.env') });

const connection = require('../../lib/connectAMQP.js');

const queueName = 'thumbnail_queue';
let channel = null;
let connected = false;

async function createConnection() {
    try {
        const conn = await connection;
    
        channel = await conn.createChannel();
    
        // Check if exists queue
        await channel.assertQueue(queueName, {
            durable: true
        });
        await channel.prefetch(2);
        connected = true;
    } catch(error) {
        console.log('ERROR while connecting to RabbitMQ', error);
        connected = false;
    }
};

consumeTask().catch( error => console.log('ERROR while consuming messages in RabbitMQ worker channel', error));
async function consumeTask() {
    await createConnection();

    if (!connected) {
        console.log('ERROR: RabbitMQ connection does not exist!');
        process.exit(1);
    }

    channel.consume(queueName, msg => {
        const { image, quality } = JSON.parse(msg.content);
        const imagesPath = path.join(rootPath, image.path, '/');

        const imagePath = path.join(imagesPath, image.fullname);
        const dest = `${imagesPath}/thumbnail/${image.name}_thumbnail.${image.extension}`;
        
        createThumbnail(imagePath, quality, dest)
        .then(() => {
            console.log(`Thumbnail created for ${image.fullname} at ${Date.now()}`);
            channel.ack(msg);
        })
        .catch(err => console.log(err));
    });

    function createThumbnail(name, quality, dest) {
        // Very important return the 'read()' result, if not, an error will be thrown 
        // by 'then()' when this method is called (it would be 'undefined').
        return Jimp.read(name)
        .then(thumbnail => {
            return thumbnail.resize(100, 100).quality(quality).write(dest)
        })
        .catch(err => console.log('ERROR creating thumbnail', err));
    }
}
