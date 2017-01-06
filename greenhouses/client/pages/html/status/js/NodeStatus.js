/**
 * Created by SchubertDavidRodriguez on 1/2/17.
 */
Template.NodeStatus.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('data',0,50);
        //self.subscribe('someData');
        self.subscribe('dataCount');
    });
});

Template.NodeStatus.helpers({
    dataNode:  function() {
        return NodeData.find({});
    },

    totalCount: function () {
         return Counts.get('dataCount');
    },

    fields:  () => {
        return [
            // {key :'node', label: 'Node'},


            {key :'start_time',label: 'Time',headerClass: 'vertical-title', fn: function (value){
                return moment.unix(value).format("dddd, MMMM D, YYYY h:mm:ss A");
            }},

            {key : 'ground_humidity1', label: 'Grd Humidity 1', headerClass: 'vertical-title'},
            {key : 'ground_humidity2', label: 'Grd Humidity 2', headerClass: 'vertical-title'},
            {key : 'ground_humidity3', label: 'Grd Humidity 3', headerClass: 'vertical-title'},

            {key : 'temperature1', label: 'Temp 1', headerClass: 'vertical-title'},
            {key : 'temperature2', label: 'Temp 2', headerClass: 'vertical-title'},

            {key : 'environment_humidity1', label: 'Env Humidity 1', headerClass: 'vertical-title'},
            {key : 'environment_humidity2', label: 'Env Humidity 2', headerClass: 'vertical-title'},

            // {key: 'temperatures', label: 'Temperatures',tmpl: Template.Temperatures},
            // {key: 'grounds', label: 'Ground Humidities',tmpl: Template.GroundHumidities}, //display: inline-block;vertical-align: middle;float: none;}
            // {key: 'environments', label: 'Environment Humidities',tmpl: Template.EnvironmentHumidities},

            {key: 'luminosity', label: 'Luminosity', headerClass: 'vertical-title'},
        ];
    },

    settings: function () {
        return {
            id: 'node-data-table',
            rowsPerPage: 10,
            showFilter: true,
            showNavigation: 'auto',
            showNavigationRowsPerPage : false,
            useFontAwesome : true,
            noDataTmpl: Template.Empty,
            multiColumnSort: true
        };
    }
});