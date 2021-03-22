import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Listening on port 3000 by default
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
