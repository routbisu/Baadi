import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  // Ignore console.log statements
  // Override with empty functions
  window.console.log = _ => {};
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
