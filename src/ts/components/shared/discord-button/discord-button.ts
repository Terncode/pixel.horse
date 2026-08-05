import { Component, ChangeDetectionStrategy } from '@angular/core';
import { discordLink } from '../../../client/data';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'discord-button',
	templateUrl: 'discord-button.pug',
	styleUrls: ['discord-button.scss'],
})
export class DiscordButton {
	readonly discordLink = discordLink;
	constructor() {
	}
}
