// noinspection JSUnusedGlobalSymbols

export type Optional<T, K extends keyof T> = Omit<T, K> & Pick<Partial<T>, K>;
export type Require<T, K extends keyof T> = Omit<T, K> & Pick<Required<T>, K>;

export type Writable<T> = {
    [P in keyof T]: T[P];
};
