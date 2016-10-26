import * as extend from 'extend';
import {inject} from 'aurelia-dependency-injection';
import {viewStrategy,useViewStrategy} from 'aurelia-templating';
import {relativeToFile} from 'aurelia-path';

export class Config {
    constructor() {
        this.defaults = {
            location: '{{framework}}/{{view}}.html',
            framework: 'bootstrap',
            map: {}
        };
        this.namespaces = {};
        this.namespaces.defaults = this.defaults;
    }
    configureDefaults(configs) {
        extend(true, this.defaults, configs);
        return this;
    }
    configureNamespace(name, configs = { map: {} }) {
        let namespace = this.fetch(name);
        extend(true, namespace, configs);
        this.configure({ [name]: namespace });
        return this;
    }
    configure(config) {
        extend(true, this.namespaces, config);
        return this;
    }
    fetch(properties) {
        if (!this.namespaces[properties]) {
            return this.defaults;
        }
        let result = this.namespaces;
        let args = Array.from(arguments);
        for (let index in args) {
            let key = args[index];
            let value = result[key];
            if (!value) {
                return value;
            }
            result = result[key];
        }
        return result;
    }
}

export function configure(aurelia, configOrConfigure) {
    let config = aurelia.container.get(Config);
    if (typeof configOrConfigure === 'function') {
        return configOrConfigure(config);
    }
    config.configure(configOrConfigure);
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
export let ViewManager = class ViewManager {
    constructor(config) {
        this.config = config;
    }
    resolve(namespace, view) {
        if (!namespace || !view) {
            throw new Error(`Cannot resolve without namespace and view. Got namespace "${namespace}" and view "${view}" in stead`);
        }
        let namespaceOrDefault = Object.create(this.config.fetch(namespace));
        namespaceOrDefault.view = view;
        let location = (namespaceOrDefault.map || {})[view] || namespaceOrDefault.location;
        return render(location, namespaceOrDefault);
    }
};
ViewManager = __decorate([
    inject(Config)
], ViewManager);
function render(template, data) {
    let result = template;
    for (let key in data) {
        let regexString = ['{{', key, '}}'].join('');
        let regex = new RegExp(regexString, 'g');
        let value = data[key];
        result = result.replace(regex, value);
    }
    if (template !== result) {
        result = render(result, data);
    }
    return result;
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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

export function resolvedView(namespace, view) {
    return useViewStrategy(new ResolvedViewStrategy(namespace, view));
}
