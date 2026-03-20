import { LogEntry } from '../common/adminInterfaces';
import { highlightWords, SupporterChange } from '../common/adminUtils';
import { element, textNode } from './htmlUtils';
import { faCaretSquareDown, faCaretSquareUp, faClock, faMinusCircle, faPlusCircle } from './icons';
import { escape } from 'lodash';

export function createSupporterChanges(entries: LogEntry[]): SupporterChange[] {
	const changes = entries.map(l => ({
		message: l.message,
		level: +((/\d+/.exec(l.message) || ['0'])[0]),
		added: /added/i.test(l.message),
		date: new Date(l.date),
		icon: /added/i.test(l.message) ? faPlusCircle : (/decline/i.test(l.message) ? faClock : faMinusCircle),
		class: /added/i.test(l.message) ? 'text-success' : (/decline/i.test(l.message) ? 'text-warning' : 'text-danger'),
	}));

	for (let i = 1; i < changes.length; i++) {
		const prev = changes[i - 1];
		const current = changes[i];

		if (current.date.getMonth() !== prev.date.getMonth()) {
			current.class += ' border-left border-success pl-2';
		}

		if (current.added && prev.added) {
			if (current.level > prev.level) {
				current.icon = faCaretSquareUp;
				current.class = 'text-info';
			} else if (current.level < prev.level) {
				current.icon = faCaretSquareDown;
				current.class = 'text-info';
			}
		}
	}

	return changes;
}

function formatChatLine(l: string): HTMLElement {
	// 00:00:01 [system] Timed out for swearing
	// 00:00:01 [patreon] fetched patreon data
	// 00:00:01 [dev][Autumn Leafs] hello world
	// 00:00:01 [dev][Autumn Leafs][muted] hello world
	// 00:00:01 [dev][Autumn Leafs][ignored] hello world
	// 00:00:01 [dev-pl][Autumn Leafs][ignored] hello world
	// 00:00:01 [57a3dc6f2f0019a161cdebf6][dev][Autumn Leafs][ignored] hello world
	// 00:00:01 [1][dev][Autumn Leafs][ignored] hello world
	// 00:00:01 [1:merged][dev][Autumn Leafs][ignored] hello world
	// 00:00:01 [merged][dev][Autumn Leafs][ignored] hello world
	// 00:00:01 [merged][dev][main][Autumn Leafs][ignored] hello world

	/* tslint:disable:max-line-length */
	const regex = /^([0-9:]+) (\[(?:merged|\d+|\d+:merged|[a-z0-9]{24})\])?\[([a-z0-9_-]+)\](?:\[([a-z0-9_-]+)\])?((?:\[.*?\])?)(?:\[(muted|ignored|ignorepub)\])?\t(.*)$/;
	const m = regex.exec(l);

	if (m) {
		const [, time, accountId, server, map, name, mutedIgnored, message] = m;
		const messageTag = server === 'system' ? 'system' : getMessageTag(message);
		const modTag = mutedIgnored ? ' message-muted' : '';

		return element('div', 'chatlog-line', [
			element('span', 'time', [], { 'data-text': time }),
            accountId ? element('span', 'account-id', [textNode(accountId)]) : undefined,
            element('span', `server server-${server.replace(/-.+$/g, '')}`, [textNode(`[${server}]`)]),
            map ? element('span', `map map-${map}`, [textNode(`[${map}]`)]) : undefined,
            element('span', mutedIgnored ? `name ${mutedIgnored}` : `name`, [textNode(name)]),
            textNode(' '),
            element('span', `message message-${messageTag}${modTag}`, [textNode(message)]),
            textNode(' '),
            element('a', 'chat-translate', [], undefined, { click: translateChat }),
		]);
	} else {
		return element('div', '', [textNode(highlightWords(l))]);
	}
}

function translateChat(this: HTMLElement) {
	const lines: string[] = [];
	let parent = this.parentElement;

	for (let i = 0; parent && i < 10; i++) {
		lines.push(parent.querySelector('.message')!.textContent!);
		parent = parent.nextElementSibling as HTMLElement;
	}

	window.open(`https://translate.google.com/#auto/en/${encodeURIComponent(lines.join('\n'))}`);
}

if (typeof window !== 'undefined') {
	(window as any).goToAccount = (accountId: string) => {
		window.dispatchEvent(new CustomEvent('go-to-account', { detail: accountId }));
	};
}

export function formatChat(chat: string): HTMLElement[] {
	return (chat || '<no messages>')
		.trim()
		.split(/\r?\n/g)
		.reverse()
		.map(formatChatLine);
}


function getMessageTag(message: string) {
	if (/^\/p /.test(message)) {
		return 'party';
	} else if (/^\/w /.test(message)) {
		return 'whisper';
	} else if (/^\/s[s123] /.test(message)) {
		return 'supporter';
	} else if (/^\//.test(message)) {
		return 'command';
	} else {
		return 'none';
	}
}

export function replaceSwears(element: HTMLElement) {
	const text = element.textContent;

	if (text) {
		const replaced = encWithHighlight(text);

		if (text !== replaced) {
			element.innerHTML = replaced;
		}
	}
}

function enc(text?: string): string {
	return escape(text || '');
}

function encWithHighlight(text?: string): string {
	return highlightWords(enc(text || ''));
}

export function formatEventDesc(text: string): string {
	return encWithHighlight(text).replace(/\[([a-z0-f]{24})\]/g, `<a tabindex onclick="goToAccount('$1')">[$1]</a>`);
}

