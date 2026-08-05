import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	standalone: false,
	name: 'keys',
})
export class KeysPipe implements PipeTransform {
	transform(value: any) {
		return value ? Object.keys(value) : value;
	}
}
