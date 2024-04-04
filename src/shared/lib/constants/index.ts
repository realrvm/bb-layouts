// url
export const API_URL = "https://api.bibimoney.ru/api/v1";

// paths
export const TOKEN_REFRESH = "/token/refresh/";
export const CONFIG_PATH = "/config/";

// mods
export const IS_DEV = import.meta.env.DEV;

// widths
export const DESKTOP_WIDTH = 1240;
export const NOTEBOOK_WIDTH = 900;
export const TABLET_WIDTH = 768;

// max accordion index
export const MAX_ACCORDION_INDEX = 333;

// storage
export const STORAGE = window.sessionStorage;
export const LOCAL_STORAGE_SITE_HAS_VISITED = "has_visited";

// storage tokens
export const STORAGE_TOKEN = "token";

// loan credit values
export const MIN_LOAN_VALUE = 50_000;
export const MAX_LOAN_VALUE = 1_000_000;

// custom interest rate
export const CUSTOM_INTEREST_RATE = 18;

// telegram
export const TELEGRAM = "https://t.me/bibimoney";

// whatsapp
export const WHATSAPP = "whatsapp://send?phone=1234567890";

// is digits
export const DIGIT_REGEX = new RegExp(/^\d+$/);

// otp
export const OTP_LENGTH = 6;

// plate length
export const CORRECT_PLATE_LENGTH = 6;
export const SHORT_REGION_NUMBER = 2;
export const LONG_REGION_NUMBER = 3;

// polling interval
export const POLLING_INTERVAL = 1000;

// photo in profile page approved
export const MAX_PHOTO_IN_PROFILE = 5;
