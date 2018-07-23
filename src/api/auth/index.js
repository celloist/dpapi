import { Router } from 'express'
import { login } from './controller'
import { password, master } from '../../services/passport'

const router = new Router()

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission user
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 */
router.post('/',
  password(),
  login)


/**
 * @api {post} /auth/master Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission master
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.post('/master',
  master(),
  password(),
  login)

export default router
