/**
 * Created by SchubertDavidRodriguez on 1/2/17.
 */
Template.NodeStatus.onCreated(function () {
    var self = this;
    self.autorun(function () {
       self.subscribe('data',0,50);
       self.subscribe('dataCount');
    });
});

Template.NodeStatus.helpers({
    dataNode:  function() {
        return NodeData.find({});
    },

    totalCount: function () {
         return Counts.get('dataCount');
    }
});