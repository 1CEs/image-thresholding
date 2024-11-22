import { ImageModule } from "./modules/image.module"
import { ThresholdModule } from "./modules/threshold.module"

(async () => {
    await main()
})()

async function main() {
    try {
        console.log('Running script')
        const imagePath = 'images/jpg/img-2.jpg'
        const imageModule = new ImageModule(imagePath)
        const transformed = await imageModule.transform()

        const threshold = new ThresholdModule()
        const t = threshold.otsu(transformed)
        console.log(t)
        const binary = imageModule.apply(t, transformed)
        const saved = await imageModule.build(binary)
        console.log(saved)
    } catch (error) {
        console.log(error)
    }
}