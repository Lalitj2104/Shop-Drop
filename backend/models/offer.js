import mongoose from "mongoose"

const offerSchema = new mongoose.Schema({
  offer_id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  discount_type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discount_value: {
    type: Number,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  applicable_products: {
    type: [String], // Array of product IDs or categories
    default: []
  },
  minimum_order_value: {
    type: Number,
    default: 0
  },
  max_discount_value: {
    type: Number,
    default: null
  },
  usage_limit: {
    type: Number,
    default: null
  },
  user_limit: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'upcoming'],
    default: 'upcoming'
  },
  is_sitewide: {
    type: Boolean,
    default: false
  },
  terms_and_conditions: {
    type: String,
    maxlength: 1000
  }
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;
