export default {
    namespaced: true,
    state: {
        settings: [],
        allElemSettings: [],
        elemWidth: {},
        elemColor: {},
        currentEl: {},
        counter: 0,
        isDisabledNext: true,
        isDisabledBack: true,
        isDisabledClear: true,
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
        getElemSettingsLength(state) {
            return state.allElemSettings.length;
        },
        getCounter(state) {
            return state.counter;
        },
        getReadElemColor(state) {
            return state.elemColor;
        },
        getReadElemWidth(state) {
            return state.elemWidth;
        },
        getCurrentElement(state) {
            return state.currentEl;
        },
        getIsDisabledBtn(state) {
            return {
                next: state.isDisabledNext,
                back: state.isDisabledBack,
            }
        },
        getIsDisabledClear(state) {
            return state.isDisabledClear;
        },
    },
    mutations: {
        setElemSettings(state, payload) {
            if (payload.newValue && payload.oldValue) {
                state.allElemSettings.push(payload);
                state.counter = state.allElemSettings.length;
            }
        },
        setSaveElemSettings(state, payload) {// get for next or back
            if (payload === 'back') {
                state.currentEl = state.allElemSettings[state.counter];
                let newValue = state.currentEl.newValue;
                state.currentEl.newValue = state.currentEl.oldValue;
                state.currentEl.oldValue = newValue;
            }
            if (payload === 'next') {
                state.currentEl = state.allElemSettings[state.counter];
                let oldValue = state.currentEl.oldValue;
                state.currentEl.oldValue = state.currentEl.newValue;
                state.currentEl.newValue = oldValue;
            }
        },
        setCurrentElem(state, payload) {
            if (payload === 'back') {
               state.counter -= 1;
            }
            if (payload === 'next') {
                state.counter += 1;
            }
        },
        setElements(state, payload) {
            if (payload.field === 'color') {
                state.elemColor = payload;
            }
            if (payload.field === 'width') {
                state.elemWidth = payload;
            }
            if (payload.cPicker) {
                state.elemWidth = {};
                state.elemColor = {
                    id: payload.id,
                    field: 'color',
                    newValue: payload.defColor,
                    oldValue: undefined
                };
            }
            state.isDisabledNext = state.counter >= state.allElemSettings.length;
            state.isDisabledBack = state.counter === 0;
            state.isDisabledClear = state.allElemSettings.length === 0;
        },
        replaceElement(state) {
            state.allElemSettings.splice(state.counter, state.allElemSettings.length - state.counter);
        },
        clearAllElemSettings(state) {
            state.allElemSettings = [];
            state.allElemSettings.length = 0;
            state.counter = 0;
        },
        loadSettings(state, data) {
            state.settings = data;
        },
    },
    actions: {
        setElements(store, newElement) {
            store.commit('setElements', newElement);
        },
        setSaveElemSettings(store, newElement) {
            store.commit('setSaveElemSettings', newElement);
        },
        setElemSettings(store, newSettings) {
            store.commit('setElemSettings', newSettings);
        },
        replaceElement(store) {
            store.commit('replaceElement');
        },
        clearAllElemSettings(store) {
            store.commit('clearAllElemSettings');
        },
        setCurrentElem(store, count) {
            store.commit('setCurrentElem', count);
        },
        loadSettings(store) {
            store.commit('loadSettings', loadSettings());
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
                // { id: 1, text: 'Ширина кнопки 1', slider: true, defWidth: '50' },
                { id: 2, text: 'Навигация слайдера', cPicker: true, defColor: '#62e742' },
                // { id: 3, text: 'Навигация слайдера 1', cPicker: true, defColor: '#0ee7df' },
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
