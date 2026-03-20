import { Method } from 'ag-sockets';
import { ModelTypes } from './adminInterfaces';

export interface ClientUpdate {
	type: ModelTypes;
	id: string;
	update: any;
}

export class ClientAdminActionsTemplate {
	connected() {}
	disconnected() {}
	@Method()
	updates(_updates: ClientUpdate[]) {}
}
