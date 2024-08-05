import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  title: String,
  image: String,
  price: Number,
});

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
export default Menu;
