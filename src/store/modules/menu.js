export default {
    namespaced: true,
    state: {
        menu: [
            {
                url: '/menu',
                path: 'menu',
                icon: 'menu',
                text: 'Menu'
            },
            {
                url: '/general',
                path: 'general',
                icon: 'home',
                text: 'General'
            },
            {
                url: '',
                path: 'shop',
                icon: 'business',
                text: 'Shop',
                expand: true,
                links: [
                    {
                        path: 'shop-categories',
                        url: '/shop/categories',
                        icon: 'account_circle',
                        text: 'Categories'
                    },
                    {
                        path: 'shop-catalog',
                        url: '/shop/catalog',
                        icon: 'account_circle',
                        text: 'Catalog'
                    },
                    {
                        path: 'shop-product',
                        url: '/shop/product',
                        icon: 'account_circle',
                        text: 'Product'
                    },
                    {
                        path: 'shop-order',
                        url: '/shop/order',
                        icon: 'account_circle',
                        text: 'Order'
                    },
                    {
                        path: 'shop-pre-order',
                        url: '/shop/pre-order',
                        icon: 'account_circle',
                        text: 'Pre-Order'
                    },
                ]
            },
            {
                url: '',
                path: 'blog',
                icon: 'bubble_chart',
                text: 'Blog',
                expand: true,
                links: [
                    {
                        path: 'categories',
                        url: '/blog/categories',
                        icon: 'account_circle',
                        text: 'Categories'
                    },
                    {
                        path: 'page',
                        url: '/blog/page',
                        icon: 'account_circle',
                        text: 'Blog Page'
                    },
                    {
                        path: 'post',
                        url: '/blog/post',
                        icon: 'account_circle',
                        text: 'Blog Post'
                    },
                    {
                        path: 'slider',
                        url: '/blog/slider',
                        icon: 'account_circle',
                        text: 'Slider'
                    },
                ]
            },
            {
                url: '/search',
                path: 'search',
                icon: 'search',
                text: 'Search',
            },
        ],
    },
    getters: {
        links(state) {
            return state.menu;
        },
    },
};
