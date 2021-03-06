import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/recharts';

import config from './config';
import './styles.scss';

const AccessPointsPercentage = ({ widgetData, id }) => {
  if (!widgetData) return null;
  const { chartConfig, chartData } = config.parse(widgetData, id);

  return (
    <Fragment>
      <div className="c-widget-template">
        <div className="c-widget--app">
          <div id={`widget-legend-${id}`} />
          <Chart
            data={chartData}
            config={chartConfig}
          />
        </div>
      </div>
    </Fragment>
  );
};

AccessPointsPercentage.propTypes = {
  widgetData: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired
};

export default AccessPointsPercentage;
