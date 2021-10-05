// noinspection JSUnusedGlobalSymbols

export type Key = string | number | symbol;

export type FlatRecord<T extends Key> = { [key in T]: key };
export type KeysRecord<T> = FlatRecord<keyof T>;
export type RecordValues<U> = U[keyof U];

export type PrefixProperties<T, Prefix extends string> = {
    [key in keyof T as `${Prefix}${Capitalize<string & key>}`]: T[key];
};
export type SuffixProperties<T, Suffix extends string> = {
    [key in keyof T as `${Capitalize<string & key>}${Suffix}`]: T[key];
};

export type PrefixKey<T extends string, Prefix extends string> =
    `${Prefix}${Capitalize<string & T>}`;
export type SuffixKey<T extends string, Suffix extends string> =
    `${Uncapitalize<string & T>}${Suffix}`;
