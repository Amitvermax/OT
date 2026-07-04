import { PluginInitializerContext } from '../../../src/core/server';
import { SocDashboardPlugin } from './plugin';

export function plugin(initializerContext: PluginInitializerContext) {
  return new SocDashboardPlugin(initializerContext);
}

export { SocDashboardPluginSetup, SocDashboardPluginStart } from './types';
