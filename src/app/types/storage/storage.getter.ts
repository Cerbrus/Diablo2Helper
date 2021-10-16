// noinspection JSUnusedGlobalSymbols

import { PrefixProperties } from '../helpers';

type Getter<T> = () => T;
export type GetValue<T> = { [key in keyof T as key]: Getter<T[key]>; };
export type GetValuePrefixed<T> = PrefixProperties<GetValue<T>, 'save'>;
