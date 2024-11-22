import { ImageModule } from "./modules/image.module"
import { ThresholdModule } from "./modules/threshold.module"

(async () => {
    await main()
})()

async function main() {
    try {
        console.log('Running script')
        const imagePath = 'images/img-1.jpg'
        const imageModule = new ImageModule(imagePath)
        const transformed = await imageModule.transform()

        const threshold = new ThresholdModule()
        threshold.otsu(transformed)
    } catch (error) {
        console.log(error)
    }
}