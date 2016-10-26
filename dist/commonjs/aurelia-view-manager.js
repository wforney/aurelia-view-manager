'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResolvedViewStrategy = exports.ViewManager = exports.Config = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.configure = configure;
exports.resolvedView = resolvedView;

var _extend = require('extend');

var extend = _interopRequireWildcard(_extend);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaPath = require('aurelia-path');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



var Config = exports.Config = function () {
    function Config() {
        

        this.defaults = {
            location: '{{framework}}/{{view}}.html',
            framework: 'bootstrap',
            map: {}
        };
        this.namespaces = {};
        this.namespaces.defaults = this.defaults;
    }

    Config.prototype.configureDefaults = function configureDefaults(configs) {
        extend(true, this.defaults, configs);
        return this;
    };

    Config.prototype.configureNamespace = function configureNamespace(name) {
        var _configure;

        var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { map: {} };

        var namespace = this.fetch(name);
        extend(true, namespace, configs);
        this.configure((_configure = {}, _configure[name] = namespace, _configure));
        return this;
    };

    Config.prototype.configure = function configure(config) {
        extend(true, this.namespaces, config);
        return this;
    };

    Config.prototype.fetch = function fetch(properties) {
        if (!this.namespaces[properties]) {
            return this.defaults;
        }
        var result = this.namespaces;
        var args = Array.from(arguments);
        for (var index in args) {
            var key = args[index];
            var value = result[key];
            if (!value) {
                return value;
            }
            result = result[key];
        }
        return result;
    };

    return Config;
}();

function configure(aurelia, configOrConfigure) {
    var config = aurelia.container.get(Config);
    if (typeof configOrConfigure === 'function') {
        return configOrConfigure(config);
    }
    config.configure(configOrConfigure);
}

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === 'undefined' ? 'undefined' : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ViewManager = exports.ViewManager = function () {
    function ViewManager(config) {
        

        this.config = config;
    }

    ViewManager.prototype.resolve = function resolve(namespace, view) {
        if (!namespace || !view) {
            throw new Error('Cannot resolve without namespace and view. Got namespace "' + namespace + '" and view "' + view + '" in stead');
        }
        var namespaceOrDefault = Object.create(this.config.fetch(namespace));
        namespaceOrDefault.view = view;
        var location = (namespaceOrDefault.map || {})[view] || namespaceOrDefault.location;
        return render(location, namespaceOrDefault);
    };

    return ViewManager;
}();
exports.ViewManager = ViewManager = __decorate([(0, _aureliaDependencyInjection.inject)(Config)], ViewManager);
function render(template, data) {
    var result = template;
    for (var key in data) {
        var regexString = ['{{', key, '}}'].join('');
        var regex = new RegExp(regexString, 'g');
        var value = data[key];
        result = result.replace(regex, value);
    }
    if (template !== result) {
        result = render(result, data);
    }
    return result;
}

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === 'undefined' ? 'undefined' : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResolvedViewStrategy = exports.ResolvedViewStrategy = function () {
    function ResolvedViewStrategy(namespace, view) {
        

        this.namespace = namespace;
        this.view = view;
    }

    ResolvedViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
        var viewManager = viewEngine.container.get(ViewManager);
        var path = viewManager.resolve(this.namespace, this.view);
        compileInstruction.associatedModuleId = this.moduleId;
        return viewEngine.loadViewFactory(this.moduleId ? (0, _aureliaPath.relativeToFile)(path, this.moduleId) : path, compileInstruction, loadContext);
    };

    return ResolvedViewStrategy;
}();
exports.ResolvedViewStrategy = ResolvedViewStrategy = __decorate([(0, _aureliaTemplating.viewStrategy)()], ResolvedViewStrategy);

function resolvedView(namespace, view) {
    return (0, _aureliaTemplating.useViewStrategy)(new ResolvedViewStrategy(namespace, view));
}