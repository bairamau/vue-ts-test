<template>
  <div :class="$style.container">
    <el-table :row-key="'row'" :data="tableData">
      <el-table-column :column-key="'col-1'" prop="key">
        <template #header>
          <div
            @click="handleClick('key')"
            :class="{
              [$style.header]: true,
              [$style.ascending]: sortedAscending && sortedColumn === 'key',
              [$style.descending]: !sortedAscending && sortedColumn === 'key'
            }"
          >
            {{ $t("keys") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :column-key="'col-2'" prop="fruit">
        <template #header>
          <div
            @click="handleClick('fruit')"
            :class="{
              [$style.header]: true,
              [$style.ascending]: sortedAscending && sortedColumn === 'fruit',
              [$style.descending]: !sortedAscending && sortedColumn === 'fruit'
            }"
          >
            {{ $t("fruits") }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      @click="
        $i18n.locale === 'en' ? ($i18n.locale = 'ru') : ($i18n.locale = 'en')
      "
      type="primary"
      >{{ $i18n.locale.toUpperCase() }}</el-button
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TFruits } from "../services/TestService";
import { useStore } from "vuex-simple";
import { Store } from "@/store/store";

type TTableEntry = { key: string; fruit: string };

@Component
export default class FruitsTable extends Vue {
  // @Prop({ required: true }) readonly fruits!: TFruits;
  public sortedAscending = true;
  public sortedColumn: keyof TTableEntry = "key";

  public store: Store = useStore(this.$store);

  public get fruitsState(): TFruits | null {
    return this.store.fruits.fruits;
  }

  public get tableData(): TTableEntry[] {
    if (this.fruitsState === null) return [];

    return Object.entries(this.fruitsState)
      .map(([key, value]) => ({
        key,
        fruit: value.fruit
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

  public handleClick(column: keyof TTableEntry) {
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
.container {
  display: grid;
  grid-template-columns: 370px auto;
  grid-gap: 30px;
  align-items: start;
  justify-content: start;
}

.header {
  cursor: pointer;

  &.ascending {
    color: #67c23a;
  }

  &.descending {
    color: #409eff;
  }
}
</style>
