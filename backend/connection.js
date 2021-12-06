const { MongoClient } = require('mongodb');


async function main() {
    const uri = "mongodb+srv://letloose:amataro@deemoscluster.c3sjh.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
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