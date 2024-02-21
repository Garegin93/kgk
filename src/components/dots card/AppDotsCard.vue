<script setup lang="ts">
import {defineProps, PropType, ref} from "vue";
import AppListIcon from "../svg icons/AppListIcon.vue";
import AppCurrentLocationIcon from "../svg icons/AppCurrentLocationIcon.vue";
import {useDotsStore} from "../../../store/useDotsStore";
import {IDot} from "../../interfaces/dot.interface";


const {
  setIsChecked,
  setCoordinatesCollection,
} = useDotsStore();

const props = defineProps({
  data: {
    type: Object as PropType<object>,
    required: true
  }
})

function toggleChecked(data: IDot, event: MouseEvent): void {
  event.preventDefault()
  setIsChecked(data.id);
  setCoordinatesCollection(data)
}

</script>

<template>
  <div
      @click="toggleChecked(data as IDot, $event)"
      :class="data.isChecked ? 'border-purple-500' : 'border-gray-200'"
      class='p-4 rounded-lg border flex flex-col gap-2 text-purple-500 whitespace-nowrap cursor-pointer'>
    <div class="flex justify-between gap-2">
      <div class="flex justify-center items-center gap-2">
        <Checkbox
            v-model="data.isChecked"
            :binary="true"
        />
        <label
            class="text-black font-semibold">Точка №{{ data.id }}</label>
      </div>
      <button class="p-2 group">
        <AppListIcon class="w-4 h-4 stroke-gray-600 fill-none group-hover:stroke-purple-500"/>
      </button>
    </div>
    <div>
      <AppCurrentLocationIcon class="w-4 h-4 stroke-purple-500 fill-none inline"/>
      <span class="text-xs">{{ data.coordinates.join(', ') }}</span>
    </div>
  </div>
</template>