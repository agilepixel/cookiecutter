/**
 * CookieCutter is a cookie consent script that provides an easy to use API for getting permission to use cookies.
 *
 * @export
 * @class CookieCutter
 */
import Cookies from 'js-cookie';
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
export declare class CookieCutter {
    /**
     * Provides a helper alias to the js-cookie library.
     *
     * @memberof CookieCutter
     */
    static cookie: Cookies.CookiesStatic<object>;
    /**
     * This is the name of the internal cookie used to record the the users cookie preference
     *
     * @private
     * @static
     * @memberof CookieCutter
     */
    private static cookieName;
    /**
     * This stores the reference to the current requestBox
     *
     * @private
     * @membe`rof CookieCutter
     */
    private requestBox;
    /**
     * An array containing our cookie objects.
     *
     * @private
     * @memberof CookieCutter
     */
    private cookieObjects;
    /**
     * Sets our default options.
     *
     * @private
     * @type {CookieCutterOptions}
     * @memberof CookieCutter
     */
    private options;
    /**
     * Creates an instance of CookieCutter and stores our option overrides.
     *
     * @param {CookieCutterOptions} options Our options overrides.
     * @memberof CookieCutter
     */
    constructor(options: CookieCutterOptions);
    /**
     * Add's a cookie object to our cookieObjects array.
     *
     * @param {CookieCutterCookieObject} cookie The cookie object to add to our list.
     * @memberof CookieCutter
     */
    add(cookie: CookieCutterCookieObject): void;
    /**
     * If the user has already made a choice, then it triggers the approprite method for each cookie. If they haven't
     * then it displays the cookie reject banner.
     *
     * @param {boolean} [force=false] If true, then bypasses the users cookie preference and displays the request box
     * @memberof CookieCutter
     */
    request(force?: boolean): void;
    /**
     * Adds our event listeners for the request box.
     *
     * @private
     * @memberof CookieCutter
     */
    private addEvents;
    /**
     * Sets a cookie to store the users cookie preference, and loops through our cookie objects and triggers the disable
     * method for each of them.
     *
     * @private
     * @memberof CookieCutter
     */
    private reject;
    /**
     * Sets a cookie to store the users cookie preference, and loops through our cookie objects and triggers the enable
     * method for each of them.
     *
     * @private
     * @memberof CookieCutter
     */
    private accept;
    /**
     * Removes the request box
     *
     * @memberof CookieCutter
     */
    close(): void;
}
