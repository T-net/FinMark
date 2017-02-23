((function (App) {
  'use strict';

  App.Helper.ChartConfig = [
    {
      name: 'pie',
      acceptedStatTypes: [
        ['nominal'],
        ['ordinal'],
        ['quantitative']
      ]
    }
  ];
})(this.App));