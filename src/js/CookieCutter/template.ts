/**
 * Returns a string representation of the cookie request banner.
 *
 * @export
 * @param {CookieCutterOptions} options Our CookieCutter instance options.
 * @returns {string}
 */
export function cookiesTemplate(options: CookieCutterOptions): string {
    return `
        <div class="c-cookiecutter">
            ${ options.title ? `<h2 class="c-cookiecutter__title">${ options.title}</h2>` : `` }
            ${ options.text || options.policyURL ? `<p class="c-cookiecutter__copy">${ options.text } <a href="${ options.policyURL }">${ options.policyText }</a></p>` : `` }
            <ul class="c-cookiecutter__options">
                <li class="c-cookiecutter__option"><button class="c-cookiecutter__reject js-cookiecutter__reject">${ options.rejectText }</button></li>
                <li class="c-cookiecutter__option"><button class="c-cookiecutter__accept js-cookiecutter__accept">${ options.acceptText }</button></li>
            </ul>
        </div>
    `;
}
