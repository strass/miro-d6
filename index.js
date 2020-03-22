"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var APP_ID = "DEV_TOOL_CONSOLE_PLUGIN_NAME";
var registeredMetadata = (_a = {}, _a[APP_ID] = { frame: true }, _a);
var DICE_ROLLER_NAME = "Dice Roller";
var ROLL_HEIGHT = 648;
var getWidgetById = function (widgetId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, miro.board.widgets.get({ id: widgetId })];
            case 1: return [2 /*return*/, (_a.sent())[0]];
        }
    });
}); };
var findFrame = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, miro.board.widgets.get({ title: DICE_ROLLER_NAME })];
            case 1: return [2 /*return*/, (_a.sent())[0]];
        }
    });
}); };
var refreshFrame = function (frameId) { return __awaiter(void 0, void 0, void 0, function () {
    var frame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getWidgetById(frameId)];
            case 1:
                frame = (_a.sent());
                if (!frame || frame.type !== "FRAME")
                    throw new Error("refreshFrame provided non-frame id");
                return [2 /*return*/, frame];
        }
    });
}); };
var registerFrame = function (frameId) { return __awaiter(void 0, void 0, void 0, function () {
    var frame, registeredFrame;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!!frameId) return [3 /*break*/, 2];
                return [4 /*yield*/, miro.board.selection.get()];
            case 1:
                frame = (_b.sent())[0];
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, getWidgetById(frameId)];
            case 3:
                frame = _b.sent();
                _b.label = 4;
            case 4: return [4 /*yield*/, miro.board.widgets.update({
                    id: frame.id,
                    title: DICE_ROLLER_NAME,
                    metadata: (_a = {},
                        _a[APP_ID] = { frame: true },
                        _a)
                })];
            case 5:
                registeredFrame = (_b.sent())[0];
                return [2 /*return*/, registeredFrame];
        }
    });
}); };
var getObjectsInFrame = function (frameWidgetOrId) { return __awaiter(void 0, void 0, void 0, function () {
    var frame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                frame = frameWidgetOrId;
                if (!(typeof frameWidgetOrId === "string")) return [3 /*break*/, 2];
                return [4 /*yield*/, refreshFrame(frameWidgetOrId)];
            case 1:
                frame = _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/, frame.childrenIds];
        }
    });
}); };
var shiftChildren = function (frameId) { return __awaiter(void 0, void 0, void 0, function () {
    var frame, childrenIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, refreshFrame(frameId)];
            case 1:
                frame = _a.sent();
                return [4 /*yield*/, getObjectsInFrame(frame)];
            case 2:
                childrenIds = _a.sent();
                return [4 /*yield*/, miro.board.widgets.transformDelta(childrenIds, 0, -1 * ROLL_HEIGHT, 0)];
            case 3:
                _a.sent();
                childrenIds.forEach(function (widgetId) {
                    getWidgetById(widgetId).then(function (widget) {
                        if (widget.bounds.top < frame.bounds.top) {
                            miro.board.widgets.deleteById(widget.id);
                        }
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
var createRoll = function (_a) {
    var dice = _a.dice, position = _a.position, effect = _a.effect;
    return __awaiter(void 0, void 0, void 0, function () {
        var frame, rolls, rollWidget;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, findFrame()];
                case 1:
                    frame = _b.sent();
                    return [4 /*yield*/, shiftChildren(frame.id)];
                case 2:
                    _b.sent();
                    rolls = new Array(dice).map(function () { return rollDie(); });
                    if (dice === 0) {
                        rolls = [rollDie(), rollDie()];
                    }
                    console.log(dice, rolls);
                    return [4 /*yield*/, miro.board.widgets.create({
                            type: "text",
                            text: position + " " + effect + ": " + rolls.join(", "),
                            x: frame.bounds.left,
                            y: frame.bounds.bottom,
                            scale: 18
                        })];
                case 3:
                    rollWidget = (_b.sent())[0];
                    return [2 /*return*/, rollWidget];
            }
        });
    });
};
var rollDie = function (min, max) {
    if (min === void 0) { min = 1; }
    if (max === void 0) { max = 6; }
    return Math.floor(Math.random() * (max - min + 1) + min);
};
miro.onReady(function () {
    (miro.initialize || miro.initializeInner)({
        extensionPoints: {
            bottomBar: {
                title: "Roll Dice",
                svgIcon: '<svg class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 24px; width: 24px;"><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M388.53 21.53c-38.006 30.546-63.492 66.122-83.952 103.687 12.746 7.812 25.587 14.923 38.516 21.38l88.744 34.04c13.746 3.8 27.583 6.995 41.51 9.625 13.493-42.908 19.872-85.824 19.433-128.73l-104.25-40zm-266.813 3.88l15.133 64.967 68.95 16.38-12.993-64.525-71.09-16.822zm-17.594 6.848L66.896 79.803l12.358 62.025 39.494-46.785-14.625-62.785zm27.783 76.148l-37.094 43.97 52.165 7.718c7.243-2.11 14.482-4.097 21.716-5.967l27.62-30.408-64.407-15.314zm170.57 37.346l8.776 58.912c5.91 6.06 11.636 12.256 17.13 18.615l89.024 34.157 45.317-50.218c-54.72-11.1-108.31-30.82-160.248-61.468zm-70.09 13.482c-49.324 9.35-98.335 21.9-147.224 42.645 40.825 34.878 76.848 72.364 105.988 113.538l149.204-44.686c-26.533-41.862-66.002-77.02-107.97-111.498zM65.71 209.848C45.093 260.13 28.07 311.115 24.24 367.025c24.535 52.892 70.202 90.623 110.764 119.72l42.476-158.45c-29.975-42.853-68.05-81.942-111.77-118.447zM351.07 287.03L195.39 333.66l-42.146 157.22c52.167-7.854 103.99-21.873 155.822-48.26 24.952-53.52 30.504-99.728 42.002-155.587z" fill="#000000" fill-opacity="1"></path></g></svg>',
                onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var results;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, miro.board.ui.openModal("https://master.d23i5muo4rlqip.amplifyapp.com/roll.html")];
                            case 1:
                                results = _a.sent();
                                if (results) {
                                    createRoll(results);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }
            }
        }
    });
});
