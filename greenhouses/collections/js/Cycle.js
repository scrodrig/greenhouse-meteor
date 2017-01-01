/**
 * Created by SchubertDavidRodriguez on 11/14/16.
 */
Cycles = new Meteor.Collection('Cycle');

Cycles.allow({
    insert : function (userId, doc) {
        return !!userId;
    },

    update: function (userId, doc) {
        return !!userId;
    }
});


CycleSchema = new SimpleSchema({
    name: {
        type: String,
        label: T9n.get('Collections.Cycles.Name')
    },

    start_value: {
        type: Date,
        label: T9n.get('Collections.Cycles.StartValue')
    },

    end_value: {
        type: Date,
        label: T9n.get('Collections.Cycles.EndValue')
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

Cycles.attachSchema(CycleSchema);