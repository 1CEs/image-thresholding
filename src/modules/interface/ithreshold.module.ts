export interface IThresholdModule {
    otsu: (img: TransformType) => number
    createHistogram: (img: TransformType) => number[]
}