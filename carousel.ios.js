"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("tns-core-modules/platform");
var builder_1 = require("tns-core-modules/ui/builder");
var types_1 = require("tns-core-modules/utils/types");
var carousel_common_1 = require("./carousel.common");
__export(require("./carousel.common"));
var Carousel = (function (_super) {
    __extends(Carousel, _super);
    function Carousel() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Carousel.prototype, "ios", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    Carousel.prototype[carousel_common_1.autoPagingIntervalProperty.setNative] = function (value) {
        if (this.nativeView instanceof DKCarouselView) {
            this.nativeView.setAutoPagingForInterval(value);
        }
    };
    Carousel.prototype[carousel_common_1.selectedPageProperty.setNative] = function (value) {
        this.selectedPage = value;
        this.nativeView.selectedPage = value;
    };
    Carousel.prototype[carousel_common_1.showIndicatorProperty.setNative] = function (value) {
        this.nativeView.indicatorIsVisible = value;
    };
    Carousel.prototype[carousel_common_1.finiteProperty.setNative] = function (value) {
        this.nativeView.finite = value;
    };
    Carousel.prototype[carousel_common_1.bounceProperty.setNative] = function (value) {
        this.nativeView.bounce = value;
    };
    Carousel.prototype[carousel_common_1.scrollEnabledProperty.setNative] = function (value) {
        this.nativeView.scrollEnabled = value;
    };
    Carousel.prototype[carousel_common_1.indicatorColorProperty.setNative] = function (value) {
        this.nativeView.indicatorTintColor = value ? value.ios : '#fff';
    };
    Carousel.prototype[carousel_common_1.indicatorColorUnselectedProperty.setNative] = function (value) {
        this.nativeView.indicatorTintColorUnselected = value.ios;
    };
    Carousel.prototype[carousel_common_1.indicatorOffsetProperty.setNative] = function (value) {
        var ar = value.split(',');
        var x = ar[0] ? ar[0] : 0;
        var y = ar[1] ? ar[1] : 0;
        this.nativeView.indicatorOffset = CGPointMake(x, y);
    };
    Carousel.prototype.createNativeView = function () {
        this.nativeView = new DKCarouselView(UIView.alloc().initWithFrame(CGRectMake(0, 0, platform_1.screen.mainScreen.widthDIPs, 0)));
        return this.nativeView;
    };
    Carousel.prototype.initNativeView = function () {
        var _this = this;
        carousel_common_1.CLog(carousel_common_1.CLogTypes.info, "initNativeView...", this.nativeView);
        var nativeView = this.nativeView;
        this._isDirty = true;
        nativeView.setDidSelectBlock(function (item, index) {
            var data = {
                eventName: carousel_common_1.CarouselCommon.pageTappedEvent,
                object: _this,
                view: item,
                index: index
            };
            _this.notify(data);
        });
        nativeView.setDidChangeBlock(function (view, index) {
            var data = {
                eventName: carousel_common_1.CarouselCommon.pageChangedEvent,
                object: _this,
                view: view,
                index: index
            };
            _this.selectedPage = index;
            _this.notify(data);
        });
        nativeView.setDidScrollBlock(function (view, offset) {
            var data = {
                eventName: carousel_common_1.CarouselCommon.pageScrollingEvent,
                object: _this,
                view: view,
                state: {
                    offset: offset
                }
            };
            _this.notify(data);
        });
    };
    Carousel.prototype.disposeNativeView = function () {
        var nativeView = this.nativeView;
        nativeView.setDidChangeBlock(null);
        nativeView.setDidScrollBlock(null);
        nativeView.setDidSelectBlock(null);
        nativeView.setItems(NSMutableArray.new());
        this.removeChildren();
    };
    Carousel.prototype.onLoaded = function () {
        carousel_common_1.CLog(carousel_common_1.CLogTypes.info, "onLoaded...");
        _super.prototype.onLoaded.call(this);
        if (this._isDirty) {
            this.refresh();
        }
    };
    Carousel.prototype.refresh = function () {
        var _this = this;
        carousel_common_1.CLog(carousel_common_1.CLogTypes.info, "refresh...");
        if (!this.isLoaded || !this.nativeView) {
            this._isDirty = true;
            return;
        }
        this._isDirty = false;
        this.nativeView.setItems(NSMutableArray.new());
        if (types_1.isNullOrUndefined(this.items) || !types_1.isNumber(this.items.length)) {
            var nsArray_1 = NSMutableArray.new();
            carousel_common_1.CLog(carousel_common_1.CLogTypes.info, "children count: ", this.getChildrenCount());
            this.eachChildView(function (view1) {
                if (view1 instanceof carousel_common_1.CarouselItem) {
                    view1.width = _this.width;
                    view1.height = _this.height;
                    var dkCarouselViewItem1 = new DKCarouselViewItem();
                    dkCarouselViewItem1.view = view1.ios;
                    nsArray_1.addObject(dkCarouselViewItem1);
                }
                return true;
            });
            this.nativeView.setItems(nsArray_1);
        }
        else {
            this.removeChildren();
            var nsArray_2 = NSMutableArray.new();
            var length_1 = this.items.length;
            carousel_common_1.CLog(carousel_common_1.CLogTypes.info, "items length: ", length_1);
            for (var i = 0; i < length_1; i++) {
                var viewToAdd = !types_1.isNullOrUndefined(this.itemTemplate) ? builder_1.parse(this.itemTemplate, this) : null;
                if (!viewToAdd)
                    continue;
                var dataItem = this._getDataItem(i);
                viewToAdd.bindingContext = dataItem;
                this.addChild(viewToAdd);
            }
            this.eachChildView(function (view) {
                if (view instanceof carousel_common_1.CarouselItem) {
                    view.width = _this.width;
                    view.height = _this.height;
                    var dkCarouselViewItem = new DKCarouselViewItem();
                    dkCarouselViewItem.view = view.ios;
                    nsArray_2.addObject(dkCarouselViewItem);
                }
                return true;
            });
            this.nativeView.setItems(nsArray_2);
        }
    };
    Carousel.prototype.onItemsChanged = function (data) {
        if (!types_1.isNullOrUndefined(this.items) && types_1.isNumber(this.items.length)) {
            this.refresh();
        }
    };
    Carousel.prototype._getDataItem = function (index) {
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    };
    return Carousel;
}(carousel_common_1.CarouselCommon));
exports.Carousel = Carousel;
//# sourceMappingURL=carousel.ios.js.map