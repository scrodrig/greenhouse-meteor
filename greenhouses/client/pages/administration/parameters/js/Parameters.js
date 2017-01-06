
Template.Parameters.onCreated(function () {
    var self = this;
    self.editMode = new ReactiveVar(false);
    self.autorun(function () {
        self.subscribe('parameter');
        //self.subscribe('someData');
        self.subscribe('parameterCount');
    });
});

Template.Parameters.helpers({

    updateParameterId: function () {
        return this._id;
    },

    Parameter: function(){
        return Parameter.findOne({});
    },

    editMode: function () {
        return Template.instance().editMode.get();
    },

    parameterName: function () {
      return {name: "Temperature"}
    }
});

Template.Parameters.events({
    'click .toggle-menu':function () {
        //Meteor.call('toggleMenuItem', this._id, this.inMenu);
    },

    'click .fa-pencil':function (event, template) {
        // Session.set('editMode', !Session.get('editMode'));
        template.editMode.set(!template.editMode.get());
    },

    'click .fa-close':function (event, template) {
        // Session.set('editMode', !Session.get('editMode'));
        template.editMode.set(!template.editMode.get());
    }
});