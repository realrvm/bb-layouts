// mods
export const IS_PROD = import.meta.env.PROD;
export const IS_DEV = import.meta.env.DEV;

// widths
export const DESKTOP_WIDTH = 1200;
export const NOTEBOOK_WIDTH = 900;
export const TABLET_WIDTH = 768;

// is digits
export const DIGIT_REG = new RegExp(/^\d+$/);

// url
export const API_URL = "https://api.bibimoney.ru/api/v1";

// storage
export const STORAGE = window.localStorage;

// localstorage
export const LOCAL_STORAGE_TOKEN = "token";
export const LOCAL_STORAGE_SITE_HAS_VISITED = "has_visited";

// loan credit values
export const MIN_LOAN_VALUE = 50_000;
export const MAX_LOAN_VALUE = 1_000_000;

// max accordion index
export const MAX_ACCORDION_INDEX = 333;

// plate length
export const CORRECT_PLATE_LENGTH = 6;
export const SHORT_REGION_NUMBER = 2;
export const LONG_REGION_NUMBER = 3;

// polling interval
export const POLLING_INTERVAL = 1000;
