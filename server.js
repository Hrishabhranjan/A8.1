const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { name } = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
const main = async () => {
  try {
    await mongoose.connect("mongodb+srv://hrishabhvik:je4iDUUGIXMghqGf@cluster0.8lmw3nq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
main();
// Define Schema
const trySchema = new mongoose.Schema({
  name: String
});
// Create Model
const Item = mongoose.model("Item", trySchema);
app.get("/", async function (req, res) {
  const data = await Item.find({});
  res.render("list", { dayej: data });
});
app.post("/", function (req, res) {
  const ItemName = req.body.newItem;
  const todo4 = new Item({
    name: ItemName
  });
  todo4.save();
  res.redirect("/");
});
app.post("/deleted", async function (req, res) {
  const checkedItemId = req.body.checkbox;
  try {
    await Item.findByIdAndDelete(checkedItemId);
    console.log("Item Deleted Successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
app.listen(8000, function () {
  console.log("Server started on port 8000");
});