import type { BunFile } from "bun"
import type { IImageModule } from './interface/iimage.module'
import sharp from "sharp"

export class ImageModule implements IImageModule {
    private _file: BunFile

    constructor(imagePath: string) {
        this._file = Bun.file(imagePath)
    }

    async transform() {
        


        const arrBuff = await this._file.arrayBuffer()
        const buffer = Buffer.from(arrBuff)
        
        const image = sharp(buffer)
        const { data, info } = await image.raw().toBuffer({ resolveWithObject: true })

        let rgbBuff: number[][] = []
        for(let y = 0; y < info.height; y++) {
            const row: number[] = []

            for(let x = 0; x < info.width; x++) {
                const idx = (y * info.width + x) * 3
                const r = data[idx]
                const g = data[idx + 1]
                const b = data[idx + 2]

                row.push(r, g, b)
            }

            rgbBuff.push(row)
        }

        const grayscale = this._grayscaleConverter(rgbBuff)

        return {
            width: info.width,
            height: info.height,
            pixels: grayscale
        }
    }

    async build(filtered: TransformType) {
        const directory = this._file.name?.split('/')[1]
        const fileName = this._file.name?.split('/')[2]
        const outputPath = `output/${directory}/${fileName}`
        const buffer = Buffer.from(filtered.pixels.flat())

        await sharp(buffer, {
            raw: {
                width: filtered.width,
                height: filtered.height,
                channels: 1
            }
        }).toFile(outputPath)

        return `Image saved to ${outputPath}` 
    }

    // apply(module: FilterModule, times: number = 3, type: FilterType) {
    //     let filtered: TransformType = {} as TransformType

    //     for(let i = 0; i < times; i++) {
    //         switch(type) {
    //             case 'median':
    //                 filtered = module.medianFilter(3)
    //                 break
    //             case 'average':
    //                 filtered = module.averageFilter(3)
    //                 break
    //             default: filtered = module.medianFilter(3)
    //         }
    //         module.transformedImage = filtered
    //     }
        
    //     return filtered
    // }

    private _grayscaleConverter(rgbImage: number[][]): number[][] {
        const grayscale: number[][] = []
        for(let i = 0; i < rgbImage.length; i++) {
            const row: number[] = []
            for(let j = 0; j < rgbImage[i].length; j += 3) {
                const r = rgbImage[i][j]
                const g = rgbImage[i][j + 1]
                const b = rgbImage[i][j + 2]
                const gs_intensity = Math.floor((0.299 * r) + (0.587 * g) + (0.114 * b))

                row.push(gs_intensity)
            }
            grayscale.push(row)
        }
        return grayscale
    }
}