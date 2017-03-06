/**
 * Created by SchubertDavidRodriguez on 3/5/17.
 */
Template.CheckGraphs.onCreated(function () {


});

Template.CheckGraphs.helpers({


});

function drawChart() {

    // Get the context of the canvas element we want to select
    var ctx  = document.getElementById("myChart").getContext("2d");

    // Set the options
    var options = {

        responsive: true,

        scaleOverride:true,

        scaleSteps:20,
        scaleStartValue:0,
        scaleStepWidth:1,
        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(87,166,57,.05)",

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
        datasetFill: true,

        //String - A legend template
        // legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };


    // Set the data
    var data = {
        labels: ["Noviembre","Diciembre","Enero","Febrero","Marzo"],
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(87,166,57,0.1)",
            strokeColor: "rgba(76,145,65,0.5)",
            pointColor: "rgba(88,114,70,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [12, 19, 3, 5, 2, 3]
        },
        {
            label: "My First dataset",
            fillColor: "rgba(87,166,57,0.1)",
            strokeColor: "rgba(76,145,65,0.5)",
            pointColor: "rgba(88,114,70,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [11, 14, 2, 0, 10, 1]
        },
        {
            label: "My First dataset",
            fillColor: "rgba(87,166,57,0.1)",
            strokeColor: "rgba(76,145,65,0.5)",
            pointColor: "rgba(88,114,70,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [10, 15, 1, 4, 0, 1]
        }]
    };
    var myLineChart = new Chart(ctx).Line(data, options);

};


Template.CheckGraphs.onRendered(function() {
    drawChart();
});