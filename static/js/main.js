'use strict';

(function() {
    
    /* Main functions */
    var APP = {
        
        template: $(document.body).data('template'),
        
        /* calls automagically the template init function */
        onReady: function() {
            
            if(this.template) {
            
                var init_function = 'init' + this.template[0].toUpperCase() + this.template.substring(1);
                
                if(this[init_function]) {
                    this[init_function]();
                }
            }
        },
    
        onLoad: function() {
            
        },
        
        
        /* Template specific load functions */
        initHomepage: function() {
            console.log('homepage goodies');
        },
    
        initNews: function() {
            console.log('news goodies');
        }
        
    };
    
    
    /* Utilities and goodies */
    var Utils = {

        scrollCenterElement: function(elem) {
            var top = elem.offset()['top'];
            $(window).scrollTop(top - Math.ceil($(window).height() / 2) + Math.ceil(elem.height() / 2));
        },
        
        pushState: function(title, href) {
            
            document.title = title;
            
            if(!!history.pushState) {
                history.pushState('', title, href);
            } else {
                window.location.hash = '!'+href;
            }
        },
        
        setLoading: function() {
            $('html').addClass('loading');
        },
        
        removeLoading: function() {
            $('html').removeClass('loading');
        },
        
        openPopup: function(url, title, w, h) {
            
            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        
            width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        
            var left       = ((width / 2) - (w / 2)) + dualScreenLeft,
                top        = ((height / 2) - (h / 2)) + dualScreenTop,
                new_window = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        
            if(window.focus) {
                new_window.focus();
            }
        }
    };
    
    
    /* Init awesome stuff */
    $(function() { APP.onReady(); });
    $(window).load(function() { APP.onLoad(); });
    
})();