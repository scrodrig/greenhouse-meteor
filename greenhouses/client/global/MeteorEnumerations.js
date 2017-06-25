/**
 * Created by SchubertDavidRodriguez on 1/24/17.
 */

Meteor.Enumerations = {
     types : {
         GROUND_HUMIDITY: 1,
         TEMPERATURE: 2,
         ENVIRONMENT_HUMIDITY: 3,
         LUMINOSITY: 4
     },

    avgType : {
        GROUND_HUMIDITY: 'avgGroundHumidity',
        TEMPERATURE: 'avgTemperature',
        ENVIRONMENT_HUMIDITY: 'avgEnvironmentHumidity',
        LUMINOSITY: 'avgLuminosity'
    }
};
