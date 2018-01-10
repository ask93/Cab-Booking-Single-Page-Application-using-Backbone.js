window.BookingView = Backbone.View.extend({

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
        "click .delete" : "deleteWine",
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
            this.model.set("picture", this.pictureFile.name);
            utils.uploadFile(this.pictureFile,
                function () {
                    self.saveWine();
                }
            );
        } else {
            this.saveWine();
        }
        return false;
    },

    saveWine: function () {
        var self = this;
        //alert
        //alert(mysex+"mysex");
        this.model.set({csex:mysex});
        this.model.set({bcid:mycookie});
        this.model.save(null, {
            success: function (model) {
                utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');

                self.render();
alert("Booking Successful...\nCar number: "+model.get("carnumber")+"\nBooking id: "+model.get("id"));

                app.navigate('booking/book/' + model.get("id"), false);
        //        GUnload();
                var map = new GMap2(document.getElementById("diff map"));
                var directions = new GDirections(map);
                var t="from: "+model.get("bfrom")+",India to: "+model.get("bto")+",India";
        directions.load(t);

   GEvent.addListener(directions, "load", function() {

       // Display the distance from the GDirections.getDistance() method:
       document.getElementById('diff mdistance').innerHTML += 
           directions.getDistance().meters/1000 + " kilometers, "+directions.getDistance().meters%1000+" meters";

       // Display the duration from the GDirections.getDuration() method:
       document.getElementById('diff mduration').innerHTML += 
           directions.getDuration().seconds/60 + " minutes";
   });
                utils.showAlert('Success!', "Booking Successful...Car number: "+model.get("carnumber")+"\nBooking id: "+model.get("id"), 'alert-success');
                // 
            },
            error: function () {
                alert("all cabs busy!!");
            }
        });
    },

    deleteWine: function () {
        this.model.destroy({
            success: function () {
                alert('Wine deleted successfully');
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
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});