declare const APP_ID = "DEV_TOOL_CONSOLE_PLUGIN_NAME";
declare const registeredMetadata: {
    DEV_TOOL_CONSOLE_PLUGIN_NAME: {
        frame: boolean;
    };
};
declare const DICE_ROLLER_NAME = "Dice Roller";
declare let ROLL_HEIGHT: number;
declare const getWidgetById: (widgetId: string) => Promise<SDK.IWidget>;
declare const findFrame: () => Promise<SDK.IWidget>;
declare const refreshFrame: (frameId: string) => Promise<SDK.IFrameWidget>;
declare const registerFrame: (frameId: string | undefined) => Promise<SDK.IWidget>;
declare const getObjectsInFrame: (frameWidgetOrId: string | SDK.IFrameWidget) => Promise<string[]>;
declare const shiftChildren: (frameId: string) => Promise<void>;
declare const createRoll: () => Promise<SDK.ITextWidget>;
declare const rollDie: (min?: number, max?: number) => number;
