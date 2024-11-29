import { Injectable } from '@angular/core';
import { CachedItem, NgForage, NgForageCache } from 'ngforage';
import {Observable, pipe, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {fromPromise} from "rxjs/internal/observable/innerFrom";


@Injectable()
export class LocalStorageService {
    constructor(
        private readonly ngf: NgForage,
        private readonly cache: NgForageCache,
    ) {

        this.cache.cacheTime = 1000 * 60 * 60;
    }

    /**
     *
     * @param key
     * @param value
     * @returns {string}
     */
    public setItem<T>(key: string, value: T): Observable<T> {
        return fromPromise(this.ngf.setItem(key, value));
    }

    /**
     *
     * @param key
     * @returns {string}
     */
    public getItem<T>(key: string): Observable<T | null> {
        return fromPromise(this.ngf.getItem(key));
    }

    /**
     *
     * @param key
     */
    public getCachedItem<T = any>(key: string): Promise<T | null> {
        return this.cache.getCached<T>(key)
            .then((r: CachedItem<T>) => {
                if (!r.hasData || r.expired) {
                    return null;
                }

                return r.data;
            });
    }

    /**
     *
     * @param key
     * @returns {string}
     */
    public removeItem(key: string): Observable<void> {
        return fromPromise(this.ngf.removeItem(key));
    }

    localStorageCacheHttp(url: string, params: any = null) {
        let newUrl = url;
        if (params) {
            newUrl += '###' + JSON.stringify(params);
        }

        return pipe(
            map(res => {
                this.setItem(newUrl, res);
                return res;
            }),
            catchError(err => {

                return this.getItem(newUrl)
                    .pipe(map(res => {
                        if (res === null) {
                            throw throwError(err);
                        }

                        // @ts-ignore
                        res['cache'] = true;

                        return res;
                    }), catchError(() => {
                        return throwError(err);
                    }));
            })
        );
    }

    clear() {
        this.ngf.clear();
        // this.cache.clear();
    }
}
