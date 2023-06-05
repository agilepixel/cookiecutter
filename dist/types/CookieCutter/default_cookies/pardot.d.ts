declare global {
    interface Window {
        piAId: string;
        piCId: string;
        piHostname: string;
    }
}
export declare function PardotCookies(): import('../index').CookieCutterCookieObject;
