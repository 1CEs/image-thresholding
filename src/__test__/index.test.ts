import { expect, test, describe } from 'bun:test'
import { ImageModule } from '../modules/image.module'
import { ThresholdModule } from '../modules/threshold.module'

describe('otsu_test', async () => {
    for (let i = 1; i <= 3; i++) {
        const imagePath = `images/jpg/img-${i}.jpg`
        const imageModule = new ImageModule(imagePath)
        const transformed = await imageModule.transform()
        test(`otsu_test_${i}`, async () => {
            const threshold = new ThresholdModule()
            const t = threshold.otsu(transformed)
            const binary = imageModule.apply(t, transformed)
            expect(await imageModule.build(binary)).toBe(`Image saved to output/jpg/img-${i}.jpg`)
        })
    }

})