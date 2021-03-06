import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function getValue(item, value) {
  const { format, suffix = '', preffix = '' } = item;
  let val = value;

  if (format && typeof format === 'function') {
    val = format(val);
  }

  return `${preffix}${val}${suffix}`;
}

function Tooltip({ payload, settings, style, hideZeros, ...rest }) {
  const values = payload && payload.length > 0 && payload[0].payload;

  if (payload.length > 1) {
    return (
      <div>
        <div className="chart-tooltip" style={style} >
          <table>
            <thead>
              <tr>
                {settings.map(d => (
                  <th
                    key={d.key}
                  >
                    {/* LABEL */}
                    <div className="data-label">
                      <span>{d.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payload.map(p => (
                <tr>
                  {settings.map(d => (
                    <td
                      key={d.key}
                    >
                      {d.key === 'label' &&
                        <div className="data-label">
                          {p.color && (
                            <div
                              className="data-color"
                              style={{ backgroundColor: p.color }}
                            />
                          )}
                          <span>{p.dataKey}</span>
                        </div>
                      }

                      {d.key !== 'label' &&
                        <div className="data-value">
                          {getValue(d, p.value)}
                        </div>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      {settings && settings.length && (
        <div className="chart-tooltip" style={style} >
          {settings.map(
            d => (hideZeros && values[d.key] ? null : (
              <div
                key={d.key}
                className="data-line"
              >
                {/* LABEL */}
                {((d.label && d.labelKey) || d.key) && (
                  <div className="data-label">
                    {d.color && (
                      <div
                        className="data-color"
                        style={{ backgroundColor: d.color }}
                      />
                    )}
                    {d.key === 'break'
                      ? <span className="break-label">{d.label}</span>
                      : <span>{d.label || values[d.labelKey]}</span>}
                  </div>
                )}

                {/* UNIT */}
                <div
                  className="data-value"
                >
                  {getValue(d, values[d.key])}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({})),
  settings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  style: PropTypes.shape({}),
  hideZeros: PropTypes.bool
};

Tooltip.defaultProps = {
  payload: [],
  style: {},
  hideZeros: false
};

export default Tooltip;
