const APP_ID = "DEV_TOOL_CONSOLE_PLUGIN_NAME";
const registeredMetadata = { [APP_ID]: { frame: true } };
const DICE_ROLLER_NAME = "Dice Roller";
let ROLL_HEIGHT = 648;

const getWidgetById = async (widgetId: string) => {
  return (await miro.board.widgets.get({ id: widgetId }))[0];
};

const findFrame = async () => {
  return (await miro.board.widgets.get({ title: DICE_ROLLER_NAME }))[0];
};

const refreshFrame = async (frameId: string): Promise<SDK.IFrameWidget> => {
  const frame = (await getWidgetById(frameId)) as SDK.IFrameWidget;

  if (!frame || frame.type !== "FRAME")
    throw new Error("refreshFrame provided non-frame id");

  return frame;
};

const registerFrame = async (frameId: string | undefined) => {
  let frame: SDK.IWidget;
  if (!frameId) {
    frame = (await miro.board.selection.get())[0];
  } else {
    frame = await getWidgetById(frameId);
  }
  const registeredFrame = (
    await miro.board.widgets.update({
      id: frame.id,
      title: DICE_ROLLER_NAME,
      metadata: {
        [APP_ID]: { frame: true }
      }
    })
  )[0];
  return registeredFrame;
};

const getObjectsInFrame = async (
  frameWidgetOrId: SDK.IFrameWidget | string
) => {
  let frame = frameWidgetOrId;
  if (typeof frameWidgetOrId === "string") {
    frame = await refreshFrame(frameWidgetOrId);
  }
  return (frame as SDK.IFrameWidget).childrenIds;
};

const shiftChildren = async (frameId: string) => {
  const frame = await refreshFrame(frameId);
  const childrenIds = await getObjectsInFrame(frame);
  await miro.board.widgets.transformDelta(childrenIds, 0, -1 * ROLL_HEIGHT, 0);
  childrenIds.forEach(widgetId => {
    getWidgetById(widgetId).then(widget => {
      if (widget.bounds.top < frame.bounds.top) {
        miro.board.widgets.deleteById(widget.id);
      }
    });
  });
};

const createRoll = async () => {
  const frame = await findFrame();
  await shiftChildren(frame.id);
  const rollWidget = (
    await miro.board.widgets.create({
      type: "text",
      text: `${rollDie()}`,
      x: frame.bounds.left,
      y: frame.bounds.bottom,
      scale: 18
    })
  )[0] as SDK.ITextWidget;
  console.debug(rollWidget.bounds.bottom - rollWidget.bounds.top);
  return rollWidget;
};

const rollDie = (min = 1, max = 6) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

miro.onReady(() => {
  (
    miro.initialize || ((miro as any).initializeInner as typeof miro.initialize)
  )({
    extensionPoints: {
      bottomBar: {
        title: "Roll Dice",
        svgIcon:
          '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
        onClick: async () => {
          createRoll();
          const results = await miro.board.ui.openModal(
            "https://master.d23i5muo4rlqip.amplifyapp.com/roll.html"
          );
          console.log(results);
        }
      }
    }
  });
});
