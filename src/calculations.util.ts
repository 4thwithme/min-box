import { sum } from "lodash";
import { IBox, IRectItem, IRectItemDimensions, ItemType } from "./items.util";

export interface IWithItemsWithBoxes {
  items: IRectItemsList;
  boxes: IBoxesList;
}

export type IRectItemsList = { [key: string]: IRectItem };
export type IBoxesList = { [key: string]: IBox };
export type IGetMinBoxArgs = IWithItemsWithBoxes;

interface IGetListOfBoxesFittedByMeasurements extends IWithItemsWithBoxes {
  sortedBoxesIds: IBox["id"][];
  sortedItemsIds: IRectItem["id"][];
}

interface IGetListOfBoxesFittedForHighestDimensionArgs {
  sortedBoxesIds: IBox["id"][];
  boxes: IBoxesList;
  item: IRectItem;
}

type GetRectVolumeWithGap = (dim: IRectItemDimensions, gap: number) => number;
export const getRectVolumeWithGap: GetRectVolumeWithGap = (dim, gap) =>
  (dim.x + gap * 2) * (dim.y + gap * 2) * (dim.z + gap * 2);

type GetMaxDimensionWithGap = (dim: IRectItemDimensions, gap: number) => number;
export const getMaxDimensionWithGap: GetMaxDimensionWithGap = (dim, gap) =>
  Math.max(...Object.values(dim)) + gap * 2;

type GetMinDimensionWithGap = (dim: IRectItemDimensions, gap: number) => number;
export const getMinDimensionWithGap: GetMinDimensionWithGap = (dim, gap) =>
  Math.min(...Object.values(dim)) + gap * 2;

type SortByNonIncreasingVolume = (
  items: IRectItemsList | IBoxesList
) => (IBox["id"] | IRectItem["id"])[];
export const sortByNonIncreasingVolume: SortByNonIncreasingVolume = (items) =>
  Object.keys(items).sort(
    (a, b) =>
      getRectVolumeWithGap(items[b].dimensions, items[b]?.gap) -
      getRectVolumeWithGap(items[a].dimensions, items[a]?.gap)
  );

type SortByNonIncreasingDimension = (
  items: IRectItemsList | IBoxesList
) => (IBox["id"] | IRectItem["id"])[];
export const sortByNonIncreasingDimension: SortByNonIncreasingDimension = (
  items
) =>
  Object.keys(items).sort(
    (a, b) =>
      getMaxDimensionWithGap(items[b].dimensions, items[b]?.gap) -
      getMaxDimensionWithGap(items[a].dimensions, items[a]?.gap)
  );

type GetItemVolume = (item: IRectItem | IBox) => number;
export const getItemVolume: GetItemVolume = (item) => {
  if (item.type === ItemType.RECT) {
    return getRectVolumeWithGap(item.dimensions, item.gap);
  }
  return 0;
};

type GetListOfBoxesFittedByVolume = (
  args: IGetListOfBoxesFittedByMeasurements
) => IBox["id"][];
export const getListOfBoxesFittedByItemsVolume: GetListOfBoxesFittedByVolume =
  ({ sortedBoxesIds, sortedItemsIds, items, boxes }) => {
    const sumItemsVolume = sum(
      sortedItemsIds.map((id) => getItemVolume(items[id]))
    );

    return sortedBoxesIds.reduce<IBox["id"][]>((acc, boxId) => {
      const boxItem = boxes[boxId];
      const boxVolume = getItemVolume(boxItem);
      if (boxVolume > sumItemsVolume) {
        console.log(
          `${((sumItemsVolume * 100) / boxVolume).toFixed(2)}%`,
          boxItem.label
        );

        acc.push(boxId);
      }
      return acc;
    }, []);
  };

type GetListOfBoxesFittedForHighestDimension = (
  args: IGetListOfBoxesFittedForHighestDimensionArgs
) => IBox["id"][];
export const getListOfBoxesFittedForHighestDimension: GetListOfBoxesFittedForHighestDimension =
  ({ sortedBoxesIds, item, boxes }) => {
    const highestDimension = getMaxDimensionWithGap(
      item.dimensions,
      item?.gap ?? 0
    );

    return sortedBoxesIds.reduce<IBox["id"][]>((acc, boxId) => {
      const boxItem = boxes[boxId];
      if (
        boxItem.dimensions.x > highestDimension ||
        boxItem.dimensions.y > highestDimension ||
        boxItem.dimensions.z > highestDimension
      ) {
        acc.push(boxId);
      }
      return acc;
    }, []);
  };

type GetFittedBoxesIds = (
  listOfBoxesFittedByVolume: IBox["id"][],
  listOfBoxesFittedForHighestDimension: IBox["id"][]
) => IBox["id"][];
export const getFittedBoxesIds: GetFittedBoxesIds = (
  listOfBoxesFittedByVolume,
  listOfBoxesFittedForHighestDimension
) =>
  listOfBoxesFittedByVolume.filter((id) =>
    listOfBoxesFittedForHighestDimension.includes(id)
  );
