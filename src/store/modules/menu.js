export default {
    namespaced: true,
    state: {
        items: [
            {
                url: '/',
                icon: 'home',
                text: 'General Settings'
            },
            {
                url: '/site',
                icon: 'bubble_chart',
                text: 'Design Editor',
            },
        ],
    },
    getters: {
        items(state) {
            return state.items;
        },
    },
};
