/**
 * CookieCutter is a cookie consent script that provides an easy to use API for getting permission to use cookies.
 *
 * @export
 * @class CookieCutter
 */
import Cookies from 'js-cookie'
import { deepExtend, closest, getDomainWithoutSubdomain } from './helpers';
import { cookiesTemplate } from './template';

interface CookieCutterCookieObject {
    enable: () => void;
    disable: () => void;
}

interface CookieCutterOptions {
    text?: string;
    title?: string;
    rejectText?: string;
    acceptText?: string;
    policyURL?: string;
    policyText?: string;
}

export { CookieCutterCookieObject };


export class CookieCutter {


    /**
     * Provides a helper alias to the js-cookie library.
     *
     * @memberof CookieCutter
     */
    public static cookie = Cookies;


    /**
     * This is the name of the internal cookie used to record the the users cookie preference
     *
     * @private
     * @static
     * @memberof CookieCutter
     */
    private static cookieName = 'cookiecutter_status';


    /**
     * This stores the reference to the current requestBox
     *
     * @private
     * @membe`rof CookieCutter
     */
    private requestBox!: Element | null;


    /**
     * An array containing our cookie objects.
     *
     * @private
     * @memberof CookieCutter
     */
    private cookieObjects: CookieCutterCookieObject[] = [];


    /**
     * Sets our default options.
     *
     * @private
     * @type {CookieCutterOptions}
     * @memberof CookieCutter
     */
    private options: CookieCutterOptions = {
        title: 'Can we use cookies?',
        rejectText: 'Reject',
        acceptText: 'Accept',
        policyURL: '/cookie-policy/',
        policyText: 'View our Cookie Policy',
        text: 'We would like to use analytical cookies to give you the best experience on this website.',
    }



    /**
     * Creates an instance of CookieCutter and stores our option overrides.
     *
     * @param {CookieCutterOptions} options Our options overrides.
     * @memberof CookieCutter
     */
    constructor(options: CookieCutterOptions) {
        this.options = deepExtend(this.options, options);
        this.addEvents();
    }


    /**
     * Add's a cookie object to our cookieObjects array.
     *
     * @param {CookieCutterCookieObject} cookie The cookie object to add to our list.
     * @memberof CookieCutter
     */
    public add(cookie: CookieCutterCookieObject) {
        this.cookieObjects.push(cookie);
    }




    /**
     * If the user has already made a choice, then it triggers the approprite method for each cookie. If they haven't
     * then it displays the cookie reject banner.
     *
     * @param {boolean} [force=false] If true, then bypasses the users cookie preference and displays the request box
     * @memberof CookieCutter
     */
    public request(force = false) {
        const cookiePreference = CookieCutter.cookie.get(CookieCutter.cookieName);
        if(cookiePreference && !force) {
            cookiePreference === 'accept' ? this.accept() : this.reject();
        } else {
            if(this.requestBox) return;

            /**
             * If we're not forcing the box, then delete all existing cookies. The ensures that any cookies set before
             * this script was added will be deleted unless they accept, but not deleted if they've already accepted
             * and just opened the consent box again.
             */
            if(!force) this.reject();

            const container           = document.createElement('div');
                  container.innerHTML = cookiesTemplate(this.options);
            this.requestBox          = container.firstElementChild as Element;
            document.body.appendChild(this.requestBox);
        }
    }


    
    /**
     * Adds our event listeners for the request box.
     *
     * @private
     * @memberof CookieCutter
     */
    private addEvents() {
        document.addEventListener('click', (event) => {
            const target = event.target as Element;
            const domain = getDomainWithoutSubdomain() === 'localhost' ? getDomainWithoutSubdomain() : `.${getDomainWithoutSubdomain()}`;
            

            // Reject buttons 
            if(closest(target, '.js-cookiecutter__reject')) {
                CookieCutter.cookie.set(CookieCutter.cookieName, 'reject', { expires: 365, domain });
                this.reject();
            }

            // Accept buttons
            if(closest(target, '.js-cookiecutter__accept')) {
                CookieCutter.cookie.set(CookieCutter.cookieName, 'accept', { expires: 365, domain });
                this.accept();
            }

            // Manage buttons
            if(closest(target, '.js-cookiecutter__manage')) {
                this.request(true);
            }
        });
    }


    /**
     * Sets a cookie to store the users cookie preference, and loops through our cookie objects and triggers the disable
     * method for each of them.
     *
     * @private
     * @memberof CookieCutter
     */
    private reject() {
        this.cookieObjects.forEach(cookie => cookie.disable());
        this.close();
    }



    /**
     * Sets a cookie to store the users cookie preference, and loops through our cookie objects and triggers the enable
     * method for each of them.
     *
     * @private
     * @memberof CookieCutter
     */
    private accept() {
        this.cookieObjects.forEach(cookie => cookie.enable());
        this.close();
    }


    /**
     * Removes the request box
     *
     * @memberof CookieCutter
     */
    public close() {
        if(!this.requestBox) return
        const parent = this.requestBox.parentNode;
        if(parent) {
            parent.removeChild(this.requestBox);
            this.requestBox = null;
        }
    }
}
