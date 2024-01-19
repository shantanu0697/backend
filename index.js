// const fs = require("fs");
const productController = require("./controller/product");
const cors = require("cors");
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const path = require("path");
const env =require('dotenv').config();
const { Schema } = mongoose;
// const url = ''
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL)
  console.log("db connected");
}

server.use(cors());
server.use(express.json());

server.use(express.static(path.join(__dirname, 'build')));
server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// server.use("*", (err, req, res, next) => {
//   console.error(err);
//   res.status(500).send("An error occurred.");
// });

server.get("/products", productController.getall);
server.get("/products/:id", productController.get);
server.post("/products", productController.create);
server.put("/products/:id", productController.put);
server.patch("/products/:id", productController.patch);
server.delete("/products/:id", productController.del);
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
