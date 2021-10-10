import {
  getFittedBoxesIds,
  getListOfBoxesFittedByItemsVolume,
  getListOfBoxesFittedForHighestDimension,
  IGetMinBoxArgs,
  sortByNonIncreasingDimension,
  sortByNonIncreasingVolume,
} from "./calculations.util";
import { getMinFittedBox } from "./get-min-fitted-box";
import { IBox, makeBox, makeRectangularItem } from "./items.util";

const BOX1 = makeBox({ x: 100, y: 150, z: 160 }, "S");
const BOX2 = makeBox({ x: 190, y: 220, z: 180 }, "M");
const BOX3 = makeBox({ x: 180, y: 240, z: 240 }, "L");
const BOX4 = makeBox({ x: 220, y: 250, z: 70 }, "XL");
const BOX5 = makeBox({ x: 260, y: 300, z: 170 }, "XXL");
//---------------------------------------------------------

const RECT_ITEM1 = makeRectangularItem({ x: 20, y: 5, z: 55 }, 24);
const RECT_ITEM1_2 = makeRectangularItem({ x: 20, y: 5, z: 55 }, 24);
const RECT_ITEM1_3 = makeRectangularItem({ x: 20, y: 5, z: 55 }, 24);
const RECT_ITEM2 = makeRectangularItem({ x: 5, y: 80, z: 10 }, 10);
const RECT_ITEM3 = makeRectangularItem({ x: 100, y: 130, z: 10 }, 18);
const RECT_ITEM3_2 = makeRectangularItem({ x: 100, y: 130, z: 10 }, 18);
const RECT_ITEM3_3 = makeRectangularItem({ x: 100, y: 130, z: 10 }, 18);
const RECT_ITEM3_4 = makeRectangularItem({ x: 100, y: 130, z: 10 }, 18);
const RECT_ITEM4 = makeRectangularItem({ x: 160, y: 60, z: 60 }, 5);
const RECT_ITEM5 = makeRectangularItem({ x: 10, y: 20, z: 120 }, 10);
const RECT_ITEM5_2 = makeRectangularItem({ x: 10, y: 20, z: 120 }, 10);
const RECT_ITEM5_3 = makeRectangularItem({ x: 10, y: 20, z: 120 }, 10);
//---------------------------------------------------------

type GetMinBox = (args: IGetMinBoxArgs) => IBox["label"] | null;
const getMinBox: GetMinBox = ({ items, boxes }) => {
  // initial validation
  //boxes
  const sortedBoxesIdsByVolume = sortByNonIncreasingVolume(boxes);
  //items
  const sortedItemsIdsByVolume = sortByNonIncreasingVolume(items);
  const sortedItemsIdsByDimension = sortByNonIncreasingDimension(items);
  // check is this batch of items can be putted into some box
  const listOfBoxesFittedByVolume = getListOfBoxesFittedByItemsVolume({
    sortedBoxesIds: sortedBoxesIdsByVolume,
    sortedItemsIds: sortedItemsIdsByVolume,
    items,
    boxes,
  });

  const listOfBoxesFittedForHighestDimension =
    getListOfBoxesFittedForHighestDimension({
      sortedBoxesIds: sortedBoxesIdsByVolume,
      item: items[sortedItemsIdsByDimension[0]],
      boxes,
    });
  // get list of boxes ids which can contain all items volume and dimensions
  const fittedBoxesIds = getFittedBoxesIds(
    listOfBoxesFittedByVolume,
    listOfBoxesFittedForHighestDimension
  );

  console.log("fittedBoxesIds", fittedBoxesIds);

  if (!fittedBoxesIds.length) {
    return null;
  }

  return getMinFittedBox({
    sortedItemsIdsByVolume,
    fittedBoxesIds,
    items,
    boxes,
  });
};

const res = getMinBox({
  items: {
    [RECT_ITEM1.id]: RECT_ITEM1,
    [RECT_ITEM1_2.id]: RECT_ITEM1_2,
    [RECT_ITEM1_3.id]: RECT_ITEM1_3,
    [RECT_ITEM2.id]: RECT_ITEM2,
    [RECT_ITEM3.id]: RECT_ITEM3,
    [RECT_ITEM3_2.id]: RECT_ITEM3_2,
    [RECT_ITEM3_3.id]: RECT_ITEM3_3,
    [RECT_ITEM3_4.id]: RECT_ITEM3_4,
    [RECT_ITEM4.id]: RECT_ITEM4,
    [RECT_ITEM5.id]: RECT_ITEM5,
    [RECT_ITEM5_2.id]: RECT_ITEM5_2,
    [RECT_ITEM5_3.id]: RECT_ITEM5_3,
  },
  boxes: {
    [BOX1.id]: BOX1,
    [BOX2.id]: BOX2,
    [BOX3.id]: BOX3,
    [BOX4.id]: BOX4,
    [BOX5.id]: BOX5,
  },
});

console.log(res);
