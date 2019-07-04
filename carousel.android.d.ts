import { CarouselCommon } from './carousel.common';
export * from './carousel.common';
export declare class Carousel extends CarouselCommon {
    private _androidViewId;
    private _indicatorViewId;
    private _pageIndicatorView;
    private _pagerIndicatorLayoutParams;
    _childrenCount: any;
    CarouselPagerAdapterClass: CarouselPagerAdapterClassInner;
    CarouselPageChangedListenerClass: CarouselPageChangedListener;
    constructor();
    readonly android: any;
    readonly adapter: android.support.v4.view.PagerAdapter;
    pageIndicatorCount: number;
    createNativeView(): any;
    onLoaded(): void;
    initNativeView(): void;
    refresh(): void;
    onLayout(left: any, top: any, right: any, bottom: any): void;
    private _getDataItem;
    onItemsChanged(data: any): void;
}
declare class CarouselPagerAdapterClassInner extends android.support.v4.view.PagerAdapter {
    private owner;
    constructor(owner: WeakRef<Carousel>);
    getCount(): any;
    getItemPosition(item: any): number;
    isViewFromObject(view: any, _object: any): boolean;
    instantiateItem(container: any, index: any): any;
    destroyItem(container: any, index: any, _object: any): any;
    saveState(): globalAndroid.os.Bundle;
    restoreState(state: any, loader: any): void;
}
declare class CarouselPageChangedListener extends android.support.v4.view.ViewPager.SimpleOnPageChangeListener {
    private owner;
    constructor(owner: WeakRef<Carousel>);
    onPageSelected(position: any): void;
    onPageScrollStateChanged(state: any): void;
    onPageScrolled(position: any, positionOffset: any, positionOffsetPixels: any): void;
}
