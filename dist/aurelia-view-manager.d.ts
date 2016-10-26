import * as extend from 'extend';
import {inject} from 'aurelia-dependency-injection';
import {viewStrategy,useViewStrategy} from 'aurelia-templating';
import {relativeToFile} from 'aurelia-path';

export declare class Config {
  constructor();
  configureDefaults(configs?: any): any;
  configureNamespace(name?: any, configs?: any): any;
  configure(config?: any): any;
  fetch(properties?: any): any;
}
export declare function configure(aurelia?: any, configOrConfigure?: any): any;
export declare let ViewManager: any;
export declare let ResolvedViewStrategy: any;
export declare function resolvedView(namespace?: any, view?: any): any;