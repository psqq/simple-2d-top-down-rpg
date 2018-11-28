import Action from "./action";
import FinisingAction from "./finishing-action";

export default class EventManager {
    private onKeyDownActions: { [s: string]: Action; } = {};
    private onOnlyKeyDownActions: { [s: string]: FinisingAction; } = {};
    init() {
        let self = this;
        window.addEventListener('keydown', (ev) => {
            var action = self.onOnlyKeyDownActions[ev.key];
            if (action != null && !action.isExecuted())
                action.execute();
        });
        window.addEventListener('keyup', (ev) => {
            var action = self.onOnlyKeyDownActions[ev.key];
            if (action != null)
                action.finish();
        });
    }
    onKeyDwon(key: string, action: Action) {
        this.onKeyDownActions[key] = action;
    }
    onOnlyKeyDwon(key: string, action: FinisingAction) {
        this.onOnlyKeyDownActions[key] = action;
    }
}