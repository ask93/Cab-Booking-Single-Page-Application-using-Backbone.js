window.CidView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
       // mycookie=this.model.get('cid');
        return this;
    },

    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .signup" : "cancel"
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
        //alert(document.getElementById("clogin").value);
        //app.navigate("customers/login/"+document.getElementById("clogin").value+"/"+document.getElementById("cpassword").value);
        // Upload picture file if a new file was dropped in the drop area
        this.saveCustomer();
        //app.navigate("customers/add");
        return false;
    },

    cancel: function () {
        app.navigate('drivers/'+mycookie);
    },


    saveCustomer: function (page) {
        var self = this;
        //alert("ET");
        // alert("dd");
        //alert(this.model.url);
        //alert(document.getElementById('cid').value);
        var customerid=document.getElementById('cid').value;
        var customer = new Customer({id: customerid});
        //alert("here");
        customer.fetch({success: function(model){
            if(model.get("cname"))
            {
                $("#content").html(new CustomerView({model: customer}).el);
                document.getElementById('diff').style.visibility = 'hidden';  
                app.navigate("customers/found");
            }
            else
            {
                alert("customer id not found!!");
                // utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                var p = page ? parseInt(page, 10) : 1;
                var customerList = new CustomerCollection();
                customerList.fetch({success: function(){
                    //alert("rrrrr");
                app.navigate("customers",false);
                $("#content").html(new CustomerListView({model: customerList, page: p}).el);
                //document.getElementById('diff').style.visibility = 'hidden';  
                }
                });
            }
        }});
        
        
    },
    deleteWine: function () {
        this.model.destroy({
            success: function () {
                alert('Customer deleted successfully');
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