import { Request } from 'express';

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<TParams, TBody> = Request<TParams, {}, TBody>;
export type RequestWithParamsAndQuery<TParams, TQuery> = Request<TParams, {}, {}, TQuery>;
export type RequestWithParamsQueryAndBody<TParams, TQuery, TBody> = Request<TParams, {}, TBody, TQuery>;
