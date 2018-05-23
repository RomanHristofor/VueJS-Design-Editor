export default {
    namespaced: true,
    state: {
        settings: [],

        allElemSettings: [],
        currentElemWidth: {},
        currentElemColor: {},
        countElement: 0,

        currentLength: 0,
        currElemSettings: [],
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
                map[i] = state.allElemSettings[i];
            }
            console.log('     @@@@@@@@   MAPA ', map);
            return map;
        },
        getCurrentElem: (state, getters) => (id, prop) => {
            // mapa for elem prop

            return _.filter(getters.allElemSettingsMap, // TODO Lodash
                function(o) {
                return o.id === id && o[prop];
            })[0];
        },
        getBackElement(state) {
            return state.allElemSettings[state.allElemSettings.length - state.currentLength]
        },
        getAllElemSettingsLength(state) {
            return state.allElemSettings.length;
        },
        getSaveActions(state) {
            return state.currElemSettings;
        },

    },
    mutations: {
        setCurrentLength(state, payload) {
            if (payload === 'back') {
                if(state.countElement === state.allElemSettings.length && state.currentLength !== 0) {
                    state.currentLength = 0;
                }
                state.currentLength += 1;
            }
            if (payload === 'next') {
                state.currentLength = state.currentLength >= state.countElement ? state.currentLength-- :
                    state.currentLength < 2 ? state.currentLength : --state.currentLength;
            }
        },
        // setSaveActions(state, currElem) {
        //     state.currElemSettings.push(currElem)
        // },
        loadSettings(state, data) {
            state.settings = data;
        },
        replaceElement(state) {
            state.allElemSettings.splice(state.countElement, 1);
            // state.currentLength = 0;
        },
        setElemSettings(state, payload) {
            state.countElement++;
            state.allElemSettings.push(payload);
            payload.width ? state.currentElemWidth = payload : state.currentElemColor = payload;
        },
        setCurrentElemColor(state, payload) {
            return state.currentElemColor = payload;
        },
        setCurrentElemWidth(state, payload) {
            return state.currentElemWidth = payload;
        },
        decrement(state) {
            state.countElement = state.countElement >= 3 ? state.countElement -1 : state.countElement;
            console.log(' --- stor  decrement ', state.countElement)
        },
        increment(state) {
            state.countElement = state.countElement + 1 > state.allElemSettings.length ? state.countElement : state.countElement+1;
            console.log(' +++ stor  increment ', state.countElement)
        },
    },
    actions: {
        replaceElement(store) {
            store.commit('replaceElement');
        },
        setCurrentElemColor(store, newElement) {
            store.commit('setCurrentElemColor', newElement);
        },
        setCurrentElemWidth(store, newElement) {
            store.commit('setCurrentElemWidth', newElement);
        },
        // setSaveActions(store, newElement) {
        //     store.commit('setSaveActions', newElement);
        // },
        setCurrentLength(store, count) {
            store.commit('setCurrentLength', count);
        },
        loadSettings(store) {
            store.commit('loadSettings', loadSettings());
        },
        setElemSettings(store, newSettings) {
            store.commit('setElemSettings', newSettings);
        },
        decrement(store) {
            store.commit('decrement');
        },
        increment(store) {
            store.commit('increment');
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
