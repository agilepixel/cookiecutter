"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This method returns an CookieCutterCookieObject object for Pardot Tracking Code
 *
 * @export
 * @returns
 */
var __1 = require("..");
function PardotCookies() {
    return {
        enable: function () {
            window.piHostname = 'pi.pardot.com';
            (function () {
                function async_load() {
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.src = ('https:' === document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
                    var c = document.getElementsByTagName('script')[0];
                    if (c.parentNode)
                        c.parentNode.insertBefore(s, c);
                }
                async_load();
            })();
        },
        disable: function () {
            // Loop through cookies and remove those that match
            var allCookies = __1.CookieCutter.cookie.get();
            Object.keys(allCookies).forEach(function (key) {
                // Remove ID cookie
                if (key.substr(0, 10) === 'visitor_id') {
                    __1.CookieCutter.cookie.remove(key);
                }
            });
        }
    };
}
exports.PardotCookies = PardotCookies;
;
//# sourceMappingURL=pardot.js.map