import './index.scss';

import { SocDashboardPlugin } from './plugin';

export function plugin() {
  return new SocDashboardPlugin();
}
export { SocDashboardPluginSetup, SocDashboardPluginStart } from './types';
