import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  orderId: {
    type: String
  },
  user: {
    type: String
  },
  products: {
    type: String
  },
  vat: {
    type: String
  },
  shipping: {
    type: String
  },
  total: {
    type: String
  },
  payed: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

orderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      orderId: this.orderId,
      user: this.user,
      products: this.products,
      vat: this.vat,
      shipping: this.shipping,
      total: this.total,
      payed: this.payed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
