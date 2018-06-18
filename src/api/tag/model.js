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
  category: [ {
    id: {type: Schema.Types.ObjectId, ref: 'Category'},
    name: String
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
      category: this.category,
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
