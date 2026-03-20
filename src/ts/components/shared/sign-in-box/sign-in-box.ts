import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { signUpProviders, signInProviders, local } from '../../../client/data';
import { emptyIcon, oauthIcons } from '../../../client/icons';
import { OAuthProvider } from '../../../common/interfaces';
import { HttpClient } from '@angular/common/http';
import { noop } from 'rxjs';
import { observableToPromise } from '../../../common/utils';

export function getProviderIcon(id: string) {
	return oauthIcons[id] || emptyIcon;
}

@Component({
	selector: 'sign-in-box',
	templateUrl: 'sign-in-box.pug',
	styleUrls: ['sign-in-box.scss'],
})
export class SignInBox implements OnInit {
	readonly signUpProviders = signUpProviders;
	readonly signInProviders = signInProviders;
	readonly local = local || DEVELOPMENT;
	@Output() signIn = new EventEmitter<OAuthProvider>();
	mocks?: string[][] = undefined;
	constructor(private http: HttpClient) {}

	async ngOnInit() {
		observableToPromise(this.http.get<string[][]>('/auth/mocks', undefined))
			.then(data => {
				this.mocks = data;
			})
			.catch(noop)
	}
	async createNew() {
		const name = prompt('Account name');
		if (name) {
			const data = await observableToPromise(this.http.post<string[]>('/auth/create-account', {name }));
			if (!this.mocks) {
				this.mocks = [];
			}
			this.mocks.push(data);
		}
	}
	icon(id: string) {
		return getProviderIcon(id);
	}
	signInTo(provider: OAuthProvider) {
		this.signIn.emit(provider);
	}
}
