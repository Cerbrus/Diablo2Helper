import { Injectable } from '@angular/core';
import { Parser } from 'binary-parser';
import { Util } from '../../helpers/d2sParser/util';
import { ParseBase } from './parse-base';

@Injectable({ providedIn: 'root' })
export class ParseIronGolem extends ParseBase {
    constructor(util: Util) {
        super(util);
    }

    protected buildParser(parser: Parser, util: Util): Parser {
        return parser;
    }
}
