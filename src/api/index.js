import { Router } from 'express'
import user from './user'
import auth from './auth'
import product from './product'
import category from './category'
import tag from './tag'
import invoice from './invoice'
import seller from './seller'
import enums from './enums'
import order from './order'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/products', product)
router.use('/categories', category)
router.use('/tags', tag)
router.use('/invoices', invoice)
router.use('/sellers', seller)
router.use('/enums', enums)
router.use('/orders', order)

export default router
