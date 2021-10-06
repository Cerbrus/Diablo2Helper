// noinspection JSUnusedGlobalSymbols

import { ArrayHelper } from './array.helper';

type DeepCopyable = Date | Array<any> | string | number | boolean | Record<any, any>;

export class ObjectHelper {
    public static entries<TKey extends string, TValue>(
        obj: { [key in TKey]?: TValue }
    ): Array<[TKey, TValue]> {
        return Object.entries(obj) as Array<[TKey, TValue]>;
    }

    public static forEach<TKey extends string, TValue>(
        object: Record<TKey, TValue>,
        iterator: (key: TKey, value: TValue, index: number, array: Array<[TKey, TValue]>) => void
    ): void {
        this.entries(object)
            .forEach((
                [key, value],
                index: number,
                array: Array<[TKey, TValue]>
            ) => iterator(key, value, index, array));
    }

    public static every<TKey extends string, TValue>(
        object: Record<TKey, TValue>,
        predicate: (key: TKey, value: TValue, index: number, array: Array<[TKey, TValue]>) => boolean
    ): boolean {
        return this
            .entries(object)
            .every(([key, value], index: number, array: Array<[TKey, TValue]>) =>
                predicate(key, value, index, array));
    }

    public static some<TKey extends string, TValue>(
        object: Record<TKey, TValue>,
        predicate: (key: TKey, value: TValue, index: number, array: Array<[TKey, TValue]>) => boolean
    ): boolean {
        return this
            .entries(object)
            .some(([key, value], index: number, array: Array<[TKey, TValue]>) =>
                predicate(key, value, index, array));
    }

    public static find<TKey extends string, TValue>(
        object: Record<TKey, TValue>,
        predicate: (key: TKey, value: TValue, index: number, array: Array<[TKey, TValue]>) => boolean
    ): [TKey, TValue] | undefined {
        return this
            .entries(object)
            .find(([key, value], index: number, array: Array<[TKey, TValue]>) =>
                predicate(key, value, index, array));
    }

    public static deepCopy<TKey extends string, TValue extends DeepCopyable>(
        object: Record<TKey, TValue>
    ): Record<TKey, TValue>;
    public static deepCopy(object: DeepCopyable): DeepCopyable {
        // The 3 simple types, and null or undefined
        if (object === null || typeof object !== 'object')
            return object;

        // Date
        if (object instanceof Date) {
            let copy = new Date();
            copy.setTime(object.getTime());
            return copy;
        }

        // Array
        if (object instanceof Array) {
            return ArrayHelper
                .clone(object)
                .map(x => this.deepCopy(x));
        }

        // Object
        let copy: { [key: string]: any } = {};
        for (let key in object) {
            if (object.hasOwnProperty(key))
                copy[key] = this.deepCopy(object[key]);
        }
        return copy;
    }
}
