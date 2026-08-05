import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'kbd-key',
	templateUrl: 'kbd-key.pug',
})
export class KbdKey {
	@Input() title?: string;
}
