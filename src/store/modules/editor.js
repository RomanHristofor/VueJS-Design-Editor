export default {
    namespaced: true,
    state: {
        settings: [],

        allElemSettings: [],
        currentElemWidth: {},
        currentElemColor: {},
        countElement: 0,

        currentLength: 1,
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
                    // console.log('route', window.location.pathname === state.settings[i].url)

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
        getCurrentElemWidth(state) {
            return state.currentElemWidth;
        },
        getCurrentElemColor(state) {
            return state.currentElemColor;
        },
        getCountElement(state) {
            return state.countElement;
        },
        allElemSettingsMap(state) {
            let map = {};
            for(let i = 0; i < state.allElemSettings.length; i++){
                let item = state.allElemSettings[i];
                map[item.id] = item;
            }
            return map;
        },
        getCurrentElem: (state, getters) => (id) => {
            return getters.allElemSettingsMap[id];
        },
        getBackElement(state) {
            return state.allElemSettings[state.allElemSettings.length - state.currentLength]
        }

    },
    mutations: {
        setCurrentLength(state, payload) {
            state.currentLength = payload;
        },
        loadSettings(state, data) {
            state.settings = data;
        },
        setElemSettings(state, payload) {
            payload.id = state.countElement++;
            state.allElemSettings.push(payload);
            payload.width ? state.currentElemWidth = payload : state.currentElemColor = payload;
        },
        setCurrentElemColor(state, payload) {
            return state.currentElemColor = payload;
        },
        setCurrentElemWidth(state, payload) {
            return state.currentElemWidth = payload;
        },
        decrementWidth(state) {
            state.countElement = state.countElement > 1 ? --state.countElement : 1;
            console.log(' --- stor  decrementWidth ', state.countElement)
        },
        incrementWidth(state) {
            state.countElement = state.countElement + 1 <= state.allElemSettings.length ?
                state.countElement + 1 : state.countElement;
            console.log(' --- stor  incrementWidth ', state.countElement)
        },
    },
    actions: {
        setCurrentElemColor(store, newElement) {
            store.commit('setCurrentElemColor', newElement);
        },
        setCurrentElemWidth(store, newElement) {
            store.commit('setCurrentElemWidth', newElement);
        },
        setCurrentLength(store, count) {
            store.commit('setCurrentLength', count);
        },
        loadSettings(store) {
            store.commit('loadSettings', loadSettings());
        },
        setElemSettings(store, newSettings) {
            store.commit('setElemSettings', newSettings);
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
