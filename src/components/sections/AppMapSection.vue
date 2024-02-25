<script lang="ts" setup>
import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import {
  LControl,
  LIcon,
  LMap,
  LMarker,
  LPopup,
  LTileLayer,
} from "@vue-leaflet/vue-leaflet";
import { dots } from "../../../store/dots";
import locationIcon from "@/svg-icons/locationIcon.svg";
import companyIcon from "@/svg-icons/companyIcon.svg";
import mapLocationIcon from "@/svg-icons/mapLocationIcon.svg";

const { getFirstDot, getCoordinatesCollection } = dots();

const zoom = ref<number>(2);

const coordinates: string[] | undefined = getFirstDot?.coordinates;

const center = ref(coordinates);

type IconOptionsType = {
  iconUrl: string;
  iconSize: [number, number];
};

const iconOptions = ref<IconOptionsType>({
  iconUrl: "../../src/svg-icons/locationIcon.svg",
  iconSize: [32, 32],
});
</script>

<template>
  <section class="basis-2/3 relative">
    <LMap v-model:center="center" v-model:zoom="zoom" :useGlobalLeaflet="false">
      <LTileLayer
        :attribution="'Карты'"
        layer-type="base"
        name="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      >
      </LTileLayer>
      <LControl>
        <h2 class="text-3xl font-semibold text-gray-700">Карта</h2>
      </LControl>
      <LMarker
        v-for="dot in getCoordinatesCollection"
        :key="dot.id"
        :lat-lng="dot.coordinates"
        :options="{ attributionControl: false }"
      >
        <LIcon :options="iconOptions" class="custom-icon" />
        <LPopup
          :options="{ closeButton: false, visible: true, maxWidth: '400px' }"
          class="h-full w-full"
        >
          <div class="p-1 whitespace-nowrap font-semibold flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <mapLocationIcon class="w-6 h-6 fill-purple-500" />
              <p>Точка №{{ dot.id }}</p>
            </div>
            <div class="flex items-center gap-2">
              <locationIcon class="w-6 h-6" />
              <p>Улица.....</p>
            </div>
            <div class="flex items-center gap-2">
              <companyIcon class="w-6 h-6 stroke-purple-500 fill-white" />
              <p>ОАО Комания.....</p>
            </div>
          </div>
        </LPopup>
      </LMarker>
    </LMap>
  </section>
</template>
