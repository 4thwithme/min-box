// @ts-nocheck
// import {
//   getFittedBoxesIds,
//   getListOfBoxesFittedByItemsVolume,
//   getListOfBoxesFittedForHighestDimension,
//   IGetMinBoxArgs,
//   sortByNonIncreasingDimension,
//   sortByNonIncreasingVolume,
// } from "./calculations.util";
// import { IBox, makeBox, makeRectangularItem } from "./items.util";
import packer from "3d-bin-packing";
import samchon from "samchon-framework";

// const BOX1 = makeBox({ x: 100, y: 150, z: 160 }, "S");
// const BOX2 = makeBox({ x: 190, y: 220, z: 180 }, "M");
// const BOX3 = makeBox({ x: 180, y: 240, z: 240 }, "L");
// const BOX4 = makeBox({ x: 220, y: 250, z: 70 }, "XL");
// const BOX5 = makeBox({ x: 260, y: 300, z: 170 }, "XXL");
// //---------------------------------------------------------

// const RECT_ITEM1 = makeRectangularItem({ x: 20, y: 5, z: 55 }, 24);
// const RECT_ITEM1_2 = makeRectangularItem({ x: 20, y: 5, z: 55 }, 24);
// const RECT_ITEM1_3 = makeRectangularItem({ x: 20, y: 5, z: 55 }, 24);
// const RECT_ITEM2 = makeRectangularItem({ x: 5, y: 80, z: 10 }, 10);
// const RECT_ITEM3 = makeRectangularItem({ x: 100, y: 130, z: 10 }, 18);
// const RECT_ITEM3_2 = makeRectangularItem({ x: 100, y: 130, z: 10 }, 18);
// const RECT_ITEM3_3 = makeRectangularItem({ x: 100, y: 130, z: 10 }, 18);
// const RECT_ITEM3_4 = makeRectangularItem({ x: 100, y: 130, z: 10 }, 18);
// const RECT_ITEM4 = makeRectangularItem({ x: 160, y: 60, z: 60 }, 5);
// const RECT_ITEM5 = makeRectangularItem({ x: 10, y: 20, z: 120 }, 10);
// const RECT_ITEM5_2 = makeRectangularItem({ x: 10, y: 20, z: 120 }, 10);
// const RECT_ITEM5_3 = makeRectangularItem({ x: 10, y: 20, z: 120 }, 10);
// //---------------------------------------------------------

// type GetMinBox = (args: IGetMinBoxArgs) => IBox["label"] | null;
// const getMinBox: GetMinBox = ({ items, boxes }) => {
//   // initial validation
//   //boxes
//   const sortedBoxesIdsByVolume = sortByNonIncreasingVolume(boxes);
//   //items
//   const sortedItemsIdsByVolume = sortByNonIncreasingVolume(items);
//   const sortedItemsIdsByDimension = sortByNonIncreasingDimension(items);
//   // check is this batch of items can be putted into some box
//   const listOfBoxesFittedByVolume = getListOfBoxesFittedByItemsVolume({
//     sortedBoxesIds: sortedBoxesIdsByVolume,
//     sortedItemsIds: sortedItemsIdsByVolume,
//     items,
//     boxes,
//   });

//   const listOfBoxesFittedForHighestDimension =
//     getListOfBoxesFittedForHighestDimension({
//       sortedBoxesIds: sortedBoxesIdsByVolume,
//       item: items[sortedItemsIdsByDimension[0]],
//       boxes,
//     });
//   // get list of boxes ids which can contain all items volume and dimensions
//   const fittedBoxesIds = getFittedBoxesIds(
//     listOfBoxesFittedByVolume,
//     listOfBoxesFittedForHighestDimension
//   );

//   console.log("fittedBoxesIds", fittedBoxesIds);

//   if (!fittedBoxesIds.length) {
//     return null;
//   }

//   return "bla";
// };

// const res = getMinBox({
//   items: {
//     [RECT_ITEM1.id]: RECT_ITEM1,
//     [RECT_ITEM1_2.id]: RECT_ITEM1_2,
//     [RECT_ITEM1_3.id]: RECT_ITEM1_3,
//     [RECT_ITEM2.id]: RECT_ITEM2,
//     [RECT_ITEM3.id]: RECT_ITEM3,
//     [RECT_ITEM3_2.id]: RECT_ITEM3_2,
//     [RECT_ITEM3_3.id]: RECT_ITEM3_3,
//     [RECT_ITEM3_4.id]: RECT_ITEM3_4,
//     [RECT_ITEM4.id]: RECT_ITEM4,
//     [RECT_ITEM5.id]: RECT_ITEM5,
//     [RECT_ITEM5_2.id]: RECT_ITEM5_2,
//     [RECT_ITEM5_3.id]: RECT_ITEM5_3,
//   },
//   boxes: {
//     [BOX1.id]: BOX1,
//     [BOX2.id]: BOX2,
//     [BOX3.id]: BOX3,
//     [BOX4.id]: BOX4,
//     [BOX5.id]: BOX5,
//   },
// });

// console.log(res);

function main(): void {
  ///////////////////////////
  // CONSTRUCT OBJECTS
  ///////////////////////////
  let wrapperArray: packer.WrapperArray = new packer.WrapperArray();
  let instanceArray: packer.InstanceArray = new packer.InstanceArray();

  // Wrappers
  wrapperArray.push(
    new packer.Wrapper("Large", 1000, 40, 40, 15, 0)
    // new packer.Wrapper("Medium", 700, 20, 20, 10, 0),
    // new packer.Wrapper("Small", 500, 15, 15, 8, 0)
  );

  ///////
  // Each Instance is repeated #15
  ///////
  instanceArray.insert(
    instanceArray.end(),
    15,
    new packer.Product("Eraser", 1, 2, 5)
  );
  instanceArray.insert(
    instanceArray.end(),
    10,
    new packer.Product("Book", 15, 30, 3)
  );
  instanceArray.insert(
    instanceArray.end(),
    15,
    new packer.Product("Drink", 3, 3, 10)
  );
  instanceArray.insert(
    instanceArray.end(),
    15,
    new packer.Product("Umbrella", 5, 5, 20)
  );

  // // Wrappers also can be packed into another Wrapper.
  // instanceArray.insert(
  //   instanceArray.end(),
  //   15,
  //   new packer.Wrapper("Notebook-Box", 2000, 30, 40, 4, 2)
  // );
  // instanceArray.insert(
  //   instanceArray.end(),
  //   15,
  //   new packer.Wrapper("Tablet-Box", 2500, 20, 28, 2, 0)
  // );

  ///////////////////////////
  // BEGINS PACKING
  ///////////////////////////
  // CONSTRUCT PACKER
  let my_packer: packer.Packer = new packer.Packer(wrapperArray, instanceArray);

  ///////
  // PACK (OPTIMIZE)
  let result: packer.WrapperArray = my_packer.optimize();
  ///////

  let xml: samchon.library.XML = result.toXML();
  console.log(xml.toString());
}

main();
