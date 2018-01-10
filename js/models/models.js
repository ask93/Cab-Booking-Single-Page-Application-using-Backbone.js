window.Wine = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/wines",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.grapes = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a grape variety"};
        };

        this.validators.country = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a country"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        id: null,
        name: "",
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null
    }
});

window.WineCollection = Backbone.Collection.extend({

    model: Wine,

    url: "http://127.0.0.1/ola/api/wines"

});

window.Customer = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/customers",

    initialize: function () {
        this.validators = {};
        //alert("ete");
        this.validators.cname = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.cphone = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a number"};
        };

        this.validators.cemail = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter an email address"};
        };

        this.validators.caddress = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter an address"};
        };

        this.validators.clogin = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a login name"};
        };

        this.validators.cpassword = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        cid: null,
        cname: "",
        cphone: "",
        csex: "",
        cemail: "",
        caddress: "",
        clogin: "",
        cpassword: "",
        cpicture: null
    }
});


window.Clogin = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/customers/login",

    initialize: function () {
        this.validators = {};
        //alert("ete");
        this.validators.clogin = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a login name"};
        };

        this.validators.cpassword = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {
        //alert(this.get("urlRoot"));
        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        clogin: "",
        cpassword: ""
    }
});

window.Cid = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/customer/search",

    initialize: function () {
        this.validators = {};
        //alert("ete");
        this.validators.cid = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a login name"};
        };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {
        //alert(this.get("urlRoot"));
        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        cid: ""
    }
});

window.Did = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/driver/search",

    initialize: function () {
        this.validators = {};
        //alert("ete");
        this.validators.did = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a login name"};
        };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {
        //alert(this.get("urlRoot"));
        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        did: ""
    }
});



window.Dlogin = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/drivers/login",

    initialize: function () {
        this.validators = {};
        //alert("ete");
        this.validators.dlogin = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a login name"};
        };

        this.validators.dpassword = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a password"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {
        //alert(this.get("urlRoot"));
        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        dlogin: "",
        dpassword: ""
    }
});

window.CustomerCollection = Backbone.Collection.extend({

    model: Customer,

    url: "http://127.0.0.1/ola/api/customers"

});


window.Driver = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/drivers",

    initialize: function () {
        this.validators = {};
        alert("ete");

    },
    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    alert(this.get(key));
                
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        did: null,
        dname: "",
        dphone: "",
        dsex: "",
        demail: "",
        daddress: "",
        dlogin: "",
        dpassword: "",
        dpicture: null
    }
});

window.DriverCollection = Backbone.Collection.extend({

    model: Driver,

    url: "http://127.0.0.1/ola/api/drivers"

});



window.Car = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/cars",

    initialize: function () {
        this.validators = {};

        this.validators.carname = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.carcompany = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.cartype = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        carid: null,
        carnumber: "",
        carname: "",
        carcompany: "",
        cartype: "",
        carpicture: null
    }
});

window.CarCollection = Backbone.Collection.extend({

    model: Car,

    url: "http://127.0.0.1/ola/api/cars"

});



window.Booking = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/booking",

    initialize: function () {
        this.validators = {};

        
        this.validators.bfrom = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.bto = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.cartype = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        bid: null,
        bcid:"",
        did:"",
        cartype: "",
        carnumber:"",
        bfrom: "",
        bto: "",
        distance: "",
        duration:"",
        cost:"",
        bdate:""
    }
});

// window.BookingCollection = Backbone.Collection.extend({

//     model: Booking,

//     url: "http://127.0.0.1/ola/api/bookings"

// });





window.BookingCollection = Backbone.Collection.extend({
    initialize:function(models,options){
        this.url="http://127.0.0.1/ola/api/bookings/"+options.id;
    },

    model: Booking

    //url: "http://127.0.0.1/ola/api/appointments"

});

window.Appointment = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/appointment",

    initialize: function () {
        this.validators = {};

        this.validators.cname = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.time = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.from = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.to = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.cartype = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        bid: null,
        cname:"",
        cphone:"",
        cartype: "",
        from: "",
        to: "",
        time: ""
    }
});



window.AppointmentCollection = Backbone.Collection.extend({
    initialize:function(models,options){
        this.url="http://127.0.0.1/ola/api/appointments/"+options.id;
    },

    model: Appointment

    //url: "http://127.0.0.1/ola/api/appointments"

});

window.Cancel = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/cancel",

    initialize: function () {
        this.validators = {};
        //alert("ete");
        this.validators.bid = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a login name"};
        };

        
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {
        //alert(this.get("urlRoot"));
        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        bid: ""
        
    }
});


window.Invoice = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/invoice",

    initialize: function () {
        this.validators = {};
        //alert("ete");
        this.validators.bid = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a login name"};
        };

        
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {
        //alert(this.get("urlRoot"));
        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {

        bid: "",
        duration:"",
        distance:"",
        cost:""
        
    }
});


window.I = Backbone.Model.extend({

    urlRoot: "http://127.0.0.1/ola/api/invoice",

    initialize: function () {
        this.validators = {};

        
        this.validators.bid = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

 
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        bid: null,
        distance:"",
        cost:"",
        duration: ""
        
    }
});
