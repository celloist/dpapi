import mongoose, { Schema } from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

const invoiceSchema = new Schema({
  invoiceId: {
    type: Number
  },
  userInfo: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  }],
  vat: {
    type: Number
  },
  shippingPrice: {
    type: Number
  },
  totals: {
    noVat: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  paymentInfo: {
    Id: Number,
    Method: {
      type: String,
      enum: ['Ideal', 'Paypal', 'BankTransfer'],
      required: true
    },
    Reference: {
      type: String,
      required: true
    },
    payedDate: {
      type: Date,
      required: true
    },
    currency: {
      type: String,
      enum: ['€', '$'],
      default: '€'
    }
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

invoiceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userInfo: this.userInfo.invoiceView(full),
      invoiceId: this.invoiceId,
      orderId: this.orderId,
      products: this.products,
      vat: this.vat,
      shippingPrice: this.shippingPrice,
      totals: this.totals,
      paymentInfo: this.paymentInfo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

invoiceSchema.plugin(autoIncrement.plugin, {
  model: 'Invoice',
  field: 'invoiceId',
  startAt: 1000,
  incrementBy: 1
})

const model = mongoose.model('Invoice', invoiceSchema)

export const schema = model.schema
export default model
