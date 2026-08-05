import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'admin-reports',
	templateUrl: 'admin-reports.pug',
})
export class AdminReports {
}
