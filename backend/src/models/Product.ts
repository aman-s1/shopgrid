import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  price: number;
  category: string;
  image: string;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ title: 'text' });

ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ category: 1, createdAt: -1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
