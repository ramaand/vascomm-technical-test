import mongoose, {
  models,
  Schema,
} from 'mongoose'

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    imageSrc: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model('Product', ProductSchema);

export default Product;
