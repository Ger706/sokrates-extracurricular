import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

class LanguageModel {
  language_code: string | undefined;
  language_name: string | undefined;
  current: boolean | false | undefined;
}

@Injectable()
export class TranslateService {
  data: any = {};

  languages: Array<LanguageModel> = [
    {
      language_code: 'en',
      language_name: 'ENGLISH',
      current: true
    },
    {
      language_code: 'id',
      language_name: 'INDONESIA',
      current: false
    }
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService) {

  }

  getCurrentLanguage() {
    const lang = this.authService.getSetting('lang') || 'en';

    // @ts-ignore
      return this.languages.find(i => i.language_code === lang).language_name;
  }

  getCurrentLangCode() {
    const lang = this.authService.getSetting('lang') || 'en';

    // @ts-ignore
      return this.languages.find(i => i.language_code === lang).language_code;
  }

  load(...paths: Array<string>): Promise<{}> {
    const lang = this.authService.getSetting('lang') || 'en';
    return new Promise<{}>(async (resolve, reject) => {
        this.languages.forEach(i => {
          if (i.language_code !== lang) {
            i.current = false;
            return;
          }

          i.current = true;
        });

        if (paths.length === 0) {
          paths = ['main'];
        }
        let translation = {};
        for (let i = 0; i < paths.length; i++) {
          const langPath = `assets/i18n/${paths[i]}/${lang || 'en'}.json`;
          await this.http.get<{}>(langPath).toPromise()
            .then(res => {
              translation = {
                ...translation,
                ...res
              };
            })
            .catch(err => {
            });
        }

        this.data = Object.assign({}, translation || {});
        resolve(this.data);

      }
    );
  }
}
