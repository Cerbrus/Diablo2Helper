import { Injectable } from '@angular/core';
import { ParseHeader } from './d2s-parser/parse-header';

@Injectable({ providedIn: 'root' })
export class D2sParserService {
    constructor(private readonly parseHeader: ParseHeader) {
    }

    public parseSave(saveBuffer: ArrayBuffer): any {
        const header = this.parseHeader.parse(saveBuffer);

        return {
            header
        };
    }
}
