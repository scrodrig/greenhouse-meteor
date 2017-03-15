/**
 * Created by SchubertDavidRodriguez on 3/14/17.
 */
if(Meteor.isServer) {
    Router.route('/users/:day',{where: 'server'})
        .get(function(){
            var day = +this.params.day;
            var start = day;
            var hour = 3600;
            var time = 24;
            var end = +day + hour*time;
            var result = [];
            do{

                var id = ((+start+hour)-day)/hour;

                var response = NodeData.aggregate({
                        $match: {
                            //'node': '01',
                            //'className': 'com.espe.edu.invernaderos.invernaderosmongo.model.NodeData',
                            'start_time': {
                                $gte: +start,
                                $lt: +start + 3600
                            }
                        }
                    },
                    {
                        $group: {
                            "_id": "$node",
                            avgTemperature1: {
                                $avg: "$temperature1"
                            },
                            avgTemperature2: {
                                $avg: "$temperature2"
                            },
                            avgGroundHumidity1: {$avg: "$ground_humidity1"},
                            avgGroundHumidity2: {$avg: "$ground_humidity2"},
                            avgGroundHumidity3: {$avg: "$ground_humidity3"},
                            avgEnvironmentHumidity1: {$avg: "$environment_humidity1"},
                            avgEnvironmentHumidity2: {$avg: "$environment_humidity2"},
                            avgLuminosity : {$avg: "$luminosity"}
                        }
                    });

                if(response.length === 0){
                    //console.log(Meteor.queryVariables.emptyDateObject(id));
                    result =  result.concat(Meteor.queryVariables.emptyDateObject(id));
                }else{
                    response[0]._id= id;
                    result = result.concat(response);
                }
                start = +start + 3600;
            }while(+start < +end);
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(result));
        });
}