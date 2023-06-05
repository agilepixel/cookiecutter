declare global {
    interface Window {
        dataLayer: any[];
        gtag: any;
    }
}
export declare function GoogleAnalyticsCookie(analyticsID: string): import('../index').CookieCutterCookieObject;
