'use strict';

var NavigationService = function () {
    this.sidebarSearch = {
        isVisible: true,
        model: '',
        click: function () {}
    };
    this.navbarBrand = {};
    this._navbarMenuItems = {};
    this._sidebarMenuItems = {};
    this._toArray = function (items) {
        var arr = [];
        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                arr.push(items[key]);
            }
        }
        return arr;
    };
};

/**
 * Recursively map a flat array of menu items to a nested object suitable to generate HTML lists from.
 */
NavigationService.prototype.buildAncestorChain = function (name, items, config) {
    var keys = name.split('.');
    if (name.length === 0 || keys.length === 0) {
        return;
    }
    var key = keys.shift();
    if (angular.isUndefined(items[key])) {
        items[key] = keys.length === 0 ? config : {};
        if (keys.length === 0) {
            items[key] = config;
        }
    }
    this.buildAncestorChain(keys.join('.'), items[key], config);
};

NavigationService.prototype.sidebarMenuItem = function (name, config) {
    this._sidebarMenuItems[name] = new MenuItem(config);
    return this;
};

NavigationService.prototype.sidebarMenuItems = function () {
    var items = {};
    var self = this;
    angular.forEach(this._sidebarMenuItems, function (config, name) {
        self.buildAncestorChain(name, items, config);
    });
    return this._toArray(items);
};

NavigationService.prototype.navbarMenuItem = function (name, config) {
    this._navbarMenuItems[name] = new MenuItem(config);
    return this;
};

NavigationService.prototype.navbarMenuItems = function () {
    var items = {};
    var self = this;
    angular.forEach(this._navbarMenuItems, function (config, name) {
        self.buildAncestorChain(name, items, config);
    });
    return this._toArray(items);
};

NavigationService.prototype.$get = function () {
    return this;
};

angular.module('eehNavigation').provider('eehNavigation', NavigationService);