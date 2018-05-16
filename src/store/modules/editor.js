export default {
    namespaced: true,
    state: {
        settings: [],
        color: {},
        width: {},
        elementsMap: {},
    },
    getters: {
        settings(state) {
            return state.settings;
        },
        elementsMap(state) {
            let map = {};

            for(let i = 0; i < state.settings.length; i++) {
                // TODO fix get page
                if ( window.location.pathname === state.settings[i].url ) {
                    console.log('route', window.location.pathname === state.settings[i].url)

                    for(let l = 0; l < state.settings[i].elements.length; l++) {
                        let elem = state.settings[i].elements[l];
                        map[elem.id] = elem;
                    }
                }
            }
            return map;
        },
        elemSettings: (state, getters) => (id) => {
//            state.color = getters.elementsMap[id];
//            console.log('get elem', state.color)
            return getters.elementsMap[id];
        },
        color(state) {
            return state.color;
        },
        width(state) {
            return state.width;
        },
    },
    mutations: {
        loadSettings(state, data) {
            state.settings = data;
        },
        setColor(state, payload) {
//            console.log('payload ' + payload);
            state.color = payload;
        },
        setWidth(state, payload) {
//            debugger
            state.width = payload;
        }
    },
    actions: {
        loadSettings(store) {
            store.commit('loadSettings', loadSettings());
        },
        setColor(store, newColor) {
            store.commit('setColor', newColor);
        },
        setWidth(store, newWidth) {
            store.commit('setWidth', newWidth);
        },
    },
};

// GET settings for Design Editor
function loadSettings() {
    return [
        {
            id: 10,
            page: 'site',
            url: '/site',
            elements: [
                { id: 0, text: 'Ширина кнопки', slider: true, defWidth: '15' },
                { id: 1, text: 'Навигация слайдера', cPicker: true, defColor: '#62e742' },
                { id: 2, fonts: ['Arial', 'Monaco'] },
                //{ id: 3, text: 'Навигация слайдера 1', cPicker: true, defColor: '#e7df39' }, //cyan
            ],
        },
        {
            id: 20,
            page: 'blog',
            url: '/blog',
            elements: [
                { id: 0, text: 'Ширина сайта', slider: false, },
                { id: 1, text: 'Навигация слайдера', cPicker: true, defColor: 'cyan' },
                { id: 2, fonts: ['Helvetica', 'Menlo'] },
            ],
        },
        {
            id: 30,
            title: 'Shop',
            colors: [],
            item_price: 30000,
        },
    ];
}
