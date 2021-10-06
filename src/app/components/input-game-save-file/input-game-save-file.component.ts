import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Parser } from 'binary-parser';
import { ArrayHelper } from '../../helpers';

type Bosses = 'andariel' | 'duriel' | 'mephisto' | 'diablo' | 'baal';
type BossesRecord<T> = Record<Bosses, T>
type Difficulty = 'normal' | 'nightmare' | 'hell';
type DifficultyRecord<T> = Record<Difficulty, T>

type Progression = DifficultyRecord<BossesRecord<boolean>>;

type Formatter<TReturnType> = { formatter: (value: any) => TReturnType };
type FormatterWrap = Formatter<{ [p: string]: any }>;

@Component({
    selector: 'input-game-save-file',
    templateUrl: './input-game-save-file.component.html',
    styleUrls: ['./input-game-save-file.component.scss']
})
export class InputGameSaveFileComponent {
    public parsedSave: any;

    private readonly byte = 1;
    private readonly short = this.byte * 2;
    private readonly long = this.byte * 4;

    private readonly classes = [
        'Amazon',
        'Sorceress',
        'Necromancer',
        'Paladin',
        'Barbarian',
        'Druid',
        'Assassin'
    ];

    constructor(http: HttpClient) {
        http.get('/assets/saves/Michiel.d2s', { responseType: 'arrayBuffer' as 'json' })
            .subscribe((response) => {
                if (response instanceof ArrayBuffer)
                    this.parseSave(response);
                else
                    throw new Error('Invalid response');
            });
    }

    public async onChange($event: Event): Promise<void> {
        const file = ($event.target as HTMLInputElement).files;
        if (!file)
            return;

        this.parseSave(await file[0].arrayBuffer());
    }

    private static mapProgression(progression: number, isExpansion: boolean): Progression {
        return {
            normal: {
                andariel: progression >= 1,
                duriel: progression >= 2,
                mephisto: progression >= 3,
                diablo: progression >= 4,
                baal: (isExpansion ? progression >= 5 : false)
            },
            nightmare: {
                andariel: progression >= (isExpansion ? 5 : 6),
                duriel: progression >= (isExpansion ? 6 : 7),
                mephisto: progression >= (isExpansion ? 7 : 8),
                diablo: progression >= (isExpansion ? 8 : 9),
                baal: (isExpansion ? progression >= 10 : false)
            },
            hell: {
                andariel: progression >= (isExpansion ? 9 : 11),
                duriel: progression >= (isExpansion ? 10 : 12),
                mephisto: progression >= (isExpansion ? 11 : 13),
                diablo: progression >= (isExpansion ? 12 : 14),
                baal: (isExpansion ? progression >= 15 : false)
            }
        };
    }

    private parseSave(saveBuffer: ArrayBuffer): void {
        const saveParser = new Parser()
            .useContextVars()
            .endianess('little')
            .int32le(...this.obj('file.header'))
            .int32le('file.version')
            .int32le('file.size')
            .int32le('file.checksum')
            .seek(this.long)
            .string('character', { length: 16, stripNull: true, ...this.wrap('name') })
            .int8('character.status', this.flags([0, 0, 'isHardcore', 'hasDied', 0, 'isExpansionCharacter']))
            .int8('character.progression', {
                formatter: function (progression) {
                    return InputGameSaveFileComponent.mapProgression(
                        progression,
                        (this as any).character.status.isExpansionCharacter);
                }
            })
            .seek(this.byte * 2)
            .bit4('character.class', { formatter: value => this.classes[value] })
            .seek(this.byte * 2)
            .int8('characterLevel')
            .seek(this.long)
            .int32le('timeStamp', this.date())
            .array('skills', { type: 'int32le', length: 16, ...this.wrap('hotKeys') })
            .int32le('skills.mouse1')
            .int32le('skills.mouse2')
            .int32le('skills.mouse1Alt')
            .int32le('skills.mouse2Alt')
            .seek(this.byte * 32)
            // Below this doesn't seem ok
            .int8('difficulty', this.wrap('normal'))
            .int8('difficulty.nightmare')
            .int8('difficulty.hell')
            .int32le('mapId')
            .seek(this.short)
            .int16le('merc', this.wrap('mayBeDead'))
            .int32le('merc.id')
            .int16le('merc.name')
            .int16le('merc.source')
            .int32le('merc.experience')

            .seek(this.byte * 144)
            .string('identifier', { length: 4, stripNull: true });

        this.parsedSave = saveParser.parse(new Uint8Array(saveBuffer));
    }

    private date(): Formatter<Date> {
        return {
            formatter: (value: number) => new Date(value * 1000)
        };
    }

    private wrap(key: string): FormatterWrap {
        return { formatter: (value: any) => ({ [key]: value }) };
    }

    private obj<T extends string>(key: T): [string, FormatterWrap] {
        const keys = key.split('.');
        return [keys[0], this.wrap(keys[1])];
    }

    private flags(keys: Array<string | 0>): Formatter<Record<string, boolean>> {
        return {
            formatter: (value: number) => {
                return ArrayHelper.toRecord<string, boolean>(
                    keys.map(k => k === 0 ? '' : k),
                    (key, record, index) => !!(value & (1 << index)));
            }
        };
    }
}
