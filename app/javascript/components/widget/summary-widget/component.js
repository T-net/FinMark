import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';

// styles
import './styles.scss';

class SummaryWidgetWrapperComponent extends React.Component {
  static propTypes = {
    widgetData: PropTypes.array.isRequired,
    menuItem: PropTypes.string.isRequired,
    fetchIntroAnalysis: PropTypes.func.isRequired,
    setIntroAnalysis: PropTypes.func.isRequired,
    data: PropTypes.array
  };

  static defaultProps = { data: [] };

  componentDidMount() {
    const { widgetData, menuItem } = this.props;
    const datum = widgetData[0];

    const newData = [
      { label: 'TOTAL POPULATION', value: Numeral(datum.total_population).format('0,0'), subvalue: null },
      { label: 'RURAL POPULATION PERCENTAGE', value: `${Numeral(datum.rural_population_percentage / 100).format('0.0%')}`, subvalue: Numeral(datum.rural_population).format('0,0') },
      { label: 'URBAN POPULATION PERCENTAGE:', value: `${Numeral(datum.urban_population_percentage / 100).format('0.0%')}`, subvalue: Numeral(datum.urban_population).format('0,0') }
    ];

    // Maintain the country summary data updated with the one from the analysis.
    menuItem === 'country' ? this.props.fetchIntroAnalysis() : this.props.setIntroAnalysis(newData);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="c-summary-widget-element">
        <table
          className="widget-table"
        >
          <thead>
            <tr>
              {data.map(item => (
                <th key={item.label}>
                  <div className="widget-label">
                    {item.label}
                  </div>
                </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {data.map(item => (
                <td key={item.label}>
                  <div className="widget-main-value">{item.value}</div>

                  {!!item.subvalue &&
                  <div className="widget-sub-value">({item.subvalue})</div>
                    }
                </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SummaryWidgetWrapperComponent;
