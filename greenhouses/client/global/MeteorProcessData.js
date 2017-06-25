/**
 * Created by SchubertDavidRodriguez on 6/13/17.
 */
Meteor.processData = {
    prepareData: function(data){
        var lectures = [];
        _.each(data, function (lecture) {
            var object = {};
            object.avgTemperature = (lecture.avgTemperature1 + lecture.avgTemperature2)/2;
            object.avgGroundHumidity =(lecture.avgGroundHumidity1 + lecture.avgGroundHumidity2 + lecture.avgGroundHumidity3)/3;
            object.avgEnvironmentHumidity = (lecture.avgEnvironmentHumidity1 + lecture.avgEnvironmentHumidity2)/2;
            object.avgLuminosity = lecture.avgLuminosity;
            lectures.push(object)
        });
        return lectures;
    },


    prepareDataHumanReadable: function(data){
        var lectures = [];
        _.each(data, function (lecture) {
            var object = {};
            object.avgTemperature = Meteor.extendedFunctions.transformParameter((lecture.avgTemperature1 + lecture.avgTemperature2)/2, Meteor.Enumerations.types.TEMPERATURE);
            object.avgGroundHumidity =Meteor.extendedFunctions.transformParameter((lecture.avgGroundHumidity1 + lecture.avgGroundHumidity2 + lecture.avgGroundHumidity3)/3, Meteor.Enumerations.types.GROUND_HUMIDITY);
            object.avgEnvironmentHumidity = Meteor.extendedFunctions.transformParameter((lecture.avgEnvironmentHumidity1 + lecture.avgEnvironmentHumidity2)/2, Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY);
            object.avgLuminosity = Meteor.extendedFunctions.transformParameter(lecture.avgLuminosity, Meteor.Enumerations.types.LUMINOSITY);
            lectures.push(object)
        });
        return lectures;
    },

    getDataToPredict: function (data) {
        lecture.avgTemperature1 = +Meteor.extendedFunctions.transformParameter(lecture.avgTemperature1,Meteor.Enumerations.types.TEMPERATURE);

    }

};