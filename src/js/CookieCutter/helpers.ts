/**
 * Performs a deep merge of any objects passed.
 * 
 * @param args The objects to merge.
 */
export function deepExtend(...args: any[]) {

    // Variables
    let i = 0;
    const extended: any = {};
    const length = args.length;

    // Check if a deep merge
    if ( Object.prototype.toString.call( args[0] ) === '[object Boolean]' ) {
        i++;
    }

    // Merge the object into the extended object
    const merge = function (obj: any) {
        for ( let prop in obj ) {
            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {

                // If deep merge and property is an object, merge properties
                if ( Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                    extended[prop] = deepExtend( extended[prop], obj[prop] );
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
        const obj = args[i];
        merge(obj);
    }

    return extended;
}



/**
 * Traverses up the tree including the provided elem and returns the closest element that matches.
 *
 * @export
 * @param {Element} elem The element to start from.
 * @param {string} selector The selector to match.
 * @returns Element | null
 */
export function closest(elem: Element, selector: string): Element | null {
    let el = elem;

    do {
        // @ts-ignore
        if(el.matches ? el.matches(selector) : el.msMatchesSelector(selector)) return el;
        el = el.parentNode as Element;
    } while( el && el.nodeType === 1 );

    return null;
}


/**
 * Returns the current domain without the subdomain
 *
 * @export
 * @returns {string}
 */
export function getDomainWithoutSubdomain(): string {
    let i = 0;
    let domain = document.domain;
    const p = domain.split('.');
    const s = '_gd'+(new Date()).getTime();
    while(i<(p.length-1) && document.cookie.indexOf(s+'='+s)===-1){
       domain = p.slice(-1-(++i)).join('.');
       document.cookie = s+"="+s+";domain="+domain+";";
    }
    document.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+domain+";";
    return domain;
}
