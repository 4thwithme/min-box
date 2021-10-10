// @ts-nocheck
import packer from "3d-bin-packing";
import {
  IBoxesList,
  IRectItemsList,
  sortByNonIncreasingVolume,
} from "./calculations.util";
import { IBox, IRectItem } from "./items.util";

interface IArgs {
  sortedItemsIdsByVolume: IRectItem["id"][];
  properBoxesIds: IBox["id"][];
  items: IRectItemsList;
  boxes: IBoxesList;
}

type GetMinProperBox = (args: IArgs) => IBox["label"];
export const getMinProperBox: GetMinProperBox = ({
  sortedItemsIdsByVolume,
  properBoxesIds,
  boxes,
  items,
}) => {
  let instanceArray = new packer.InstanceArray();

  sortedItemsIdsByVolume.forEach((itemId) => {
    const item = items[itemId];

    instanceArray.insert(
      instanceArray.end(),
      1,
      new packer.Product(
        item.id,
        item.dimensions.x,
        item.dimensions.y,
        item.dimensions.z
      )
    );
  });

  const boxesWhichCanAccommodateAllItems = properBoxesIds.reduce<IBoxesList>(
    (acc, boxId) => {
      const boxItem = boxes[boxId];
      let wrapperArray = new packer.WrapperArray();
      wrapperArray.push(
        new packer.Wrapper(
          boxItem.label,
          0,
          boxItem.dimensions.x,
          boxItem.dimensions.y,
          boxItem.dimensions.z,
          0
        )
      );

      let my_packer = new packer.Packer(wrapperArray, instanceArray);
      let result = my_packer.optimize();

      console.log(
        "count of boxes which can accommodate all items",
        result.data_.length
      );

      if (result.data_.length === 1) {
        acc[boxId] = boxItem;
      }

      return acc;
    },
    {}
  );

  const sortedBoxesIdsByVolume = sortByNonIncreasingVolume(
    boxesWhichCanAccommodateAllItems
  );

  if (!sortedBoxesIdsByVolume.length) {
    return null;
  }

  const smallestBoxId =
    sortedBoxesIdsByVolume[sortedBoxesIdsByVolume.length - 1];

  return boxes[smallestBoxId]?.label || null;
};
