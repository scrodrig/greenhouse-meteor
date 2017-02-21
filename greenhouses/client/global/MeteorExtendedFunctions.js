/**
 * Created by SchubertDavidRodriguez on 1/23/17.
 */
Meteor.extendedFunctions = {

    alerts: function (value,parameter) {

         if(value === null){
             return;
         }

         if(value >= parameter.lowerIdeal && value <= parameter.upperIdeal){
             return 'success';
         }

        if((value >= parameter.lowerBoundary && value <= parameter.lowerIdeal) || (value >= parameter.upperIdeal && value <= parameter.upperBoundary)){
            return 'warning';
        }

        if(value >= parameter.upperBoundary || value <= parameter.lowerBoundary){
            return 'danger';
        }

        return 'info'
    },

    transformParameter: function (value, type) {
        switch(type) {
            case Meteor.Enumerations.types.GROUND_HUMIDITY:
                /*
                0 to 1023
                Min to Max (sensor)
                */
                return ((value*100)/1023).toFixed(2);
                break;
            case Meteor.Enumerations.types.TEMPERATURE:
                //Real value
                return value;
                break;
            case Meteor.Enumerations.types.ENVIRONMENT_HUMIDITY:
                //Real value
                return value.toFixed(2);
                break;
            case Meteor.Enumerations.types.LUMINOSITY:
                return value.toFixed(2);
                break;
            default:
                return value;
        }
    }

};

