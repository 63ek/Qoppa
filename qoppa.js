/*!
* Qoppa v1.1.0
*
* Author Maxim Khrichtchatyi (http://63ek.com)
*
* Released under the GNU General Public License v2
* http://www.gnu.org/licenses/gpl-2.0.txt
*
* Date: Thu Jan 19 2009 10:17:29 GMT-0400 (Eastern Daylight Time)
*/

(function (jQuery) {

    this.version = '1.0.1';
    this.all = {};

    this.add = function (combi, options, callback) {

        if (jQuery.isFunction(options)) {
            callback = options;
            options = {};
        }
        
        var opt = {}, defaults = {
            type: 'keydown',
            propagate: false,
            disableInInput: false,
            target: jQuery('html')[0],
            checkParent: true
        }, that = this;
        
        opt = jQuery.extend(opt, defaults, options || {});
        combi = combi.toLowerCase();
        
        var inspector = function (event) {
            
            event = jQuery.event.fix(event);
            var element = event.target;
            
            element = (element.nodeType == 3) ? element.parentNode : element;
            
            if (opt['disableInInput']) {
                
                var target = jQuery(element);
                
                if (target.is("input") || target.is("textarea")) {
                    return;
                }
            }

            var code = event.which,
                type = event.type,
                character = String.fromCharCode(code).toLowerCase(),
                shift = event.shiftKey,
                mapPoint = null;
            
            if (jQuery.browser.opera || jQuery.browser.safari || opt.checkParent) {
                while (!that.all[element] && element.parentNode) {
                    element = element.parentNode;
                }
            }
            
            var cbMap = that.all[element].events[type].callbackMap;
            
            if (shift) {
                
                var modif = '';
                
                if (shift) modif += 'shift+';
                mapPoint = cbMap[modif + character]
            }

            if (mapPoint) {
                
                mapPoint.cb(event);
                
                if (!mapPoint.propagate) {
                    event.stopPropagation();
                    event.preventDefault();
                    
                    return false;
                }
            }
        };

        if (!this.all[opt.target]) {
            this.all[opt.target] = {
                events: {}
            };
        }
        if (!this.all[opt.target].events[opt.type]) {
            this.all[opt.target].events[opt.type] = {
                callbackMap: {}
            }

            jQuery.event.add(opt.target, opt.type, inspector);
        }

        this.all[opt.target].events[opt.type].callbackMap[combi] = {
            cb: callback,
            propagate: opt.propagate
        };
        
        return jQuery;
    };

    this.remove = function (exp, opt) {
        opt = opt || {};
        target = opt.target || jQuery('html')[0];
        type = opt.type || 'keydown';
        exp = exp.toLowerCase();
        delete this.all[target].events[type].callbackMap[exp]
        return jQuery;
    };

    jQuery.tratata = this;
    
    return jQuery;

})(jQuery);

function qoppa() {
    
    $.tratata.add('Shift+Q', function () {
        
        var selectedText = null;
        
        if (document.getSelection) {
            selectedText = document.getSelection();
        }
        else if (window.getSelection) {
            selectedText = window.getSelection();
        }
        else if (document.selection) {
            selectedText = document.selection.createRange().text
        }
        
        if (selectedText != null && selectedText != '') {
            function onAjaxSuccess(data) {
                alert(data);
            }

            $.get('qoppa.php', {
                text: 'On web-page <a href="' + window.location.href + '" target="_blank">' + window.location.href + '</a> spelling error!<br><br>' + selectedText
            }, onAjaxSuccess);
        }
    });
}

$(document).ready(qoppa);