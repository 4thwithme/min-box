import { v4 } from "uuid";

export enum ItemType {
  SPHE = "SPHE",
  RECT = "RECT",
  CYL = "CYL",
}
// -----------------------------------------------------
//      ____________
//  y /|           /|
//   /_|__________/ |
//  |  |_ _ _ _ _| _|
// z| /          | /
//  |/___________|/
//         x

export interface IRectItemDimensions {
  x: number;
  y: number;
  z: number;
}
// -----------------------------------------------------
//     __________
//   /            \
//  /              \
// |       d        |
// |----------------|
// |                |
//  \              /
//   \ __________ /

export interface ISpheItemDimensions {
  d: number;
}
// -----------------------------------------------------
//     _____  _________________________
//   /   |   \                          \
//  /    |    \                          \
// |     | d   |                          |
// |     |     |                          |
// |     |     |                          |
//  \    |     /         h               /
//   \ __|__ /__________________________/

export interface ICylItemDimensions {
  d: number;
  h: number;
}

// -----------------------------------------------------
export interface IRectItem {
  id: string;
  type: ItemType.RECT;
  gap: number;
  dimensions: IRectItemDimensions;
}

export interface ISpheItem {
  id: string;
  type: ItemType.SPHE;
  gap: number;
  dimensions: ISpheItemDimensions;
}

export interface ICylItem {
  id: string;
  type: ItemType.CYL;
  gap: number;
  dimensions: ICylItemDimensions;
}

export interface IBox {
  id: string;
  type: ItemType.RECT;
  gap: 0;
  label: string;
  dimensions: IRectItemDimensions;
}
// -----------------------------------------------------
type MakeBox = (dim: IRectItemDimensions, label: string) => IBox;
export const makeBox: MakeBox = ({ x, y, z }, label) => ({
  id: v4(),
  type: ItemType.RECT,
  gap: 0,
  label,
  dimensions: { x, y, z },
});
// -----------------------------------------------------
type MakeRectangularItem = (dim: IRectItemDimensions, gap: number) => IRectItem;
export const makeRectangularItem: MakeRectangularItem = ({ x, y, z }, gap) => ({
  id: v4(),
  type: ItemType.RECT,
  gap,
  dimensions: { x, y, z },
});
// -----------------------------------------------------
type MakeSphericalItem = (dim: ISpheItemDimensions, gap: number) => ISpheItem;
export const makeSphericalItem: MakeSphericalItem = ({ d }, gap) => ({
  id: v4(),
  type: ItemType.SPHE,
  gap,
  dimensions: { d },
});
// -----------------------------------------------------
type MakeCylItem = (dim: ICylItemDimensions, gap: number) => ICylItem;
export const makeCylindricalItem: MakeCylItem = ({ d, h }, gap) => ({
  id: v4(),
  type: ItemType.CYL,
  gap,
  dimensions: { d, h },
});
