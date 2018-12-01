import Action from "./action";
import FinisingAction from "./finishing-action";
import DataAction from "./data-action";

export default class EventManager {
    private onKeyDownActions: { [s: string]: Action; } = {};
    private onScrollUpActions: Action[] = [];
    private onScrollDownActions: Action[] = [];
    private onMouseDownActions: DataAction<MouseEvent>[] = [];
    private onRightClickActions: DataAction<MouseEvent>[] = [];
    private onLeftClickActions: DataAction<MouseEvent>[] = [];
    private onOnlyKeyDownActions: { [s: string]: FinisingAction; } = {};
    private _noContextMenu: boolean = false;
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
            for(var action of self.onMouseDownActions) {
                action.execute(ev);
            }
        });
        window.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (ev.button === 0) {
                for(var action of self.onLeftClickActions) {
                    action.execute(ev);
                }
            }
        });
        window.addEventListener('contextmenu', (ev) => {
            if (self._noContextMenu) {
                ev.preventDefault();
            }
            for(var action of self.onRightClickActions) {
                action.execute(ev);
            }
        });
        window.addEventListener('wheel', (ev) => {
            var delta = ev.deltaY || ev.detail || ev.wheelDelta;
            if (delta < 0) {
                for(var action of self.onScrollUpActions) {
                    action.execute();
                }
            }
            if (delta > 0) {
                for(var action of self.onScrollDownActions) {
                    action.execute();
                }
            }
        });
        return this;
    }
    noContextMenu() {
        this._noContextMenu = true;
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
    onRightClick(action: DataAction<MouseEvent>) {
        this.onRightClickActions.push(action);
    }
    onLeftClick(action: DataAction<MouseEvent>) {
        this.onLeftClickActions.push(action);
    }
    onScrollUp(action: Action) {
        this.onScrollUpActions.push(action);
    }
    onScrollDown(action: Action) {
        this.onScrollDownActions.push(action);
    }
}
