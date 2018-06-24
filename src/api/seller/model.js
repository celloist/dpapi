import mongoose, { Schema } from 'mongoose'

const sellerSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  location: String,
  platform: {
    type: String,
  },
  storeId: {
    type: String,
    required: true
  },
  categories: [{
    type: String
  }],
  communication: [{
      method: {type: String, required: true},
      contactName:{type: String, required: true},
      contactInfo:{type: String, required: true}
    }],
  address: {
    street: String,
    number: String,
    zip: String,
    province: String,
    country: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

sellerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      name: this.name,
      address: this.address,
      platform: this.platform,
      storeId: this.storeId,
      categories: this.categories,
      communication: this.communication,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    console.log(view);
    return full ? {
      ...view
      // add properties for a full view
    } : view

  }
}

const model = mongoose.model('Seller', sellerSchema)

export const schema = model.schema
export default model
