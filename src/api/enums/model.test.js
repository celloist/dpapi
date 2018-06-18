import { Enums } from '.'

let enums

beforeEach(async () => {
  enums = await Enums.create({ name: 'test', values: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = enums.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(enums.id)
    expect(view.name).toBe(enums.name)
    expect(view.values).toBe(enums.values)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = enums.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(enums.id)
    expect(view.name).toBe(enums.name)
    expect(view.values).toBe(enums.values)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
