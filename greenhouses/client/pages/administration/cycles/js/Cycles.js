/**
 * Created by SchubertDavidRodriguez on 11/14/16.
 */
Template.Cycles.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('cycles');
    });
});

Template.Cycles.helpers({
    cycles: () => {
        return Cycles.find({});
    }
});

Template.Cycles.events({
    'click .new-cycle': () => {
        Session.set('newCycle', true);
    }
});