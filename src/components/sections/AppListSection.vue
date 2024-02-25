<script lang="ts" setup>
import { IDot } from "@/interfaces/dots.interface.ts";
import { computed, onMounted, ref } from "vue";
import searchIcon from "@/svg-icons/searchIcon.svg";
import brushIcon from "@/svg-icons/brushIcon.svg";
import nearestLocationIcon from "@/svg-icons/nearestLocationIcon.svg";
import { dots } from "../../../store/dots";
import AppDotsCard from "@/components/dots-card/AppDotsCard.vue";

const {
  getDotsLength,
  getDots,
  setAllIsChecked,
  setCoordinatesCollection,
  getFirstDot,
  setFirstDotChecked,
  moveDot,
} = dots();

const checkedAll = ref<boolean>(false);

const search = ref<string>("");

const selectAllCoordinates = (): void => {
  setAllIsChecked(checkedAll.value);
};

const filteredDots = computed<IDot[]>(() => {
  if (!search.value.trim()) return getDots;

  const searchNumber: number = parseInt(search.value.trim(), 10);

  return getDots.filter((dot: IDot): boolean => dot.id === searchNumber);
});

const onDragStart = (index: number, event: DragEvent): void => {
  if (event.dataTransfer) {
    event.dataTransfer.setData("text/plain", index.toString());
  }
};

const onDrop = (index: number, event: DragEvent): void => {
  if (event.dataTransfer) {
    const draggedIndex: number = parseInt(
      event.dataTransfer.getData("text/plain")
    );
    if (draggedIndex !== index) {
      const draggedCard: IDot = filteredDots.value[draggedIndex];
      moveDot(draggedCard.id, index);
    }
  }
};

onMounted(() => {
  setCoordinatesCollection(getFirstDot as IDot);
  setFirstDotChecked();
});
</script>

<template>
  <section class="basis-1/3 flex flex-col gap-4 min-w-[25rem] overflow-y-auto">
    <div class="flex justify-between gap-2 p-1">
      <h2 class="text-3xl font-semibold text-gray-700">Точки</h2>
      <IconField iconPosition="right">
        <InputIcon>
          <searchIcon class="w-4 h-4 stroke-black fill-black" />
        </InputIcon>
        <InputText
          v-model="search"
          min="0"
          placeholder="Search"
          type="number"
        />
      </IconField>
    </div>
    <div class="flex justify-between items-center gap-2">
      <div class="flex justify-center gap-2">
        <Checkbox
          v-model="checkedAll"
          :binary="true"
          :pt="{
            input: {
              class: ['border-black border-10px block'],
            },
          }"
          input-id="checkedAll"
          @change="selectAllCoordinates"
        />
        <label class="font-semibold cursor-pointer" for="checkedAll"
          >Выбрать все ({{ getDotsLength }})</label
        >
      </div>
      <div class="flex justify-center items-center gap-2">
        <button class="p-2 group">
          <brushIcon
            class="w-6 h-6 stroke-gray-700 group-hover:fill-purple-500"
          />
        </button>
        <button class="p-2 group">
          <nearestLocationIcon
            class="w-6 h-6 stroke-gray-700 group-hover:stroke-purple-500 fill-none"
          />
        </button>
      </div>
    </div>
    <p v-if="!filteredDots.length">Нет результатов</p>
    <VirtualScroller
      :itemSize="50"
      :items="filteredDots"
      :pt="{
        content: { class: ['grid grid-cols-1 gap-2 pr-2'] },
      }"
    >
      <template #item="{ item, options }">
        <AppDotsCard
          :data="item"
          :index="options.index"
          @onDragStart="onDragStart"
          @onDrop="onDrop"
        />
      </template>
    </VirtualScroller>
  </section>
</template>
