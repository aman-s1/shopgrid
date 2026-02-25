import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    price: number;
    category: string;
    image: string;
}

const ProductSchema: Schema = new Schema({
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
});

// Text index for search functionality
ProductSchema.index({ title: 'text' });

export default mongoose.model<IProduct>('Product', ProductSchema);
