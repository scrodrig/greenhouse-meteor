/**
 * Created by SchubertDavidRodriguez on 3/5/17.
 */
Template.CheckGraphs.onCreated(function () {
    var self = this;
    //Meteor.subscribe('dataByDate',0,1)
    self.editMode = new ReactiveVar(false);
    self.isTemperature = new ReactiveVar(true);
    self.isGroundHumidity = new ReactiveVar(false);
    self.isEnvironmentHumidity = new ReactiveVar(false);
    self.isLuminosity = new ReactiveVar(false);
    self.autorun(function () {
        //Meteor.subscribe('dataByDate')
        // self.subscribe('dataByDate');
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
            getNodes()
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
    HTTP.call("GET", "http://localhost:3000/users/1478581200",
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
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgGroundHumidity1'),238,163,22),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgGroundHumidity2'),219,211,35),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgGroundHumidity3'),219,183,35)
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
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgTemperature1'),238,163,22),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgTemperature2'),219,183,35)
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
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgEnvironmentHumidity1'),238,163,22),
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgEnvironmentHumidity2'),219,183,35)
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
            Meteor.graphFunctions.datasetTemplateRGB(Meteor.graphFunctions.prepareData(lectures,'avgLuminosity'),219,183,35)
        ]
    };
    myLineChart = new Chart(ctx).Line(data, options);
};


