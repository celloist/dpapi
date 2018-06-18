import { Product } from '.'

let product

beforeEach(async () => {
  product = await Product.create({ name: 'test', description: 'test', sellerPrice: 'test', shippingPrice: 'test', category: 'test', stock: 'test', imageUrls: 'test', timestamps: 'test', sourceInfo: 'test', : 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.description).toBe(product.description)
    expect(view.sellerPrice).toBe(product.sellerPrice)
    expect(view.shippingPrice).toBe(product.shippingPrice)
    expect(view.category).toBe(product.category)
    expect(view.stock).toBe(product.stock)
    expect(view.imageUrls).toBe(product.imageUrls)
    expect(view.timestamps).toBe(product.timestamps)
    expect(view.sourceInfo).toBe(product.sourceInfo)
    expect(view.).toBe(product.)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.description).toBe(product.description)
    expect(view.sellerPrice).toBe(product.sellerPrice)
    expect(view.shippingPrice).toBe(product.shippingPrice)
    expect(view.category).toBe(product.category)
    expect(view.stock).toBe(product.stock)
    expect(view.imageUrls).toBe(product.imageUrls)
    expect(view.timestamps).toBe(product.timestamps)
    expect(view.sourceInfo).toBe(product.sourceInfo)
    expect(view.).toBe(product.)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
