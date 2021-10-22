import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { read as parseD2s } from '@dschu012/d2s';
import { ID2S, IItem } from '@dschu012/d2s/lib/d2/types';
import { constants } from '@dschu012/d2s/lib/data/versions/96_constant_data';
import { from, Observable } from 'rxjs';
import { ArrayHelper, BaseEntitiesHelper, Helper } from '~helpers';

@Injectable({ providedIn: 'root' })
export class D2sParserService {
    public parseSave(saveBuffer: ArrayBuffer): Observable<ID2S | null> {
        return from(parseD2s(new Uint8Array(saveBuffer), constants));
    }

    public getItemCounts<TEntityMap, TType, TEntity>(
        helper: BaseEntitiesHelper<TEntityMap, TType, TEntity, any>,
        itemsInSave: Array<IItem>
    ): Array<KeyValue<TEntity, number>> {
        return ArrayHelper.countObjectOccurrences(
            itemsInSave.map(i => <TEntity>helper.fromSaveItem(i)).filter(Helper.hasValue)
        );
    }
}
