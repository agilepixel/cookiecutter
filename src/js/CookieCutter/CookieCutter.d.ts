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
