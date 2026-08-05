import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'email-list',
	templateUrl: 'email-list.pug',
})
export class EmailList {
	@Input() emails?: string[];
	limit = 3;
	get hasMore() {
		return this.emails && this.emails.length > this.limit;
	}
	showMore() {
		this.limit = 9999;
	}
}
