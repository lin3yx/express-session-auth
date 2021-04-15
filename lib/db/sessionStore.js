import session from "express-session";
import MongoStore from "connect-mongo";
import config from "config";
import connection from "./dbConnection";

const sessionStore = session({
  secret: config.get("session.secret"),
  resave: false,
  saveUninitialized: false,
  // cookie: config.get("session.cookie"),
  store: MongoStore.create({
    // mongoUrl: dbUri,
    client: connection.getClient(),
    dbName: config.get("database.dbName"),
    collectionName: "sessions",
  }),
});

export default sessionStore;
