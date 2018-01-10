window.BookingListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var appointments = this.model.models;
        var len = appointments.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"><br/><br/><br/><br/><br/><br/></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new BookingListItemView({model: appointments[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page, uname: "bookings"}).render().el);

        return this;
    }
});

window.BookingListItemView = Backbone.View.extend({

    tagName: "li",

    className: "span12",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});