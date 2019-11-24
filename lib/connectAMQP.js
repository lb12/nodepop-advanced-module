'use strict';

const amqplib = require('amqplib');

const urlConn = process.env.RABBITMQ_URL;

if (!urlConn) {
    console.error('No RabbitMQ URL found');
    process.exit(1);
}

const connection = amqplib.connect(urlConn);

module.exports = connection;
