import { SAY_MAX_LENGTH, PLAYER_NAME_MAX_LENGTH } from './constants';
const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789_';
const uppercaseCharacters = lowercaseCharacters + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CARRIAGERETURN = '\r'.charCodeAt(0);

export function randomString(length: number, useUpperCase = false): string {
	const characters = useUpperCase ? uppercaseCharacters : lowercaseCharacters;
	let result = '';

	for (let i = 0; i < length; i++) {
		result += characters[(Math.random() * characters.length) | 0];
	}

	return result;
}

export function isSurrogate(code: number): boolean {
	return code >= 0xd800 && code <= 0xdbff;
}

export function isLowSurrogate(code: number): boolean {
	return (code & 0xfc00) === 0xdc00;
}

export function fromSurrogate(high: number, low: number): number {
	return (((high & 0x3ff) << 10) + (low & 0x3ff) + 0x10000) | 0;
}

export function charsToCodes(text: string) {
	const chars: number[] = [];

	for (let i = 0; i < text.length; i++) {
		let code = text.charCodeAt(i);

		if (isSurrogate(code) && (i + 1) < text.length) {
			const extra = text.charCodeAt(i + 1);

			if (isLowSurrogate(extra)) {
				code = fromSurrogate(code, extra);
				i++;
			}
		}

		chars.push(code);
	}

	return chars;
}

export function stringToCodes(buffer: Uint32Array, text: string): number {
	const textLength = text.length | 0;
	let length = 0 | 0;

	for (let i = 0; i < textLength; i = (i + 1) | 0) {
		let code = text.charCodeAt(i) | 0;

		if (isSurrogate(code) && ((i + 1) | 0) < textLength) {
			const extra = text.charCodeAt(i + 1) | 0;

			if (isLowSurrogate(extra)) {
				code = fromSurrogate(code, extra) | 0;
				i = (i + 1) | 0;
			}
		}

		if (isVisibleChar(code)) {
			buffer[length] = code;
			length = (length + 1) | 0;
		}
	}

	return length;
}

export let codesBuffer = new Uint32Array(32);

export function stringToCodesTemp(text: string) {
	while (text.length > codesBuffer.length) {
		codesBuffer = new Uint32Array(codesBuffer.length * 2);
	}

	return stringToCodes(codesBuffer, text);
}

export function matcher(regex: RegExp) {
	return (text: string): boolean => !!text && regex.test(text);
}

export function isVisibleChar(code: number) {
	return code !== CARRIAGERETURN && !(code >= 0xfe00 && code <= 0xfe0f);
}


const otherValid = [
	'♂♀⚲⚥⚧☿♁⚨⚩⚦⚢⚣⚤', // gender symbols
	'™®♥♦♣♠❥♡♢♤♧ღஐ·´°•◦✿❀◆◇◈◉◊｡¥€«»，：■□—', // other
	'〈〉「」『』【】《》♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼№●○◌★☆✰✦✧▪▫･', // other 2
	'\u1160\u3000\u3164', // spaces (replaced later)
].join('').split('').reduce((set, c) => (set.add(c.charCodeAt(0)), set), new Set<number>());

export function isValid(c: number): boolean {
	return (c >= 0x0020 && c <= 0x007e) // latin
		|| (c >= 0x00a0 && c <= 0x00ff) // latin 1 supplement
		|| (c >= 0x0100 && c <= 0x017F) // Latin Extended-A
		|| (c >= 0x0180 && c <= 0x024F) // Latin Extended-B
		|| (c >= 0x1e00 && c <= 0x1eff) // Latin Extended Additional
		|| (c >= 0x0370 && c <= 0x03FF) // Greek and Coptic
		|| (c >= 0x0400 && c <= 0x0481) || (c >= 0x048A && c <= 0x04FF) // cyrillic
		|| (c >= 0x3041 && c <= 0x3096) // hiragana
		|| (c >= 0x30A0 && c <= 0x30FF) // hatakana
		|| (c >= 0x3400 && c <= 0x4DB5) || (c >= 0x4E00 && c <= 0x9FCB) || (c >= 0xF900 && c <= 0xFA6A) // kanji
		|| (c >= 0x2F00 && c <= 0x2FDF) // Kangxi Radicals
		|| (c >= 0x3000 && c <= 0x302D) // CJK Symbols and Punctuation
		|| (c >= 0x1D00 && c <= 0x1D7F) // Phonetic Extensions
		|| (c >= 0x0250 && c <= 0x02AF) // IPA Extensions
		|| (c >= 0xA720 && c <= 0xA7FF) // Latin Extended-D
		|| (c >= 0x0E00 && c <= 0x0E7F) // Thai
		|| (c >= 0xff01 && c <= 0xff5e) // Romaji (replaced later)
		|| (c >= 0x2200 && c <= 0x22FF) // Mathematical Operators
		|| (c >= 0x25A0 && c <= 0x25FF) // Geometric Shapes
		|| (c >= 0x2600 && c <= 0x26ff) || (c >= 0x2700 && c <= 0x27bf) || (c >= 0x2b00 && c <= 0x2bef) // emoji
		|| (c >= 0x1f600 && c <= 0x1f64f) || (c >= 0x1f680 && c <= 0x1f6f6) || (c >= 0x1f300 && c <= 0x1f5ff) // emoji
		|| (c >= 0x231a && c <= 0x231b) || (c >= 0x23e9 && c <= 0x23fa) // emoji
		|| (c >= 0x1f900 && c <= 0x1f9ff) // Supplemental Symbols and Pictographs
		|| otherValid.has(c) // other symbols
		;
}

export function isValid2(c: number): boolean {
	return (c >= 0x2b0 && c <= 0x2ff) // Spacing Modifier Letters
		|| (c >= 0x531 && c <= 0x556) || (c >= 0x559 && c <= 0x55f) || (c >= 0x561 && c <= 0x587)
		|| (c >= 0x589 && c <= 0x58a) || (c >= 0x58c && c <= 0x58f) // Armenian
		|| (c >= 0x591 && c <= 0x5c7) || (c >= 0x5d0 && c <= 0x5ea) || (c >= 0x5f0 && c <= 0x5f4) // Hebrew
		|| (c >= 0x600 && c <= 0x6ff) // Arabic
		|| (c >= 0x7c0 && c <= 0x7fa) // NKo
		|| (c >= 0x900 && c <= 0x97f) // Devanagari
		|| (c === 0xb90) || (c === 0xb9c) // Tamil
		|| (c >= 0xc85 && c <= 0xc8c) || (c >= 0xc8e && c <= 0xc90) || (c >= 0xc91 && c <= 0xca8)
		|| (c >= 0xcaa && c <= 0xcb3) || (c >= 0xcb5 && c <= 0xcb9) || (c >= 0xce6 && c <= 0xcef) // Kannada
		|| (c >= 0x10a0 && c <= 0x10c5) || (c === 0x10c7) || (c === 0x10cd) || (c >= 0x10d0 && c <= 0x10ff) // Georgian
		|| (c >= 0x1100 && c <= 0x11ff) || (c >= 0x3130 && c <= 0x318f) || (c >= 0xac00 && c <= 0xd7af) // Hangul
		|| (c >= 0x1400 && c <= 0x167f) // Unified Canadian Aboriginal Syllabics
		|| (c >= 0x2010 && c <= 0x2027) || (c >= 0x2030 && c <= 0x205e)  // General Punctuation
		|| (c >= 0x20a0 && c <= 0x20bf) // Currency Symbols
		|| (c >= 0x2100 && c <= 0x214f) // Letterlike Symbols
		|| (c >= 0x2150 && c <= 0x218b) // Number Forms
		|| (c >= 0x2300 && c <= 0x239a) || (c >= 0x23b4 && c <= 0x23fa) // Miscellaneous Technical
		|| (c >= 0x2500 && c <= 0x257f) // Box Drawing
		|| (c >= 0x2800 && c <= 0x28ff) // Braille Patterns
		|| (c >= 0x3000 && c <= 0x303f) // CJK Symbols and Punctuation
		|| (c >= 0x3105 && c <= 0x312d) // Bopomofo
		|| (c >= 0xfe30 && c <= 0xfe4f) // CJK Compatibility Forms
		|| (c >= 0xff01 && c <= 0xffef) // Halfwidth and Fullwidth Forms
		// || (c >= 0x1f170 && c < 0x1f189) // Enclosed Alphanumeric Supplement [a-z]
		|| (c >= 0x1f000 && c <= 0x1f02b) // Mahjong Tiles
		|| (c >= 0x1f0a0 && c <= 0x1f0ae) || (c >= 0x1f0b1 && c <= 0x1f0bf) || (c >= 0x1f0c1 && c <= 0x1f0cf)
		|| (c >= 0x1f0d1 && c <= 0x1f0df) || (c >= 0x1f0e0 && c <= 0x1f0f5) // Playing Cards
		|| (c >= 0x1f1e6 && c <= 0x1f1ff) // Enclosed Alphanumeric Supplement (regional indicators)
		;
}

function isInvalid(c: number): boolean {
	return c === 0x1f595 // middle finger emoji
		|| c === 0x00ad // soft hyphen
		;
}

function isValidForName(c: number): boolean {
	return isValid(c) && !isInvalid(c);
}

function isValidForMessage(c: number): boolean {
	return (isValid(c) || isValid2(c)) && !isInvalid(c);
}

export const matchRomaji = /[\uff01-\uff5e]/g;

const matchOtherWhitespace = /[\u1160\u2800\u3000\u3164\uffa0]+/g;

export function replaceRomaji(match: string): string {
	return String.fromCharCode(match.charCodeAt(0) - 0xfee0);
}

export function cleanName(name: string | undefined): string {
	return filterString(name, isValidForName)
		.replace(matchOtherWhitespace, ' ') // whitespace characters
		.replace(/\s+/g, ' ')
		.replace(matchRomaji, replaceRomaji)
		.trim();
}

export function cleanMessage(text: string | undefined): string {
	return filterString(text, isValidForMessage)
		.replace(matchOtherWhitespace, ' ') // whitespace characters
		.replace(/[\r\n]/g, '')
		.replace(matchRomaji, replaceRomaji)
		.trim()
		.substr(0, SAY_MAX_LENGTH);
}

export function filterString(value: string | undefined, filter: (code: number) => boolean): string {
	value = value || '';

	for (let i = 0; i < value.length; i++) {
		let code = value.charCodeAt(i);
		let size = 1;
		let invalidSurrogate = false;

		if (isSurrogate(code) && (i + 1) < value.length) {
			const extra = value.charCodeAt(i + 1);

			if (isLowSurrogate(extra)) {
				code = fromSurrogate(code, extra);
				i++;
				size++;
			} else {
				invalidSurrogate = true;
			}
		}

		if (invalidSurrogate || !filter(code)) {
			i -= size;
			value = value.substr(0, i + 1) + value.substr(i + size + 1);
		}
	}

	return value;
}

export function validatePonyName(name: string | undefined): boolean {
	return !!name && !!name.length && name.length <= PLAYER_NAME_MAX_LENGTH && !/^[.,_-]+$/.test(name);
}

