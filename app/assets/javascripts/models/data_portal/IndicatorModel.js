(function (App) {
  'use strict';

  App.Model.IndicatorModel = Backbone.Model.extend({

    defaults: {
      // Indicator id
      id: null,
      // Country ISO
      iso: null,
      // Year
      year: null,
      // List of filters
      // See _filters in App.Page.DataPortalCountryPage to see their format
      filters: [],
    },

    initialize: function (options) {
      this.options = _.extend({}, this.defaults, options);
    },

    url: function() {
      var url =  API_URL + '/indicator/' + this.options.id + '?' + this.options.iso + '=' + this.options.year;

      if (this.options.filters.length) {
        var filters = this.options.filters.map(function (filter) {
          return {
            indicatorId: filter.id,
            value: filter.options
          };
        }.bind(this));
        url += '&filters=' + JSON.stringify(filters);
      }

      return url;
    },

    parse: function (data) {
      return {
        title: data.title,
        data: data.data.map(function (answer) {
          return {
            id: answer.answerId,
            label: answer.value,
            count: answer.count,
            total: answer.sum,
            percentage: answer.percentage
          };
        })
      };
    }

  });

}).call(this, this.App);
