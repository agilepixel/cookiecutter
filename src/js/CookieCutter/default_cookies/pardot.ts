/**
 * This method returns an CookieCutterCookieObject object for Pardot Tracking Code
 *
 * @export
 * @returns
 */
import { CookieCutter } from '..';

declare global {
    interface Window {
        piAId: string;
        piCId: string;
        piHostname: string;
    }
}

export function PardotCookies(): import('../index').CookieCutterCookieObject {
    return {
        enable: () => {
            window.piHostname = 'pi.pardot.com';
            (function() {
                function async_load() {
                    const s = document.createElement('script'); s.type = 'text/javascript';
                    s.src = ('https:' === document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
                    const c = document.getElementsByTagName('script')[0];
                    if(c.parentNode) c.parentNode.insertBefore(s, c);
                }
                async_load();
            })();
        },
        disable: () => {
            
            // Loop through cookies and remove those that match
            const allCookies = CookieCutter.cookie.get();
            Object.keys(allCookies).forEach(key => {

                // Remove ID cookie
                if(key.substr(0, 10) === 'visitor_id') {
                    CookieCutter.cookie.remove(key);
                }
            });
        }
    }
};

