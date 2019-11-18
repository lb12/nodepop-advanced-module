'use strict';


const Advert = require('../models/Advert'); 
const User = require('../models/User');

require('dotenv').config();
const conn = require('./connectMongoose');


conn.once('open', async () => {
    try {
        await installDB();
        closeDBConnection();
    } catch( error ) {
        console.error('Something went wrong installing database.', error);
    }
});


async function installDB() {
    console.log('*****************************');
    console.log('* Users data');
    await handleUsersData();
    console.log('\n* Adverts data');
    await handleAdvertsData();
    console.log('*****************************');
}


async function handleUsersData() {
    await deleteAllDataFromDB(User, 'users');
    await loadSampleDataFileIntoDB(User, 'users', await hashUsersPass());
}

async function handleAdvertsData() {   
    await deleteAllDataFromDB(Advert, 'adverts');
    await loadSampleDataFileIntoDB(Advert, 'adverts');
}

async function deleteAllDataFromDB(DataModel, dataName) {
    try {
        let dataDeleted = await DataModel.deleteMany({}).exec(); // {} => no filters, so all db data is gonna be deleted

        console.log(`${dataDeleted.n} ${dataName} were successfully deleted.`);
    } catch(error) {
        conn.emit('error', error);
    }
}

async function loadSampleDataFileIntoDB(DataModel, dataName, preloadedData) {
    try {
        let sampleDataJson = !preloadedData ? require(`../data/sample_${dataName}.json`) : preloadedData; // static json with some data preloaded
        let docsInserted = await DataModel.insertMany(sampleDataJson);

        console.info(`${docsInserted.length} new ${dataName} were successfully stored.`);
    } catch(error) {
        conn.emit('error', error);
    }
}

async function hashUsersPass() {
    const users = [];
    try {
        let sampleUsersJson = require(`../data/sample_users.json`); // static json with some data preloaded
        
        for (let i = 0; i < sampleUsersJson.length; i++) {
            const user = sampleUsersJson[i];
            user.password = await User.hashPassword(user.password);
    
            users.push(user);    
        }        
    } catch (error) {
        console.log('Error hashing users passwords', error);
    }

   return users;
}

async function closeDBConnection() {
    try {
        await conn.close();
        console.info(`Connection with database ${conn.name} was successfully closed. `);
    } catch(error) {
        conn.emit('error', error);
    }
}
