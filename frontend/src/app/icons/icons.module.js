"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var angular_feather_1 = require('angular-feather');
var icons = [
    angular_feather_1.IconCamera,
    angular_feather_1.IconHeart,
    angular_feather_1.IconGithub
];
var IconsModule = (function () {
    function IconsModule() {
    }
    IconsModule = __decorate([
        core_1.NgModule({
            exports: icons
        })
    ], IconsModule);
    return IconsModule;
}());
exports.IconsModule = IconsModule;
