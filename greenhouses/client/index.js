Template.registerHelpers({
    momentFormat: function(time) {

        if ((moment().unix() - moment(time).unix()) < 3600) {
            return moment(time).fromNow();
        } else {
            return moment(time).format("YYYY-MM-DD HH:mm");
        }
    },
});