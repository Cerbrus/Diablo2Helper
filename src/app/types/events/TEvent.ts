// noinspection JSUnusedGlobalSymbols

export type TEvent<T extends EventTarget> = Event & { target: T };
