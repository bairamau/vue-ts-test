import { Module } from "vuex-simple";
import { FruitsModule } from "./modules/fruits";
import { CanvasModule } from "./modules/canvas";

export class Store {
  @Module()
  public fruits = new FruitsModule();
  @Module()
  public canvas = new CanvasModule();
}
