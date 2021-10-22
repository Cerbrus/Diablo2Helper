export class Helper {
    public static assertHasValue<TValue>(
        value?: TValue | null | undefined,
        errorMessage?: string
    ): asserts value is TValue {
        if (!this.hasValue(value)) throw new Error(errorMessage || 'This value is `null` or `undefined');
    }

    public static hasValue<TValue>(value: TValue | null | undefined): value is TValue {
        return value !== null && typeof value !== 'undefined';
    }
}
