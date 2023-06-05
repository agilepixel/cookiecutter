(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.CookieCutter = {})));
}(this, (function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var js_cookie = createCommonjsModule(function (module, exports) {
	(function (factory) {
		var registeredInModuleLoader;
		{
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function decode (s) {
			return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
		}

		function init (converter) {
			function api() {}

			function set (key, value, attributes) {
				if (typeof document === 'undefined') {
					return;
				}

				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					var result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				value = converter.write ?
					converter.write(value, key) :
					encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

				key = encodeURIComponent(String(key))
					.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
					.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';
				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}

					// Considers RFC 6265 section 5.2:
					// ...
					// 3.  If the remaining unparsed-attributes contains a %x3B (";")
					//     character:
					// Consume the characters of the unparsed-attributes up to,
					// not including, the first %x3B (";") character.
					// ...
					stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
				}

				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			function get (key, json) {
				if (typeof document === 'undefined') {
					return;
				}

				var jar = {};
				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all.
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (!json && cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = decode(parts[0]);
						cookie = (converter.read || converter)(cookie, name) ||
							decode(cookie);

						if (json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						jar[name] = cookie;

						if (key === name) {
							break;
						}
					} catch (e) {}
				}

				return key ? jar[key] : jar;
			}

			api.set = set;
			api.get = function (key) {
				return get(key, false /* read as raw */);
			};
			api.getJSON = function (key) {
				return get(key, true /* read as json */);
			};
			api.remove = function (key, attributes) {
				set(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.defaults = {};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));
	});

	/**
	 * Performs a deep merge of any objects passed.
	 *
	 * @param args The objects to merge.
	 */
	function deepExtend() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    // Variables
	    var i = 0;
	    var extended = {};
	    var length = args.length;
	    // Check if a deep merge
	    if (Object.prototype.toString.call(args[0]) === '[object Boolean]') {
	        i++;
	    }
	    // Merge the object into the extended object
	    var merge = function (obj) {
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                // If deep merge and property is an object, merge properties
	                if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
	                    extended[prop] = deepExtend(extended[prop], obj[prop]);
	                }
	                else {
	                    extended[prop] = obj[prop];
	                }
	            }
	        }
	    };
	    // Loop through each object and conduct a merge
	    for (; i < length; i++) {
	        var obj = args[i];
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
	function closest(elem, selector) {
	    var el = elem;
	    do {
	        // @ts-ignore
	        if (el.matches ? el.matches(selector) : el.msMatchesSelector(selector))
	            return el;
	        el = el.parentNode;
	    } while (el && el.nodeType === 1);
	    return null;
	}
	/**
	 * Returns the current domain without the subdomain
	 *
	 * @export
	 * @returns {string}
	 */
	function getDomainWithoutSubdomain() {
	    var i = 0;
	    var domain = document.domain;
	    var p = domain.split('.');
	    var s = '_gd' + (new Date()).getTime();
	    while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) === -1) {
	        domain = p.slice(-1 - (++i)).join('.');
	        document.cookie = s + "=" + s + ";domain=" + domain + ";";
	    }
	    document.cookie = s + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain + ";";
	    return domain;
	}

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

	/**
	 * CookieCutter is a cookie consent script that provides an easy to use API for getting permission to use cookies.
	 *
	 * @export
	 * @class CookieCutter
	 */
	var CookieCutter = /** @class */ (function () {
	    /**
	     * Creates an instance of CookieCutter and stores our option overrides.
	     *
	     * @param {CookieCutterOptions} options Our options overrides.
	     * @memberof CookieCutter
	     */
	    function CookieCutter(options) {
	        /**
	         * An array containing our cookie objects.
	         *
	         * @private
	         * @memberof CookieCutter
	         */
	        this.cookieObjects = [];
	        /**
	         * Sets our default options.
	         *
	         * @private
	         * @type {CookieCutterOptions}
	         * @memberof CookieCutter
	         */
	        this.options = {
	            title: 'Can we use cookies?',
	            rejectText: 'Reject',
	            acceptText: 'Accept',
	            policyURL: '/cookie-policy/',
	            policyText: 'View our Cookie Policy',
	            text: 'We would like to use analytical cookies to give you the best experience on this website.',
	        };
	        this.options = deepExtend(this.options, options);
	        this.addEvents();
	    }
	    /**
	     * Add's a cookie object to our cookieObjects array.
	     *
	     * @param {CookieCutterCookieObject} cookie The cookie object to add to our list.
	     * @memberof CookieCutter
	     */
	    CookieCutter.prototype.add = function (cookie) {
	        this.cookieObjects.push(cookie);
	    };
	    /**
	     * If the user has already made a choice, then it triggers the approprite method for each cookie. If they haven't
	     * then it displays the cookie reject banner.
	     *
	     * @param {boolean} [force=false] If true, then bypasses the users cookie preference and displays the request box
	     * @memberof CookieCutter
	     */
	    CookieCutter.prototype.request = function (force) {
	        if (force === void 0) { force = false; }
	        var cookiePreference = CookieCutter.cookie.get(CookieCutter.cookieName);
	        if (cookiePreference && !force) {
	            cookiePreference === 'accept' ? this.accept() : this.reject();
	        }
	        else {
	            if (this.requestBox)
	                return;
	            /**
	             * If we're not forcing the box, then delete all existing cookies. The ensures that any cookies set before
	             * this script was added will be deleted unless they accept, but not deleted if they've already accepted
	             * and just opened the consent box again.
	             */
	            if (!force)
	                this.reject();
	            var container = document.createElement('div');
	            container.innerHTML = cookiesTemplate(this.options);
	            this.requestBox = container.firstElementChild;
	            document.body.appendChild(this.requestBox);
	        }
	    };
	    /**
	     * Adds our event listeners for the request box.
	     *
	     * @private
	     * @memberof CookieCutter
	     */
	    CookieCutter.prototype.addEvents = function () {
	        var _this = this;
	        document.addEventListener('click', function (event) {
	            var target = event.target;
	            var domain = getDomainWithoutSubdomain() === 'localhost' ? getDomainWithoutSubdomain() : "." + getDomainWithoutSubdomain();
	            // Reject buttons 
	            if (closest(target, '.js-cookiecutter__reject')) {
	                CookieCutter.cookie.set(CookieCutter.cookieName, 'reject', { expires: 365, domain: domain });
	                _this.reject();
	            }
	            // Accept buttons
	            if (closest(target, '.js-cookiecutter__accept')) {
	                CookieCutter.cookie.set(CookieCutter.cookieName, 'accept', { expires: 365, domain: domain });
	                _this.accept();
	            }
	            // Manage buttons
	            if (closest(target, '.js-cookiecutter__manage')) {
	                _this.request(true);
	            }
	        });
	    };
	    /**
	     * Sets a cookie to store the users cookie preference, and loops through our cookie objects and triggers the disable
	     * method for each of them.
	     *
	     * @private
	     * @memberof CookieCutter
	     */
	    CookieCutter.prototype.reject = function () {
	        this.cookieObjects.forEach(function (cookie) { return cookie.disable(); });
	        this.close();
	    };
	    /**
	     * Sets a cookie to store the users cookie preference, and loops through our cookie objects and triggers the enable
	     * method for each of them.
	     *
	     * @private
	     * @memberof CookieCutter
	     */
	    CookieCutter.prototype.accept = function () {
	        this.cookieObjects.forEach(function (cookie) { return cookie.enable(); });
	        this.close();
	    };
	    /**
	     * Removes the request box
	     *
	     * @memberof CookieCutter
	     */
	    CookieCutter.prototype.close = function () {
	        if (!this.requestBox)
	            return;
	        var parent = this.requestBox.parentNode;
	        if (parent) {
	            parent.removeChild(this.requestBox);
	            this.requestBox = null;
	        }
	    };
	    /**
	     * Provides a helper alias to the js-cookie library.
	     *
	     * @memberof CookieCutter
	     */
	    CookieCutter.cookie = js_cookie;
	    /**
	     * This is the name of the internal cookie used to record the the users cookie preference
	     *
	     * @private
	     * @static
	     * @memberof CookieCutter
	     */
	    CookieCutter.cookieName = 'cookiecutter_status';
	    return CookieCutter;
	}());

	/**
	 * This method returns an CookieCutterCookieObject object for Google Analytics
	 *
	 * @export
	 * @param {string} analyticsID The Google Analytics ID
	 * @returns
	 */
	function GoogleAnalyticsCookie$$1(analyticsID) {
	    return {
	        enable: function () {
	            // Include the script
	            var body = document.querySelector('body');
	            var script = document.createElement('script');
	            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsID;
	            script.setAttribute('async', 'true');
	            body.appendChild(script);
	            // @ts-ignore
	            window['ga-disable-' + analyticsID] = false;
	            window.dataLayer = window.dataLayer || [];
	            function gtag() {
	                var params = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    params[_i] = arguments[_i];
	                }
	                window.dataLayer.push(arguments);
	            }
	            window.gtag = gtag;
	            gtag('js', new Date());
	            gtag('config', analyticsID, {
	                'anonymize_ip': true
	            });
	        },
	        disable: function () {
	            var domain = getDomainWithoutSubdomain();
	            domain = domain === 'localhost' ? domain : '.' + domain;
	            CookieCutter.cookie.remove('_ga', { domain: domain });
	            CookieCutter.cookie.remove('_gid', { domain: domain });
	            CookieCutter.cookie.remove('_gat', { domain: domain });
	            CookieCutter.cookie.remove('AMP_TOKEN', { domain: domain });
	            // @ts-ignore
	            window['ga-disable-' + analyticsID] = true;
	            CookieCutter.cookie.remove('_gac_' + analyticsID.replace(/\-/g, '_'), { domain: domain });
	            CookieCutter.cookie.remove('_gat_gtag_' + analyticsID.replace(/\-/g, '_'), { domain: domain });
	        }
	    };
	}

	/**
	 * This method returns an CookieCutterCookieObject object for Pardot Tracking Code
	 *
	 * @export
	 * @returns
	 */
	function PardotCookies$$1() {
	    return {
	        enable: function () {
	            window.piHostname = 'pi.pardot.com';
	            (function () {
	                function async_load() {
	                    var s = document.createElement('script');
	                    s.type = 'text/javascript';
	                    s.src = ('https:' === document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
	                    var c = document.getElementsByTagName('script')[0];
	                    if (c.parentNode)
	                        c.parentNode.insertBefore(s, c);
	                }
	                async_load();
	            })();
	        },
	        disable: function () {
	            // Loop through cookies and remove those that match
	            var allCookies = CookieCutter.cookie.get();
	            Object.keys(allCookies).forEach(function (key) {
	                // Remove ID cookie
	                if (key.substr(0, 10) === 'visitor_id') {
	                    CookieCutter.cookie.remove(key);
	                }
	            });
	        }
	    };
	}

	/**
	 * This method returns an CookieCutterCookieObject object for GatorLeads
	 *
	 * @param id The ID for GatorLeads
	 */
	function GatorLeads$$1(id) {
	    return {
	        enable: function () {
	            // Include the script
	            var body = document.querySelector('body');
	            var script = document.createElement('script');
	            script.src = 'https://t.gatorleads.co.uk/Scripts/ssl/' + id + '.js';
	            script.setAttribute('async', 'true');
	            script.setAttribute('defer', 'true');
	            script.setAttribute('cfasync', 'false');
	            body.appendChild(script);
	        },
	        disable: function () {
	            CookieCutter.cookie.remove('wow.anonymousId');
	            CookieCutter.cookie.remove('wow.schedule');
	            CookieCutter.cookie.remove('wow.session');
	            CookieCutter.cookie.remove('wow.utmvalues');
	        }
	    };
	}

	/* tslint:disable */
	function FacebookLikeButton$$1(id) {
	    return {
	        enable: function () {
	            // Include the script
	            (function (d, s, id) {
	                var js, fjs = d.getElementsByTagName(s)[0];
	                if (d.getElementById(id))
	                    return;
	                js = d.createElement(s);
	                js.id = id;
	                // @ts-ignore
	                js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=" + id;
	                // @ts-ignore
	                fjs.parentNode.insertBefore(js, fjs);
	            }(document, 'script', 'facebook-jssdk'));
	        },
	        disable: function () {
	            CookieCutter.cookie.remove('', { domain: 'www.facebook.com' });
	            CookieCutter.cookie.remove('c_user', { domain: '.facebook.com' });
	            CookieCutter.cookie.remove('datr', { domain: '.facebook.com' });
	            CookieCutter.cookie.remove('dpr', { domain: '.facebook.com' });
	            CookieCutter.cookie.remove('fr', { domain: '.facebook.com' });
	            CookieCutter.cookie.remove('locale', { domain: '.facebook.com' });
	            CookieCutter.cookie.remove('sb', { domain: '.facebook.com' });
	            CookieCutter.cookie.remove('spin', { domain: '.facebook.com' });
	            CookieCutter.cookie.remove('wd', { domain: '.facebook.com' });
	            CookieCutter.cookie.remove('xs', { domain: '.facebook.com' });
	        }
	    };
	}

	/* tslint:disable */
	function TweetButton$$1() {
	    return {
	        enable: function () {
	            // Include the script
	            // @ts-ignore
	            !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) {
	                js = d.createElement(s);
	                js.id = id;
	                js.src = "https://platform.twitter.com/widgets.js";
	                fjs.parentNode.insertBefore(js, fjs);
	            } }(document, "script", "twitter-wjs");
	        },
	        disable: function () {
	            CookieCutter.cookie.remove('_twitter_sess', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('_ga', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('_gat', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('_gid', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('_twitter_sess', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('_ads_prefs', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('auth_token', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('csrf_same_site', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('csrf_same_site_set', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('ct0', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('dnt', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('eu_cn', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('external_referer', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('guest_id', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('kdt', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('personalization_id', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('remember_checked_on', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('rweb_optin', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('tfw_exp', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('twid', { domain: '.twitter.com' });
	            CookieCutter.cookie.remove('lang', { domain: 'syndication.twitter.com' });
	        }
	    };
	}

	exports.CookieCutter = CookieCutter;
	exports.GoogleAnalyticsCookie = GoogleAnalyticsCookie$$1;
	exports.PardotCookies = PardotCookies$$1;
	exports.GatorLeads = GatorLeads$$1;
	exports.FacebookLikeButton = FacebookLikeButton$$1;
	exports.TweetButton = TweetButton$$1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cookiecutter.umd.js.map
