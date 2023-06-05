"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a string representation of the cookie request banner.
 *
 * @export
 * @param {CookieCutterOptions} options Our CookieCutter instance options.
 * @returns {string}
 */
function cookiesTemplate(options) {
    return "\n        <div class=\"c-cookiecutter\">\n            " + (options.title ? "<h2 class=\"c-cookiecutter__title\">" + options.title + "</h2>" : "") + "\n            " + (options.text || options.policyURL ? "<p class=\"c-cookiecutter__copy\">" + options.text + " <a href=\"" + options.policyURL + "\">" + options.policyText + "</a></p>" : "") + "\n            <ul class=\"c-cookiecutter__options\">\n                <li class=\"c-cookiecutter__option\"><button class=\"c-cookiecutter__reject js-cookiecutter__reject\">" + options.rejectText + "</button></li>\n                <li class=\"c-cookiecutter__option\"><button class=\"c-cookiecutter__accept js-cookiecutter__accept\">" + options.acceptText + "</button></li>\n            </ul>\n        </div>\n    ";
}
exports.cookiesTemplate = cookiesTemplate;
//# sourceMappingURL=template.js.map