// noinspection JSUnusedGlobalSymbols

import { char } from '~types/helpers';

export class StringHelper {
    public static Char(c: string): char {
        if (!this.isChar(c)) throw new Error('not a char');
        return c;
    }

    public static isChar(str: string): str is char {
        return /^(.|\n)$/.test(str);
    }

    public static equalsStripped(a: string, b?: string, ignoreCase = false): boolean {
        const [valA, valB] = this.stripNonAZ(a, b, ignoreCase);
        return valA === valB;
    }

    public static includesStripped(haystack: string, needle?: string, ignoreCase = false): boolean {
        const [stack, search] = this.stripNonAZ(haystack, needle, ignoreCase);
        return stack.includes(search);
    }

    private static stripNonAZ(a: string, b?: string, ignoreCase = false): [string, string] {
        return [a, b ?? ''].map(value => this.onlyAZ(ignoreCase ? value.toLowerCase() : value)) as [string, string];
    }

    private static onlyAZ(value: string): string {
        return value.replace(/[^a-zA-Z]/g, '');
    }
}
