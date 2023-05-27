const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    await User.deleteMany({});

    await Thought.deleteMany({});

    const thoughtDocuments = await Thought.insertMany(thoughts);
    users.forEach((user) => {
        const userThoughts = thoughtDocuments.filter((thought) => {
            return thought.username === user.username;
        });
        userThoughts.forEach((thought) => {
            if(thought.username === user.username) {
                user.thoughts.push(thought._id);
            }
        });
    });
    await User.collection.insertMany(users);

    console.info("Seeding complete!");
    process.exit(0);
});