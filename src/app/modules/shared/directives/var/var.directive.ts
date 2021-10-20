import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[ngVar]' })
export class VarDirective {
    @Input()
    public set ngVar(context: any) {
        this.context.$implicit = this.context.ngVar = context;
        this.updateView();
    }

    public context: any = {};

    constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}

    public updateView(): void {
        this.vcRef.clear();
        this.vcRef.createEmbeddedView(this.templateRef, this.context);
    }
}
