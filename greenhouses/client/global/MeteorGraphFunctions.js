/**
 * Created by SchubertDavidRodriguez on 3/14/17.
 */
Meteor.graphFunctions = {

    prepareDataHumanReadable: function(data){
       _.each(data, function (lecture) {
           lecture.avgTemperature1 = +Meteor.extendedFunctions.transformParameter(lecture.avgTemperature1,Meteor.Enumerations.types.TEMPERATURE);
           lecture.avgTemperature2 = +Meteor.extendedFunctions.transformParameter(lecture.avgTemperature2,Meteor.Enumerations.types.TEMPERATURE);
           lecture.avgGroundHumidity1 = +Meteor.extendedFunctions.transformParameter(lecture.avgGroundHumidity1,Meteor.Enumerations.types.GROUND_HUMIDITY);
           lecture.avgGroundHumidity2 = +Meteor.extendedFunctions.transformParameter(lecture.avgGroundHumidity2,Meteor.Enumerations.types.GROUND_HUMIDITY);
           lecture.avgGroundHumidity3 = +Meteor.extendedFunctions.transformParameter(lecture.avgGroundHumidity3,Meteor.Enumerations.types.GROUND_HUMIDITY);
           lecture.avgEnvironmentHumidity1 = +Meteor.extendedFunctions.transformParameter(lecture.avgEnvironmentHumidity1,Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY);
           lecture.avgEnvironmentHumidity2 = +Meteor.extendedFunctions.transformParameter(lecture.avgEnvironmentHumidity2,Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY);
           lecture.avgLuminosity = +Meteor.extendedFunctions.transformParameter(lecture.avgLuminosity,Meteor.Enumerations.types.LUMINOSITY);
       });
        return data;

    },

    prepareData: function(data, key){
       return _.map(data, function (lecture) {
            return lecture[key];
        });
    },

    options: function (scaleSteps,scaleStepWidth) {
        return {

            title: {
                display: true,
                text: 'Custom Chart Title'
            },

            responsive: true,

            scaleOverride:true,

            scaleSteps:scaleSteps,
            scaleStartValue:0,
            scaleStepWidth:scaleStepWidth,
            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(159,163,157,.5)",

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve: true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension: 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot: true,

            //Number - Radius of each point dot in pixels
            pointDotRadius: 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius: 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill: false,

            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },


            //String - A legend template
            // legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

        }
    },

    labels : function () {
        return ["01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"];
    },

    datasetTemplateRGB: function (data, red, green, blue) {
        return {
            label: "My First dataset",
            strokeColor: 'rgba('+red+','+green+','+blue+',0.7)',
            pointColor: 'rgba('+red+','+green+','+blue+',1)',
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: data
        }
    },

    datasetTemplateHEX: function (data, color) {
        return {
            label: "My First dataset",
            strokeColor: color,
            pointColor: color,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: data
        }
    }

};