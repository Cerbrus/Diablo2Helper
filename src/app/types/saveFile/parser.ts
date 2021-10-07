export type TFormatter<TReturnType> = { formatter: (value: any) => TReturnType };
export type TFormatterWrap = TFormatter<{ [p: string]: any }>;
