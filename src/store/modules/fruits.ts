import { Mutation, State, Action } from "vuex-simple";
import TestService, { TFruits } from "@/services/TestService";

export class FruitsModule {
  @State()
  public fruits: TFruits | null = null;
  public error = "";

  @Mutation()
  private setFruits(fruits: TFruits) {
    this.fruits = fruits;
  }

  @Mutation()
  private setError(error: string) {
    this.error = error;
  }

  @Action()
  public async requestFruits() {
    try {
      this.setFruits(await TestService.getFruits());
    } catch (e) {
      this.setError(e);
    }
  }
}
