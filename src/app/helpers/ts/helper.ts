export class Helper {
    public static assertHasValue<TValue>(
        value?: TValue | null | undefined,
        errorMessage?: string
    ): asserts value is TValue {
        if (value === null || typeof value === 'undefined')
            throw new Error(errorMessage || 'This value is `null` or `undefined');
    }
}
