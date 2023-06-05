/**
 * This method returns an CookieCutterCookieObject object for GatorLeads
 * 
 * @param id The ID for GatorLeads
 */
import { CookieCutter } from '..';

export function GatorLeads(id: string): import('../index').CookieCutterCookieObject {
    return {
        enable: () => {

            // Include the script
            const body = document.querySelector('body') as Element;
            const script = document.createElement('script');
            script.src = 'https://t.gatorleads.co.uk/Scripts/ssl/' + id + '.js';
            script.setAttribute('async', 'true');
            script.setAttribute('defer', 'true');
            script.setAttribute('cfasync', 'false');
            body.appendChild(script);
        },
        disable: () => {
            CookieCutter.cookie.remove('wow.anonymousId');
            CookieCutter.cookie.remove('wow.schedule');
            CookieCutter.cookie.remove('wow.session');
            CookieCutter.cookie.remove('wow.utmvalues');
        }
    }
};

