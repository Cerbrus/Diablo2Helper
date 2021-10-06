// noinspection JSUnusedGlobalSymbols

import { Returns } from '.';

export type ItemOrArray<T> = T | Array<T>;
export type ItemOrLambda<T> = T | Returns<T>;
