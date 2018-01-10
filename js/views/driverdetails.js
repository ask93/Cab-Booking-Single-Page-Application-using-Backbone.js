window.DriverView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change",        
        "click .save"   : "beforeSave",
        "drop #picture" : "dropHandler"
    },

     change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        // Upload picture file if a new file was dropped in the drop area
        if (this.pictureFile) {
            this.model.set("dpicture", this.pictureFile.name);
            utils.uploadFile(this.pictureFile,
                function () {
                    self.saveCustomer();
                }
            );
        } else {
            this.saveCustomer();
        }
        return false;
    },

    saveCustomer: function () {
        var self = this;
        var t="lllllll";
        mysex=this.model.get("dsex");
        // this.model.set({dname:t});
        this.model.save(null, {
            success: function (model) {
                utils.showAlert('Success!', 'Driver saved successfully', 'alert-success');

                self.render();
                //alert(model.id);
                if(model.id){
                //app.navigate('drivers/' + model.id, true);
                //mycookie=model.id;
                //app.navigate('drivers/' + model.get("did"), true);
                document.getElementById('logout').style.visibility = 'visible';
                document.getElementById('dafterlogin').style.visibility = 'visible';
                document.getElementById('manager').style.visibility = 'visible';
                document.getElementById('dbeforelogin').style.visibility = 'hidden';
                //document.getElementById('apply').style.visibility = 'hidden';
                utils.showAlert('Success!', 'Customer 222 saved successfully', 'alert-success');
                //    var wine = new Wine();
        $('#content').html(new MapView().el);
        app.navigate("drivers/"+mycookie);
        //document.getElementById('trying').style.visibility = 'visible';
        //this.headerView.selectMenuItem('add-menu');
    
            }
            else{
                utils.showAlert('Error', 'An error occurred while trying to delete this customer', 'alert-error');
            }
                
            },            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this customer', 'alert-error');
            }
        });
    },
    deleteWine: function () {
        this.model.destroy({
            success: function () {
                alert('Driver deleted successfully');
                window.history.back();
            }
        });
        return false;
    },


    dropHandler: function (event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#dpicture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});