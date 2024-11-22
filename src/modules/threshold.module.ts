import type { IThresholdModule } from "./interface/ithreshold.module";

export class ThresholdModule implements IThresholdModule {
    async otsu(img: TransformType) {
        const { width, height, pixels } = img
        const histogram = this.createHistogram(img)
        console.log(histogram)
        return img
    }

    createHistogram(img: TransformType) {
        const histogram = Array(256).fill(0)
        for(let x = 0; x < img.width; x++) {
            for(let y = 0; y < img.height; y++) {
                const intensity = img.pixels[x][y]
                histogram[intensity]++
            }
        }
        return histogram
    }
}