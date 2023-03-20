import { Dimensions, Linking, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on figma screen mobile device size
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 780;

export const scale = (size: number) =>
    PixelRatio.roundToNearestPixel(
        (Math.min(width, height) / guidelineBaseWidth) * size,
    );

export const verticalScale = (size: number) =>
    PixelRatio.roundToNearestPixel(
        (Math.max(width, height) / guidelineBaseHeight) * size,
    );

export const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export const normalize = (size: number) => {
    let newSize = (Math.min(width, height) / guidelineBaseWidth) * size;
    // let newSize =
    // Math.min(width / guidelineBaseWidth, height / guidelineBaseHeight) *
    // size;

    if (width / height > 0.6) newSize = 0.95 * newSize;

    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)); // - 2;
    }
};

export const normalizeVertical = (size: number) => {
    let newSize = (Math.max(width, height) / guidelineBaseHeight) * size;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const isEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
};

export const currencyFormat = (
    value: number,
    currency = '€',
    curr?: string | undefined,
) => {
    let string = parseFloat(value?.toString())
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&.')
        .replace(/.([^.]*)$/, ',$1');

    return `${currency} ${
        value % 1 === 0 ? string.slice(0, -2) + '-' : string
    } ${curr || ''}`;
};

export const titleCase = (title: string) => {
    const splitStr = title.split(' ');

    const cased = splitStr.map(
        (item: string) => item.charAt(0) + item.substring(1).toLowerCase(),
    );

    return cased.join(' ');
};

export const getWeekString = (
    dayOfWeek: number,
    t: (
        scope: I18n.Scope,
        options?: I18n.TranslateOptions | undefined,
    ) => string,
) => {
    if (dayOfWeek === 1) {
        return t('common.datePicker.dayNamesShort.mon');
    } else if (dayOfWeek === 2) {
        return t('common.datePicker.dayNamesShort.tue');
    } else if (dayOfWeek === 3) {
        return t('common.datePicker.dayNamesShort.wed');
    } else if (dayOfWeek === 4) {
        return t('common.datePicker.dayNamesShort.thu');
    } else if (dayOfWeek === 5) {
        return t('common.datePicker.dayNamesShort.fri');
    } else if (dayOfWeek === 6) {
        return t('common.datePicker.dayNamesShort.sat');
    } else {
        return t('common.datePicker.dayNamesShort.sun');
    }
};

export const getMothString = (
    month: number,
    t: (
        scope: I18n.Scope,
        options?: I18n.TranslateOptions | undefined,
    ) => string,
) => {
    if (month === 1) {
        return t('common.datePicker.monthNames.january');
    } else if (month === 2) {
        return t('common.datePicker.monthNames.february');
    } else if (month === 3) {
        return t('common.datePicker.monthNames.march');
    } else if (month === 4) {
        return t('common.datePicker.monthNames.april');
    } else if (month === 5) {
        return t('common.datePicker.monthNames.may');
    } else if (month === 6) {
        return t('common.datePicker.monthNames.june');
    } else if (month === 7) {
        return t('common.datePicker.monthNames.july');
    } else if (month === 8) {
        return t('common.datePicker.monthNames.august');
    } else if (month === 9) {
        return t('common.datePicker.monthNames.september');
    } else if (month === 10) {
        return t('common.datePicker.monthNames.october');
    } else if (month === 11) {
        return t('common.datePicker.monthNames.november');
    } else {
        return t('common.datePicker.monthNames.december');
    }
};

export const getMothStringShort = (
    month: number,
    t: (
        scope: I18n.Scope,
        options?: I18n.TranslateOptions | undefined,
    ) => string,
) => {
    if (month === 1) {
        return t('common.datePicker.monthNamesShort.jan');
    } else if (month === 2) {
        return t('common.datePicker.monthNamesShort.feb');
    } else if (month === 3) {
        return t('common.datePicker.monthNamesShort.march');
    } else if (month === 4) {
        return t('common.datePicker.monthNamesShort.april');
    } else if (month === 5) {
        return t('common.datePicker.monthNamesShort.may');
    } else if (month === 6) {
        return t('common.datePicker.monthNamesShort.june');
    } else if (month === 7) {
        return t('common.datePicker.monthNamesShort.july');
    } else if (month === 8) {
        return t('common.datePicker.monthNamesShort.aug');
    } else if (month === 9) {
        return t('common.datePicker.monthNamesShort.sep');
    } else if (month === 10) {
        return t('common.datePicker.monthNamesShort.oct');
    } else if (month === 11) {
        return t('common.datePicker.monthNamesShort.nov');
    } else {
        return t('common.datePicker.monthNamesShort.dec');
    }
};


export const asc = (a?: number | string, b?: number | string) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    }
    if (!!a && !!b) {
        if (a < b) return -1;
        if (a > b) return 1;
    }

    return 0;
};

export const desc = (a?: number | string, b?: number | string) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return b - a;
    }
    if (!!a && !!b) {
        if (a < b) return 1;
        if (a > b) return -1;
    }
    return 0;
};

export const isNumeric = (value?: string) => {
    if (value) {
        return /^-?\d+$/.test(value);
    }
    return false;
};

export const number = (text: string) => {
    let value;
    if (text.match(',') !== null) {
        value = text.replace(',', '.');
    } else {
        value = text;
    }
    if (value.substring(0, 1) === '.') {
        if (text.length > 1) {
            value = `0.${value.substring(1, value.length)}`;
        } else {
            return '0.';
        }
    }
    let result;
    if (value.match(/[*.*][0-9]*[*.*]/) !== null) {
        if (value.match(/\.$/)) {
            result = value.replace(/\.$/, '');
        } else {
            result = value.replace(/[.]/, '');
        }
    } else {
        result = value;
    }

    return result.replace(/[^\d.]/g, '');
};

export const comaNumber = (text: string) => {
    let result = text.replace(/[^\d]/g, '');

    if (result.length < 4) {
        for (let step = result.length; step < 4; step += 1) {
            result = 0 + result;
        }
    }

    if (result?.length > 4 && result.charAt(0) === '0') {
        result = result.substring(1);
    }

    result = `${result.slice(0, result.length - 2)},${result.slice(
        result.length - 2,
    )}`;

    return result;
};

export function* datesInInterval(i: Interval) {
    let cursor = i.start.startOf('day');
    while (cursor < i.end) {
        yield cursor;
        cursor = cursor.plus({ days: 1 });
    }
}

export const withOutHtml = (string: string) => {
    const addSpace = string?.replace('><div', '>\n<div');
    return addSpace?.replace(/(<([^>]+)>)/gi, '')?.replace('&nbsp;', ' ');
};

export const getNumberFromString = (string: string) =>
    string.replace(/^\D+/g, '');

export const toCamel = (s: string) => {
    return s?.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

export const removeSnake = (s: string) => {
    return s?.replace(/([-_.][a-z])/gi, $1 => {
        return $1.replace('-', ' ').replace('_', ' ').replace('.', ' ');
    });
};

export const getSomeDigitLength = (text: string, length: number) => {
    let result = text.replace(/[^\d]/g, '');

    if (result.length < length) {
        for (let step = result.length; step < length; step += 1) {
            result = 0 + result;
        }
    }

    if (result?.length > length && result.charAt(0) === '0') {
        result = result.substring(1);
    }

    if (result?.length > length && result.charAt(0) !== '0') {
        result = result.substring(0, length);
    }

    return result;
};

export const getInitials = (fullName: string) => {
    const names = fullName?.split(' ');
    let initials = names?.length
        ? names[0]?.substring(0, 1)?.toUpperCase()
        : '';

    if (names?.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export const checkPassword = (password: string) => {
    if (password.match(/^(?=.*\d)(?=.*[A-Za-z])[\W\S_]{6,}$/)) {
        return true;
    }
    return false;
};

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export { width, height };
