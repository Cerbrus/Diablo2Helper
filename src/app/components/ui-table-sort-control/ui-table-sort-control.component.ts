import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import {
    faSortAlphaDown,
    faSortAlphaDownAlt,
    faSortAlphaUp,
    faSortAlphaUpAlt,
    faSortAmountDown,
    faSortAmountDownAlt,
    faSortAmountUp,
    faSortAmountUpAlt,
    faSortNumericDown,
    faSortNumericDownAlt,
    faSortNumericUp,
    faSortNumericUpAlt
} from '@fortawesome/free-solid-svg-icons';
import { ITable, ITableHeader, TableSortDirection, TableSortIcon } from '../../interfaces';

@Component({
    selector: 'th[ui-table-sort-control], div[ui-table-sort-control]',
    templateUrl: './ui-table-sort-control.component.html',
    styleUrls: ['./ui-table-sort-control.component.scss']
})
export class UiTableSortControlComponent<TSort, TEntity extends Record<string, ITable<TSort>>> {
    @Output()
    public onSort = new EventEmitter<ITable<TSort>>();

    @Input('ui-table-sort-control')
    public config!: {
        header: ITableHeader<TEntity, TSort>;
        sort: TEntity;
    };

    @HostBinding('colSpan')
    public get colSpan(): number | undefined {
        return this.config.header.colSpan;
    }

    @HostBinding('class')
    public get cssClass(): string {
        return `header-${this.config.header.key}`;
    }

    private icons: Record<TableSortIcon, Record<'asc' | 'desc', IconDefinition>> = {
        amount: { asc: faSortAmountUp, desc: faSortAmountDownAlt },
        amountAlt: { asc: faSortAmountUpAlt, desc: faSortAmountDown },
        alpha: { asc: faSortAlphaUp, desc: faSortAlphaDownAlt },
        alphaAlt: { asc: faSortAlphaUpAlt, desc: faSortAlphaDown },
        numeric: { asc: faSortNumericUp, desc: faSortNumericDownAlt },
        numericAlt: { asc: faSortNumericUpAlt, desc: faSortNumericDown }
    };

    private sortMap: Record<TableSortDirection, TableSortDirection> = {
        asc: 'desc',
        desc: 'none',
        none: 'asc'
    };

    @HostListener('click')
    public onClick(): void {
        const sort = this.getSort();
        sort.direction = this.sortMap[this.getDirection()];
        this.onSort.emit(sort);
    }

    public getIcon(): any {
        const sort = this.getSort();
        const icon = this.icons[sort.icon ?? 'amount'];
        return sort.direction === 'desc'
            ? icon.desc
            : icon.asc;
    }

    public isEnabled(): boolean {
        return this.getDirection() !== 'none';
    }

    public getSort(): ITable<TSort> {
        return this.config.sort[this.config.header.key];
    }

    private getDirection(): TableSortDirection {
        return this.getSort().direction ?? 'none';
    }
}
