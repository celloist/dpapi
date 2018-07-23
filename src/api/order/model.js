import mongoose, { Schema } from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

const orderSchema = new Schema({
  orderId: {
    type: Number,

  },
  user: {
    id: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    }
  },
  products: [{
    id: {
      type: Schema.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    amount: Number
  }],
  vat: {
    type: Number
  },
  shipping: {
    name:{
      type:String,
      required: true
    },
    price:{
      type:Number,
      required: true
    }
  },
  total: {
    type: Number
  },
  payed: Boolean
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
      //id: this.id,
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
    console.log(view);
    return full ? {
      id: this.id,
      ...view,
    } : view
  }
}

orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderId',
  startAt: 105170,
  incrementBy: 1
})

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
