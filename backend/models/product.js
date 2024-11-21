import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true,
  },
  retailer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retailer",
    required: true,
  },
  image: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available_quantity_delivery: {
    type: Number,
    default: 0,
  },
  available_quantity_inStore: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
  },
  attributes: {
    type: Map,
    of: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  brand: {
    type: String,
  },
},{
  timestamps:true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
