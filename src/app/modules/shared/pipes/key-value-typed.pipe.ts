import { KeyValue, KeyValuePipe } from '@angular/common';
import { Pipe } from '@angular/core';
import { TRune } from '~types/rune';

@Pipe({
    name: 'keyValueTyped'
})
export class KeyValueTypedPipe extends KeyValuePipe {
    public transform(input: null | undefined): null;
    public transform<K extends string, V>(input: Record<K, V> | ReadonlyMap<K, V>): Array<KeyValue<K, V>>;
    public transform<K extends TRune, V>(
        input: Record<K, V> | ReadonlyMap<K, V> | null | undefined
    ): Array<KeyValue<TRune, V>> | null {
        return super.transform(input);
    }
}
