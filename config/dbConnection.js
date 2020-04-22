{ useNewUrlParser: true }
if (process.env.NODE_ENV == "production") {
    module.exports = { mongoURI: "mongodb+srv://root:root@cluster0-x3ocx.mongodb.net/test?retryWrites=true&w=majority" }
} else {
    module.exports = { mongoURI: "mongodb://localhost/mmorpggot" }
}


