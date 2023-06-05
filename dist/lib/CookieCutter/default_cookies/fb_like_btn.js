"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
/**
 * This method returns an CookieCutterCookieObject object for the Facebook Like Button
 *
 * @param id The ID for GatorLeads
 */
var __1 = require("..");
function FacebookLikeButton(id) {
    return {
        enable: function () {
            // Include the script
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id))
                    return;
                js = d.createElement(s);
                js.id = id;
                // @ts-ignore
                js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=" + id;
                // @ts-ignore
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        },
        disable: function () {
            __1.CookieCutter.cookie.remove('', { domain: 'www.facebook.com' });
            __1.CookieCutter.cookie.remove('c_user', { domain: '.facebook.com' });
            __1.CookieCutter.cookie.remove('datr', { domain: '.facebook.com' });
            __1.CookieCutter.cookie.remove('dpr', { domain: '.facebook.com' });
            __1.CookieCutter.cookie.remove('fr', { domain: '.facebook.com' });
            __1.CookieCutter.cookie.remove('locale', { domain: '.facebook.com' });
            __1.CookieCutter.cookie.remove('sb', { domain: '.facebook.com' });
            __1.CookieCutter.cookie.remove('spin', { domain: '.facebook.com' });
            __1.CookieCutter.cookie.remove('wd', { domain: '.facebook.com' });
            __1.CookieCutter.cookie.remove('xs', { domain: '.facebook.com' });
        }
    };
}
exports.FacebookLikeButton = FacebookLikeButton;
;
//# sourceMappingURL=fb_like_btn.js.map