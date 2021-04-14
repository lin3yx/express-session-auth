import express from "express";
import session from "express-session";
import config from "config";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();
const PORT = config.get("app.port");
const dbUri = config.get("database.uri");

mongoose.connect(dbUri, {
  dbName: config.get("database.dbName"),
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Get the default connection
const { connection } = mongoose;

// Bind connection to error event (to get notification of connection errors)
connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

connection.once(
  "open",
  console.log.bind("Connection established successfully!")
);

// Initialize middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
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
  })
);

app.get("/", (req, res) => {
  req.session.isAuth = true;
  console.log(req.session);
  console.log(req.session.id);
  res.send("Hello World");
});

// Listening on port 3000 by default
app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
