/**
 * This method returns an CookieCutterCookieObject object for Google Analytics
 *
 * @export
 * @param {string} analyticsID The Google Analytics ID
 * @returns
 */
import { getDomainWithoutSubdomain } from '../helpers';
import { CookieCutter } from '..';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: any;
    }
}

export function GoogleAnalyticsCookie(analyticsID: string): import('../index').CookieCutterCookieObject {
    return {
        enable: () => {

            // Include the script
            const body = document.querySelector('body') as Element;
            const script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsID;
            script.setAttribute('async', 'true');
            body.appendChild(script);
            
            // @ts-ignore
            window['ga-disable-' + analyticsID] = false;
            window.dataLayer = window.dataLayer || [];
            function gtag(...params: any[]){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', analyticsID, {
                'anonymize_ip': true
            });
        },
        disable: () => {
            let domain = getDomainWithoutSubdomain();
                  domain = domain === 'localhost' ? domain : '.' + domain;

            CookieCutter.cookie.remove('_ga', { domain });
            CookieCutter.cookie.remove('_gid', { domain });
            CookieCutter.cookie.remove('_gat', { domain });
            CookieCutter.cookie.remove('AMP_TOKEN', { domain });
            // @ts-ignore
            window['ga-disable-' + analyticsID] = true;
            CookieCutter.cookie.remove('_gac_' + analyticsID.replace(/\-/g, '_'), { domain });
            CookieCutter.cookie.remove('_gat_gtag_' + analyticsID.replace(/\-/g, '_'), { domain });
        }
    }
};

