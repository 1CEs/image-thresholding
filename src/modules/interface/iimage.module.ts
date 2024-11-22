
export interface IImageModule {
    /**
     * 
     * @returns return the promise of object value that convert the image into rgb[][]
     */
    transform: () => Promise<TransformType>

    /**
     * 
     * @param filtered the image buffer that filtered
     * @returns return the promise of output path as a string
     */
    build: (filtered: TransformType) => Promise<string>

    /**
     * 
     * @param callback the filter module: average | median
     * @param times the round that you want to looping
     * @param type type of filter like average or median
     * @returns return object value that filtered
     */
    //apply: ( times: number, type: FilterType) => TransformType
}