import { Component, Input, OnInit, OnDestroy, OnChanges, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { IntervalUpdateService } from '../../services/intervalUpdateService';
import { formatDistanceToNow } from 'date-fns';

@Component({
	standalone: false,
	selector: 'from-now',
	template: '<span></span>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FromNow implements OnInit, OnDestroy, OnChanges {
	@Input() time?: any;
	private date?: Date;
	private text?: string;
	private unsubscribe?: () => void;
	constructor(private element: ElementRef, private updateService: IntervalUpdateService) {
	}
	ngOnChanges() {
		this.date = this.time ? new Date(this.time) : undefined;
		this.update();
	}
	ngOnInit() {
		this.unsubscribe = this.updateService.subscribe(() => this.update());
		this.update();
	}
	ngOnDestroy() {
		this.unsubscribe && this.unsubscribe();
	}
	private update() {
		const text = this.date
			? formatDistanceToNow(this.date, { addSuffix: false }).replace('seconds', 'secs')
			: '';

		if (this.text !== text) {
			this.text = text;
			(this.element.nativeElement as HTMLElement).children[0].textContent = text;
		}
	}
}
