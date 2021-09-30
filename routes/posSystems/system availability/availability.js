const { MongoClient } = require("mongodb");

const systemAvailability = async (dbName) => {
  let mongodbCon = null;
  try {
    //connecting to mongodb
    mongodbCon = await MongoClient.connect(process.env.MONGODB_URL);

    //getting available databse list
    const { databases } = await mongodbCon.db().admin().listDatabases();

    //check if required db is available in db
    const availability = databases.some(
      (database) => database.name === dbName.toString()
    );

    return availability;
  } catch (error) {
    return error;
  } finally {
    mongodbCon.close();
  }
};

module.exports = systemAvailability;
