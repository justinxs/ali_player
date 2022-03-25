import urlLib from './url.js';

function ajax(method, url, data, success, error, async, withCredentials, headers) {
    let protocol, xhr, urlParser, local;
    error = error || function () {};
    if ('undefined' == typeof XMLHttpRequest) {
        window.XMLHttpRequest = function () {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (err) {}

            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (err) {}

            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP");
            } catch (err) {}

            throw new Error("This browser does not support XMLHttpRequest.");
        }
    }
    xhr = new XMLHttpRequest();
    urlParser = urlLib.parseUrl(url);
    local = window.location;
    if ((urlParser.protocol + urlParser.host === local.protocol + local.host) || !window.XDomainRequest || "withCredentials" in xhr) {
        protocol = "file:" == urlParser.protocol || "file:" == local.protocol;
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                (200 === xhr.status || (protocol && 0 === xhr.status) ? success : error)(xhr.responseText)
            }
        }
    } else {
        xhr = new window.XDomainRequest();
        xhr.onload = function () {
            success(xhr.responseText);
        };
        xhr.onerror = error;
        xhr.onprogress = function () {};
        xhr.ontimeout = error;
    }
    try {
        undefined === async && (async = true);
        xhr.open(method, url, async);
        withCredentials && (xhr.withCredentials = true);
        if (headers) {
            for (var p in headers) {
                headers.hasOwnProperty(p) && xhr.setRequestHeader(p, headers[p]);
            }
        }
    } catch (err) {
        return void error(err);
    }
    try {
        xhr.send(data);
    } catch (err) {
        error(err);
    }
}

function get(url, success, error, async, withCredentials) {
    ajax("GET", url, {}, success, error, async, withCredentials);
}

function post(url, data, success, error, async, withCredentials) {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json",
    };
    ajax("POST", url, data, success, error, async, withCredentials, headers);
}

function postWithHeader(url, data, headers, success, error) {
    ajax("POST", url, data, success, error, true, false, headers);
}

function jsonp(url, success, error) {
    const cbName = "jsonp_callback_" + Math.round(1e5 * Math.random()), 
        script = document.createElement("script");
    if (url) {
        script.src = url + (0 <= url.indexOf("?") ? "&" : "?") + "callback=" + cbName + "&cb=" + cbName;
        script.onerror = function () {
            delete window[cbName];
            document.body.removeChild(script); 
            error();
        };
        script.onload = function () {
            setTimeout(function () {
                if (window[cbName]) {
                    delete window[cbName];
                    document.body.removeChild(script);
                }
            }, 0);
        };
        window[cbName] = function (data) {
            delete window[cbName];
            document.body.removeChild(script);
            success(data);
        };
        document.body.appendChild(script);
    }
}

function loadJS(url, success) {
    const head = document.getElementsByTagName("HEAD").item(0),
        script = document.createElement("script");
    if (url && url.toLowerCase().indexOf("https://") < 0 && url.toLowerCase().indexOf("http://") < 0) {
        url = location.origin + url;
    }
    script.type = "text/javascript";
    script.src = url;
    script.onload = function () {
        success && success();
    };
    head.appendChild(script);
}

export default {
    ajax,
    get,
    post,
    postWithHeader,
    jsonp,
    loadJS
}