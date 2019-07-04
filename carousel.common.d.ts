import { Color } from 'tns-core-modules/color/color';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Property, Template, View } from 'tns-core-modules/ui/core/view';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
export declare class CarouselUtil {
    static debug: boolean;
}
export declare enum CLogTypes {
    info = 0,
    warning = 1,
    error = 2
}
export declare const CLog: (type?: CLogTypes, ...args: any[]) => void;
export declare class CarouselCommon extends GridLayout {
    static pageChangedEvent: string;
    static pageTappedEvent: string;
    static pageScrollingEvent: string;
    static pageScrollStateChangedEvent: string;
    ios: any;
    android: any;
    items: ObservableArray<any>;
    itemTemplate: string | Template;
    selectedPage: any;
    showIndicator: boolean;
    indicatorColor: any;
    indicatorColorUnselected: any;
    indicatorOffset: any;
    bounce: any;
    finite: any;
    scrollEnabled: any;
    autoPagingInterval: any;
    indicatorAnimation: any;
    indicatorAnimationDuration: any;
    indicatorAlignment: any;
    indicatorRadius: any;
    indicatorPadding: any;
    debug: boolean;
    constructor();
    _getDefaultItemContent(index: number): View;
}
export declare class CarouselItem extends StackLayout {
    constructor();
    onLoaded(): void;
}
export declare namespace knownTemplates {
    const itemTemplate = "itemTemplate";
}
export declare const itemTemplateProperty: Property<CarouselCommon, any>;
export declare const itemsProperty: Property<CarouselCommon, ObservableArray<any>>;
export declare const selectedPageProperty: Property<CarouselCommon, number>;
export declare const showIndicatorProperty: Property<CarouselCommon, boolean>;
export declare const indicatorColorProperty: Property<CarouselCommon, Color>;
export declare const indicatorColorUnselectedProperty: Property<CarouselCommon, Color>;
export declare const indicatorOffsetProperty: Property<CarouselCommon, any>;
export declare const autoPagingIntervalProperty: Property<CarouselCommon, number>;
export declare const finiteProperty: Property<CarouselCommon, boolean>;
export declare const bounceProperty: Property<CarouselCommon, boolean>;
export declare const scrollEnabledProperty: Property<CarouselCommon, boolean>;
export declare const indicatorAnimationProperty: Property<CarouselCommon, IndicatorAnimation>;
export declare const indicatorAnimationDurationProperty: Property<CarouselCommon, number>;
export declare const indicatorAlignmentProperty: Property<CarouselCommon, any>;
export declare const indicatorRadiusProperty: Property<CarouselCommon, number>;
export declare const indicatorPaddingProperty: Property<CarouselCommon, number>;
export declare enum IndicatorAnimation {
    'NONE' = "NONE",
    'COLOR' = "COLOR",
    'SLIDE' = "SLIDE",
    'WORM' = "WORM",
    'FILL' = "FILL",
    'SCALE' = "SCALE",
    'SCALE_DOWN' = "SCALE_DOWN",
    'THIN_WORM' = "THIN_WORM",
    'DROP' = "DROP",
    'SWAP' = "SWAP"
}
