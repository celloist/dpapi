import { Order } from '.'

let order

beforeEach(async () => {
  order = await Order.create({ orderId: 'test', user: 'test', products: 'test', vat: 'test', shipping: 'test', total: 'test', payed: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = order.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(view.orderId).toBe(order.orderId)
    expect(view.user).toBe(order.user)
    expect(view.products).toBe(order.products)
    expect(view.vat).toBe(order.vat)
    expect(view.shipping).toBe(order.shipping)
    expect(view.total).toBe(order.total)
    expect(view.payed).toBe(order.payed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = order.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(view.orderId).toBe(order.orderId)
    expect(view.user).toBe(order.user)
    expect(view.products).toBe(order.products)
    expect(view.vat).toBe(order.vat)
    expect(view.shipping).toBe(order.shipping)
    expect(view.total).toBe(order.total)
    expect(view.payed).toBe(order.payed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
