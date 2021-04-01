import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { ConfigPageActions, ConfigApiActions } from '@profile/state/actions';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class ConfigEffects {
    public constructor(private action$: Actions, private translateService: TranslateService) { }

    public setCurrentLanguage$ = createEffect(() => this.action$
        .pipe(
            ofType(ConfigPageActions.setCurrentLanguageRequest),
            concatMap(action => {
                const language = action.language ?? this.translateService.defaultLang;
                return this.translateService.use(language).pipe(map(() => ConfigApiActions.setCurrentLanguageSuccess({ language })));
            })
        ));
}
