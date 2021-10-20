import { Component, EventEmitter, Output } from '@angular/core';
import { ID2S } from '@dschu012/d2s/lib/d2/types';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { D2sParserService } from '~services/d2s-parser.service';
import { TError } from '~types';

@Component({
    selector: 'input-game-save-file',
    templateUrl: './input-game-save-file.component.html',
    styleUrls: ['./input-game-save-file.component.scss']
})
export class InputGameSaveFileComponent {
    @Output()
    public onParse = new EventEmitter<ID2S | TError<any>>();
    public file?: File;

    constructor(private readonly d2sParserService: D2sParserService) {
    }

    public async onChange($event: Event): Promise<void> {
        const files = (<HTMLInputElement>$event.target).files;
        if (!files?.length)
            return;

        this.file = files[0];

        this.parseArrayBuffer(await this.file.arrayBuffer());
    }

    private parseArrayBuffer(arrayBuffer: ArrayBuffer): void {
        this.d2sParserService.parseSave(arrayBuffer)
            .pipe(catchError(error => {
                console.error('Error parsing save file', error);
                return of({ error, message: 'Error parsing save file' });
            }))
            .subscribe(parseResult => {
                if (!parseResult)
                    return;

                this.onParse.emit(parseResult);
            });
    }
}
