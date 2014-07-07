'use strict';


Ink.requireModules(['Ink.Dom.Event_1','Ink.Dom.Element_1', 'Ink.Dom.Css_1', 'Ink.Dom.Loaded_1'],
    function(InkEvent, InkElement, InkCSS, DomLoaded) {

    
    // main goodies
    var APP = {
    
        template: false,
        
        /* initialize before onReady */
        init: function() {
            
            this.setTemplate();
            
            DomLoaded.run(function() { APP.onReady(); });
            InkEvent.observe(window, 'load', function() { APP.onLoad(); });
        },
        
        setTemplate: function() {
            var d = InkElement.data(document.body);
            this.template = typeof(d.template) == 'undefined' ? false : d.template;
        },
        
        /* calls automagically the template init function */
        onReady: function() {
            
            this.initCommon();
            
            if(this.template) {
            
                var template_name = this.template.toLowerCase().replace(/\W/g, ' ').split(' '),
                    function_name = '';
                
                for(var i = 0; i < template_name.length; i++) {
                    function_name += template_name[i][0].toUpperCase() + template_name[i].substring(1);
                }
            
                function_name = 'init'+function_name;
            
                if(this[function_name]) {
                    this[function_name]();
                }
            }
        },
        
        /* window.onload */
        onLoad: function() {
            console.log('window loaded');
        },
        
        /* initializes shared components  */
        initCommon: function() {
            console.log('initCommon');
        },
        
        
        /* Template specific load functions */
        initHomepageInk: function() {
            console.log('homepage goodies');
        }
        
    };
    
    /* Misc utils */
    var Utils = {

        scrollCenterElement: function(elem) {
            var top_offset = Ink.Dom.Element.offsetTop(elem);
            window.scroll(0, top_offset - Math.ceil(Ink.Dom.Element.outerDimensions(elem)[1] / 2));
        },
        
        pushState: function(title, href) {
            
            document.title = title;
            
            if(!!history.pushState)
                history.pushState('', title, href);
            else
                window.location.hash = '!'+href;
        },
        
        setLoading: function() {
            InkCSS.addClassName(Ink.Dom.Selector.select('html')[0], 'loading');
        },
        
        removeLoading: function() {
            InkCSS.removeClassName(Ink.Dom.Selector.select('html')[0], 'loading');
        },
        
        getFileExtension: function(filename) {
            var parts     = filename.split('.'),
                extension = parts[parts.length-1];
            
            return extension.toLowerCase();
        }
    };
    
    
    /* Init awesome stuff */
    APP.init();
});