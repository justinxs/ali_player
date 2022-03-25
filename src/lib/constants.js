import lang from '../lang/index.js';

const LOAD_START = "loadstart";
const LOADED_METADATA = "loadedmetadata";
const LOADED_DATA = "loadeddata";
const PROGRESS = "progress";
const CAN_PLAY = "canplay";
const CAN_PLYA_THROUGH = "canplaythrough";
const PLAY = "play";
const PAUSE = "pause";
const ENDED = "ended";
const PLAYING = "playing";
const WAITING = "waiting";
const ERROR = "error";
const SUSPEND = "suspend";
const STALLED = "stalled";
const AuthKeyExpiredEvent = "authkeyexpired";
const DRMKeySystem = {
    4: "com.microsoft.playready",
    5: "com.widevine.alpha",
};
const EncryptionType = {
    Private: 1,
    Standard: 2,
    ChinaDRM: 3,
    PlayReady: 4,
    Widevine: 5,
};
const VodEncryptionType = {
    AliyunVoDEncryption: 1,
    HLSEncryption: 2,
    Widevine: 5,
    "Widevine-FairPlay": 5,
};
const DRMType = {
    Widevine: "Widevine",
    PlayReady: "PlayReady",
};
const ErrorCode = {
    InvalidParameter: 4001,
    AuthKeyExpired: 4002,
    InvalidSourceURL: 4003,
    NotFoundSourceURL: 4004,
    StartLoadData: 4005,
    LoadedMetadata: 4006,
    PlayingError: 4007,
    LoadingTimeout: 4008,
    RequestDataError: 4009,
    EncrptyVideoNotSupport: 4010,
    FormatNotSupport: 4011,
    PlayauthDecode: 4012,
    PlayDataDecode: 4013,
    NetworkUnavaiable: 4014,
    UserAbort: 4015,
    NetworkError: 4016,
    URLsIsEmpty: 4017,
    DrmLicenseRequestFailed: 4018,
    CrossDomain: 4027,
    OtherError: 4400,
    ServerAPIError: 4500,
    FlashNotInstalled: 4600,
    RtsSignalError: 4100,
    RtsPlayFailedError: 4200,
    RtsNotSupportWebRtc: 4110,
    RtsBrowserNotSupport: 4111,
    RtsBrowserVersionTooLow: 4112,
    RtsNotSupportH264: 4113,
    RtsCreateOfferError: 4114,
    RtsAutoPLayFaild: 4115,
    RtsPlayUrlError: 4116,
    RtsSubscribeNonthing: 4117,
    RtsHtmlElementError: 4118,
    RtsHtmlElementNotMatch: 4119,
    RtsBrowserNotSupportRtc: 4120,
    RtsHttpRequestFaild: 4121,
    RtsHttpAnswerFaild: 4122,
    RtsPeerConnectionUnknown: 4123,
};

const AuthKeyExpired = 7200;
const AuthKeyRefreshExpired = 7e3;
const AuthInfoExpired = 100;

const VideoErrorCode = {
    1: 4015, 
    2: 4016, 
    3: 4013, 
    4: 4400
};
const IconType = {
    FontClass: "fontclass",
    Symbol: "symbol",
    Sprite: "Sprite",
};
const SelectedStreamLevel = "selectedStreamLevel";
const SelectedCC = "selectedCC";
const WidthMapToLevel = {
    0: "OD",
    640: "FD",
    960: "LD",
    1280: "SD",
    1920: "HD",
    2580: "2K",
    3840: "4K",
};

const VideoErrorCodeText = {};
const VideoLevels = {};
const QualityLevels = {};
const SpeedLevels = [];

function updateByLanguage() {
    Object.assign(VideoErrorCodeText, {
        1: lang.get("Error_Load_Abort_Text"),
        2: lang.get("Error_Network_Text"),
        3: lang.get("Error_Decode_Text"),
        4: lang.get("Error_Server_Network_NotSupport_Text")
    });
    Object.assign(VideoLevels, {
        0: lang.get("OD"),
        640: lang.get("FD"),
        960: lang.get("LD"),
        1280: lang.get("SD"),
        1920: lang.get("HD"),
        2580: lang.get("2K"),
        3840: lang.get("4K"),
    });
    Object.assign(QualityLevels, {
        OD: lang.get("OD"),
        LD: lang.get("LD"),
        FD: lang.get("FD"),
        SD: lang.get("SD"),
        HD: lang.get("HD"),
        "2K": lang.get("2K"),
        "4K": lang.get("4K"),
        XLD: lang.get("XLD"),
        FHD: lang.get("FHD"),
        SQ: lang.get("SQ"),
        HQ: lang.get("HQ"),
    });
    const newSpeedLevels = [
        { key: 0.5, text: lang.get("Speed_05X_Text") },
        { key: 1, text: lang.get("Speed_1X_Text") },
        { key: 1.25, text: lang.get("Speed_125X_Text") },
        { key: 1.5, text: lang.get("Speed_15X_Text") },
        { key: 2, text: lang.get("Speed_2X_Text") },
    ];
    SpeedLevels.splice(0, newSpeedLevels.length, ...newSpeedLevels);
}

updateByLanguage();

export default {
    LOAD_START,
    LOADED_METADATA,
    LOADED_DATA,
    PROGRESS,
    CAN_PLAY,
    CAN_PLYA_THROUGH,
    PLAY,
    PAUSE,
    ENDED,
    PLAYING,
    WAITING,
    ERROR,
    SUSPEND,
    STALLED,
    AuthKeyExpiredEvent,
    DRMKeySystem,
    EncryptionType,
    VodEncryptionType,
    DRMType,
    ErrorCode,
    AuthKeyExpired,
    AuthKeyRefreshExpired,
    AuthInfoExpired,
    VideoErrorCode,
    IconType,
    SelectedStreamLevel,
    SelectedCC,
    WidthMapToLevel,
    VideoErrorCodeText,
    VideoLevels,
    QualityLevels,
    SpeedLevels,
    updateByLanguage
}