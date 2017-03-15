/**
 * Created by SchubertDavidRodriguez on 3/8/17.
 */
Meteor.queryVariables = {

    emptyDateObject : function (id) {
        return [{_id : id,
            avgTemperature1: 0,
            avgTemperature2: 0,
            avgGroundHumidity1: 0,
            avgGroundHumidity2: 0,
            avgGroundHumidity3: 0,
            avgEnvironmentHumidity1: 0,
            avgEnvironmentHumidity2: 0,
            avgLuminosity : 0
        }];
    }


};