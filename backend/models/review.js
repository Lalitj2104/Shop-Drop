import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  user_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
product_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Product',
  required: true
},
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  verified_purchase: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    validate: {
      validator: (array) => array.every(url => /^https?:\/\//.test(url)),
      message: 'Each image URL should be a valid URL'
    }
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending'
  },
  reported: {
    type: Number,
    default: 0
  },
  reply: {
    admin_id: String,
    message: String,
    replied_at: Date
  }
});

// Automatically update `updated_at` on document updates
reviewSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;

