/**
 * Created by SchubertDavidRodriguez on 1/5/17.
 */
Parameter = new Meteor.Collection('Parameter');

Parameter.allow({
    insert : function (userId, doc) {
        return !!userId;
    },

    update: function (userId, doc) {
        return !!userId;
    }
});



Temperature = new SimpleSchema({
    upperIdeal: {
        type: Number,
        label: 'Upper ideal'
    },

    lowerIdeal: {
        type: Number,
        label: 'Lower ideal',
        min: -273
    },

    upperBoundary: {
        type: Number,
        label: 'Upper boundary'
    },

    lowerBoundary: {
        type: Number,
        label: 'Lower boundary',
        min: -273
    },
});

GroundHumidity = new SimpleSchema({
    upperIdeal: {
        type: Number,
        label: 'Upper ideal',
        min: 0,
        max: 100
    },

    lowerIdeal: {
        type: Number,
        label: 'Lower ideal',
        min: 0,
        max: 100
    },

    upperBoundary: {
        type: Number,
        label: 'Upper boundary',
        min: 0,
        max: 100
    },

    lowerBoundary: {
        type: Number,
        label: 'Lower boundary',
        min: 0,
        max: 100
    },

});

EnvironmentHumidity = new SimpleSchema({
    upperIdeal: {
        type: Number,
        label: 'Upper ideal',
        min: 0,
        max: 100
    },

    lowerIdeal: {
        type: Number,
        label: 'Lower ideal',
        min: 0,
        max: 100
    },

    upperBoundary: {
        type: Number,
        label: 'Upper boundary',
        min: 0,
        max: 100
    },

    lowerBoundary: {
        type: Number,
        label: 'Lower boundary',
        min: 0,
        max: 100
    },
});

Luminosity = new SimpleSchema({
    upperIdeal: {
        type: Number,
        label: 'Upper ideal'
    },

    lowerIdeal: {
        type: Number,
        label: 'Lower ideal'
    },

    upperBoundary: {
        type: Number,
        label: 'Upper boundary'
    },

    lowerBoundary: {
        type: Number,
        label: 'Lower boundary'
    },
});


ParameterSchema = new SimpleSchema({
    Temperature: {
        type: Temperature,
        label: 'Temperature'
    },

    GroundHumidity: {
        type: GroundHumidity,
        label: 'GroundHumidity'
    },

    EnvironmentHumidity: {
        type: EnvironmentHumidity,
        label: 'EnvironmentHumidity'
    },

    Luminosity: {
        type: Luminosity,
        label: 'Luminosity'
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

Parameter.attachSchema(ParameterSchema);