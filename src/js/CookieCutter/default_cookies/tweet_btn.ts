/* tslint:disable */
/**
 * This method returns an CookieCutterCookieObject object for the Tweet Button
 */
import { CookieCutter } from '..';

export function TweetButton(): import('../index').CookieCutterCookieObject {
    return {
        enable: () => {

            // Include the script
            // @ts-ignore
            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
        },
        disable: () => {
            CookieCutter.cookie.remove('_twitter_sess', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('_ga', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('_gat', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('_gid', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('_twitter_sess', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('_ads_prefs', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('auth_token', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('csrf_same_site', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('csrf_same_site_set', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('ct0', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('dnt', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('eu_cn', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('external_referer', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('guest_id', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('kdt', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('personalization_id', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('remember_checked_on', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('rweb_optin', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('tfw_exp', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('twid', { domain: '.twitter.com' });
            CookieCutter.cookie.remove('lang', { domain: 'syndication.twitter.com' });
        }
    }
};

