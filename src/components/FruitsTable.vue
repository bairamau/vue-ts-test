<template>
  <el-table :row-key="'row'" :data="tableData" :fit="false">
    <el-table-column :column-key="'col-1'" prop="key" :min-width="200">
      <template #header>
        <div
          @click="handleClick('key')"
          :class="{
            [$style.ascending]: sortedAscending && sortedColumn === 'key',
            [$style.descending]: !sortedAscending && sortedColumn === 'key'
          }"
        >
          Keys
        </div>
      </template>
    </el-table-column>
    <el-table-column :column-key="'col-2'" prop="fruit" :min-width="200">
      <template #header>
        <div
          @click="handleClick('fruit')"
          :class="{
            [$style.ascending]: sortedAscending && sortedColumn === 'fruit',
            [$style.descending]: !sortedAscending && sortedColumn === 'fruit'
          }"
        >
          Fruits
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TFruits } from "../services/TestService";

type TTableEntry = { key: string; fruit: string };

@Component
export default class FruitsTable extends Vue {
  @Prop({ required: true }) readonly fruits!: TFruits;
  sortedAscending = true;
  sortedColumn: keyof TTableEntry = "key";

  get tableData(): TTableEntry[] {
    return Object.keys(this.fruits)
      .map(key => ({
        key,
        fruit: this.fruits[key].fruit
      }))
      .sort((a, b) =>
        a[this.sortedColumn] < b[this.sortedColumn]
          ? this.$data.sortedAscending
            ? -1
            : 1
          : this.$data.sortedAscending
          ? 1
          : -1
      );
  }

  handleClick(column: keyof TTableEntry) {
    if (column === this.sortedColumn) {
      this.sortedAscending = !this.sortedAscending;
    } else {
      this.sortedAscending = true;
      this.sortedColumn = column;
    }
  }
}
</script>

<style lang="scss" module>
.ascending {
  color: #67c23a;
}

.descending {
  color: #409eff;
}
</style>
