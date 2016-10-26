export declare class Config {
    defaults: {
        location: string;
        framework: string;
        map: {};
    };
    namespaces: any;
    constructor();
    configureDefaults(configs: any): this;
    configureNamespace(name: any, configs?: {
        map: {};
    }): this;
    configure(config: any): this;
    fetch(properties: any): any;
}
