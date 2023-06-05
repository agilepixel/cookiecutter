/* tslint:disable */
/**
 * This method returns an CookieCutterCookieObject object for the Facebook Like Button
 * 
 * @param id The ID for GatorLeads
 */
import { CookieCutter } from '..';

export function FacebookLikeButton(id: string): import('../index').CookieCutterCookieObject {
    return {
        enable: () => {

            // Include the script
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                // @ts-ignore
                js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=" + id;
                // @ts-ignore
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
        },
        disable: () => {
            CookieCutter.cookie.remove('', { domain: 'www.facebook.com' });
            CookieCutter.cookie.remove('c_user', { domain: '.facebook.com' });
            CookieCutter.cookie.remove('datr', { domain: '.facebook.com' });
            CookieCutter.cookie.remove('dpr', { domain: '.facebook.com' });
            CookieCutter.cookie.remove('fr', { domain: '.facebook.com' });
            CookieCutter.cookie.remove('locale', { domain: '.facebook.com' });
            CookieCutter.cookie.remove('sb', { domain: '.facebook.com' });
            CookieCutter.cookie.remove('spin', { domain: '.facebook.com' });
            CookieCutter.cookie.remove('wd', { domain: '.facebook.com' });
            CookieCutter.cookie.remove('xs', { domain: '.facebook.com' });
        }
    }
};

