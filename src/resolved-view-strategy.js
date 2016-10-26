var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ViewManager } from './view-manager';
import { viewStrategy } from 'aurelia-templating';
import { relativeToFile } from 'aurelia-path';
export let ResolvedViewStrategy = class ResolvedViewStrategy {
    constructor(namespace, view) {
        this.namespace = namespace;
        this.view = view;
    }
    loadViewFactory(viewEngine, compileInstruction, loadContext) {
        let viewManager = viewEngine.container.get(ViewManager);
        let path = viewManager.resolve(this.namespace, this.view);
        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(this.moduleId ? relativeToFile(path, this.moduleId) : path, compileInstruction, loadContext);
    }
};
ResolvedViewStrategy = __decorate([
    viewStrategy()
], ResolvedViewStrategy);
