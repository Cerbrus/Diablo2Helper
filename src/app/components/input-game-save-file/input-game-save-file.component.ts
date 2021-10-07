import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RunewordFilterService } from '../../services';
import { D2sParserService } from '../../services/d2s-parser.service';

@Component({
    selector: 'input-game-save-file',
    templateUrl: './input-game-save-file.component.html',
    styleUrls: ['./input-game-save-file.component.scss']
})
export class InputGameSaveFileComponent {
    constructor(
        http: HttpClient,
        private readonly d2sParserService: D2sParserService,
        private readonly runeWordFilterService: RunewordFilterService
    ) {
        // TODO: Remove this
        http.get('/assets/saves/Michiel.d2s', { responseType: 'arrayBuffer' as 'json' })
            .subscribe((response) => {
                if (response instanceof ArrayBuffer)
                    this.parseArrayBuffer(response);
                else
                    throw new Error('Invalid response');
            });
    }

    public async onChange($event: Event): Promise<void> {
        const file = ($event.target as HTMLInputElement).files;
        if (!file)
            return;

        this.parseArrayBuffer(await file[0].arrayBuffer());
    }

    private parseArrayBuffer(arrayBuffer: ArrayBuffer): void {
        this.d2sParserService.parseSave(arrayBuffer)
            .subscribe(parseResult => {
                if (!parseResult)
                    return;

                console.log('parsed save', parseResult);
                this.runeWordFilterService.applySaveToFilters(parseResult);
            });
    }
}
