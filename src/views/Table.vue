<template>
  <!-- why am not getting an error when i don't provide props -->
  <FruitsTable />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FruitsTable from "@/components/FruitsTable.vue";

@Component({ components: { FruitsTable } })
export default class Table extends Vue {}
</script>
