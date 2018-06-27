export default {
    namespaced: true,
    state: {
        settings: [],
        allElemSettings: [],
        currentElemSettings: [],
        defaultElemSettings: [],
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
        getIsDisabledBtn(state) {
            return {
                next: state.isDisabledNext,
                back: state.isDisabledBack,
            }
        },
        getIsDisabledClear(state) {
            return state.isDisabledClear;
        },
        getElemSettings(state) {
            return state.currentElemSettings;
        },
        getCurrentElemSettings: state => (id) => {
            return state.currentElemSettings.find(item => item.id === id);
        },
    },
    mutations: {
        setCurrentElemSettings(state, payload) {
            if (!state.currentElemSettings.find(item => item.id === payload.id)) {
                state.currentElemSettings.push(payload);
            }
            else {
                let i = _.findIndex(state.currentElemSettings, (o) => {
                    return o.id === payload.id;
                });
                state.currentElemSettings.splice(i, 1, payload);
            }
        },
        setElemSettings(state, payload) {
            if (state.allElemSettings.length === 0) {
                state.defaultElemSettings = _.cloneDeep(state.currentElemSettings);
            }
            if (payload.newValue && payload.oldValue) {
                state.allElemSettings.push(payload);
                state.counter = state.allElemSettings.length;
            }
        },
        setSaveElemSettings(state, payload) {// get for next or back
            let currentEl = {};
            if (payload === 'back') {
                currentEl = state.allElemSettings[state.counter];
                let newValue = currentEl.newValue;
                currentEl.newValue = currentEl.oldValue;
                currentEl.oldValue = newValue;
            }
            if (payload === 'next') {
                currentEl = state.allElemSettings[state.counter];
                let oldValue = currentEl.oldValue;
                currentEl.oldValue = currentEl.newValue;
                currentEl.newValue = oldValue;
            }
            let i = _.findIndex(state.currentElemSettings, function(o) {
                return o.id === currentEl.id;
            });
            state.currentElemSettings.splice(i, 1, currentEl);
        },
        setCurrentElem(state, payload) {
            if (payload === 'back') {
               state.counter -= 1;
            }
            if (payload === 'next') {
                state.counter += 1;
            }
        },
        isDisabledBtn(state, payload) {
            if (payload === 'clear') {
                state.allElemSettings = [];
                state.allElemSettings.length = 0;
                state.counter = 0;

                state.currentElemSettings = state.defaultElemSettings;
            }
            state.isDisabledNext = state.counter >= state.allElemSettings.length;
            state.isDisabledBack = state.counter === 0;
            state.isDisabledClear = state.allElemSettings.length === 0;
        },
        replaceElement(state) {
            state.allElemSettings.splice(state.counter, state.allElemSettings.length - state.counter);
        },
        loadSettings(state, data) {
            state.settings = data;
        },
    },
    actions: {
        isDisabledBtn(store, newElement) {
            store.commit('isDisabledBtn', newElement);
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
        setCurrentElemSettings(store, newElement) {
            store.commit('setCurrentElemSettings', newElement);
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
                { id: 0, text: 'Слайдер', cPicker: true, defColor: '#62e742' },
                { id: 1, text: 'Ширина кнопки', slider: true, defWidth: 50 },
                { id: 2, text: 'Ширина кнопки 1', slider: true, defWidth: 15 },
                { id: 3, text: 'Слайдер 1', cPicker: true, defColor: '#0ee7df' },
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
