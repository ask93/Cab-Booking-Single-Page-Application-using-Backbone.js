window.ApplyJobView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click .save"   : "beforeSave",
    },

 
    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        // Upload picture file if a new file was dropped in the drop area
        this.saveWine();
        return false;
    },

    saveWine: function () {
        var self = this;

        this.model.save(null, {
            success: function (model) {
                utils.showAlert('Success!', 'Application saved successfully', 'alert-success');

                self.render();

                app.navigate('drivers/' + model.id, false);
                utils.showAlert('Success!', 'Driver saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

  
});