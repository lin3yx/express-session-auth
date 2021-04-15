import express from "express";
import config from "config";
import router from "./lib/routes";
import sessionStore from "./lib/db/sessionStore";

const app = express();
const PORT = config.get("app.port");

// Initialize middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(sessionStore);
app.use(router);

// Listening on port 3000 by default
app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
