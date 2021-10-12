export type TCssAnimation = {
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    duration: CSSStyleDeclaration['animationDuration'];
    iterationCount?: CSSStyleDeclaration['animationIterationCount'];
};
