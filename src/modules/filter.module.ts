import type { IFilterModule } from "./interface/ifilter.module"

export class FilterModule implements IFilterModule {
    constructor(private _transformedImage: TransformType) { }

    public set transformedImage(transformed: TransformType) {
        this._transformedImage = transformed
    }

    medianFilter(maskSize: number = 3) {
        const halfMaskSize = Math.floor(maskSize / 2)
        const { width, height, pixels } = this._transformedImage
        const filtered: number[][] = Array.from({ length: height }, () => Array(width).fill(0))

        for (let row = 1; row < height; row++) {
            for (let col = 1; col < width; col++) {

                const mask: number[] = []
                for (let i = -halfMaskSize; i <= halfMaskSize; i++) {
                    for (let j = -halfMaskSize; j <= halfMaskSize; j++) {
                        const neighborRow = row + i;
                        const neighborCol = col + j;
                        if (
                            neighborRow >= 0 &&
                            neighborRow < height &&
                            neighborCol >= 0 &&
                            neighborCol < width
                        ) {
                            mask.push(pixels[neighborRow][neighborCol])
                        }
                    }
                }

                const sortedNeighbors = mask.sort((a, b) => a - b)
                const median = sortedNeighbors[Math.floor(sortedNeighbors.length / 2)]
                filtered[row][col] = median;
            }
        }

        return { ...this._transformedImage, pixels: filtered }
    }
}