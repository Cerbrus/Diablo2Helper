import { Injectable } from '@angular/core';
import { read as parseD2s } from '@dschu012/d2s';
import { ID2S } from '@dschu012/d2s/lib/d2/types';
import { constants } from '@dschu012/d2s/lib/data/versions/96_constant_data';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class D2sParserService {
    public parseSave(saveBuffer: ArrayBuffer): Observable<ID2S | null> {
        return from(parseD2s(new Uint8Array(saveBuffer), constants))
            .pipe(catchError(error => {
                console.error('Error parsing save file', error);
                return of(null);
            }));
    }
}
