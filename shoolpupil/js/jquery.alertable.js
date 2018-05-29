//
// jquery.alertable.js - Minimal alert, confirmation, and prompt alternatives.
//
// Developed by Cory LaViska for A Beautiful Site, LLC
//
// Licensed under the MIT license: http://opensource.org/licenses/MIT
//
if(jQuery) (function($) {
    'use strict';

    var modal,
        overlay,
        okButton,
        activeElement;

    function show(message, options) {
        var defer = $.Deferred();

        // Remove focus from the background
        activeElement = document.activeElement;
        activeElement.blur();

        // Remove other instances
        $(modal).add(overlay).remove();

        // Merge options
        options = $.extend({}, $.alertable.defaults, options);

        modal = $(options.modal).hide();
        overlay = $(options.overlay).hide();
        okButton = $(options.okButton);

        // Add message
        if( options.html ) {
            modal.find('.alertable-message').html(message);
        } else {
            modal.find('.alertable-message').text(message);
        }

        // Add buttons
        $(modal).find('.alertable-buttons')
        .append(okButton);

        // Add to container
        $(options.container).append(overlay).append(modal);

        // Show it
        options.show.call({
            modal: modal,
            overlay: overlay
        });

        // Watch for submit
        $(modal).on('click.alertable', function(event) {
            event.preventDefault();
            hide(options);
        });

        return defer.promise();
    }

    function hide(options) {
        // Hide it
        options.hide.call({
            modal: modal,
            overlay: overlay
        });

        // Remove bindings
        $(document).off('.alertable');
        modal.off('.alertable');

        // Restore focus
        activeElement.focus();
    }

    // Defaults
    $.alertable = {
        // Show an alert
        alert: function(message, options) {
            return show(message, options);
        },
        defaults: {
            // Preferences
            container: 'body',
            html: false,

            // Templates
            okButton: '<div class="col-md-offset-3 col-lg-offset-3 col-lg-6 col-md-6">'+'<button class="btn btn-primary btn-block" type="button">确定</button>'+'</div>',
            overlay: '<div class="alertable-overlay"></div>',
            modal:
                '<form class="alertable">' +
                '<div class="alertable-message"></div>' +
                '<div class="alertable-buttons"></div>' +
                '</form>',

            // Hooks
            hide: function() {
                $(this.modal).add(this.overlay).fadeOut(100);
            },
            show: function() {
                $(this.modal).add(this.overlay).fadeIn(100);
            }
        }
    };
})(jQuery);