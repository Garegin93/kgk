<script lang="ts" setup>
import { PropType, ref } from "vue";
import currentLocationIcon from "@/svg-icons/currentLocationIcon.svg";
import iconList from "@/svg-icons/iconList.svg";
import { dots } from "../../../store/dots";
import { IDot } from "@/interfaces/dots.interface.ts";

defineProps({
  data: {
    type: Object as PropType<IDot>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
    default: 0,
  },
});

const { setIsChecked, setCoordinatesCollection } = dots();

const isClicked = ref<boolean>(false);

function toggleChecked(data: IDot, event: MouseEvent): void {
  event.preventDefault();
  setIsChecked(data.id);
  setCoordinatesCollection(data);
}
</script>

<template>
  <div
    :class="data.isChecked ? 'border-purple-500' : 'border-gray-200'"
    :draggable="isClicked"
    class="p-4 rounded-lg border flex flex-col gap-2 text-purple-500 whitespace-nowrap cursor-pointer"
    @click="toggleChecked(data, $event)"
    @dragstart="$emit('onDragStart', index, $event)"
    @drop="$emit('onDrop', index, $event)"
    @dragover.prevent
  >
    <div class="flex justify-between gap-2">
      <div class="flex justify-center items-center gap-2">
        <Checkbox v-model="data.isChecked" :binary="true" />
        <label class="text-black font-semibold">Точка №{{ data.id }}</label>
      </div>
      <button
        class="p-2 group hover:cursor-grab"
        @mousedown="isClicked = true"
        @mouseup="isClicked = false"
      >
        <iconList
          class="w-4 h-4 stroke-gray-600 fill-none group-hover:stroke-purple-500"
        />
      </button>
    </div>
    <div>
      <currentLocationIcon class="w-4 h-4 stroke-purple-500 fill-none inline" />
      <span class="text-xs">{{ data.coordinates.join(", ") }}</span>
    </div>
  </div>
</template>
