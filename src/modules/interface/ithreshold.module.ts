export interface IThresholdModule {
    otsu: (img: TransformType) => Promise<TransformType>
    createHistogram: (img: TransformType) => number[]
}