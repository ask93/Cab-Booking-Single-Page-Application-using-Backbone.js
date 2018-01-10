var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "clogin",
        "bookings/page/:page"	: "blist",
        "appointments/page/:page"   : "alist",
        "drivers/page/:page"   : "dlist", 
        "customers/page/:page"   : "clist",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about",
        "customers/add"     : "addCustomer",
        "customers/login"   : "clogin",
        "drivers/login"     : "dlogin",
        "checking"          : "alist",
        "customers/:id"     : "clog",
        "drivers/:id"       : "dlog",
        "driver/add"       : "addDriver",
        "invoice"           : "addinvoice",
        "booking/history"   : "blist",
        "booking/book"      : "book",
        "booking/history/:bid"   : "bDetails",
        "booking/cancel"    : "cancel",
        "appointment/history/:bid"   : "aDetails",
        "cars/:id"          : "cdetails",
        "search/customer"   : "searchcustomer",
        "search/customer/:cid"   : "customerdetails",        
        "search/driver"     : "searchdriver",
        "search/driver/:did": "driverdetails",
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
        document.getElementById('manager').style.visibility = 'hidden';
        document.getElementById('logout').style.visibility = 'hidden';
        document.getElementById('logged_in').style.visibility = 'hidden'; 
        document.getElementById('dafterlogin').style.visibility = 'hidden';  
        document.getElementById('dafterlogin').style.visibility = 'hidden';  
        // document.getElementById('manager').style.visibility = 'hidden';

        // document.getElementById('apply').style.visibility = 'visible';

                
    },

	alist: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var appointmentList = new AppointmentCollection([],{id:mycookie});
        appointmentList.fetch({success: function(){
            $("#content").html(new AppointmentListView({model: appointmentList, page: p}).el);
        }});
        //this.headerView.selectMenuItem('home-menu');
    },

    blist: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var bookingList = new BookingCollection([],{id:mycookie});
        bookingList.fetch({success: function(){
            $("#content").html(new BookingListView({model: bookingList, page: p}).el);
        }});
        //this.headerView.selectMenuItem('home-menu');
    },

    clist: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var customerList = new CustomerCollection();
        customerList.fetch({success: function(){
            $("#content").html(new CustomerListView({model: customerList, page: p}).el);
        }});
        //this.headerView.selectMenuItem('home-menu');
    },

    dlist: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var driverList = new DriverCollection();
        driverList.fetch({success: function(){
            $("#content").html(new DriverListView({model: driverList, page: p}).el);
        }});
        //this.headerView.selectMenuItem('home-menu');
    },

    clogin: function(page) {
        //var p = page ? parseInt(page, 10) : 1;
       // console.log("iii");
        var login = new Clogin();
        $('#content').html(new CLoginView({model: login}).el);
        // var p = page ? parseInt(page, 10) : 1;
        // var carList = new CarCollection();
        // carList.fetch({success: function(){
        //     //alert("rrrrr");
        //     $("#content2").html(new CarListView({model: carList, page: p}).el);
        // }});
        
        //this.headerView.selectMenuItem('add-menu');
    },

    dlogin: function() {
        //var p = page ? parseInt(page, 10) : 1;
       // console.log("iii");
        var login = new Dlogin();
        $('#content').html(new DLoginView({model: login}).el);
        //this.headerView.selectMenuItem('add-menu');
    },

    searchcustomer: function() {
        //var p = page ? parseInt(page, 10) : 1;
       // console.log("iii");
        var cid = new Cid();
        $('#content').html(new CidView({model: cid}).el);
        //this.headerView.selectMenuItem('add-menu');
    },

    searchdriver: function(page) {


        var did = new Did();
        $('#content').html(new DidView({model:did}).el);
        
        //this.headerView.selectMenuItem('add-menu');
        
        
    },


    driverdetails: function (did) {
        //alert("uuuu");
        var driver = new Driver({id: did});
        driver.fetch({success: function(){
            $("#content").html(new DriverView({model: driver}).el);
            document.getElementById('diff').style.visibility = 'hidden';              
        }});
        // this.headerView.selectMenuItem();
        document.getElementById('diff').style.visibility = 'hidden';  
    },


    customerdetails: function (cid) {
        //alert("uuuu");
        var driver = new Customer({id: cid});
        driver.fetch({success: function(){
            $("#content").html(new CustomerView({model: driver}).el);
            document.getElementById('diff').style.visibility = 'hidden';  
        }});
        // this.headerView.selectMenuItem();
        
    },

    cancel: function(){
        var cancel= new Cancel();
        $('#content').html(new CancellationView({model: cancel}).el);
    },

    clog: function (login) {

        //alert("works");
        $('#content').html(new MapView().el);
        //var p=login+"/"+password;
        //console.log("rrr");
        // var cust = new Customer({id: p});

        // cust.fetch({success: function(){
        //     $("#content").html(new WineView({model: wine}).el);
        // }});
        //this.headerView.selectMenuItem();
    },

    dlog: function (login) {

        //alert("works");
        $('#content').html(new MapView().el);
        //var p=login+"/"+password;
        //console.log("rrr");
        // var cust = new Customer({id: p});

        // cust.fetch({success: function(){
        //     $("#content").html(new WineView({model: wine}).el);
        // }});
        //this.headerView.selectMenuItem();
    },


    bDetails: function (bid) {
        var wine = new Booking({id: bid});
        //alert("here");
        wine.fetch({success: function(){
            $("#content").html(new BookingView({model: wine}).el);
            //alert("timeout");
            document.getElementById('diff mduration').style.visibility = 'hidden';
            document.getElementById('diff mdistance').style.visibility = 'hidden';
            document.getElementById('diff map').style.visibility = 'hidden';
            document.getElementById('diff').style.visibility = 'hidden';
        }});
        // this.headerView.selectMenuItem();
          
    },

    aDetails: function (aid) {
        var wine = new Appointment({id: aid});
        //alert("here");
        wine.fetch({success: function(){
            $("#content").html(new AppointmentView({model: wine}).el);
            document.getElementById('diff').style.visibility = 'hidden';  
        }});
        // this.headerView.selectMenuItem();
        
    },


    cDetails: function (cid) {
        var car = new Car({id: cid});
        //alert("here");
        car.fetch({success: function(){
            $("#content2").html(new CarView({model: car}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        //this.headerView.selectMenuItem('add-menu');
	},

    book: function() {
        var booking = new Booking();
        // document.getElementById('diff').style.visibility = 'visible';  
        $('#content').html(new BookingView({model: booking}).el);
            document.getElementById('diff mduration').style.visibility = 'visible';
            document.getElementById('diff mdistance').style.visibility = 'visible';
            document.getElementById('diff map').style.visibility = 'visible';
            document.getElementById('diff').style.visibility = 'visible';

        
        //this.headerView.selectMenuItem('add-customer');
        //alert("ete");
    },

    
    addCustomer: function() {
        var customer = new Customer();
        $('#content').html(new CustomerView({model: customer}).el);
        document.getElementById('diff').style.visibility = 'visible';
        //this.headerView.selectMenuItem('add-customer');
        //alert("ete");
    },

    addinvoice: function() {
        var customer = new Invoice();
        $('#content').html(new InvoiceView({model: customer}).el);
        //this.headerView.selectMenuItem('add-customer');
        //alert("ete");
    },


    addDriver: function() {
        //alert("pppppp");
        var driver = new Driver();
        //alert("reached!!")
        $('#content').html(new DriverView({model: driver}).el);
        //document.getElementById('diff').style.visibility = 'visible';
        //this.headerView.selectMenuItem('add-driver');
        //alert("ete");
    },


    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        //this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HeaderView', 'MapView', 'WineView', 'WineListItemView', 'AboutView', 'CustomerView', 'DriverView', 'CustomerListItemView', 'DriverListItemView', 'CLoginView', 'DLoginView', 'BookingView', 'BookingListItemView','AppointmentView', 'AppointmentListItemView', 'CarListItemView', 'CarView', 'CidView', 'DidView', 'CancellationView', 'InvoiceView'], function() {
    app = new AppRouter();
    mycookie="ttt";
    mysex="";

    Backbone.history.start();
});
