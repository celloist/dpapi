import mongoose, { Schema } from 'mongoose'

const enumsSchema = new Schema({
  name: String,
  values: [{
    type: String
  }],
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

enumsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      values: this.values,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Enums', enumsSchema)

export const schema = model.schema
export default model
