/**
 * Created by SchubertDavidRodriguez on 3/5/17.
 */
Template.CheckGraphs.onCreated(function () {
    var self = this;
    self.editMode = new ReactiveVar(false);
    self.isTemperature = new ReactiveVar(true);
    self.isGroundHumidity = new ReactiveVar(false);
    self.isEnvironmentHumidity = new ReactiveVar(false);
    self.isLuminosity = new ReactiveVar(false);
    self.autorun(function () {
        Meteor.subscribe('parameter');
        Meteor.extendedFunctions.parameter = Parameter.findOne({});
    });


    sAlert.config({
        position: 'top-right',
    });

});

Template.CheckGraphs.onRendered(function () {
    $('.input-group.date').datepicker()
        .on('changeDate', function(e) {
            Meteor.extendedFunctions.date = moment(e.date).unix();
        });
    drawChartTemp();
});

Template.CheckGraphs.helpers({
    initialDate: function () {
        return Meteor.extendedFunctions.date != null;
    },

    Parameter: function(){
        Meteor.extendedFunctions.parameter = Parameter.findOne({});
        return Parameter.findOne({});
    },

    editMode: function () {
        return Template.instance().editMode.get();
    },

    isTemperature: function () {
        return Template.instance().isTemperature.get();
    },

    isGroundHumidity: function () {
        return Template.instance().isGroundHumidity.get();
    },

    isEnvironmentHumidity: function () {
        return Template.instance().isEnvironmentHumidity.get();
    },

    isLuminosity: function () {
        return Template.instance().isLuminosity.get();
    },

});

Template.CheckGraphs.events({

    'click .btn-test':function () {
        if(Meteor.extendedFunctions.date != null && Meteor.extendedFunctions.date ){
            getNodes();
            if(!Template.instance().editMode.get()){
                Template.instance().editMode.set(!Template.instance().editMode.get())
            }

        }else {
            sAlert.error(T9n.get('GraphNode.Alerts'), {});
        }
    },

    'click .btn-temp':function () {
        Template.instance().isTemperature.set(true)
        Template.instance().isGroundHumidity.set(false)
        Template.instance().isEnvironmentHumidity.set(false)
        Template.instance().isLuminosity.set(false)
        drawChartTemp(Meteor.graphFunctions.data);
    },

    'click .btn-gh':function () {
        Template.instance().isTemperature.set(false)
        Template.instance().isGroundHumidity.set(true)
        Template.instance().isEnvironmentHumidity.set(false)
        Template.instance().isLuminosity.set(false)
        drawChartGH(Meteor.graphFunctions.data);
    },

    'click .btn-eh':function () {
        Template.instance().isTemperature.set(false)
        Template.instance().isGroundHumidity.set(false)
        Template.instance().isEnvironmentHumidity.set(true)
        Template.instance().isLuminosity.set(false)
        drawChartEH(Meteor.graphFunctions.data);
    },

    'click .btn-lum':function () {
        Template.instance().isTemperature.set(false)
        Template.instance().isGroundHumidity.set(false)
        Template.instance().isEnvironmentHumidity.set(false)
        Template.instance().isLuminosity.set(true)
        drawChartLum(Meteor.graphFunctions.data);
    },




});

var myLineChart;

function getNodes() {
    console.log(Meteor.extendedFunctions.date)
    HTTP.call("GET", "http://localhost:3000/users/1478840400",//1478840400
        function (error, result) {
            if(error){
                sAlert.error(T9n.get('GraphNode.ErrorData'), {});
            }else {
                Meteor.graphFunctions.data  = Meteor.graphFunctions.prepareDataHumanReadable(result.data);
                drawChartTemp(Meteor.graphFunctions.data);
            }
        });
}


function drawChartGH(lectures) {
    if(myLineChart) {
        myLineChart.destroy();
    }
    // Get the context of the canvas element we want to select
    var ctx  = document.getElementById("myChart").getContext("2d");
    // Set the options
    var options = Meteor.graphFunctions.options(20,5);

    // Set the data
    var data = {
        labels: Meteor.graphFunctions.labels(lectures),
        datasets: [
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.GroundHumidity.lowerBoundary), 255,99,71),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.GroundHumidity.upperBoundary), 255,99,71),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.GroundHumidity.lowerIdeal), 204,204,0),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.GroundHumidity.upperIdeal), 204,204,0),

            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgGroundHumidity1'),0,128,0),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgGroundHumidity2'),0,128,128),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgGroundHumidity3'),0,0,25)
        ]
    };
    myLineChart = new Chart(ctx).Line(data, options);
};

function drawChartTemp(lectures) {
    if(myLineChart) {
        myLineChart.destroy();
    }    // Get the context of the canvas element we want to select
    var ctx  = document.getElementById("myChart").getContext("2d");
    // Set the options
    var options = Meteor.graphFunctions.options(20,2);

    // Set the data
    var data = {
        labels: Meteor.graphFunctions.labels(lectures),
        datasets: [
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Temperature.lowerBoundary), 255,99,71),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Temperature.upperBoundary), 255,99,71),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Temperature.lowerIdeal), 204,204,0),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Temperature.upperIdeal), 204,204,0),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgTemperature1'),0,128,0),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgTemperature2'),0,0,255)
        ]
    };
    myLineChart = new Chart(ctx).Line(data, options);
};

function drawChartEH(lectures) {
    if(myLineChart) {
        myLineChart.destroy();
    }    // Get the context of the canvas element we want to select
    var ctx  = document.getElementById("myChart").getContext("2d");
    // Set the options
    var options = Meteor.graphFunctions.options(20,5);

    // Set the data
    var data = {
        labels: Meteor.graphFunctions.labels(lectures),
        datasets: [

            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.EnvironmentHumidity.lowerBoundary), 255,99,71),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.EnvironmentHumidity.upperBoundary), 255,99,71),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.EnvironmentHumidity.lowerIdeal), 204,204,0),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.EnvironmentHumidity.upperIdeal), 204,204,0),

            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgEnvironmentHumidity1'),0,128,0),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgEnvironmentHumidity2'),0,0,255)
        ]
    };
    myLineChart = new Chart(ctx).Line(data, options);
};

function drawChartLum(lectures) {
    if(myLineChart) {
        myLineChart.destroy();
    }    // Get the context of the canvas element we want to select
    var ctx  = document.getElementById("myChart").getContext("2d");
    // Set the options
    var options = Meteor.graphFunctions.options(20,100);

    // Set the data
    var data = {
        labels: Meteor.graphFunctions.labels(lectures),
        datasets: [

            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Luminosity.lowerBoundary), 255,99,71),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Luminosity.upperBoundary), 255,99,71),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Luminosity.lowerIdeal), 204,204,0),
            Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Luminosity.upperIdeal), 204,204,0),

            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgLuminosity'),0,0,255)
        ]
    };
    myLineChart = new Chart(ctx).Line(data, options);
};


