import NumberOfServices from '../widget-templates/number-of-services';
import MinimunDistance from '../widget-templates/minimun-distance';
import AccessPointsPercentage from '../widget-templates/points-percentage';
import AreaCoverage from '../widget-templates/area-coverage';
import SexPercentage from '../widget-templates/sex-percentage';
import AgroEcological from '../widget-templates/agro-ecological-zones';
import SettlementAreas from '../widget-templates/settlement-areas';

import SummaryWidget from '../summary-widget';

const widgetTemplates = new Map([
  ['Population sex percentage', { component: SexPercentage }],
  ['Population', { component: SummaryWidget }],
  ['Number of services', { component: NumberOfServices }],
  ['Access points percentage', { component: AccessPointsPercentage }],
  ['Minimum distance to access points', { component: MinimunDistance }],
  ['Area covered by GSM, 3G, and 4G', { component: AreaCoverage }],
  ['Urban and Rural areas', { component: NumberOfServices }],
  ['Population sex percentage', { component: SexPercentage }],
  ['Settlement areas', { component: SettlementAreas }],
  ['Agro-ecological zones', { component: AgroEcological }]
]);

export default widgetTemplates;
