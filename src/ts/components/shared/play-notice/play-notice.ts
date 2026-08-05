import { Component, ChangeDetectionStrategy } from '@angular/core';
import { discordLink } from '../../../client/data';
import { GENERAL_RULES } from '../../../common/constants';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'play-notice',
	templateUrl: 'play-notice.pug',
})
export class PlayNotice {
	readonly discordLink = discordLink;
	readonly rules = GENERAL_RULES;
}
