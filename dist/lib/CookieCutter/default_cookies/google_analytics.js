"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This method returns an CookieCutterCookieObject object for Google Analytics
 *
 * @export
 * @param {string} analyticsID The Google Analytics ID
 * @returns
 */
var helpers_1 = require("../helpers");
var __1 = require("..");
function GoogleAnalyticsCookie(analyticsID) {
    return {
        enable: function () {
            // Include the script
            var body = document.querySelector('body');
            var script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsID;
            script.setAttribute('async', 'true');
            body.appendChild(script);
            // @ts-ignore
            window['ga-disable-' + analyticsID] = false;
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                window.dataLayer.push(arguments);
            }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', analyticsID, {
                'anonymize_ip': true
            });
        },
        disable: function () {
            var domain = helpers_1.getDomainWithoutSubdomain();
            domain = domain === 'localhost' ? domain : '.' + domain;
            __1.CookieCutter.cookie.remove('_ga', { domain: domain });
            __1.CookieCutter.cookie.remove('_gid', { domain: domain });
            __1.CookieCutter.cookie.remove('_gat', { domain: domain });
            __1.CookieCutter.cookie.remove('AMP_TOKEN', { domain: domain });
            // @ts-ignore
            window['ga-disable-' + analyticsID] = true;
            __1.CookieCutter.cookie.remove('_gac_' + analyticsID.replace(/\-/g, '_'), { domain: domain });
            __1.CookieCutter.cookie.remove('_gat_gtag_' + analyticsID.replace(/\-/g, '_'), { domain: domain });
        }
    };
}
exports.GoogleAnalyticsCookie = GoogleAnalyticsCookie;
;
//# sourceMappingURL=google_analytics.js.map