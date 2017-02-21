/**
 * Created by SchubertDavidRodriguez on 10/30/16.
 */
Meteor.publish('cycles',function () {
    return Cycles.find({});
    //return Cycles.find({author: this.userId});
});

Meteor.publish('nodes',function () {
    return Nodes.find({});
});

Meteor.publish('farmers', function () {
     if(Roles.userIsInRole(this.userId,'developer') || Roles.userIsInRole(this.userId,'admin')){
        return Meteor.users.find({'profile.profession': 'farmer'});
     }
});

Meteor.publish('data', function (skip,limit) {
   return  NodeData.find({},{skip: skip, limit: limit});
});

Meteor.publish('data-hours', function (skip,limit) {
    return  NodeData.find({},{skip: 1600, limit: limit});
});

Meteor.publish('dataCount', function() {
    Counts.publish(this, 'dataCount', NodeData.find());
});


Meteor.publish('parameterCount', function() {
    Counts.publish(this, 'parameterCount', Parameter.find());
});


Meteor.publish('parameter',function () {
    return Parameter.find({});
});

//Meteor.publish('someData', function() {
//     ReactiveTable.publish("someData", NodeData, {});
//});

//Counts.publish(this, 'dataCount', Posts.find());