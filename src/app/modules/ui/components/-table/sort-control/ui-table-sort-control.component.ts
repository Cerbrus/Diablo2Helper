import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { ITable, ITableHeader, TableSortDirection, TableSortIcon } from '~interfaces/ui';
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
    faSortNumericUpAlt,
    IconDefinition
} from '~modules/font-awesome';

@Component({
    selector: 'ui-table-sort-control',
    templateUrl: './ui-table-sort-control.component.html',
    styleUrls: ['./ui-table-sort-control.component.scss']
})
export class UiTableSortControlComponent<TSort, TEntity extends Record<string, ITable<TSort>>> {
    @Output()
    public onSort = new EventEmitter<ITable<TSort>>();

    @Input()
    public header!: ITableHeader<TEntity, TSort>;

    @Input()
    public sort!: TEntity;

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

    @HostBinding('colSpan')
    public get colSpan(): number | undefined {
        return this.header?.colSpan;
    }

    @HostBinding('class')
    public get cssClass(): string {
        return `header-${this.header?.key} sort-icon-${this.header?.sortIconPosition ?? 'left'}`;
    }

    @HostListener('click')
    public onClick(): void {
        const sort = this.getSort();
        sort.direction = this.sortMap[this.getDirection()];
        this.onSort.emit(sort);
    }

    public getIcon(): any {
        const sort = this.getSort();
        const icon = this.icons[sort.icon ?? 'amount'];
        return sort.direction === 'desc' ? icon.desc : icon.asc;
    }

    public isEnabled(): boolean {
        return this.getDirection() !== 'none';
    }

    public getSort(): ITable<TSort> {
        return this.header && this.sort[this.header.key];
    }

    private getDirection(): TableSortDirection {
        return this.getSort().direction ?? 'none';
    }
}
