import config from '../config.js';
import storage from '../lib/storage.js';
import constants from '../lib/constants.js';
import io from '../lib/io.js';
import zh_cn from './zh-cn.js';
import en_us from './en-us.js';
import zh_cn_flash from './flash/zh-cn.js';
import en_us_flash from './flash/en-us.js';

const LANG_KEY = "aliplayer_lang";
const PREV_KEY = 'aliplayer_lang_data';


function getCurrentLanguage() {
    let code = window[LANG_KEY];
    if (!code) {
        code = (navigator.language || navigator.browserLanguage || '').toLowerCase().indexOf("zh") > -1
            ? "zh-cn"
            : "en-us";
    }
    return window[LANG_KEY] = code;
}

function getCacheKey(mode) {
    return PREV_KEY + "_" + (mode || "h5") + "_" + config.h5Version.replace(/\./g, "_") + "_" + getCurrentLanguage();
}

function load(mode, data) {
    const code = getCurrentLanguage(), cachekey = getCacheKey(mode);
    let lang = {};
    if (mode === 'flash') {
        lang = code === 'zh-cn' 
            ? zh_cn_flash 
            : code === 'en-us' ? en_us_flash : data[code];
    } else {
        lang = code === 'zh-cn' 
            ? zh_cn 
            : code === 'en-us' ? en_us : data[code];
    }
    storage.set(cachekey, JSON.stringify(lang));
    window[cachekey] = lang;
}

function setCurrentLanguage(code, mode, data) {
    const lastCode = window[LANG_KEY];
    code = undefined === code || !code ? getCurrentLanguage() : code;
    if (!("en-us" == code ||"zh-cn" == code || (data && data[code]))) {
        throw new Error("There is not language resource for " + code + ", please specify the language resource by languageTexts property");
    }
    window[LANG_KEY] = code;
    load(mode, data);
    code != lastCode && constants.updateByLanguage();
}

function getLanguageData(mode) {
    const cachekey = getCacheKey(mode);
    return window[cachekey];
}

function get(key, mode) {
    const cachekey = getCacheKey(mode), cache = window[cachekey];
    if (cache) return cache[key];
}

export default {
    load,
    setCurrentLanguage,
    getCurrentLanguage,
    getLanguageData,
    get
}