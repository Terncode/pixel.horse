import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	standalone: false,
	selector: 'time-field',
	templateUrl: 'time-field.pug',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeField {
	@Input() time: any;
}
