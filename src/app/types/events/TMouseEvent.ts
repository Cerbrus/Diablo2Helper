export type TMouseEvent<T extends EventTarget> = MouseEvent & { target: T };
