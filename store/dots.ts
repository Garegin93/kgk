import {defineStore} from "pinia";
import {IDot} from "../src/interfaces/dots.interface.ts";
import {Dot} from "../src/utils/dotsStore.ts";

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
        setIsChecked(id: number) {
            const dotIndex = this.dots.findIndex((dot) => dot.id === id);
            if (dotIndex !== -1) {
                this.dots[dotIndex].isChecked = !this.dots[dotIndex].isChecked;
            }
        },
        setCoordinatesCollection(object: IDot): void {
            const found = this.dots.find((item) => item.id === object.id);
            if (found?.isChecked) {
                this.coordinatesCollection.push(object);
            } else {
                const index = this.coordinatesCollection.indexOf(object);
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
            const first = this.dots.find(() => true);
            if (first) {
                first.isChecked = true;
                this.coordinatesCollection.push(first);
            }
        },
    },
});
