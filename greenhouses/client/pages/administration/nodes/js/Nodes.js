/**
 * Created by SchubertDavidRodriguez on 11/22/16.
 */
Template.Nodes.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('nodes');
    });
});

Template.Nodes.helpers({
    nodes: () => {
        return Nodes.find({});
    }
});

Template.Nodes.events({
    'click .new-node': () => {
        Session.set('newNode', true);
    }
});