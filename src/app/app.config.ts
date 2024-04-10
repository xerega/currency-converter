import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), importProvidersFrom(TuiRootModule)],
};
