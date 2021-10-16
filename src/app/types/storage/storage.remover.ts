// noinspection JSUnusedGlobalSymbols

import { PrefixProperties } from '../helpers';

type Remover = () => void;
export type RemoveValue<T> = { [key in keyof T as key]: Remover; };
export type RemoveValuePrefixed<T> = PrefixProperties<RemoveValue<T>, 'remove'>;
