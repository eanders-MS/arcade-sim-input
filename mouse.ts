
namespace input {
    enum MouseButton {
        Left,
        Right
    }

    enum MouseButtonEvent {
        Pressed,
        Released
    }

    export type MouseButtonEventHandler = (button: MouseButton, event: MouseButtonEvent) => void;

    const SIM_INPUT_KEY = "sim_input";
    const MOUSE_BUTTON_HANDLERS_KEY = SIM_INPUT_KEY + "_mouse_button_handlers";

    export function onMouseButtonEvent(button: MouseButton, event: MouseButtonEvent, handler: () => void) {
        const handlers = getMouseButtonEventHandlers(true);
        handlers.push((_button, _event) => {
            if (_button === button && _event === event) { handler(); }
        });
    }

    function getSceneData(key: string) {
        return game.currentScene().data[key];
    }

    function getMouseButtonEventHandlers(init = false): MouseButtonEventHandler[] {
        let handlers = getSceneData(MOUSE_BUTTON_HANDLERS_KEY) as MouseButtonEventHandler[];
        if (!handlers && init) {
            handlers = game.currentScene().data[MOUSE_BUTTON_HANDLERS_KEY] = [];
        }
        return handlers;
    }
}