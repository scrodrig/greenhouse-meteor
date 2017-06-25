/**
 * Created by SchubertDavidRodriguez on 6/12/17.
 */
Template.Prediction.onCreated(function () {
    var self = this;
    self.editMode = new ReactiveVar(false);
    self.isTemperature = new ReactiveVar(true);
    self.isGroundHumidity = new ReactiveVar(false);
    self.isEnvironmentHumidity = new ReactiveVar(false);
    self.isLuminosity = new ReactiveVar(false);
    self.autorun(function () {
        Meteor.subscribe('parameter');
        Meteor.extendedFunctions.parameter = Parameter.findOne({});
        getNodes();
    });

});

Template.Prediction.helpers({
    Parameter: function(){
        //Meteor.extendedFunctions.parameter = Parameter.findOne({});
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


Template.Prediction.events({

    'click .btn-test':function () {
        console.log('it works');
    },

    'click .btn-temp':function () {
        Template.instance().isTemperature.set(true)
        Template.instance().isGroundHumidity.set(false)
        Template.instance().isEnvironmentHumidity.set(false)
        Template.instance().isLuminosity.set(false)
        predictTemperature(Meteor.processData.rawData);
    },

    'click .btn-gh':function () {
        Template.instance().isTemperature.set(false)
        Template.instance().isGroundHumidity.set(true)
        Template.instance().isEnvironmentHumidity.set(false)
        Template.instance().isLuminosity.set(false)
        predictSoilMoisture(Meteor.processData.rawData);
    },

    'click .btn-eh':function () {
        Template.instance().isTemperature.set(false)
        Template.instance().isGroundHumidity.set(false)
        Template.instance().isEnvironmentHumidity.set(true)
        Template.instance().isLuminosity.set(false)
        predictEnvironmentHumidity(Meteor.processData.rawData);
    },

    'click .btn-lum':function () {
        Template.instance().isTemperature.set(false)
        Template.instance().isGroundHumidity.set(false)
        Template.instance().isEnvironmentHumidity.set(false)
        Template.instance().isLuminosity.set(true)
        predictLuminosity(Meteor.processData.rawData);
    },




});

var myLineChart;

function getNodes() {
    var now = moment();
    HTTP.call("GET", "http://localhost:3000/nodes/" + (1478840400 + ((now.hour())*3600)),//1478840400
        function (error, result) {
            if(error){
                sAlert.error(T9n.get('GraphNode.ErrorData'), {});
            }else {
                Meteor.processData.rawData  = Meteor.processData.prepareData(result.data);
                Meteor.processData.data  = Meteor.processData.prepareDataHumanReadable(result.data);
                predictTemperature(Meteor.processData.rawData);
            }
        });
};


function predictTemperature(data) {
    var now = moment();
    var dataToPredict = Meteor.graphFunctions.prepareData(data, Meteor.Enumerations.avgType.TEMPERATURE);
    var hour = now.hour() + now.minutes()/60 + 0.5;
    dataToPredict.push(hour);
    HTTP.call("POST", "http://predctionapi.herokuapp.com/prediction/temperature", { "data": dataToPredict}, function (error, result) {
        if(error){
            sAlert.error(T9n.get('GraphNode.ErrorData'), {});
        }else{
            drawChartTemp(Meteor.processData.data, Meteor.extendedFunctions.transformParameter(result.data.value , Meteor.Enumerations.types.TEMPERATURE), Meteor.Enumerations.avgType.TEMPERATURE);
        }
    });
}


function predictEnvironmentHumidity(data) {
    var now = moment();
    var dataToPredict = Meteor.graphFunctions.prepareData(data, Meteor.Enumerations.avgType.ENVIRONMENT_HUMIDITY);
    var hour = now.hour() + now.minutes()/60 + 0.5;
    dataToPredict.push(hour);
    HTTP.call("POST", "http://predctionapi.herokuapp.com/prediction/eh", { "data": dataToPredict}, function (error, result) {
        if(error){
            sAlert.error(T9n.get('GraphNode.ErrorData'), {});
        }else{
            drawChartTemp(Meteor.processData.data, Meteor.extendedFunctions.transformParameter(result.data.value,Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY), Meteor.Enumerations.avgType.ENVIRONMENT_HUMIDITY);
        }
    });
}

function predictSoilMoisture(data) {
    var now = moment();
    var dataToPredict = Meteor.graphFunctions.prepareData(data, Meteor.Enumerations.avgType.GROUND_HUMIDITY);
    var hour = now.hour() + now.minutes()/60 + 0.5;
    dataToPredict.push(hour);
    HTTP.call("POST", "http://predctionapi.herokuapp.com/prediction/sm", { "data": dataToPredict}, function (error, result) {
        if(error){
            sAlert.error(T9n.get('GraphNode.ErrorData'), {});
        }else{
            drawChartTemp(Meteor.processData.data, Meteor.extendedFunctions.transformParameter(result.data.value,Meteor.Enumerations.types.GROUND_HUMIDITY), Meteor.Enumerations.avgType.GROUND_HUMIDITY);
        }
    });
}

function predictLuminosity(data) {
    var now = moment();
    var dataToPredict = Meteor.graphFunctions.prepareData(data, Meteor.Enumerations.avgType.LUMINOSITY);
    var hour = now.hour() + now.minutes()/60 + 0.5;
    dataToPredict.push(hour);
    HTTP.call("POST", "http://predctionapi.herokuapp.com/prediction/luminosity", { "data": dataToPredict}, function (error, result) {
        if(error){
            sAlert.error(T9n.get('GraphNode.ErrorData'), {});
        }else{
            drawChartTemp(Meteor.processData.data, Meteor.extendedFunctions.transformParameter(result.data.value,Meteor.Enumerations.types.LUMINOSITY), Meteor.Enumerations.avgType.LUMINOSITY);
        }
    });
}

function drawChartTemp(lectures, prediction, label) {
    var now = moment();
    if(myLineChart) {
        myLineChart.destroy();
    }    // Get the context of the canvas element we want to select
    var ctx  = document.getElementById("myChart").getContext("2d");
    var datasets= [];

    var dataToPredict = Meteor.graphFunctions.prepareData(lectures, label);
    dataToPredict.push(prediction);
    // Set the options
    switch (label){
        case Meteor.Enumerations.avgType.TEMPERATURE:
            var options = Meteor.graphFunctions.options(20,2);
            datasets = [
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Temperature.lowerBoundary), 255,99,71),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Temperature.upperBoundary), 255,99,71),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Temperature.lowerIdeal), 204,204,0),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Temperature.upperIdeal), 204,204,0)
            ];
            break;
        case Meteor.Enumerations.avgType.ENVIRONMENT_HUMIDITY:
            var options = Meteor.graphFunctions.options(20,5);
            datasets = [
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.EnvironmentHumidity.lowerBoundary), 255,99,71),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.EnvironmentHumidity.upperBoundary), 255,99,71),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.EnvironmentHumidity.lowerIdeal), 204,204,0),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.EnvironmentHumidity.upperIdeal), 204,204,0)
            ];
            break;
        case Meteor.Enumerations.avgType.GROUND_HUMIDITY:
            var options = Meteor.graphFunctions.options(20,5);
            datasets = [
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.GroundHumidity.lowerBoundary), 255,99,71),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.GroundHumidity.upperBoundary), 255,99,71),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.GroundHumidity.lowerIdeal), 204,204,0),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.GroundHumidity.upperIdeal), 204,204,0)
            ];
            break;
        case Meteor.Enumerations.avgType.LUMINOSITY:
            var options = Meteor.graphFunctions.options(20,200);
            datasets = [
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Luminosity.lowerBoundary), 255,99,71),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Luminosity.upperBoundary), 255,99,71),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Luminosity.lowerIdeal), 204,204,0),
                Meteor.graphFunctions.datasetParameter(Meteor.graphFunctions.prepareDateParameter(Meteor.extendedFunctions.parameter.Luminosity.upperIdeal), 204,204,0)
            ];
            break;
        default:
            sAlert.error(T9n.get('GraphNode.ErrorGraphing'), {});
    }
    datasets.push(Meteor.graphFunctions.datasetTemplateRGB(dataToPredict,0,128,0));
    // Set the data
    var data = {
        labels: Meteor.graphFunctions.predictionNoAlteredLabels(now.hour(), now.minutes()),
        datasets: datasets
    };
    myLineChart = new Chart(ctx).Line(data, options);
};
