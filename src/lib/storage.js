function set(key, data) {
    try {
        window.localStorage && localStorage.setItem(key, data);
    } catch (e) {
        window[key + "_localStorage"] = data;
    }
}

function get(key) {
    try {
        if (window.localStorage) return localStorage.getItem(key);
    } catch (e) {
        return window[key + "_localStorage"];
    }
    return "";
}

export default {
    set,
    get
}