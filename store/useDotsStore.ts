import {defineStore} from 'pinia';
import {IDot} from "../src/interfaces/dot.interface.ts";

function generateCoordinates(count: number): IDot[] {
    const dots: IDot[] = [];
    for (let i = 0; i < count; i++) {
        const coordinates: string[] = [
            (Math.random() * 180 - 90).toFixed(6),
            (Math.random() * 360 - 180).toFixed(6)
        ];
        const id = i + 1;
        const isChecked = false;
        dots.push({id, isChecked, coordinates});
    }
    return dots;
}

export const useDotsStore = defineStore({
    id: 'dots',
    state: () => ({
        dots: generateCoordinates(10000),
        coordinatesCollection: [] as IDot[],
    }),
    getters: {
        getDots: (state) => state.dots,
        getFirstDot: (state) => {
            const first = state.dots.find(() => true);
            if (first) first.isChecked = true;
            return first;
        },
        getDotsLength: (state) => state.dots.length,
        getIsCheckedById: (state) => (id: number): boolean | undefined => {
            const dot = state.dots.find(dot => dot.id === id);
            return dot?.isChecked;
        },
        getCoordinatesCollection: (state) => state.coordinatesCollection
    },
    actions: {
        setIsChecked(id: number) {
            const dotIndex = this.dots.findIndex(dot => dot.id === id);
            if (dotIndex !== -1) {
                this.dots[dotIndex].isChecked = !this.dots[dotIndex].isChecked;
            }
        },
        setCoordinatesCollection(object: IDot): void {
            const finded = this.dots.find(item => item.id === object.id);
            if (finded?.isChecked) {
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
                // if (item.isChecked) this.setCoordinatesCollection(item)
            }
        }
    },
});
