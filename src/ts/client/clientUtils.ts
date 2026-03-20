import { clamp } from 'lodash';
import {
	SocialSite, SocialSiteInfo, Eye, Muzzle, Iris, ExpressionExtra, Expression, ServerInfo, ServerFeatureFlags,
	AccountData, AccountDataFlags
} from '../common/interfaces';
import {
	SAY_MAX_LENGTH, SAYS_TIME_MIN, SAYS_TIME_MAX, isChatlogRangeUnlimited, SUPPORTER_REWARDS,
	PAST_SUPPORTER_REWARDS
} from '../common/constants';
import { matcher } from '../common/stringUtils';
import { oauthProviders } from './data';
import { Subject } from '../../../node_modules/rxjs';
import { PonyTownGame } from './game';
import { toScreenX, toScreenY } from '../common/positionUtils';
import { hasFlag } from '../common/utils';

export const matchCyrillic = /[\u0400-\u04FF]/g;
export const containsCyrillic = matcher(matchCyrillic);
export function toSocialSiteInfo({ id, name, url, provider }: SocialSite): SocialSiteInfo {
	const oauth = oauthProviders.find(p => p.id === provider);

	return {
		id,
		name,
		url,
		icon: oauth && oauth.id,
		color: oauth && oauth.color,
	};
}

function isMultipleMatch(message: string, last: string): boolean {
	const minMessageLength = 4;

	if (message.length >= minMessageLength && last.length >= minMessageLength) {
		let current = last;

		while (current.length < message.length) {
			current += last;
		}

		return message === current.substr(0, SAY_MAX_LENGTH);
	} else {
		return false;
	}
}

function checkTrailing(message: string, last: string) {
	return message.indexOf(last) === 0 && (message.length - last.length) < 3;
}

function isTrailingMatch(message: string, last: string) {
	const minMessageLength = 5;

	if (message.length > last.length && last.length > minMessageLength) {
		return checkTrailing(message, last);
	} else if (message.length < last.length && message.length > minMessageLength) {
		return checkTrailing(last, message);
	} else {
		return false;
	}
}

export function isSpamMessage(message: string, lastMessages: string[]): boolean {
	if (!/^\//.test(message) && lastMessages.length) {
		return lastMessages.some(last => message === last || isMultipleMatch(message, last) || isTrailingMatch(message, last));
	} else {
		return false;
	}
}

export function getSaysTime(message: string): number {
	return SAYS_TIME_MIN + clamp(message.length / SAY_MAX_LENGTH, 0, 1) * (SAYS_TIME_MAX - SAYS_TIME_MIN);
}

export function createExpression(
	right: Eye, left: Eye, muzzle: Muzzle, rightIris = Iris.Forward, leftIris = Iris.Forward, extra = ExpressionExtra.None
): Expression {
	return { right, left, muzzle, rightIris, leftIris, extra };
}

export const isAndroidBrowser = (() => {
	const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;

	// Android browser
	// Mozilla/5.0 (Linux; U; Android 4.4.2; es-ar; LG-D375AR Build/KOT49I)
	// AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.1599.103 Mobile Safari/537.36
	if (/Android /.test(ua) && /AppleWebKit/.test(ua) && (!/chrome/i.test(ua) || /Chrome\/30\./.test(ua))) {
		return true;
	}

	return false;
})();

/* istanbul ignore next */
export const isBrowserOutdated = (() => {
	const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent;

	// Safari <= 8
	// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1)
	// AppleWebKit/600.1.25 (KHTML, like Gecko) Version/8.0 Safari/600.1.25
	const safari = /Version\/(\d+)\.[0-9.]+ Safari/.exec(ua);

	if (safari && parseInt(safari[1], 10) <= 8) {
		return true;
	}

	// Android browser
	// Mozilla/5.0 (Linux; U; Android 4.4.2; es-ar; LG-D375AR Build/KOT49I)
	// AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.1599.103 Mobile Safari/537.36
	if (isAndroidBrowser) {
		return true;
	}

	if (!supportsLetAndConst()) {
		return true;
	}

	return false;
})();

export function getLocale() {
	return (navigator.languages ? navigator.languages[0] : navigator.language) || 'en-US';
}

/* istanbul ignore next */
export function isLanguage(lang: string) {
	const languages = navigator.languages || [navigator.language];
	return languages.some(l => l === lang);
}

/* istanbul ignore next */
export function sortServersForRussian(a: ServerInfo, b: ServerInfo) {
	if (a.flag === 'ru' && a.flag !== b.flag) {
		return -1;
	}

	if (b.flag === 'ru' && a.flag !== b.flag) {
		return 1;
	}

	return a.id.localeCompare(b.id);
}

export function readFileAsText(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e: any) => resolve(e.target && e.target.result || '');
		reader.onerror = () => reject(new Error('Failed to read file'));
		reader.readAsText(file);
	});
}

/* istanbul ignore next */
export function isFileSaverSupported() {
	try {
		return !!new Blob;
	} catch {
		return false;
	}
}

export let isInIncognitoMode = false;

export function setIsIncognitoMode(value: boolean) {
	isInIncognitoMode = value;
}

/* istanbul ignore next */
function checkIncognitoMode(wnd: any) {
	if (!wnd || !wnd.chrome)
		return;

	const fs = wnd.RequestFileSystem || wnd.webkitRequestFileSystem;

	if (!fs)
		return;

	fs(wnd.TEMPORARY, 100, () => { }, () => isInIncognitoMode = true);
}

let focused = true;

/* istanbul ignore next */
export function isFocused() {
	return focused;
}

/* istanbul ignore next */
if (typeof window !== 'undefined') {
	checkIncognitoMode(window);
	window.addEventListener('focus', () => focused = true);
	window.addEventListener('blur', () => focused = false);
}

/* istanbul ignore next */
export function isStandalone() {
	return !!window.matchMedia('(display-mode: standalone)').matches ||
		(window.navigator as any).standalone === true; // safari
}

/* istanbul ignore next */
export function supportsLetAndConst() {
	try {
		return (new Function('let x = true; return x;'))();
	} catch {
		return false;
	}
}

/* istanbul ignore next */
export function registerServiceWorker(url: string, onUpdate: () => void) {
	try {
		if ('serviceWorker' in navigator && typeof navigator.serviceWorker.register === 'function') {
			let hadWorker = false;

			navigator.serviceWorker.register(url)
				.then(worker => {
					hadWorker = !!worker.active;

					worker.addEventListener('updatefound', () => {
						if (hadWorker) {
							onUpdate();
						}
					});
				});

			navigator.serviceWorker.addEventListener('controllerchange', () => {
				if (hadWorker) {
					location.reload();
				}
			});
		}
	} catch (e) {
		console.error(e);
	}
}

/* istanbul ignore next */
export function unregisterServiceWorker() {
	if ('serviceWorker' in navigator && typeof navigator.serviceWorker.getRegistrations === 'function') {
		return navigator.serviceWorker.getRegistrations()
			.then(registrations => {
				for (const registration of registrations) {
					registration.unregister();
				}
			});
	} else {
		return Promise.resolve();
	}
}

/* istanbul ignore next */
export function attachDebugMethod(name: string, method: any) {
	if (typeof window !== 'undefined') {
		(window as any)[name] = method;
	}
}

/* istanbul ignore next */
export function updateRangeIndicator(range: number | undefined, { player, scale, camera }: PonyTownGame) {
	const e = document.getElementById('range-indicator')!;

	if (player && !isChatlogRangeUnlimited(range)) {
		const x = (toScreenX(player.x) - camera.x) * scale;
		const y = (toScreenY(player.y) - camera.actualY) * scale;
		const w = toScreenX(range!) * scale * 2;
		const h = toScreenY(range!) * scale * 2;
		e.style.width = `${w}px`;
		e.style.height = `${h}px`;
		e.style.left = `${-w / 2}px`;
		e.style.top = `${-h / 2}px`;
		e.style.transform = `translate3d(${x}px, ${y}px, 0)`;
		e.style.display = 'block';
	} else {
		e.style.display = 'none';
	}
}

/* istanbul ignore next */
export function checkIframeKey(iframeId: string, expectedKey: string) {
	try {
		const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
		const doc = iframe && iframe.contentWindow && iframe.contentWindow.document;
		const key = doc && doc.body && doc.body.getAttribute('data-key');
		return key === expectedKey;
	} catch (e) {
		if (DEVELOPMENT) {
			console.error(e);
		}

		return false;
	}
}

let flags: ServerFeatureFlags = {};

export const featureFlagsChanged = new Subject<ServerFeatureFlags>();

export function initFeatureFlags(newFlags: ServerFeatureFlags) {
	flags = newFlags;
	featureFlagsChanged.next(newFlags);
}

export function hasFeatureFlag(flag: keyof ServerFeatureFlags) {
	return !!flags[flag];
}

export function hardReload() {
	unregisterServiceWorker()
		.then(() => location.reload(true));
}

const LOGGING = false;

let logger = (_: string) => { };

export function initLogger(newLogger: (message: string) => void) {
	if (LOGGING) {
		logger = newLogger;
	}
}

export function log(message: string) {
	if (LOGGING) {
		logger(message);
	}
}

export function isSupporterOrPastSupporter(account: AccountData | undefined) {
	return !!account && (!!account.supporter || hasFlag(account.flags, AccountDataFlags.PastSupporter));
}

export function supporterTitle(account: AccountData | undefined) {
	if (account && account.supporter) {
		return `Supporter Tier ${account.supporter}`;
	} else if (account && hasFlag(account.flags, AccountDataFlags.PastSupporter)) {
		return 'Past supporter';
	} else {
		return '';
	}
}

export function supporterClass(account: AccountData | undefined) {
	if (account && account.supporter) {
		return `supporter-${account.supporter}`;
	} else if (account && hasFlag(account.flags, AccountDataFlags.PastSupporter)) {
		return 'supporter-past';
	} else {
		return 'd-none';
	}
}

export function supporterRewards(account: AccountData | undefined) {
	if (account && account.supporter) {
		return SUPPORTER_REWARDS[account.supporter];
	} else if (account && hasFlag(account.flags, AccountDataFlags.PastSupporter)) {
		return PAST_SUPPORTER_REWARDS;
	} else {
		return SUPPORTER_REWARDS[0];
	}
}
