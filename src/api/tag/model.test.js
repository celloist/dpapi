import { Tag } from '.'

let tag

beforeEach(async () => {
  tag = await Tag.create({ name: 'test', description: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tag.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tag.id)
    expect(view.name).toBe(tag.name)
    expect(view.description).toBe(tag.description)
    expect(view.category).toBe(tag.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tag.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tag.id)
    expect(view.name).toBe(tag.name)
    expect(view.description).toBe(tag.description)
    expect(view.category).toBe(tag.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
