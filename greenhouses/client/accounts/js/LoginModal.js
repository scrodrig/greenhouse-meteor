/**
 * Created by SchubertDavidRodriguez on 10/30/16.
 */
Template.LoginModal.events({
    'click .close-login': () => {
        Session.set('nav-toggle', '');
    }
});