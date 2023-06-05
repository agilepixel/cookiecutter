"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This method returns an CookieCutterCookieObject object for GatorLeads
 *
 * @param id The ID for GatorLeads
 */
var __1 = require("..");
function GatorLeads(id) {
    return {
        enable: function () {
            // Include the script
            var body = document.querySelector('body');
            var script = document.createElement('script');
            script.src = 'https://t.gatorleads.co.uk/Scripts/ssl/' + id + '.js';
            script.setAttribute('async', 'true');
            script.setAttribute('defer', 'true');
            script.setAttribute('cfasync', 'false');
            body.appendChild(script);
        },
        disable: function () {
            __1.CookieCutter.cookie.remove('wow.anonymousId');
            __1.CookieCutter.cookie.remove('wow.schedule');
            __1.CookieCutter.cookie.remove('wow.session');
            __1.CookieCutter.cookie.remove('wow.utmvalues');
        }
    };
}
exports.GatorLeads = GatorLeads;
;
//# sourceMappingURL=gator_leads.js.map