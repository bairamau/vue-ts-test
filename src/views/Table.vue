<template>
  <!-- why am not getting an error when i don't provide props -->
  <FruitsTable v-if="fruits !== null" :fruits="fruits" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FruitsTable from "@/components/FruitsTable.vue";
import TestService, { TFruits } from "@/services/TestService";

@Component({ components: { FruitsTable } })
export default class Table extends Vue {
  fruits: TFruits | null = null;

  async created() {
    this.fruits = await TestService.getFruits();
  }
}
</script>
