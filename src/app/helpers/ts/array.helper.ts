import { KeyValue } from '@angular/common';
import { isArray } from 'rxjs/internal-compatibility';
import { ItemOrArray, Key } from '../../types/helpers';

export class ArrayHelper {
    public static repeat<T>(value: T, length: number): Array<T> {
        return new Array(length).fill(value);
    }

    public static clone<T>(value: Array<T>): Array<T> {
        return [...value];
    }

    public static toArray<T>(value: ItemOrArray<T>): Array<T> {
        return value == null
            ? []
            : isArray(value)
                ? value
                : [value];
    }

    public static toRecord<TKey extends Key, TValue>(
        array: ItemOrArray<TKey>,
        getValue: (item: TKey, record: Record<TKey, TValue>, index: number) => TValue
    ): Record<TKey, TValue> {
        return ArrayHelper.toRecordWithKey(array, key => key, getValue);
    }

    public static toRecordWithKey<TKey extends Key, TValue, TArrayValue>(
        array: ItemOrArray<TArrayValue>,
        getKey: (item: TArrayValue) => TKey,
        getValue: (item: TArrayValue, record: Record<TKey, TValue>, index: number) => TValue
    ): Record<TKey, TValue> {
        return ArrayHelper
            .toArray(array)
            .reduce((record, item, index) => {
                const key = getKey(item);
                return key
                    ? {
                        ...record,
                        [key]: getValue(item, record, index)
                    }
                    : record;
            }, <Record<TKey, TValue>>{});
    }

    public static countStringOccurrences<TType extends Key>(items: ItemOrArray<TType>): Record<TType, number> {
        return ArrayHelper.toRecord(ArrayHelper.toArray(items),
            (item, record) => (record[item] || 0) + 1);
    }

    public static countObjectOccurrences<TType>(items: ItemOrArray<TType>): Array<KeyValue<TType, number>> {
        return ArrayHelper.toArray(items)
            .reduce((result, item) => {
                const kv = result.find(({ key }) => key === item);
                if (kv)
                    kv.value++;
                else
                    result.push({ key: item, value: 1 });

                return result;
            }, <Array<KeyValue<TType, number>>>[]);
    }
}
