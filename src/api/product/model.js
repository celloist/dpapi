import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    index: true
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  sellerPrice: {
    type: Number
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
  // toJSON: {
  //   virtuals: true,
  //   transform: (obj, ret) => { delete ret._id }
  // }
})

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      sellerPrice: this.sellerPrice,
      shippingPrice: this.shippingPrice,
      category: this.category,
      stock: this.stock,
      images: this.images,
      timestamps: this.timestamps,
      sourceInfo: this.sourceInfo
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
