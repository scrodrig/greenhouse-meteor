/**
 * Created by SchubertDavidRodriguez on 11/22/16.
 */

Template.NewNode.onCreated(function () {
    this.autorun(() => {
        this.subscribe('farmers');
    });
});

Template.NewNode.events({
    'click .fa-close': function () {
        Session.set('newNode', false);
    },
});


Template.NewNode.helpers({
    farmers: () => {
        farmers = [];
        Meteor.users.find({'profile.profession': 'farmer'}).forEach(function (user) {
            farmers.push({label: user.profile.firstName, value: user._id});
        });
        return farmers;
    }
});

