import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema({
  name: {
    type: String,
    index: true,
    trim: true
  },
  description: {
    type: String
  },
  categories: [ {
    type: String
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tagSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      categories: this.categories,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Tag', tagSchema)

export const schema = model.schema
export default model
