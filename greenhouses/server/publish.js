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
    return  NodeData.find({},{skip: 3600, limit: limit});
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


Meteor.publish('dataLectureByRange', function (start, end) {
    var pipeline = [
        {
            $match: {
                'node': '01',
                //'className': 'com.espe.edu.invernaderos.invernaderosmongo.model.NodeData',
                'start_time': {
                    // $gte: start,//1478563200,
                    // $lt: end//1478736000
                    $gte: 1478563200,
                    $lt: 1478736000
                }
            }
        },
        {
            $group: {
                "_id": null,
                avgTemperature1: {
                    $avg: "$temperature1"
                },
                avgTemperature2: {
                    $avg: "$temperature2"
                },
            }
        }
    ];
    console.log(NodeData.aggregate(pipeline));
    return NodeData.aggregate(pipeline);
});


Meteor.publish("dataByDate", function () {

    var a =  function(key, reducedValue){
        return 1+1;
    };

    ReactiveAggregate(this, NodeData, [
        {
            $match: {
                'node': '01',
                //'className': 'com.espe.edu.invernaderos.invernaderosmongo.model.NodeData',
                'start_time': {
                    // $gte: start,//1478563200,
                    // $lt: end//1478736000
                    $gte: 1478563200,
                    $lt: 1478736000
                }
            }
        },
        {
            $group: {
                "_id": "$node",
                avgTemperature1: {
                    $avg: "$temperature1"
                },
                avgTemperature2: {
                    $avg: "$temperature2"
                },
            }
        }
    ]);
});
