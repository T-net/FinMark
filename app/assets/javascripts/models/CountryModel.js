(function (App) {
  'use strict';

  App.Model.CountryModel = Backbone.Model.extend({

    initialize: function (iso, year, isMSME) {
      this.year = year;
      this.iso = iso;
      this.isMSME = !!isMSME;
    },

    url: function() {
      var apiUrl = this.isMSME ? MSME_API_URL : API_URL;
      return apiUrl + '/country/' + this.iso;
    },

    parse: function (data) {
      var population = null;
      var totalMsme = null;
      if (data && data.length && data[0].years.length) {
        var year = data[0].years.find(function (y) {
          return y.year === this.year;
        }, this);
        population = year && year.total;
        totalMsme = year && year.total_msme;
      }

      return {
        totalMsme: totalMsme,
        population: population,
        url: data && data.length && data[0].mapUrl || null,
        downloadable: !!(year || {}).dataUrl
      };
    }

  });

}).call(this, this.App);
