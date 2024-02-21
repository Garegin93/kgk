<script setup lang="ts">
import {IDot} from "../../interfaces/dot.interface";
import {computed, onMounted, ref} from "vue";
import AppSearchIcon from "../svg icons/AppSearchIcon.vue";
import AppBrushIcon from "../svg icons/AppBrushIcon.vue";
import AppLocationIcon from "../svg icons/AppLocationIcon.vue";
import AppDotsCard from "../dots card/AppDotsCard.vue";
import {useDotsStore} from "../../../store/useDotsStore";

const {
  getDotsLength,
  getDots,
  setAllIsChecked,
  setCoordinatesCollection,
  getFirstDot
} = useDotsStore()

const checkedAll = ref<boolean>(false)

const search = ref<string>('')

const selectAllCoordinates = (): void => {
  setAllIsChecked(checkedAll.value)
}


const filteredDots = computed<IDot[]>(() => {
  if (!search.value.trim()) return getDots;

  const searchNumber: number = parseInt(search.value.trim(), 10);

  return getDots.filter((dot: IDot) => dot.id === searchNumber);
});

onMounted(() => {
  setCoordinatesCollection(getFirstDot as IDot)
})

</script>

<template>
  <section class="basis-1/3 flex flex-col gap-4 min-w-[25rem] overflow-y-auto">
    <div class="flex justify-between gap-2">
      <h2 class="text-3xl font-semibold text-gray-700">Точки</h2>
      <IconField
          iconPosition="right">
        <InputIcon>
          <AppSearchIcon class="w-4 h-4"/>
        </InputIcon>
        <InputText
            min="0"
            v-model="search"
            type="number"
            placeholder="Search"/>
      </IconField>

    </div>
    <div class="flex justify-between items-center gap-2">
      <div class="flex justify-center gap-2">
        <Checkbox
            @change="selectAllCoordinates"
            v-model="checkedAll"
            :binary="true"
            input-id="checkedAll"
            :pt="{
              input: {
              class: ['border-black border-10px block']
              }
            }"
        />
        <label
            class="font-semibold cursor-pointer"
            for="checkedAll">Выбрать все ({{ getDotsLength }})</label>
      </div>
      <div class="flex justify-center items-center gap-2">
        <button class="p-2 group">
          <AppBrushIcon class="w-6 h-6 stroke-gray-700 group-hover:fill-purple-500"/>
        </button>
        <button class="p-2 group">
          <AppLocationIcon class="w-6 h-6 stroke-gray-700 group-hover:stroke-purple-500 fill-none"/>
        </button>
      </div>
    </div>
    <p v-if='!filteredDots.length'>Нет результатов</p>
    <VirtualScroller
        v-else
        :pt="{
      content: {class: ['grid grid-cols-1 gap-2 pr-2']}
        }"
        :items="filteredDots"
        :appendOnly="true"
        showLoader
        :delay="150"
        :itemSize="20"
        style="width: 100%; height: 78dvh">
      <template
          v-slot:item="{ item }">
        <AppDotsCard
            :data="item"/>
      </template>
    </VirtualScroller>
  </section>
</template>

<style scoped>

</style>