import { defineStore } from "pinia";
import { IDot } from "@/interfaces/dots.interface.ts";
import { Dot } from "@/utils/dotsStore.ts";

const dotsStore = new Dot();

export const dots = defineStore({
  id: "dots",
  state: () => ({
    dots: dotsStore.generateCoordinates(10000),
    coordinatesCollection: [] as IDot[],
  }),
  getters: {
    getDots: (state) => state.dots,
    getFirstDot: (state) => state.dots.find(() => true),
    getDotsLength: (state) => state.dots.length,
    getCoordinatesCollection: (state) => state.coordinatesCollection,
  },
  actions: {
    setIsChecked(id: number): void {
      const dotIndex: number = this.dots.findIndex(
        (dot): boolean => dot.id === id
      );
      if (dotIndex !== -1) {
        this.dots[dotIndex].isChecked = !this.dots[dotIndex].isChecked;
      }
    },
    setCoordinatesCollection(object: IDot): void {
      const found = this.dots.find((item) => item.id === object.id);
      if (found?.isChecked) {
        this.coordinatesCollection.push(object);
      } else {
        const index: number = this.coordinatesCollection.indexOf(object);
        if (index !== -1) {
          this.coordinatesCollection.splice(index, 1);
        }
      }
    },
    setAllIsChecked(prop: boolean): void {
      for (const item of this.dots) {
        item.isChecked = prop;
      }
    },
    setFirstDotChecked(): void {
      const first = this.dots.find((): boolean => true);
      if (first) {
        first.isChecked = true;
        this.coordinatesCollection.push(first);
      }
    },
    moveDot(id: number, newIndex: number): void {
      const index: number = this.dots.findIndex(
        (dot): boolean => dot.id === id
      );
      if (index !== -1) {
        const [removedDot] = this.dots.splice(index, 1);
        this.dots.splice(newIndex, 0, removedDot);
      }
    },
  },
});
