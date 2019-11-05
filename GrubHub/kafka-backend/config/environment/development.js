`use strict`;

module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-wrsa5.mongodb.net/grubhub?retryWrites=true&w=majority`,
  mongoCNF: {
    useNewUrlParser: true,
    ssl: true,
    replicaSet: "cluster0-shard-0",
    authSource: "admin",
    retryWrites: "true"
  }
};
