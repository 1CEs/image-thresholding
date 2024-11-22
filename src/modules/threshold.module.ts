import type { IThresholdModule } from "./interface/ithreshold.module";

export class ThresholdModule implements IThresholdModule {
    otsu(img: TransformType) {
        const { width, height, pixels } = img
        
        const histogram = this.createHistogram(img)
        
        const totalPixels = width * height

        let sum = 0
        for(let i = 0; i < histogram.length; i++) {
            sum += i * histogram[i]
        }

        let sumB = 0
        let weightB = 0
        let weightF = 0

        let maxVariance = 0
        let threshold = 0

        for(let t = 0; t < 256; t++) {
            weightB += histogram[t]
            if(weightB == 0) continue

            weightF = totalPixels - weightB
            if(weightF == 0) break

            sumB += t * histogram[t]

            const meanB = sumB / weightB
            const meanF = (sum - sumB) / weightF

            const variance = weightB * weightF * Math.pow(meanB - meanF, 2)

            if (variance > maxVariance) {
                maxVariance = variance
                threshold = t
            }
        }

        return threshold
    }

    createHistogram(img: TransformType) {
        const histogram = Array(256).fill(0)
        for(let x = 0; x < img.width; x++) {
            for(let y = 0; y < img.height; y++) {
                const intensity = img.pixels[y][x]
                histogram[intensity]++
            }
        }
        return histogram
    }
}