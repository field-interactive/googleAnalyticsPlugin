/**
 * Google Analytics Plugin for jQuery
 * @param {{optOutClass: string, elements: Array, trackingCode: string, optOutCallback: Function}} Options to define your analytics id and Elements to track
 */
(function (global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return factory($, global, global.document);
        });
    } else if (typeof exports === 'object' && exports) {
        module.exports = factory(require('jquery'), global, global.document);
    } else {
        factory(jQuery, global, global.document);
    }
})(typeof window !== 'undefined' ? window : this, function ($, window, document, undefined) {
    'use strict';

    /**
     * Name is used to keep jQuery plugin template portable
     * @type {string}
     */
    const pluginName = 'googleAnalytics';

    /**
     * Globals (shared across all plugin instances)
     * @type {{optOutClass: string, elements: Array, trackingCode: string, optOutCallback: Function}}
     */
    const defaultOptions = {
        trackingCode: '',
        elements: [],
        optOutClass: '.disableAnalytics',
        optOutCallback: null
    };

    /**
     *  Plugin constructor
     *  Using p object as placeholder, together with pluginName to make jQuery plugin template portable
     * @type {{}}
     */
    const p = {};
    p[pluginName] = class {
        constructor (el, opts) {
            this.el = el;
            this.opts = $.extend({}, defaultOptions, opts);

            this._defaultOptions = defaultOptions;

            this.init();
        }

        /**
         * Init Plugin
         */
        init () {
            // Check if a tracking Code exists
            if (this.opts.trackingCode.length === 0) {
                console.warn('You need to insert a Google Analytics Tracking Code');
                return;
            }

            // Check if Google Analytics is disabled
            if (this.getCookie('disableAnalytics')) return;

            this.disableGoogleAnalytics();
            this.addGoogleAnalytics();

            if (!this.opts.elements) return;
            this.opts.elements.forEach(opt => {
                jQuery(opt.selector).on(opt.event, e => {
                    this.assembleTrackingCode(e, opt);
                });
            });
        }

        /*+
         * Add Google Analytics Code to Project and init analytics
         */
        addGoogleAnalytics () {
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments);
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
            ga('create', `${this.opts.trackingCode}`, 'auto');
        }

        /**
         * Assemble Tracking Code
         * @param {Event} e
         * @param {Object} opt
         * @return {*}
         */
        assembleTrackingCode (e, opt) {
            const label = jQuery(e.target).attr(opt.attrLabel) ? jQuery(e.target).attr(opt.attrLabel) : opt.attrLabel;
            return ga('send', 'event', `${opt.category}`, `${opt.event}`, label);
        }

        /**
         * Disable Google Analytics
         */
        disableGoogleAnalytics () {
            if (jQuery(this.opts.optOutClass).length > 0) {
                jQuery(this.opts.optOutClass).on('click', _ => {
                    this.setCookie('disableAnalytics', true, 365);
                    if (this.opts.optOutCallback) {
                        this.opts.optOutCallback();
                    }
                });
            }
        }

        /**
         * Set Cookie
         * @param {String} name
         * @param {String | Boolean} value
         * @param {Number} days
         */
        setCookie (name, value, days) {
            const d = new Date;
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
            document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
        }

        /**
         * Get Cookie
         * @param {String} name
         * @return {any}
         */
        getCookie (name) {
            const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        }
    };

    // -- Prevent multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new p[pluginName](this, options));
            }
        });
    };
});
