import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	standalone: false,
	selector: 'site-links',
	templateUrl: 'site-links.pug',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteLinks {
	@Input() links: string[] = [];
}
