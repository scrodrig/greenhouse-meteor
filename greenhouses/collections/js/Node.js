/**
 * Created by SchubertDavidRodriguez on 11/22/16.
 */
Nodes = new Meteor.Collection('Node')

Nodes.allow({

    insert : function (userId, doc) {
        return !!userId;
    },

});



NodeSchema = new  SimpleSchema({

    name: {
        type: String,
        label: T9n.get('Collections.Nodes.Name')
    },

    number: {
        type: Number,
        label: T9n.get('Collections.Nodes.Number'),
        min: 1
    },

    numberSensors: {
        type: Number,
        label: T9n.get('Collections.Nodes.NumberSensors'),
        min: 1
    },

    belonging: {
        type: String,
        label: T9n.get('Collections.Nodes.Belonging'),
    },

    author:{
        type: String,
        label: T9n.get('Collections.Commons.Author'),
        autoValue: function () {
            return this.userId
        },
        autoform:{
            type: "hidden"
        }
    },

    createdAt: {
        type: Date,
        label: T9n.get('Collections.Commons.CreatedAt'),
        autoValue: function () {
            return new Date()
        },
        autoform:{
            type: "hidden"
        }
    }

});

Nodes.attachSchema(NodeSchema);