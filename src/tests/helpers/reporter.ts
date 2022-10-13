import {DisplayProcessor,StacktraceOption,SpecReporter,} from 'jasmine-spec-reporter';
//JASMINE
  import SuiteInfo = jasmine.SuiteInfo;
//DISPLAY_PROCESSOR
  class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
      return `${log}`;
    }
  }
  jasmine.getEnv().clearReporters();
  jasmine.getEnv().addReporter(
    new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.NONE,
      },
      customProcessors: [CustomProcessor],
    })
  );
  