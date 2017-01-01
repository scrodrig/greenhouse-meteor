/**
 * Created by SchubertDavidRodriguez on 11/14/16.
 */
Template.HomeLayout.helpers({
   allowedUser : function () {
       return Meteor.user() && Meteor.user().emails[0].verified;
   }
});