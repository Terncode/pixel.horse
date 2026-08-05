import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'admin-sign-in',
	templateUrl: 'admin-sign-in.pug',
})
export class AdminSignIn {
}
