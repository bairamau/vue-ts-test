import { Mutation, State, Action } from "vuex-simple";
import TestService from "@/services/TestService";

export class CanvasModule {
  @State()
  public image: HTMLImageElement | null = null;
  public error = "";

  @Mutation()
  private setImage(image: HTMLImageElement) {
    this.image = image;
  }

  @Mutation()
  private setError(error: string) {
    this.error = error;
  }

  @Action()
  public async requestImage() {
    try {
      this.setImage(await TestService.getImage());
    } catch (e) {
      this.setError(e);
    }
  }
}
