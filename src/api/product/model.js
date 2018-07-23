import mongoose, { Schema } from 'mongoose'
import autoIncrement from "mongoose-auto-increment";

const productSchema = new Schema({
  productId: Number,
  name: {
    type: String,
    index: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  sellerPrice: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number
  },
  category: [{
    type: String
  }],
  stock: {
    type: Number, default: 5
  },
  images: [{
    url: String,
    name: String,
    order: {Number, default: 0}
  }],
  sourceInfo: { // Dropshipper product info
    source: {
      type: String
    },
    sellerName: {
      type: String,
      required: true
    },
    sourceStock: {
      type: Number,
      default: 10
    },
    reviewScore: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      productId: this.productId,
      name: this.name,
      description: this.description,
      price: this.price,
      sellerPrice: this.sellerPrice,
      shippingPrice: this.shippingPrice,
      category: this.category,
      stock: this.stock,
      images: this.images,
      timestamps: this.timestamps,
      sourceInfo: this.sourceInfo
    }

    return full ? {
      id: this.id,...view
      // add properties for a full view
    } : view
  }
}

invoiceSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'productId',
  startAt: 100200,
  incrementBy: 1
})

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
