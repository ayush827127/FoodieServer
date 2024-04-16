const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 9090;
require("dotenv").config();

//middleware
app.use(express.json()); //for parsing application/json
app.use(cors());

// mongodb configuration using mongoose

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodieappcluster.idjfgnr.mongodb.net/FoodieAppDatabase?retryWrites=true&w=majority&appName=FoodieAppCluster`
  )
  .then(console.log("MongoDB Connected Successfully!"))
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_TOKEN, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

const menuRoutes = require("./API/routes/menuRoutes");
const cartRoutes = require("./API/routes/cartRoutes");
const userRoutes = require("./API/routes/userRoutes");

app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running at http://localhost:${port}/`);
});
