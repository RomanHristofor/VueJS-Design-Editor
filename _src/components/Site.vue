<template>
    <iframe id="vigbo-cms"
        ref="iframeContent"
        name="vigbo"
        :src="iFrameURL"
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
                iFrameURL: 'getIFrameURL',
            }),
            changeStyles() {
                if (this.elemSettings && this.$refs.iframeContent) {
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
        methods: {
            setIFrameStyles() {
                this.frame = this.$refs.iframeContent.contentWindow;

                // STYLES DEFAULT
                if (this.frame && this.$route.name === 'empty') {
                    this.frame.postMessage('empty', '*');
                }

                // STYLES FOR MENU
                if (this.frame && this.$route.name === 'menu') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'bg-color-menu_page') {
                            this.bgColorMenu = `
                                ${item.selector} {${item.css['background']}: ${item.newValue}}
                            `;
                        }
                        if (item.name === 'font-site-menu_page') {
                            this.fontFamilyMenu = `
                                ${item.selector} {${item.css['font-family']}: ${item.newValue}}
                            `;
                        }
                    });
                    const menuStyle = `
                        ${this.bgColorMenu} ${this.fontFamilyMenu}
                    `;
                    this.frame.postMessage(menuStyle, '*');
                }

                // STYLES FOR GENERAL
                if (this.frame && this.$route.name === 'general') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'width-site') {
                            this.bodyWidth = item.newValue;
                        }
                        if (item.name === 'bg-color-site') {
                            this.bgColorSite = item.newValue;
                        }
                        if (item.name === 'font-site') {
                            this.fontFamily = item.newValue;
                        }
                        if (item.name === 'color-font-text') {
                            this.colorFontText = item.newValue;
                        }
                        if (item.name === 'color-links-hover') {
                            this.colorLinksHover = item.newValue;
                        }
                        if (item.name === 'color-arrow-top') {
                            this.colorArrowTop = item.newValue;
                        }
                        if (item.name === 'color-arrow-top-hover') {
                            this.colorArrowTopHover = item.newValue;
                        }
                        if (item.name === 'color-elem-slider') {
                            this.colorElemSlider = item.newValue;
                        }
                        if (item.name === 'color-elem-slider-hover') {
                            this.colorElemSliderHover = item.newValue;
                        }

                    });
                    const generalStyle = `
                        .container.custom__content--max-width {
                            max-width: ${this.bodyWidth }% !important;
                        }
                        body { background-color: ${this.bgColorSite} !important; }
                        body { font-family: ${this.fontFamily}; }

                    `;
                    this.frame.postMessage(generalStyle, '*');
                }

                // STYLES FOR SEARCH
                if (this.frame && this.$route.name === 'search') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'bg-color-search') {
                            this.bgColorSearch = item.newValue;
                        }
                        if (item.name === 'color-search-close') {
                            this.colorCloseIconSearch = item.newValue;
                        }
                    });
                    const searchStyle = `
                        .searchform__header {
                            background: ${this.bgColorSearch } !important;
                        }
                        .searchform__close .close-svg-style,
                        .searchform__push .search-svg-style {
                            stroke: ${this.colorCloseIconSearch} !important;
                        }
                    `;
                    this.frame.postMessage(searchStyle, '*');
                }

                // STYLES FOR SHOP/CATEGORY
                if (this.frame && this.$route.name === 'shop-categories') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'shop-font-categories') {
                            this.shopCategories = item.newValue;
                        }
                    });
                    const shopCategoriesStyle = `
                        .searchform__header {
                            background: ${this.shopCategories } !important;
                        }

                    `;
                    this.frame.postMessage(shopCategoriesStyle, '*');
                }

                // STYLES FOR SHOP/CATALOG
                if (this.frame && this.$route.name === 'shop-catalog') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'size-shop_catalog') {
                            this.shopSizeCatalog = item.newValue;
                        }
                    });
                    const shopCatalogStyle = `
                        .searchform__header {
                            background: ${this.shopSizeCatalog } !important;
                        }

                    `;
                    this.frame.postMessage(shopCatalogStyle, '*');
                }

                // STYLES FOR SHOP/PRODUCT
                if (this.frame && this.$route.name === 'shop-product') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'size-shop_product') {
                            this.shopSizeProduct = item.newValue;
                        }
                    });
                    const shopProductStyle = `
                        .searchform__header {
                            background: ${this.shopSizeProduct } !important;
                        }

                    `;
                    this.frame.postMessage(shopProductStyle, '*');
                }

                // STYLES FOR SHOP/ORDER
                if (this.frame && this.$route.name === 'shop-order') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'font-page-shop_order') {
                            this.shopSizeOrder = item.newValue;
                        }
                    });
                    const shopOrderStyle = `
                        body { font-family: ${this.shopSizeOrder}; }
                    `;
                    this.frame.postMessage(shopOrderStyle, '*');
                }

                // STYLES FOR SHOP/PRE ORDER
                if (this.frame && this.$route.name === 'shop-pre-order') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'size-heading-ordering-shop_pre_order') {
                            this.shopSizeHeadingPreOrder = item.newValue;
                        }
                    });
                    const shopPreOrderStyle = `
                        .shop-category-description {
                            max-width: ${this.shopSizeHeadingPreOrder }px !important;
                        }
                    `;
                    this.frame.postMessage(shopPreOrderStyle, '*');
                }

                // STYLES FOR BLOG/CATEGORY
                if (this.frame && this.$route.name === 'categories') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'font-categories') {
                            this.fontCategories = item.newValue;
                        }
                        if (item.name === 'size-font-categories') {
                            this.sizeFontCategories = item.newValue;
                        }
                    });
                    const blogCategoriesStyle = `
                        .searchform__header {
                            background: ${this.fontCategories } !important;
                        }

                    `;
                    this.frame.postMessage(blogCategoriesStyle, '*');
                }

                // STYLES FOR BLOG/PAGE
                if (this.frame && this.$route.name === 'page') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'width-blog-page') {
                            this.widthBlogPage = item.newValue;
                        }
                        if (item.name === 'bg-blog-page') {
                            this.bgBlogPage = item.newValue;
                        }
                    });
                    const blogPageStyle = `
                        .searchform__header {
                            background: ${this.bgBlogPage } !important;
                        }

                    `;
                    this.frame.postMessage(blogPageStyle, '*');
                }

                // STYLES FOR BLOG/POST
                if (this.frame && this.$route.name === 'post') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'width-blog-post') {
                            this.widthBlogPost = item.newValue;
                        }
                    });
                    const blogPostStyle = `
                        .searchform__header {
                            background: ${this.widthBlogPost } !important;
                        }

                    `;
                    this.frame.postMessage(blogPostStyle, '*');
                }

                // STYLES FOR BLOG/SLIDER
                if (this.frame && this.$route.name === 'slider') {
                    this.elemSettings.filter(item => {
                        if (item.name === 'height-blog-slider') {
                            this.heightBlogSlider = item.newValue;
                        }
                    });
                    const blogSliderStyle = `
                        .searchform__header {
                            background: ${this.heightBlogSlider } !important;
                        }

                    `;
                    this.frame.postMessage(blogSliderStyle, '*');
                }
            },
        },
        data() {
            return {
                // iframe: {
                //     src: 'http://vigbocms.loc' //this.$route.query.src
                // },

                // var for menu
                bgColorMenu: '',
                fontFamilyMenu: '',
                // var for search
                bgColorSearch: '',
                colorCloseIconSearch: '',
                // var for General
                bodyWidth: 0,
                bgColorSite: '',
                fontFamily: '',
                colorFontText: '',
                colorLinksHover: '',
                colorArrowTop: '',
                colorArrowTopHover: '',
                colorElemSlider: '',
                colorElemSliderHover: '',

                // var for shop-categories
                shopCategories: '',
                // var for shop catalog
                shopSizeCatalog: '',
                // var for shop product
                shopSizeProduct: '',
                // var for shop order
                shopSizeOrder: '',
                // var for shop pre-order
                shopSizeHeadingPreOrder: 0,

                // var for blog-categories
                fontCategories: '',
                sizeFontCategories: '',
                // var for blog-page
                widthBlogPage: 0,
                bgBlogPage: '',
                bgSidebarBlogPage: '',
                // var for blog-post
                widthBlogPost: '',
                // var for blog-slider
                heightBlogSlider: 0,
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
