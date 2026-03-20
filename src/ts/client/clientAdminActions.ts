import { AdminModel } from '../components/services/adminModel';
import { ModelSubscriber } from '../components/services/modelSubscriber';
import { ClientAdminActionsTemplate, ClientUpdate } from '../common/clientAdminActionsTemplate';

export class ClientAdminActions extends ClientAdminActionsTemplate {
	constructor(private model: AdminModel) {
		super();
	}
	connected() {
		this.model.initialize(true);
		this.model.connectedToSocket();
	}
	disconnected() {
		this.model.updateTitle();
	}
	//@Method()
	updates(updates: ClientUpdate[]) {
		for (const { type, id, update } of updates) {
			const model = this.model[type] as ModelSubscriber<any>;

			if (model) {
				model.update(id, update);
			} else {
				console.error(`Invalid model type "${type}"`);
			}
		}
	}
}
