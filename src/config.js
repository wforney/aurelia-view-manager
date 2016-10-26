import * as extend from 'extend';
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
