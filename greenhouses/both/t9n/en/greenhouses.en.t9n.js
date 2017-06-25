/**
 * Created by SchubertDavidRodriguez on 11/9/16.
 */

T9n.map('en',{
    Project:{
        Name: 'Greenhouses project'
    },

    Accounts: {
        hello: 'world',
        FirstName: 'First Name',
        Profession: 'Profession',
        Gender: 'Gender',
        Professions: {
            Developer: 'Developer',
            Designer: 'Designer',
            Farmer: 'Farmer',
            Other: 'Other'
        },
        Genders: {
            Male: 'Male',
            Female: 'Female'
        },
        Email:{
            Verify:{
                subject: '[GPI] Please, Verify Your Email Address',
                siteName: '[GPI] Greenhouse Prediction IPL',
                mailSubject: 'Email Address Verification',
                introductionText: 'To verify your email address, please click the confirmation button',
                buttonTitle: 'Confirm',
                confirmationTitleData: 'You\'ve successfully registered with this information',
                footer:'If you did not request this verification, please ignore this email or If you did not provide this information in order to confirm your email address, please contact the administrator. If you feel something is wrong, please contact our support team.',
                copyrightUser:'Schubert D. Rodriguez (IPL)',
                copyrightUrl: 'https://www.facebook.com/schubert.d.rodriguez'
            },
            Password:{
                subject: '[GPI] Change your password',
                siteName: '[GPI] Greenhouse Prediction IPL',
                mailSubject: 'Change password',
                introductionText: 'To change your password, please click the confirmation button',
                buttonTitle: 'Confirm',
                confirmationTitleData: 'You\'re changing password related to this information',
                footer:'If you did not request this password changing, please ignore this email or If you did not provide this information in order to confirm your email address, please contact the administrator. If you feel something is wrong, please contact our support team.',
                copyrightUser:'Schubert D. Rodriguez (IPL)',
                copyrightUrl: 'https://www.facebook.com/schubert.d.rodriguez'
            }
        }
    },

    Start:{
        Logout: 'Logout',
        Login: 'Login/Sing-up',
    },

    Unauthorized:{
        message:'Please, verify your account in order to continue'
    },

    Welcome:{
        welcome:'Welcome'
    },

    SideNav:{
        Search: 'Check Nodes',
        Status: 'Check Step',
        Prediction: 'Prediction',
        Administration: 'Administration',
        Graphs: 'Graphs'
    },

    CheckNodes:{
        Title: 'Check Nodes'
    },

    CheckSteps:{
        Title: 'Check Steps'
    },

    Prediction: {
        Title: 'Prediction'
    },

    NodeStatus:{
        Alerts: {
            messageIni: 'The selected lecture shows: ',
            messageTemp: 'average temperature lecture is ',
            messageEnv: ', average environment humidity lecture is ',
            messageGH: ', average Soil Moisture lecture is ',
            messageLum: ', average luminosity lecture is ',
        },
        Status: 'Check Step',
        Prediction: 'Prediction',
        Administration: 'Administration'
    },

    GraphNode:{
        Alerts: 'Please select a date before consulting a chart',
        ErrorData: 'There is an error with the web service',
        ErrorGraphing: 'There is an error when trying to display the grahpic',
    },

    Params:{
        Temperature: 'Temperature',
        GroundHumidity: 'Soil Moisture',
        EnvironmentHumidity: 'Environment Humidity',
        Luminosity: 'Luminosity'
    },

    Collections:{

        Commons:{
          Author: 'Author',
          CreatedAt: 'Created At',
        },

        Cycles: {
            Name: 'Name',
            StartValue: 'Start Value',
            EndValue: 'End Value'
        },

        Nodes:{
            Name: 'Name',
            Number: 'Number',
            Belonging: 'Belongs to',
            NumberSensors: 'Number of sensors'
        }
    },

    Buttons :{
        Accept : 'Accept',
        Cancel : 'Cancel',
        Submit : 'Submit',
        Add : 'Add',
        Of: 'Of'
    },

    Prepositions :{
        And : 'And',
        Of: 'Of'
    }

});
