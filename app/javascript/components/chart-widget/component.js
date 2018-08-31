import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class ChartWidgetWrapperComponent extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    chart: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {
      id,
      title,
      url,
      body,
      chart
    } = this.props;

    const chartOptions = {
      el: this.widgetElement,
      title,
      chart,
      url,
      body,
      fspId: id
    };

    this.widget = new App.View.ChartWidgetView(chartOptions);
  }

  render() {
    return (
      <div ref={(w) => { this.widgetElement = w; }} className="c-chart-widget-element" />
    );
  }
}

export default ChartWidgetWrapperComponent;
