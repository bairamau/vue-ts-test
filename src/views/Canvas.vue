<template>
  <DraggableSquare />
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DraggableSquare from "@/components/DraggableSquare.vue";

@Component({
  components: {
    DraggableSquare
  }
})
export default class Canvas extends Vue {}
</script>
