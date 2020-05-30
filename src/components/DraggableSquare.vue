<template>
  <canvas
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    @mousemove="handleMouseMove"
    :class="$style.canvas"
    id="canvas"
    ref="canvas"
    :width="size"
    :height="size"
  />
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { useStore } from "vuex-simple";
import { Store } from "@/store/store";

type TCoord = {
  x: number;
  y: number;
};

@Component
export default class DraggableSquare extends Vue {
  store: Store = useStore(this.$store);

  ctx: CanvasRenderingContext2D | null = null;

  boxSize = 50;

  boxCoord = {
    x: this.size / 2 - this.boxSize / 2,
    y: this.size / 2 - this.boxSize / 2
  };

  dragOffset: TCoord = {
    x: 0,
    y: 0
  };

  isDragging = false;

  get size() {
    return 500;
  }

  get imageState(): HTMLImageElement | null {
    return this.store.canvas.image;
  }

  mounted() {
    this.ctx = (this.$refs.canvas as HTMLCanvasElement).getContext("2d");
    this.draw();
  }

  @Watch("imageState")
  onImageStateChange() {
    this.draw();
  }

  public draw() {
    if (this.ctx !== null && this.imageState !== null) {
      this.ctx.clearRect(0, 0, this.size, this.size);
      this.ctx.drawImage(this.imageState, 0, 0, this.size, this.size);

      if (this.isDragging === true) {
        this.ctx.fillStyle = "rgba(64, 158, 255, 0.5)";
      } else {
        this.ctx.fillStyle = "rgba(8, 144, 0, 0.5)";
      }

      this.ctx.fillRect(
        this.boxCoord.x,
        this.boxCoord.y,
        this.boxSize,
        this.boxSize
      );
    }
  }

  public getCursorCoordinates(clientX: number, clientY: number): TCoord {
    const rect = (this.$refs
      .canvas as HTMLCanvasElement).getBoundingClientRect();

    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  public isHovering(coord: TCoord) {
    return (
      coord.x >= this.boxCoord.x &&
      coord.x <= this.boxCoord.x + this.boxSize &&
      coord.y >= this.boxCoord.y &&
      coord.y <= this.boxCoord.y + this.boxSize
    );
  }

  public handleMouseDown(event: MouseEvent) {
    const cursor = this.getCursorCoordinates(event.clientX, event.clientY);

    if (this.isHovering(cursor)) {
      this.isDragging = true;
      this.dragOffset = {
        x: cursor.x - this.boxCoord.x,
        y: cursor.y - this.boxCoord.y
      };

      this.draw();
    }
  }

  public handleMouseUp() {
    this.isDragging = false;
    this.boxCoord = {
      x: this.size / 2 - this.boxSize / 2,
      y: this.size / 2 - this.boxSize / 2
    };
    this.dragOffset = { x: 0, y: 0 };
    this.draw();
  }

  public handleMouseMove(event: MouseEvent) {
    const cursor = this.getCursorCoordinates(event.clientX, event.clientY);

    if (this.isDragging === true) {
      this.boxCoord = {
        x: cursor.x - this.dragOffset.x,
        y: cursor.y - this.dragOffset.y
      };

      this.draw();
    }
  }
}
</script>
<style lang="scss" module>
.canvas {
  border: 1px solid red;
}
</style>
