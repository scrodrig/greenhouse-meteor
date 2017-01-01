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