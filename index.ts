const APP_ID = "3074457347394256683";
const registeredMetadata = { [APP_ID]: { frame: true } };
const DICE_ROLLER_NAME = "Dice Roller";
let ROLL_HEIGHT = 648;

interface IResults {
  dice: number;
  position: "RISKY" | "CONTROLLED" | "DESPERATE";
  effect: "NONE" | "LOW" | "STANDARD" | "GREAT" | "EXTREME";
}

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

const createRoll = async ({ dice, position, effect }: IResults) => {
  const frame = await findFrame();
  await shiftChildren(frame.id);
  let rolls: number[] = new Array(dice).fill(0);
  if (dice === 0) {
    console.log("1?");
    rolls = [rollDie(), rollDie()];
  } else {
    rolls = rolls.map(() => rollDie());
  }
  const BOUNDS_WIDTH = frame.bounds.width;
  const BOUNDS_HEIGHT = 500;
  const HALF_BOUNDS_Y = frame.bounds.bottom - BOUNDS_HEIGHT / 2;
  const rollWidgets = await miro.board.widgets.create([
    {
      type: "SHAPE",
      width: BOUNDS_WIDTH,
      height: BOUNDS_HEIGHT,
      style: {
        shapeType: 3,
        borderColor: "#f24726",
        borderWidth: 16,
        borderOpacity: 1,
        borderStyle: 2
      },
      x: frame.bounds.x, // centered X
      y: HALF_BOUNDS_Y
    },
    {
      type: "text",
      text: `<p>${(rolls as any[])
        .map((d: 1 | 2 | 3 | 4 | 5 | 6, idx, arr) => {
          let strikethrough = false;
          let color = "grey";
          if (dice === 0) {
            if (idx === 0) {
              if (d >= arr[1]) {
                strikethrough = true;
              }
            } else {
              if (d > arr[0]) {
                strikethrough = true;
              }
            }
          }
          const n = `${d}${idx !== arr.length - 1 ? ", " : ""}`;
          switch (d) {
            case 1:
              return `<span style="color: ${color};">${
                strikethrough ? `<s>${n}</s>` : `${n}`
              }</span>`;
            case 2:
              return `<span style="color: ${color};">${
                strikethrough ? `<s>${n}</s>` : `${n}`
              }</span>`;
            case 3:
              return `<span style="color: ${color};">${
                strikethrough ? `<s>${n}</s>` : `${n}`
              }</span>`;
            case 4:
              if (!strikethrough) {
                color = "green";
              }
              return `<span style="color: ${color};">${
                strikethrough ? `<s>${n}</s>` : `${n}`
              }</span>`;
            case 5:
              if (!strikethrough) {
                color = "green";
              }
              return `<span style="color: ${color};">${
                strikethrough ? `<s>${n}</s>` : `${n}`
              }</span>`;
            case 6:
              if (!strikethrough) {
                color = "blue";
              }
              return `<span style="color: ${color};">${
                strikethrough ? `<s>${n}</s>` : `${n}`
              }</span>`;
          }
        })
        .join("")}</p>`,
      x: frame.bounds.x + 600 + 100 / 2 + 10,
      y: HALF_BOUNDS_Y,
      scale: 18,
      width: 100,
      style: {
        fontFamily: 11,
        textAlign: "r"
      }
    },
    {
      type: "text",
      text: position,
      width: 1000,
      x: frame.bounds.left + 1000 / 2,
      y: HALF_BOUNDS_Y - BOUNDS_HEIGHT / 4 + 16 * 2,
      scale: 14,
      style: {
        fontFamily: 3,
        textAlign: "c"
      }
    },
    {
      type: "text",
      text: effect,
      width: 1000,
      x: frame.bounds.left + 1000 / 2,
      y: HALF_BOUNDS_Y + BOUNDS_HEIGHT / 4 + 16 * 2,
      scale: 14,
      style: {
        fontFamily: 3,
        textAlign: "c"
      }
    }
  ]);
  return rollWidgets;
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
          '<svg class="Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 24px; width: 24px;"><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M388.53 21.53c-38.006 30.546-63.492 66.122-83.952 103.687 12.746 7.812 25.587 14.923 38.516 21.38l88.744 34.04c13.746 3.8 27.583 6.995 41.51 9.625 13.493-42.908 19.872-85.824 19.433-128.73l-104.25-40zm-266.813 3.88l15.133 64.967 68.95 16.38-12.993-64.525-71.09-16.822zm-17.594 6.848L66.896 79.803l12.358 62.025 39.494-46.785-14.625-62.785zm27.783 76.148l-37.094 43.97 52.165 7.718c7.243-2.11 14.482-4.097 21.716-5.967l27.62-30.408-64.407-15.314zm170.57 37.346l8.776 58.912c5.91 6.06 11.636 12.256 17.13 18.615l89.024 34.157 45.317-50.218c-54.72-11.1-108.31-30.82-160.248-61.468zm-70.09 13.482c-49.324 9.35-98.335 21.9-147.224 42.645 40.825 34.878 76.848 72.364 105.988 113.538l149.204-44.686c-26.533-41.862-66.002-77.02-107.97-111.498zM65.71 209.848C45.093 260.13 28.07 311.115 24.24 367.025c24.535 52.892 70.202 90.623 110.764 119.72l42.476-158.45c-29.975-42.853-68.05-81.942-111.77-118.447zM351.07 287.03L195.39 333.66l-42.146 157.22c52.167-7.854 103.99-21.873 155.822-48.26 24.952-53.52 30.504-99.728 42.002-155.587z" fill="#000000" fill-opacity="1"></path></g></svg>',
        onClick: async () => {
          const results: IResults = await miro.board.ui.openModal(
            "https://master.d23i5muo4rlqip.amplifyapp.com/roll.html"
          );
          if (results) {
            createRoll(results);
          }
        }
      }
    }
  });
});
