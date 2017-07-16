/**
 * Created by may on 2014/10/8.
 */
(function($){
    $.fn.isOnScreen = function(settings){
        var win = $(window);
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        var threshold = 0;
        if(settings && settings.threshold){
            threshold = settings.threshold
        }

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom - threshold < bounds.top || viewport.top > bounds.bottom + threshold));
    };
})($);