import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faTimes } from '../../../client/icons';
import { InstallService } from '../../services/installService';
import { isMobile } from '../../../client/data';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'install-button',
	templateUrl: 'install-button.pug',
	styleUrls: ['install-button.scss'],
})
export class InstallButton {
	readonly closeIcon = faTimes;
	constructor(private installService: InstallService) {
	}
	get canInstall() {
		return false;
	}
	get isMobile() {
		return isMobile;
	}
	install() {
		this.installService.install();
	}
	dismiss() {
		this.installService.dismiss();
	}
}
