const mongoose = require("mongoose");
const cartscheema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Include the product name"],
  },
  price: {
    type: String,
    required: [true, "Please Include the product price"],
  },
 image: {
    type: String,
    required: true,
  },
});
export default mongoose.model('cart', cartscheema);