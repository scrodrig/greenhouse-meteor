/**
 * Created by SchubertDavidRodriguez on 1/2/17.
 */
Template.NodeStatus.onCreated(function () {
    var self = this;
    this.initial = ReactiveVar(0);
    this.skip = ReactiveVar(15);
    self.autorun(function () {
        self.subscribe('data',Template.instance().initial.get(),Template.instance().skip.get());
        self.subscribe('parameter');
        self.subscribe('dataCount');
        Meteor.extendedFunctions.parameter = Parameter.findOne({});
    });
});



Template.NodeStatus.helpers({


    dataNode:  function() {
        return NodeData.find({});
    },



    initial: function () {
        return Template.instance().initial.get() + Template.instance().skip.get();
    },

    totalCount: function () {
        return Counts.get('dataCount');
    },

    enableNext:  function() {
        return Template.instance().initial.get() < Counts.get('dataCount');
    },

    enablePrevious:  function() {
        return Template.instance().initial.get() + Template.instance().skip.get() > Template.instance().skip.get();
    },

    fields:  () => {
        return [
            {key :'start_time',label: 'Time',headerClass: 'vertical-title', cellClass: 'info', sortable: false, fn: function (value){
                return moment.unix(value).format("dddd, MMMM D, YYYY h:mm:ss A");
            }},

            {key : 'ground_humidity1', label: 'Grd Humidity 1', headerClass: 'vertical-title', sortable: false,
                fn: function (value) {
                    return Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.GROUND_HUMIDITY);
                },
                cellClass: function(value)
                {
                    return Meteor.extendedFunctions.alerts(
                        Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.GROUND_HUMIDITY),
                        Meteor.extendedFunctions.parameter.GroundHumidity);
                }
            },

            {key : 'ground_humidity2', label: 'Grd Humidity 2', headerClass: 'vertical-title', sortable: false,
                fn: function (value) {
                    return Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.GROUND_HUMIDITY);
                },
                cellClass: function(value){
                    return Meteor.extendedFunctions.alerts(
                        Meteor.extendedFunctions.transformParameter(value,Meteor.Enumerations.types.GROUND_HUMIDITY),
                        Meteor.extendedFunctions.parameter.GroundHumidity);
                }
            },

            {key : 'ground_humidity3', label: 'Grd Humidity 3', headerClass: 'vertical-title', sortable: false,
                fn: function (value) {
                    return Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.GROUND_HUMIDITY);
                },
                cellClass: function(value){
                    return Meteor.extendedFunctions.alerts(
                        Meteor.extendedFunctions.transformParameter(value,Meteor.Enumerations.types.GROUND_HUMIDITY),
                        Meteor.extendedFunctions.parameter.GroundHumidity);
                }
            },

            {key : 'temperature1', label: 'Temp 1', headerClass: 'vertical-title', sortable: false,
                fn: function (value) {
                    return Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.TEMPERATURE);
                },
                cellClass: function(value){
                    return Meteor.extendedFunctions.alerts(
                        Meteor.extendedFunctions.transformParameter(value,Meteor.Enumerations.types.TEMPERATURE),
                        Meteor.extendedFunctions.parameter.Temperature);
                }
            },
            {key : 'temperature2', label: 'Temp 2', headerClass: 'vertical-title', sortable: false,
                fn: function (value) {
                    return Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.TEMPERATURE);
                },
                cellClass: function(value){
                    return Meteor.extendedFunctions.alerts(
                        Meteor.extendedFunctions.transformParameter(value,Meteor.Enumerations.types.TEMPERATURE),
                        Meteor.extendedFunctions.parameter.Temperature);
                }
            },

            {key : 'environment_humidity1', label: 'Env Humidity 1', headerClass: 'vertical-title', sortable: false,
                fn: function (value) {
                    return Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY);
                },
                cellClass: function(value){
                    return Meteor.extendedFunctions.alerts(
                        Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY),
                        Meteor.extendedFunctions.parameter.EnvironmentHumidity);
                }
            },
            {key : 'environment_humidity2', label: 'Env Humidity 2', headerClass: 'vertical-title', sortable: false,
                fn: function (value) {
                    return Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY);
                },
                cellClass: function(value){
                    return Meteor.extendedFunctions.alerts(
                        Meteor.extendedFunctions.transformParameter(value,Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY),
                        Meteor.extendedFunctions.parameter.EnvironmentHumidity);
                }
            },

            {key: 'luminosity', label: 'Luminosity', headerClass: 'vertical-title', sortable: false,
                fn: function (value) {
                    return Meteor.extendedFunctions.transformParameter(value, Meteor.Enumerations.types.LUMINOSITY);
                },
                cellClass: function(value){return Meteor.extendedFunctions.alerts(Meteor.extendedFunctions.transformParameter(value,Meteor.Enumerations.types.LUMINOSITY), Meteor.extendedFunctions.parameter.Luminosity);}
            },

            // {key:'start_time', label: '', headerClass: 'vertical-title', sortable: false,
            //     fn: function (value) {
            //         return;
            //     },
            //     cellClass: function (value) {
            //         return "fa fa-arrow-right " + value;
            //     }
            // },
        ];
    },

    settings: function () {
        return {
            id: 'node-data-table',
            rowsPerPage: Template.instance().skip.get(),
            showFilter: false,
            showNavigation: 'never',
            showNavigationRowsPerPage : false,
            useFontAwesome : true,
            noDataTmpl: Template.Empty,
            multiColumnSort: true,
            showRowCount: true
        };
    }
});

Template.NodeStatus.events({
    'click .next-page.enabled':function () {
        Template.instance().initial.set(Template.instance().initial.get() + Template.instance().skip.get());
    },

    'click .previous-page.enabled':function () {
        Template.instance().initial.set(Template.instance().initial.get() - Template.instance().skip.get());
    },

});