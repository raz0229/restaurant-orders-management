"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceStateWithQuery = void 0;
var replaceStateWithQuery = function (values) {
    var url = new URL(window.location.toString());
    for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
        var _b = _a[_i], k = _b[0], v = _b[1];
        if (!!v) {
            url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v));
        }
        else {
            url.searchParams.delete(k);
        }
    }
    history.replaceState({}, '', url);
};
exports.replaceStateWithQuery = replaceStateWithQuery;
