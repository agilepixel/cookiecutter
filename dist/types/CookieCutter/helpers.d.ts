/**
 * Performs a deep merge of any objects passed.
 *
 * @param args The objects to merge.
 */
export declare function deepExtend(...args: any[]): any;
/**
 * Traverses up the tree including the provided elem and returns the closest element that matches.
 *
 * @export
 * @param {Element} elem The element to start from.
 * @param {string} selector The selector to match.
 * @returns Element | null
 */
export declare function closest(elem: Element, selector: string): Element | null;
/**
 * Returns the current domain without the subdomain
 *
 * @export
 * @returns {string}
 */
export declare function getDomainWithoutSubdomain(): string;
