import { initEventHandlers } from '^shared/eventHandler.util';
import { before, binding } from 'cucumber-tsflow';

@binding()
export class BeforeEachScenarioSteps {
  @before()
  beforeEachScenarios() {
    initEventHandlers();
  }
}
