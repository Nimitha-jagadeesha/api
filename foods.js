const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: String,
  pic:String,
  calaries: String,
  
});

mongoose.model("food", FoodSchema);
