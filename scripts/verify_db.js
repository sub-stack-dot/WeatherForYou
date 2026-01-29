const path = require("path");
// Add backend node_modules to path so we can require 'mongoose' without installing it again
module.paths.push(path.resolve(__dirname, "../backend/node_modules"));

const mongoose = require("mongoose");
const User = require("../backend/src/models/User"); // Adjust path if needed

// Connect to the exposed port defined in docker-compose (27018)
// NOT the internal port (27017)
const MONGO_URI = "mongodb://localhost:27018/weatherdb";

console.log(`Connecting to MongoDB at: ${MONGO_URI}`);

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("✅ Connected successfully!");

        try {
            const users = await User.find({});
            console.log(`\nFound ${users.length} users in the database:`);
            users.forEach(user => {
                console.log(` - ID: ${user._id}`);
                console.log(`   Name: ${user.name}`);
                console.log(`   Email: ${user.email}`);
                console.log("   ---");
            });
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            mongoose.connection.close();
            console.log("\nConnection closed.");
        }
    })
    .catch(err => {
        console.error("❌ Connection failed!");
        console.error("Reason:", err.message);
        console.log("\nTroubleshooting:");
        console.log("1. Is the docker container running? (docker-compose ps)");
        console.log("2. Are you sure port 27018 is correct? Check docker-compose.yml 'ports' section.");
    });
