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
    enum: ['AliExpress', 'DHGate', 'AliBaba']
  },
  storeId: {
    type: String,
    required: true
  },
  category: [{
    type: Schema.Types.ObjectId, ref: 'Category'
  }],
  communication: {
    method: [{
      type: String,
      enum: ['WhatsApp', 'WeChat', 'Telegram', 'Email'],
      required: true
    }],
    preferred: {
      type: String,
      enum: ['WhatsApp', 'WeChat', 'Telegram', 'Email'],
      required: true
    }
  },
  address: {
    street: String,
    number: String,
    postalCode: String,
    Province: String,
    Country: String
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
      communication: this.communcation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Seller', sellerSchema)

export const schema = model.schema
export default model
