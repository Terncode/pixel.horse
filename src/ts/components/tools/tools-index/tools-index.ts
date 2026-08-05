import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
	selector: 'tools-index',
	templateUrl: 'tools-index.pug',
})
export class ToolsIndex {
}
