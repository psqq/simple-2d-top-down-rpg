import Action from "./action";
import FinisingAction from "./finishing-action";
import DataAction from "./data-action";

export default class EventManager {
    private onKeyDownActions: { [s: string]: Action; } = {};
    private onScrollUpActions: Action[] = [];
    private onScrollDownActions: Action[] = [];
    private onMouseDownActions: DataAction<MouseEvent>[] = [];
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
        window.addEventListener('mousedown', (ev) => {
            ev.preventDefault();
            for(var action of this.onMouseDownActions) {
                action.execute(ev);
            }
        });
        window.addEventListener('wheel', (ev) => {
            var delta = ev.deltaY || ev.detail || ev.wheelDelta;
            if (delta < 0) {
                for(var action of this.onScrollUpActions) {
                    action.execute();
                }
            }
            if (delta > 0) {
                for(var action of this.onScrollDownActions) {
                    action.execute();
                }
            }
        });
        return this;
    }
    noContextMenu() {
        window.addEventListener('contextmenu', function (ev) {
            ev.preventDefault();
        });
        return this;
    }
    onKeyDwon(key: string, action: Action) {
        this.onKeyDownActions[key] = action;
    }
    onOnlyKeyDwon(key: string, action: FinisingAction) {
        this.onOnlyKeyDownActions[key] = action;
    }
    onMouseDown(action: DataAction<MouseEvent>) {
        this.onMouseDownActions.push(action);
    }
    onScrollUp(action: Action) {
        this.onScrollUpActions.push(action);
    }
    onScrollDown(action: Action) {
        this.onScrollDownActions.push(action);
    }
}
