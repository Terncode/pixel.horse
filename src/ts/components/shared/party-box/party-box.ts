import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PartyMember } from '../../../common/interfaces';
import { PonyTownGame } from '../../../client/game';
import { partyLeaderIcon, offlineIcon } from '../../../client/icons';
import { getPaletteInfo } from '../../../client/pony';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'party-box',
	templateUrl: 'party-box.pug',
	styleUrls: ['party-box.scss'],
})
export class PartyBox {
	readonly leaderIcon = partyLeaderIcon;
	readonly offlineIcon = offlineIcon;
	@Input() member!: PartyMember;
	constructor(private game: PonyTownGame) {
	}
	get paletteInfo() {
		return this.member.pony && getPaletteInfo(this.member.pony);
	}
	click() {
		this.game.select(this.member.pony);
	}
}
