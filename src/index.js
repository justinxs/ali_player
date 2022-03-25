import lang from './lang/index.js';
import adaptivePlayer from './player/adaptivePlayer.js';
import componentutil from './lib/componentutil.js';
import config from './config.js';

const Aliplayer = function (options, callback) {
    options.useH5Prism = true;
    return adaptivePlayer.create(options, callback);
};
lang.load();
Aliplayer.getVersion = function () {
    return config.h5Version;
};
componentutil.register(Aliplayer);
window.Aliplayer = Aliplayer;
Aliplayer.players = {};

if ("undefined" != typeof Uint8Array && !Uint8Array.prototype.slice) {
    Object.defineProperty(Uint8Array.prototype, "slice", { value: Array.prototype.slice });
}

export default Aliplayer;