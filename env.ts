export const ENVIRONMENT = 'prokat';
//export const API_URL = 'https://pike.rminds.dev/api';
export const DEBUG = false; //__DEV__ || ENVIRONMENT.toString() !== 'prod';
export const API_URL = {
    local: 'http://192.168.1.99:8090/api',
    dev: 'http://notes-web.com/api',
    prod: '',
    prokat: 'https://xn--80atldfp.xn--j1amh//wp-json/wc/v3'
}[ENVIRONMENT];
export const POOL_INTERVAL = 7500;
export const APP_VERSIONS = {
    android: 1,
    ios: 1,
};

export const WC_CREDENIALS = {
    consumer_key: 'ck_dedb39388d6a278d8917497bce0ce4bb2d0b6dfa', 
    consumer_secret: 'cs_2fcfa14adf065468eb37663fe57d92b8ca3e38ab'}
;

export const APP_NAME = 'ПРОКАТ.УКР'