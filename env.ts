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
    consumer_key: 'ck_2baa47e7798df25d4a3ea55f58c7ec980f195822', 
    consumer_secret: 'cs_4d6944fd274a12ba2139fe64f26fdb800da69c6f'}
;

export const APP_NAME = 'ПРОКАТ.УКР'
export const PHONE_NUMBER_KS = '+380976164343'
export const PHONE_NUMBER_MTS = '+380666260790'