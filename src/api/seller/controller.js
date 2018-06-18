import { success, notFound } from '../../services/response/'
import { Seller } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Seller.create(body)
    .then((seller) => seller.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Seller.find(query, select, cursor)
    .then((sellers) => sellers.map((seller) => seller.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Seller.findById(params.id)
    .then(notFound(res))
    .then((seller) => seller ? seller.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Seller.findById(params.id)
    .then(notFound(res))
    .then((seller) => seller ? Object.assign(seller, body).save() : null)
    .then((seller) => seller ? seller.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Seller.findById(params.id)
    .then(notFound(res))
    .then((seller) => seller ? seller.remove() : null)
    .then(success(res, 204))
    .catch(next)
