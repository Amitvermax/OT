import { i18n } from '@osd/i18n';
import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../../src/core/public';
import {
  SocDashboardPluginSetup,
  SocDashboardPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';

export class SocDashboardPlugin
  implements Plugin<SocDashboardPluginSetup, SocDashboardPluginStart> {
  public setup(core: CoreSetup): SocDashboardPluginSetup {
    core.application.register({
      id: 'socDashboard',
      title: PLUGIN_NAME,
      order: 1,
      category: {
        id: 'powerplant',
        label: 'Powerplant',
        order: 0,
      },
      async mount(params: AppMountParameters) {
        const { renderApp } = await import('./application');
        const [coreStart, depsStart] = await core.getStartServices();
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    return {
      getGreeting() {
        return i18n.translate('socDashboard.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): SocDashboardPluginStart {
    return {};
  }

  public stop() {}
}
