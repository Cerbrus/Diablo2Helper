export class NumberHelper {
    public static clamp(
        value: number | undefined | null,
        min: number = 0,
        max: number = 0): number {
        return Math.max(Math.min(value ?? min, max), min);
    }
}

