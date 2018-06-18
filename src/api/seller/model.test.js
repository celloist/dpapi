import { Seller } from '.'

let seller

beforeEach(async () => {
  seller = await Seller.create({ email: 'test', name: 'test', address: 'test', name: 'test', storeId: 'test', categories: 'test', communcation: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = seller.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(seller.id)
    expect(view.email).toBe(seller.email)
    expect(view.name).toBe(seller.name)
    expect(view.address).toBe(seller.address)
    expect(view.name).toBe(seller.name)
    expect(view.storeId).toBe(seller.storeId)
    expect(view.categories).toBe(seller.categories)
    expect(view.communcation).toBe(seller.communcation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = seller.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(seller.id)
    expect(view.email).toBe(seller.email)
    expect(view.name).toBe(seller.name)
    expect(view.address).toBe(seller.address)
    expect(view.name).toBe(seller.name)
    expect(view.storeId).toBe(seller.storeId)
    expect(view.categories).toBe(seller.categories)
    expect(view.communcation).toBe(seller.communcation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
