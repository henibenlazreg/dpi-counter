const INCH_CONVERSION: Record<string, number> = {
    mm: 1 / 25.4,
    cm: 1 / 2.54,
    m: 39.37007874,
    in: 1,
    ft: 12,
    yd: 36,
};

export function toInch(value: number, unit: string): number {
    const coef = INCH_CONVERSION[unit];

    if (!coef) {
        throw new Error(`Unsupported unit: ${unit}`);
    }

    return value * coef;
}
