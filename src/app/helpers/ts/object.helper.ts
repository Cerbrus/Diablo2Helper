// noinspection JSUnusedGlobalSymbols

import { ArrayHelper } from './array.helper';

type DeepCopyable = Date | Array<any> | string | number | boolean | Record<any, any>;

export class ObjectHelper {
    public static hasValue<TValue>(value: TValue | null | undefined): value is TValue {
        return value !== null && value !== undefined;
    }

    public static entries<TKey extends string, TValue>(
        obj: { [key in TKey]?: TValue }
    ): Array<[TKey, TValue]> {
        return <Array<[TKey, TValue]>>Object.entries(obj);
    }

    public static keys<TKey extends string>(
        obj: { [key in TKey]?: any }
    ): Array<TKey> {
        return <Array<TKey>>Object.keys(obj);
    }

    public static values<TValue>(
        obj: { [key in string]?: TValue }
    ): Array<TValue> {
        return <Array<TValue>>Object.values(obj);
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

    public static map<TKey extends string, TValue, TResult>(
        object: Record<TKey, TValue>,
        toValue: (key: TKey, value: TValue, index: number, object: Record<TKey, TResult>) => TResult
    ): Record<TKey, TResult> {
        const result = <Record<TKey, TResult>>{};
        ObjectHelper.forEach(
            object,
            (key, value, index) => {
                result[key] = toValue(key, value, index, result);
            });
        return result;
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
