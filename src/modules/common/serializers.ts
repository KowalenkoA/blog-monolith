/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import util from 'util';

export const removeUndefinedField = (o: object): object =>
  Object.fromEntries(
    Object.entries(o)
      .filter(([, v]) => typeof v !== 'undefined')
      .map(([k, v]) => [k, v && typeof v === 'object' ? removeUndefinedField(v) : v]),
  );
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deepLog = (o: any, opts: number[] = []) => {
  const [depth = 5, maxStringLength = 500, maxArrayLength = 50] = opts;

  return util.inspect(o, {
    depth,
    maxStringLength,
    maxArrayLength,
    compact: true,
    breakLength: Infinity,
    showHidden: false,
    getters: false,
  });
};

export const getReqMeta = ({ method, url, params, query, body }: Request) => ({
  method,
  path: url,
  params,
  query,
  body: deepLog(body),
});

export const errSerializer = (err: any) => {
  if (!err?.stack) return err;

  return {
    message: err.message,
    name: err.name,
    metadata: err.metadata,
    stack: err.stack || err.toString(),
    code: err.code,
    signal: err.signal,
  };
};

export const sliceLog = (str: string, maxStringLength = 1000) => util.inspect(str, { maxStringLength });
