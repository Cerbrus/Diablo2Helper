import { Parser } from 'binary-parser';
import { Util } from '../../helpers/d2sParser/util';

export abstract class ParseBase {
    protected readonly byte = 1;
    protected readonly short = this.byte * 2;
    protected readonly long = this.byte * 4;

    protected constructor(protected readonly util: Util) {
    }

    public parse(saveBuffer: ArrayBuffer): any {
        return this.buildParser(new Parser().endianess('little'), this.util)
            .parse(new Uint8Array(saveBuffer));
    }

    protected abstract buildParser(parser: Parser, util: Util): Parser;
}
