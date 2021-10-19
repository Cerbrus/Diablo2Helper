import { Pipe, PipeTransform } from '@angular/core';
import { ArrayHelper } from '../../../helpers';
import { ItemOrArray } from '../../../types/helpers';

@Pipe({ name: 'asArray' })
export class AsArrayPipe implements PipeTransform {
    public transform<T>(value: ItemOrArray<T>): Array<T> {
        return ArrayHelper.toArray(value);
    }
}
