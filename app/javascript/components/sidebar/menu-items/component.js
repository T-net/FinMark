import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

class MenuItemsComponent extends React.Component {
  static propTypes = {
    selected: PropTypes.string,
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  static defaultProps = { selected: '' }

  onClickCountryReport = () => console.info('on country report – I am WIP!')

  render() {
    const { items, onSelect, selected } = this.props;

    return (
      <div className="c-menu-items">
        {
          items.map((item, index) => (
            <div
              tabIndex="0"
              role="button"
              key={item.value}
              className={classnames('menu-items-item', { '-inline': index === 0 })}
              onClick={() => onSelect(item.value)}
            >
              <div className="item-header">
                <h3 className="title">
                  {item.label}
                </h3>
              </div>

              <div className="description">
                {item.text}
              </div>
            </div>
          ))
        }

        {selected === 'analysis' &&
          <div className="country-report">
            <button
              className="c-button -medium -sea country-report-btn"
              onClick={this.onClickCountryReport}
            >
              Country Report
            </button>
          </div>
        }
      </div>
    );
  }
}

export default MenuItemsComponent;
