import { ViewEngine, ViewCompileInstruction, ResourceLoadContext, ViewFactory } from 'aurelia-templating';
export declare class ResolvedViewStrategy {
    moduleId: string;
    namespace: string;
    view: string;
    constructor(namespace: string, view: string);
    loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory>;
}
