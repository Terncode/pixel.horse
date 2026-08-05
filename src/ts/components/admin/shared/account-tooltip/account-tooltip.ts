import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Account } from '../../../../common/adminInterfaces';
import { getAge } from '../../../../common/adminUtils';

const year = (new Date()).getFullYear();

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'account-tooltip',
	templateUrl: 'account-tooltip.pug',
})
export class AccountTooltip {
	@Input() account!: Account;
	@Input() extendedAuths = false;
	get age() {
		return this.account.birthdate ? getAge(this.account.birthdate) : '-';
	}
	get forceAge() {
		return this.account.birthyear ? (year - this.account.birthyear) : '';
	}
}
