import { Request } from 'express'

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParamsAndBody<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T, K> = Request<T, {}, K>
