import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Invoice, { schema } from './model'

const router = new Router()
const { invoiceId, orderId, products, vat, shippingPrice, totals, paymentInfo } = schema.tree

/**
 * @api {post} /invoices Create invoice
 * @apiName CreateInvoice
 * @apiGroup Invoice
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam invoiceId Invoice's invoiceId.
 * @apiParam orderId Invoice's orderId.
 * @apiParam products Invoice's products.
 * @apiParam vat Invoice's vat.
 * @apiParam shippingPrice Invoice's shippingPrice.
 * @apiParam totals Invoice's totals.
 * @apiParam paymentInfo Invoice's paymentInfo.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ invoiceId, orderId, products, vat, shippingPrice, totals, paymentInfo }),
  create)

/**
 * @api {get} /invoices Retrieve invoices
 * @apiName RetrieveInvoices
 * @apiGroup Invoice
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of invoices.
 * @apiSuccess {Object[]} rows List of invoices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /invoices/:id Retrieve invoice
 * @apiName RetrieveInvoice
 * @apiGroup Invoice
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /invoices/:id Update invoice
 * @apiName UpdateInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam invoiceId Invoice's invoiceId.
 * @apiParam orderId Invoice's orderId.
 * @apiParam products Invoice's products.
 * @apiParam vat Invoice's vat.
 * @apiParam shippingPrice Invoice's shippingPrice.
 * @apiParam totals Invoice's totals.
 * @apiParam paymentInfo Invoice's paymentInfo.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ invoiceId, orderId, products, vat, shippingPrice, totals, paymentInfo }),
  update)

/**
 * @api {delete} /invoices/:id Delete invoice
 * @apiName DeleteInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
