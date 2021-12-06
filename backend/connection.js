const { MongoClient } = require('mongodb');


async function main() {
    var fs = require('fs');
    const uri = fs.readFileSync("./backend/key.txt", 'utf8');

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client) {
    // eslint-disable-next-line no-undef
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    // eslint-disable-next-line no-undef
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}