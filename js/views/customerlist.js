window.CustomerListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var wines = this.model.models;
        var len = wines.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"><br/><br/><br/><br/><br/><br/></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new CustomerListItemView({model: wines[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page,uname:"customers"}).render().el);

        return this;
    }
});

window.CustomerListItemView = Backbone.View.extend({

    tagName: "li",

    className: "span12",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        //alert(this.model.get('name'));
        //mycookie=this.model.get('name');
        //if(mycookie=="pppp"){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }


});