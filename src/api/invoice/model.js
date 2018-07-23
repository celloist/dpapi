import mongoose, { Schema } from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

const invoiceSchema = new Schema({
  invoiceId: {
    type: Number
  },
  user: {
    id: {
      type: Schema.Types.ObjectId,
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
  orderId: {
    type: Number,
    required: true
  },
  products: [{
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
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
    method: {
      type: String,
      enum: ['Ideal', 'Paypal', 'BankTransfer'],
      required: true
    },
    referenceId: {
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
      orderId: this.orderId,
      user: this.user,
      invoiceId: this.invoiceId,
      products: this.products,
      vat: this.vat,
      shippingPrice: this.shippingPrice,
      totals: this.totals,
      paymentInfo: this.paymentInfo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      id: this.id, ...view
      // add properties for a full view
    } : view
  }
}

invoiceSchema.plugin(autoIncrement.plugin, {
  model: 'Invoice',
  field: 'invoiceId',
  startAt: 200500,
  incrementBy: 1
})

const model = mongoose.model('Invoice', invoiceSchema)

export const schema = model.schema
export default model
