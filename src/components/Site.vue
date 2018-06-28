<template>
    <iframe id="vigbo-cms"
            ref="iframeContent"
            :src="iframe.src"
            frameborder="0"
            allowfullscreen
            :settings="changeStyles"
            @load="setIFrameStyles"
    >
        <p>Your browser does not support iframes.</p>
    </iframe>
</template>

<script>
    import { getSettings } from '../Actions/loads';
    import { mapGetters } from 'vuex';

    export default {
        name: 'Site',
        computed: {
            ...mapGetters('editor', {
                elemSettings: 'getElemSettings',
                elemLength: 'getElemSettingsLength',
            }),
            changeStyles() {
                this.elemSettings; // TODO refactoring
                if (this.$refs.iframeContent) {
                    this.setIFrameStyles();
                }
            },
        },
        beforeRouteLeave(to, from, next) {
            if (this.elemLength === 0) {
                next()
            } else {
                next(false)
            }
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('message', this.get, false)
            })
        },
        methods: {
            get(e) {
                console.log(e.data); // selector or URL
                if (e.data.elem) {
                    // this.elemSettings.filter(item => {
                    //     if (item.name === 'link-color') {//item.name === e.data.elem
                    //         this.linksColor = item.newValue;
                    //     }
                    // });
                    let style = `
                        .${e.data.elem} { color: ${this.linksColor} !important }
                    `;
                    e.source.postMessage(style, '*');
                }
                // getSettings(this.$http, this.$alert) get backend setting for current page IFRAME
            },
            setIFrameStyles() {
                this.frame = this.$refs.iframeContent.contentWindow;
                if (this.frame) {
                    this.elemSettings.filter(item => {
                        if (item.name === 'width-catalog') {
                            this.bodyWidth = item.newValue;
                        }
                        if (item.name === 'font-select') {
                            this.fontFamily = item.newValue;
                        }
                        if (item.name === 'font-size-category') {
                            this.fontSize = item.newValue;
                        }
                        if (item.name === 'font-style') {
                            this.fontStyle = item.newValue;
                        }
                        if (item.name === 'font-letter-spacing') {
                            this.letterSpacing = item.newValue;
                        }
                        if (item.name === 'font-line-height') {
                            this.lineHeight = item.newValue;
                        }
                        if (item.name === 'link-color') {
                            this.linksColor = item.newValue;
                        }
                        if (item.name === 'link-color-active') {
                            this.linksColorActive = item.newValue;
                        }
                        if (item.name === 'bg-link-subcategory') {
                            this.subLinksBgColor = item.newValue;
                        }
                        if (item.name === 'size-subcategory') {
                            this.fontSizeSubCategory = item.newValue;
                        }
                        if (item.name === 'font-style-subcategory') {
                            this.fontStyleSubcategory = item.newValue;
                        }
                        if (item.name === 'font-letter-spacing-sub') {
                            this.letterSpacingSubcat = item.newValue;
                        }
                        if (item.name === 'font-line-height-sub') {
                            this.lineHeightSubcat = item.newValue;
                        }
                        if (item.name === 'link-color-sub') {
                            this.linksColorSubcat = item.newValue;
                        }
                        if (item.name === 'link-color-active-sub') {
                            this.linksColorActiveSubcat = item.newValue;
                        }
                        if (item.name === 'link-color-hover-sub') {
                            this.linksColorHoverSubcat = item.newValue;
                        }
                        if (item.name === 'font-size-images') {
                            this.fontSizeImages = item.newValue;
                        }
                        if (item.name === 'font-color-description') {
                            this.fontColorDescription = item.newValue;
                        }
                        if (item.name === 'bg-color-preview') {
                            this.bgColorPreview = item.newValue;
                        }
                        if (item.name === 'font-color-product-name') {
                            this.fontColorProductName = item.newValue;
                        }
                        if (item.name === 'font-color-preview') {
                            this.fontColorPreview = item.newValue;
                        }
                        if (item.name === 'font-color-price') {
                            this.fontColorPrice = item.newValue;
                        }
                        if (item.name === 'font-color-discount') {
                            this.fontColorDiscount = item.newValue;
                        }
                        if (item.name === 'bgcolor-icon-basket') {
                            this.bgColorIconBasket = item.newValue;
                        }
                        if (item.name === 'bgcolor-icon-basket-hover') {
                            this.bgColorIconBasketHover = item.newValue;
                        }
                        if (item.name === 'color-icon-basket') {
                            this.colorIconBasket = item.newValue;
                        }
                        if (item.name === 'color-icon-basket-hover') {
                            this.colorIconBasketHover = item.newValue;
                        }
                    });
                    const style = `
                        body { font-family: ${this.fontFamily}; }
                        .container.custom__content--max-width {
                            max-width: ${this.bodyWidth }% !important;
                        }
                        .shop-menu-item > a {
                            color: ${this.linksColor} !important;
                            font-size: ${this.fontSize}px !important;
                            font-${this.fontStyle === 'bold' ? 'weight' : 'style'}: ${this.fontStyle};
                            letter-spacing: 0.${this.letterSpacing}em !important;
                            line-height: ${this.lineHeight}em !important;
                        }
                        .shop-menu-item.active > a {
                            color: ${this.linksColorActive} !important;
                        }
                        .shop-menu-item > a:hover {
                            color: ${this.linksColorHover} !important;
                        }
                        .shop-products nav .shop-sub-menu .shop-menu-item.active a,
                        .shop-product nav .shop-sub-menu .shop-menu-item.active a {
                            background: ${this.subLinksBgColor} !important;
                        }
                        .shop-products nav .shop-sub-menu .shop-menu-item > a {
                            color: ${this.linksColorSubcat} !important;
                            font-size: ${this.fontSizeSubCategory}px !important;
                            font-${this.fontStyleSubcategory === 'bold' ? 'weight' : 'style'}: ${this.fontStyleSubcategory};
                            letter-spacing: 0.${this.letterSpacingSubcat}em !important;
                            line-height: ${this.lineHeightSubcat}em !important;
                        }
                        .shop-products nav .shop-sub-menu .shop-menu-item.active > a {
                            color: ${this.linksColorActiveSubcat} !important;
                        }
                        .shop-products nav .shop-sub-menu .shop-menu-item > a:hover {
                            color: ${this.linksColorHoverSubcat} !important;
                        }
                        .shop-products .products-list .product {
                            font-size: ${this.fontSizeImages}px !important;
                        }
                        .shop-products .shop-category-description {
                            color: ${this.fontColorDescription} !important;
                        }
                        .shop-products .products-list .product-name {
                            color: ${this.fontColorProductName} !important;
                        }
                        .shop-static-grid .static-grid-item .static-grid-cell:hover .image {
                            background: ${this.bgColorPreview} !important;
                        }
                        .shop-products .products-list .product-note {
                            color: ${this.fontColorPreview} !important;
                        }
                        .shop-products .products-list .product-price {
                            color: ${this.fontColorPrice} !important;
                        }
                        .shop-products .products-list .product-price-discount {
                            color: ${this.fontColorDiscount} !important;
                        }
                        .shop-add-to-cart-catalog-btn {
                            background: ${this.bgColorIconBasket} !important;
                        }
                        .shop-products .shop-add-to-cart-catalog-btn:hover {
                            background: ${this.bgColorIconBasketHover} !important;
                        }
                        .shop-products .shop-add-to-cart-catalog-btn svg path {
                            fill: ${this.colorIconBasket} !important;
                        }
                        .shop-products .shop-add-to-cart-catalog-btn:hover svg path {
                            fill: ${this.colorIconBasketHover} !important;
                        }
                    `;
                    this.frame.postMessage(style, '*');
                }
            },
        },
        data() {
            return {
                iframe: {
                    src: ''//this.$route.query.src
                },
                bodyWidth: 0,
                fontFamily: '',
                fontSize: 0,
                fontStyle: '',
                letterSpacing: 0,
                lineHeight: 0,
                linksColor: '',
                linksColorActive: '',
                linksColorHover: '',
                subLinksBgColor: '',
                fontSizeSubCategory: 0,
                fontStyleSubcategory: '',
                letterSpacingSubcat: 0,
                lineHeightSubcat: 0,
                linksColorSubcat: '',
                linksColorActiveSubcat: '',
                linksColorHoverSubcat: '',
                fontSizeImages: 0,
                fontColorDescription: '',
                bgColorPreview: '',
                fontColorProductName: '',
                fontColorPreview: '',
                fontColorPrice: '',
                fontColorDiscount: '',
                bgColorIconBasket: '',
                bgColorIconBasketHover: '',
                colorIconBasket: '',
                colorIconBasketHover: '',

            };
        },
    };
</script>

<style scoped>
    #vigbo-cms {
        width: 100%;
        height: 100%;
    }

</style>
