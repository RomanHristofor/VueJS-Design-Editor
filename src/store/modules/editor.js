export default {
    namespaced: true,
    state: {
        settings: [],
        color: {},
        width: [],
        widthID: {},
        countWidth: 0,
        currentWidth: '',
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
            return getters.elementsMap[id];
        },
        color(state) {
            return state.color;
        },
        width(state) {
            return state.width;
        },
        elemWidthMap(state) {
            let map = {};
            for(let i = 0; i < state.width.length; i++){
                let item = state.width[i];
                map[item.id] = item;
            }
            console.log('stor   elemWidth  FULL   ' , map)
            return map;
        },
        elemWidth: (state, getters) => (id) => {
            if( id ){
                return getters.elemWidthMap[id];
            }
        },
        getWidthID(state) {
            return state.countWidth;
        },
        getCurrentWidth(state) {
            return state.currentWidth;
        },
    },
    mutations: {
        loadSettings(state, data) {
            state.settings = data;
        },
        setColor(state, payload) {
            state.color = payload;
        },
        setWidth(state, payload) {
            state.width.push(payload);
            state.widthID[state.countWidth] = state.countWidth++;
        },
        setCurrentWidth(state, payload) {
            state.currentWidth = payload;
        },
        decrementWidth(state) {
            state.countWidth = state.countWidth > 1 ? --state.countWidth : 1;
        },
        incrementWidth(state) {
            state.countWidth += 1;
            console.log('increment + ', state.countWidth)
        },
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
        setCurrentWidth(store, width) {
            store.commit('setCurrentWidth', width);
        },

        decrementWidth(store) {
            store.commit('decrementWidth');
        },
        incrementWidth(store) {
            store.commit('incrementWidth');
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
