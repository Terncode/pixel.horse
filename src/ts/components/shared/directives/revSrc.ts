import { Directive, Input, HostBinding } from '@angular/core';
import { getUrl } from '../../../client/rev';

@Directive({
	standalone: false,
	selector: '[revSrc]',
})
export class RevSrc {
	@HostBinding() get src() {
		return this.revSrc && getUrl(this.revSrc);
	}
	@Input() revSrc?: string;
}
