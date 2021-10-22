// noinspection JSUnusedGlobalSymbols

import { PrefixProperties } from '../helpers';

type Saver<T> = (value: T) => T;
export type SaveValue<T> = { [key in keyof T as key]: Saver<T[key]> };
export type SaveValuePrefixed<T> = PrefixProperties<SaveValue<T>, 'save'>;
