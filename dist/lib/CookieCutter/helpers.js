"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Performs a deep merge of any objects passed.
 *
 * @param args The objects to merge.
 */
function deepExtend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // Variables
    var i = 0;
    var extended = {};
    var length = args.length;
    // Check if a deep merge
    if (Object.prototype.toString.call(args[0]) === '[object Boolean]') {
        i++;
    }
    // Merge the object into the extended object
    var merge = function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = deepExtend(extended[prop], obj[prop]);
                }
                else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };
    // Loop through each object and conduct a merge
    for (; i < length; i++) {
        var obj = args[i];
        merge(obj);
    }
    return extended;
}
exports.deepExtend = deepExtend;
/**
 * Traverses up the tree including the provided elem and returns the closest element that matches.
 *
 * @export
 * @param {Element} elem The element to start from.
 * @param {string} selector The selector to match.
 * @returns Element | null
 */
function closest(elem, selector) {
    var el = elem;
    do {
        // @ts-ignore
        if (el.matches ? el.matches(selector) : el.msMatchesSelector(selector))
            return el;
        el = el.parentNode;
    } while (el && el.nodeType === 1);
    return null;
}
exports.closest = closest;
/**
 * Returns the current domain without the subdomain
 *
 * @export
 * @returns {string}
 */
function getDomainWithoutSubdomain() {
    var i = 0;
    var domain = document.domain;
    var p = domain.split('.');
    var s = '_gd' + (new Date()).getTime();
    while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) === -1) {
        domain = p.slice(-1 - (++i)).join('.');
        document.cookie = s + "=" + s + ";domain=" + domain + ";";
    }
    document.cookie = s + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain + ";";
    return domain;
}
exports.getDomainWithoutSubdomain = getDomainWithoutSubdomain;
//# sourceMappingURL=helpers.js.map