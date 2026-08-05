import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	standalone: false,
	name: 'siteName',
})
export class SiteNamePipe implements PipeTransform {
	transform(value: string | undefined) {
		const match = String(value || '').match(/(\w+)\.com/);
		return match && match[1];
	}
}
