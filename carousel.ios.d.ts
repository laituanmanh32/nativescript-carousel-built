import { CarouselCommon } from './carousel.common';
export * from './carousel.common';
export declare class Carousel extends CarouselCommon {
    nativeView: any;
    items: any;
    itemTemplate: any;
    selectedPage: any;
    private _isDirty;
    constructor();
    readonly ios: any;
    createNativeView(): any;
    initNativeView(): void;
    disposeNativeView(): void;
    onLoaded(): void;
    refresh(): void;
    onItemsChanged(data: any): void;
    private _getDataItem;
}
