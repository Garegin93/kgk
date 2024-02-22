import {IDot} from "../interfaces/dots.interface.ts";

export class Dot {
    dots: IDot[] = []

    generateCoordinates(count: number): IDot[] {
        for (let i: number = 0; i < count; i++) {
            const coordinates: string[] = [
                (Math.random() * 180 - 90).toFixed(6),
                (Math.random() * 360 - 180).toFixed(6)
            ];
            const id: number = i + 1;
            const isChecked: boolean = false;
            this.dots.push({id, isChecked, coordinates});
        }
        return this.dots;
    }
}