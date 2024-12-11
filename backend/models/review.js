import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
productId: {
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
  
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  
},{
  timestamps:true,
});
const Review = mongoose.model('Review', reviewSchema);
export default Review;

