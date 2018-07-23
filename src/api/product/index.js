import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Product, { schema } from './model'

const router = new Router()
const { name, description, price, sellerPrice, shippingPrice, category, stock, timestamps } = schema.tree

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Product's name.
 * @apiParam description Product's description.
 * @apiParam sellerPrice Product's sellerPrice.
 * @apiParam shippingPrice Product's shippingPrice.
 * @apiParam category Product's category.
 * @apiParam stock Product's stock.
 * @apiParam imageUrls Product's imageUrls.
 * @apiParam timestamps Product's timestamps.
 * @apiParam sourceInfo Product's sourceInfo.
 * @apiParam  Product's .
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  //token({ required: true, roles: ['admin'] }),
   body({ name, description, price, sellerPrice, shippingPrice, category, stock, images:[Object], timestamps, sourceInfo:[Object] }),
  create
)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Product's name.
 * @apiParam description Product's description.
 * @apiParam sellerPrice Product's sellerPrice.
 * @apiParam shippingPrice Product's shippingPrice.
 * @apiParam category Product's category.
 * @apiParam stock Product's stock.
 * @apiParam imageUrls Product's imageUrls.
 * @apiParam timestamps Product's timestamps.
 * @apiParam sourceInfo Product's sourceInfo.
 * @apiParam  Product's .
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, description,price, sellerPrice, shippingPrice, category, stock, images:[Object], timestamps, sourceInfo:[Object] }),
  update)

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
