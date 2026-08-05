import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Auth } from '../../../../common/adminInterfaces';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'auth-list',
	templateUrl: 'auth-list.pug',
	styleUrls: ['auth-list.scss'],
	host: {
		'[class.extended]': 'extended',
	},
})
export class AuthList {
	@Input() limit = 6;
	@Input() extended = false;
	@Input() auths?: Auth[];
	get fixedAuths() {
		return this.auths || [];
	}
}
