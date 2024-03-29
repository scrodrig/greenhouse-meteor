/**
 * Created by SchubertDavidRodriguez on 2/21/17.
 */
Meteor.startup(function () {

    sAlert.config({
        effect: 'genie',
        position: 'top',
        timeout: 4000,
        html: true,
        onRouteClose: true,
        stack: false,
        // or you can pass an object:
        // stack: {
        //     spacing: 10, // in px
        //     limit: 5 // when fourth alert appears all previous ones are cleared
        // },
        offset: 70, // in px - will be added to first alert (bottom or top - depends of the position in config)
        //beep: false,
        // examples:
        beep: '/beep.mp3',  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });



});