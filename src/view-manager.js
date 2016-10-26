var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { Config } from './config';
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
