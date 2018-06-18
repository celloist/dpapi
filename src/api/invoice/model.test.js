import { Invoice } from '.'
import { User } from '../user'

let user, invoice

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  invoice = await Invoice.create({ userInfo: user, invoiceId: 'test', orderId: 'test', products: 'test', vat: 'test', shippingPrice: 'test', totals: 'test', paymentInfo: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = invoice.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(typeof view.userInfo).toBe('object')
    expect(view.userInfo.id).toBe(user.id)
    expect(view.invoiceId).toBe(invoice.invoiceId)
    expect(view.orderId).toBe(invoice.orderId)
    expect(view.products).toBe(invoice.products)
    expect(view.vat).toBe(invoice.vat)
    expect(view.shippingPrice).toBe(invoice.shippingPrice)
    expect(view.totals).toBe(invoice.totals)
    expect(view.paymentInfo).toBe(invoice.paymentInfo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = invoice.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoice.id)
    expect(typeof view.userInfo).toBe('object')
    expect(view.userInfo.id).toBe(user.id)
    expect(view.invoiceId).toBe(invoice.invoiceId)
    expect(view.orderId).toBe(invoice.orderId)
    expect(view.products).toBe(invoice.products)
    expect(view.vat).toBe(invoice.vat)
    expect(view.shippingPrice).toBe(invoice.shippingPrice)
    expect(view.totals).toBe(invoice.totals)
    expect(view.paymentInfo).toBe(invoice.paymentInfo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
