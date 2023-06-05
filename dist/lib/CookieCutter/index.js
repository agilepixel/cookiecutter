"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CookieCutter is a cookie consent script that provides an easy to use API for getting permission to use cookies.
 *
 * @export
 * @class CookieCutter
 */
var js_cookie_1 = require("js-cookie");
var helpers_1 = require("./helpers");
var template_1 = require("./template");
var CookieCutter = /** @class */ (function () {
    /**
     * Creates an instance of CookieCutter and stores our option overrides.
     *
     * @param {CookieCutterOptions} options Our options overrides.
     * @memberof CookieCutter
     */
    function CookieCutter(options) {
        /**
         * An array containing our cookie objects.
         *
         * @private
         * @memberof CookieCutter
         */
        this.cookieObjects = [];
        /**
         * Sets our default options.
         *
         * @private
         * @type {CookieCutterOptions}
         * @memberof CookieCutter
         */
        this.options = {
            title: 'Can we use cookies?',
            rejectText: 'Reject',
            acceptText: 'Accept',
            policyURL: '/cookie-policy/',
            policyText: 'View our Cookie Policy',
            text: 'We would like to use analytical cookies to give you the best experience on this website.',
        };
        this.options = helpers_1.deepExtend(this.options, options);
        this.addEvents();
    }
    /**
     * Add's a cookie object to our cookieObjects array.
     *
     * @param {CookieCutterCookieObject} cookie The cookie object to add to our list.
     * @memberof CookieCutter
     */
    CookieCutter.prototype.add = function (cookie) {
        this.cookieObjects.push(cookie);
    };
    /**
     * If the user has already made a choice, then it triggers the approprite method for each cookie. If they haven't
     * then it displays the cookie reject banner.
     *
     * @param {boolean} [force=false] If true, then bypasses the users cookie preference and displays the request box
     * @memberof CookieCutter
     */
    CookieCutter.prototype.request = function (force) {
        if (force === void 0) { force = false; }
        var cookiePreference = CookieCutter.cookie.get(CookieCutter.cookieName);
        if (cookiePreference && !force) {
            cookiePreference === 'accept' ? this.accept() : this.reject();
        }
        else {
            if (this.requestBox)
                return;
            /**
             * If we're not forcing the box, then delete all existing cookies. The ensures that any cookies set before
             * this script was added will be deleted unless they accept, but not deleted if they've already accepted
             * and just opened the consent box again.
             */
            if (!force)
                this.reject();
            var container = document.createElement('div');
            container.innerHTML = template_1.cookiesTemplate(this.options);
            this.requestBox = container.firstElementChild;
            document.body.appendChild(this.requestBox);
        }
    };
    /**
     * Adds our event listeners for the request box.
     *
     * @private
     * @memberof CookieCutter
     */
    CookieCutter.prototype.addEvents = function () {
        var _this = this;
        document.addEventListener('click', function (event) {
            var target = event.target;
            var domain = helpers_1.getDomainWithoutSubdomain() === 'localhost' ? helpers_1.getDomainWithoutSubdomain() : "." + helpers_1.getDomainWithoutSubdomain();
            // Reject buttons 
            if (helpers_1.closest(target, '.js-cookiecutter__reject')) {
                CookieCutter.cookie.set(CookieCutter.cookieName, 'reject', { expires: 365, domain: domain });
                _this.reject();
            }
            // Accept buttons
            if (helpers_1.closest(target, '.js-cookiecutter__accept')) {
                CookieCutter.cookie.set(CookieCutter.cookieName, 'accept', { expires: 365, domain: domain });
                _this.accept();
            }
            // Manage buttons
            if (helpers_1.closest(target, '.js-cookiecutter__manage')) {
                _this.request(true);
            }
        });
    };
    /**
     * Sets a cookie to store the users cookie preference, and loops through our cookie objects and triggers the disable
     * method for each of them.
     *
     * @private
     * @memberof CookieCutter
     */
    CookieCutter.prototype.reject = function () {
        this.cookieObjects.forEach(function (cookie) { return cookie.disable(); });
        this.close();
    };
    /**
     * Sets a cookie to store the users cookie preference, and loops through our cookie objects and triggers the enable
     * method for each of them.
     *
     * @private
     * @memberof CookieCutter
     */
    CookieCutter.prototype.accept = function () {
        this.cookieObjects.forEach(function (cookie) { return cookie.enable(); });
        this.close();
    };
    /**
     * Removes the request box
     *
     * @memberof CookieCutter
     */
    CookieCutter.prototype.close = function () {
        if (!this.requestBox)
            return;
        var parent = this.requestBox.parentNode;
        if (parent) {
            parent.removeChild(this.requestBox);
            this.requestBox = null;
        }
    };
    /**
     * Provides a helper alias to the js-cookie library.
     *
     * @memberof CookieCutter
     */
    CookieCutter.cookie = js_cookie_1.default;
    /**
     * This is the name of the internal cookie used to record the the users cookie preference
     *
     * @private
     * @static
     * @memberof CookieCutter
     */
    CookieCutter.cookieName = 'cookiecutter_status';
    return CookieCutter;
}());
exports.CookieCutter = CookieCutter;
//# sourceMappingURL=index.js.map