export default {
    namespaced: true,
    state: {
        items: [
            {
                url: '/',
                text: 'Hello World'
            },
            {
                url: '/site',
                text: 'Site',
            },
        ],
    },
    getters: {
        items(state) {
            return state.items;
        },
    },
};
