import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import Spinner from 'wri-api-components/dist/spinner';
import numeral from 'numeral';
import groupBy from 'lodash/groupBy';
import maxBy from 'lodash/maxBy';

const formatNumberForAxis = n => n && numeral(n).format('$0,0a').toUpperCase();
const formatNumber = n => n && numeral(n).format('$0,0.000a').toUpperCase();

function colorScale(n) {
  const colors = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac'];
  return colors[n % colors.length];
}

class RegionGDPOverTime extends PureComponent {
  static serialize = (data) => {
    const countryKeys = Object.keys(groupBy(data, 'country'));
    const dataByYear = groupBy(data, 'year');
    const result = {
      countries: countryKeys,
      years: Object.keys(dataByYear).map((year) => {
        const d = {
          year,
          max: maxBy(dataByYear[year], 'value').value,
          Total: dataByYear[year].map(d => d.value).reduce((a, b) => a + b),
        };
        countryKeys.forEach((country) => {
          const dataByCountry = dataByYear[year].find(d => d.country === country);
          d[country] = dataByCountry && dataByCountry.value;
        });
        return d;
      })
    };
    return result;
  }
  static propTypes = { iso: PropTypes.string.isRequired }

  constructor(props) {
    super(props);
    this.state = { data: null, loaded: false };
  }

  componentDidMount() {
    const { iso } = this.props;
    axios.get(`/dpapi/gdp_by_region/${iso}`)
      .then(({ data }) => (data && data.length) &&
        this.setState({ data: RegionGDPOverTime.serialize(data), loaded: true }))
      .catch(() => this.setState({ loaded: true }));
  }

  render() {
    const { data, loaded } = this.state;

    if (!data && !loaded) return <Spinner position="relative" />;
    if (!data && loaded) return <p>No data for this country.</p>;

    return (
      <ResponsiveContainer width="100%" height={440}>
        <LineChart data={data.years}>
          <XAxis
            dataKey="year"
            style={{ fontSize: 11, fontWeight: 'bold' }}
            tickSize={1}
            tick={{ dy: 10 }}
          />
          <YAxis
            dataKey="max"
            axisLine={false}
            tickLine={false}
            tickFormatter={formatNumberForAxis}
            style={{ fontSize: 11 }}
            padding={{ top: 30 }}
            label={{ value: 'US $', position: 'insideTopLeft', fontSize: 11, fontWeight: 'bold' }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          {data.countries.map((key, i) => (
            <Line
              key={key}
              dataKey={key}
              stroke={colorScale(i)}
              fill={colorScale(i)}
              dot={{ strokeWidth: 1 }}
            />
          ))}
          <Line
            dataKey="Total"
            stroke="#2f939c"
            fill="#2f939c"
            dot={{ strokeWidth: 1 }}
            strokeWidth={3}
          />
          <Tooltip formatter={value => formatNumber(value)} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default RegionGDPOverTime;
