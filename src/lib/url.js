import dom from './dom.js';

function getAbsoluteURL(url) {
    return url = !url.match(/^https?:\/\//)
        ? dom.createEl("div", { innerHTML: '<a href="' + url + '">x</a>' }).firstChild.href
        : url;
}

function parseUrl(url) {
    let parser = {},
        div,
        props = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"],
        aTag = s.createEl("a", { href: url }),
        isAppend = "" === aTag.host && "file:" !== aTag.protocol;
    if (isAppend) {
        div = s.createEl("div");
        div.innerHTML = '<a href="' + url + '"></a>';
        aTag = div.firstChild;
        div.setAttribute("style", "display:none; position:absolute;");
        document.body.appendChild(div);
    }
    for (var a = 0; a < props.length; a++) {
        parser[props[a]] = aTag[props[a]];
    }

    parser.segments = aTag.pathname.replace(/^\//, "").split("/");
    isAppend && document.body.removeChild(div);

    return parser;
}

export default {
    getAbsoluteURL,
    parseUrl
}