import {AuthService} from './auth.service';
import {SettingService} from './setting.service';
import {Auth} from '../models/auth.model';
import {ToastrService} from 'ngx-toastr';


const MINUTES_UNTIL_AUTO_LOGOUT = 60;

export class IdleService {
    get lastAction() {
        return localStorage.getItem('Last Idle');
    }
    set lastAction(value: any) {
        localStorage.setItem('Last Idle', value);
    }
    stopInterval = 0;
    count = 0;
    constructor(
        public auth: AuthService,
        public settings: SettingService,

        private toastr: ToastrService,
    ) {
        this.check();
        this.initListener();
        this.initInterval();
        this.initIntervalSession();
    }

    initListener() {
        document.body.addEventListener('click', () => this.reset());
    }

    reset() {
        this.lastAction = JSON.stringify(Date.now());
    }

    initInterval() {
        if (this.stopInterval === 0) {
            setInterval(() => {
                this.check();
            }, 1000);
        }
    }

    initIntervalSession() {
        setInterval( () => {
            this.count += 1;
            if (this.count === 115) {
                const data = {
                    session_id: this.settings.getSessionId(),
                    action: 'renew'
                };
                this.auth.renewDeleteSession(data)  .subscribe(
                    (response: Auth) => {
                        // @ts-ignore
                        if (response['error'] === 0) {
                            this.count = 0;
                        } else {
                            this.toastr.error('[Session]', 'Connection Error');
                        }
                    },
                    error => {
                        this.toastr.error('[Session]', 'Connection Error');
                    }
                );
            }
        }, 60000);
    }

    check() {
        const now = Date.now();
        const timeleft = parseInt(<string>this.lastAction, 10) + MINUTES_UNTIL_AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        if (isTimeout && this.auth.isLoggedIn) {
            this.auth.logout();
            this.stopInterval = 1;
        }
    }

}
