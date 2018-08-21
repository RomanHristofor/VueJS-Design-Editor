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
                        icon: 'account_circle',
                        text: 'Categories'
                    },
                    {
                        path: 'shop-catalog',
                        icon: 'account_circle',
                        text: 'Catalog'
                    },
                    {
                        path: 'shop-product',
                        icon: 'account_circle',
                        text: 'Product'
                    },
                    {
                        path: 'shop-order',
                        icon: 'account_circle',
                        text: 'Order'
                    },
                    {
                        path: 'shop-pre-order',
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
                        icon: 'account_circle',
                        text: 'Categories'
                    },
                    {
                        path: 'page',
                        icon: 'account_circle',
                        text: 'Blog Page'
                    },
                    {
                        path: 'post',
                        icon: 'account_circle',
                        text: 'Blog Post'
                    },
                    {
                        path: 'slider',
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
        subMenu: {
            'shop-order': [
                {
                    label: 'Order',
                    icon: 'arrow_back',
                },
                {
                    path: 'shop-order-page',
                    text: 'Page Settings',
                },
                {
                    path: 'shop-order-form',
                    text: 'Form Settings',
                },
            ],
            'shop-pre-order': [
                {
                    label: 'Pre-order',
                    icon: 'arrow_back',
                },
                {
                    path: 'shop-pre-order-page',
                    text: 'Page Settings',
                },
                {
                    path: 'shop-pre-order-form',
                    text: 'Form Settings',
                },
            ],
        }
    },
    getters: {
        links(state) {
            return state.menu;
        },
        subLinks(state) {
            return state.subMenu;
        },
    },
};
