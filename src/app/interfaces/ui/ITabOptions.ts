import { TLetter } from '~types/helpers';

export interface ITabOptions {
    title: string;
    key: string;
    fillHeight?: boolean;
    active?: boolean;
    right?: boolean;
    shortcutKey?: TLetter;
}
