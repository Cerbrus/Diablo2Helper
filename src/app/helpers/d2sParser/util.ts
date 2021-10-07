import { Injectable } from '@angular/core';
import { TFormatter, TFormatterWrap } from '../../types/saveFile';
import { ArrayHelper } from '../ts';

@Injectable({ providedIn: 'root' })
export class Util {
    public date(): TFormatter<Date> {
        return {
            formatter: (value: number) => new Date(value * 1000)
        };
    }

    public wrap(key: string): TFormatterWrap {
        return { formatter: (value: any) => ({ [key]: value }) };
    }

    public obj<T extends string>(key: T): [string, TFormatterWrap] {
        const keys = key.split('.');
        return [keys[0], this.wrap(keys[1])];
    }

    public flags(keys: Array<string | 0>): TFormatter<Record<string, boolean>> {
        return {
            formatter: (value: number) => {
                return ArrayHelper.toRecord<string, boolean>(
                    keys.map(k => k === 0 ? '' : k),
                    (key, record, index) => !!(value & (1 << index)));
            }
        };
    }
}
