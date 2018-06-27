import Vue from 'vue';

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
            // if (payload.newValue && payload.oldValue) {
                state.allElemSettings.push(payload);
                state.counter = state.allElemSettings.length;
            // }
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
        // replaceElement(state) {
        //     state.allElemSettings.splice(state.counter, state.allElemSettings.length - state.counter);
        // },
        loadSettings(state, data) {
            state.settings = data;
        },
        isReplaceElement(state) {
            if (state.counter < state.allElemSettings.length) {
                state.allElemSettings.splice(state.counter, state.allElemSettings.length - state.counter);
            }
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
            store.commit('isReplaceElement');
            store.commit('setElemSettings', newSettings);
            store.commit('isDisabledBtn');
            store.commit('setCurrentElemSettings', newSettings);
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
            // Vue.http.get('editor/settings.php')
            // 		  .then(response => response.json())
            // 		  .then(data => {
            // 		  	 store.commit('loadSettings', data);
            // 		  });
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
                {
                    id: 0, name: "width-catalog", slider: true,
                    label: 'Ширина каталога', defWidth: 70, min: 69, max: 100
                },
                {
                    id: 1, name: "font-select", fontSelect: true,
                    label: "Шрифт категории", value: "Helvetica", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },

                        { name: 'ABeeZee', font: "font-family: 'ABeeZee'" },
                        { name: 'Abel', font: "font-family: 'Abel'" },
                        { name: 'Abril Fatface', font: "font-family: 'Abril Fatface'" },
                        { name: 'Aclonica', font: "font-family: 'Aclonica'" },
                        { name: 'Acme', font: "font-family: 'Acme'" },

                        { name: 'Actor', font: "font-family: 'Actor'" },
                        { name: 'Adamina', font: "font-family: 'Adamina'" },
                        { name: 'Advent Pro', font: "font-family: 'Advent Pro'" },
                        { name: 'Aguafina Script', font: "font-family: 'Aguafina Script'" },
                        { name: 'Helvetica', font: "font-family: 'Helvetica'" },
                    ]
                },
                {
                    id: 2, name: "font-size-category", slider: true,
                    label: 'Размер категории', defWidth: 16, min: 9, max: 46
                },
                {
                    id: 3, name: "font-style", fontSelect: true,
                    label: "Формат категории", value: "normal",
                    array: [{name: 'normal'}, {name: 'bold'}, {name: 'italic'}]
                },
                {
                    id: 4, name: "font-letter-spacing", slider: true,
                    label: 'Межбуквенный интервал категорий', defWidth: 6, min: 0, max: 7
                },
                {
                    id: 5, name: "font-line-height", slider: true,
                    label: 'Межстрочный интервал категорий', defWidth: 1, min: 0, max: 3
                },
                {
                    id: 6, name: "link-color", colorPicker: true,
                    label: 'Цвет категории', defColor: '#1fd94d'
                },
                {
                    id: 7, name: "link-color-active", colorPicker: true,
                    label: 'Цвет активной категории', defColor: '#3d3d3d'
                },
                {
                    id: 8, name: "link-color-hover", colorPicker: true,
                    label: 'Цвет категории при наведении', defColor: '#7d7878'
                },
                {
                    id: 9, name: "bg-link-subcategory", colorPicker: true,
                    label: 'Фон для подкатегорий', defColor: '#1ec5f6'
                },
                {
                    id: 10, name: "size-subcategory", slider: true,
                    label: 'Размер подкатегории', defWidth: 12, min: 9, max: 30
                },
                {
                    id: 11, name: "font-style-subcategory", fontSelect: true,
                    label: "Формат названия подкатегорий", value: "normal",
                    array: [{name: 'normal'}, {name: 'bold'}, {name: 'italic'}]
                },
                {
                    id: 12, name: "font-letter-spacing-sub", slider: true,
                    label: 'Межбуквенный интервал подкатегорий', defWidth: 3, min: 0, max: 7
                },
                {
                    id: 13, name: "font-line-height-sub", slider: true,
                    label: 'Межстрочный интервал подкатегорий', defWidth: 2, min: 0, max: 3
                },
                {
                    id: 14, name: "link-color-sub", colorPicker: true,
                    label: 'Цвет подкатегории', defColor: '#e316c8'
                },
                {
                    id: 15, name: "link-color-active-sub", colorPicker: true,
                    label: 'Цвет активной подкатегории', defColor: '#eeeb66'
                },
                {
                    id: 16, name: "link-color-hover-sub", colorPicker: true,
                    label: 'Цвет подкатегории при наведении', defColor: '#7d3626'
                },
                {
                    id: 17, name: "font-size-images", slider: true,
                    label: 'Размер шрифта', defWidth: 11, min: 9, max: 14
                },
                {
                    id: 18, name: "font-color-description", colorPicker: true,
                    label: "Цвет текста", defColor: "rgba(0,0,0,0.87)",
                },
                {
                    id: 19, name: "bg-color-preview", colorPicker: true,
                    label: "Фон при наведении на превью", defColor: "#2e9ce3",
                },
                {
                    id: 20, name: "font-color-product-name", colorPicker: true,
                    label: "Название товара", defColor: "#e35e19",
                },
                {
                    id: 21, name: "font-color-preview", colorPicker: true,
                    label: "Текст над превью", defColor: "#8b8e91",
                },
                {
                    id: 22, name: "font-color-price", colorPicker: true,
                    label: "Цена", defColor: "#e34976",
                },
                {
                    id: 23, name: "font-color-discount", colorPicker: true,
                    label: "Цена по скидке", defColor: "#e32c0a",
                },
                {
                    id: 24, name: "bgcolor-icon-basket", colorPicker: true,
                    label: "Фон иконки \"В корзину\"", defColor: "#34e36a",
                },
                {
                    id: 25, name: "bgcolor-icon-basket-hover", colorPicker: true,
                    label: "Фон иконки \"В корзину\" при наведении", defColor: "#f0d55d",
                },
                {
                    id: 26, name: "color-icon-basket", colorPicker: true,
                    label: "Иконка \"В корзину\"", defColor: "#031a0a",
                },
                {
                    id: 27, name: "color-icon-basket-hover", colorPicker: true,
                    label: "Иконка \"В корзину\" при наведении", defColor: "#dd64e3",
                },
            ],
        },
        {
            id: 20,
            page: 'home', // Сайт. Общие настройки (старый др)
            url: '/',
            elements: [
                {
                    id: 0, name: "bg-color", colorPicker: true,
                    label: "Фон меню", defColor: "rgba(224,224,224,1)", opacity: true,
                    selector: ".slider-arrow-color",
                    css: "background-color: #fafafa"
                },
                // {
                //     id: 1, name: "font-site", fontSelect: true,
                //     label: "Шрифт меню", value: "Rubik", search: 'search',
                //     array: [
                //         { name: 'Rubik', font: "font-family: 'Rubik'" },
                //         { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                //         { name: 'Roboto', font: "font-family: 'Roboto'" },
                //         { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                //         { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                //     ]
                // },
                // {
                //     id: 2, name: "width-catalog-1", slider: true,
                //     label: 'Размер пункта меню', defWidth: 70, min: 69, max: 100,
                // },
                // {
                //     id: 3, name: "width-catalog-1", fontSelect: true,
                //     label: "Формат меню", value: "Center",
                //     array: [
                //         { name: 'Center' },
                //         { name: 'Left' },
                //         { name: 'Right' },
                //     ]
                // },
                // {
                //     id: 4, name: "font-letter-spacing", slider: true,
                //     label: 'Межбуквенный интервал', defWidth: 3, min: 0, max: 7
                // },
                // {
                //     id: 5, name: "font-color", colorPicker: true,
                //     label: "Цвет пункта меню", defColor: "rgba(0,0,0,0.87)", opacity: true,
                //     selector: ".application.theme--light",
                //     css: "color: #000"
                // },
                // {
                //     id: 6, name: "link-color-hover", colorPicker: true,
                //     label: "Цвет активного пункта меню", defColor: "#5468f6", hover: true,
                //     selector: ".application.theme--light a",
                //     css: "color: #0EE7DF"
                // },
                // {
                //     id: 7, name: "arrow-up-color", colorPicker: true,
                //     label: "Фон подменю", defColor: "#e73617", hover: false,
                //     selector: "",
                //     css: "color: #e73617"
                // },
                // {
                //     id: 8, name: "width-catalog-submenu", slider: true, units: true,
                //     label: 'Размер пункта подменю', defWidth: 70, min: 69, max: 100,
                //     range: {
                //         percent: { v: 70, min: 69, max: 100 },
                //         pixel: { v: 700, min: 690, max: 1000 }
                //     }
                // },
                // {
                //     id: 9, name: "arrow-up-color-hover", colorPicker: true,
                //     label: "Цвет пункта подменю", defColor: "#a7e707", hover: true,
                // },
                // {
                //     id: 10, name: "link-color-active", colorPicker: true, show: true,
                //     label: "Цвет активного пункта меню", defColor: "#e35e19",
                // },
                // {
                //     id: 11, name: "bg-color-mobile", colorPicker: true, show: true,
                //     label: "Фон меню в мобильной версии", defColor: "#a1e3df",
                // },
                // {
                //     id: 12, name: "arrow-up-color-hover", colorPicker: true,
                //     label: "Цвет пункта меню в мобильной версии", defColor: "#24e78f", hover: true,
                // },
                // {
                //     id: 13, name: "link-color-active-mobile", colorPicker: true,
                //     label: "Цвет активного пункта меню в мобильной версии", defColor: "#0e2287",
                // },
                // {
                //     id: 14, name: "width-catalog-1", slider: true,
                //     label: 'Вертикальные отступы меню', defWidth: 70, min: 69, max: 100,
                // },
                // {
                //     id: 15, name: "font-letter-spacing", slider: true,
                //     label: 'Расстояние между пунктами меню', defWidth: 13, min: 1, max: 27
                // },
                // {
                //     id: 16, name: "link-color-active-mobile", colorPicker: true,
                //     label: "Цвет разделительной линии", defColor: "#871e0d",
                // },
                // {
                //     id: 17, name: "align-menu-content", switch: true,
                //     label: 'Выровнять меню по ширине контента сайта', defValue: false
                // },
                {
                    id: 18, name: "effect-menu-active", selectComposite: true,
                    label: "Эффект при наведении на пункт", value: 'выделение цветом',
                    options: [
                        {name: 'выделение цветом'}, {name: 'подчеркивание'},
                        {name: 'зачеркивание'}, {name: 'маркер'}
                    ],
                    components: [
                        {
                            id: 19, name: "link-color-active", colorPicker: true, show: true,
                            label: "Цвет активного пункта меню", defColor: "#e35e19",
                        },
                        {
                            id: 20, name: "link-weight-menu", slider: true,
                            label: "Толщина линии", defWidth: 2, min: 1, max: 5,
                        },
                        {
                            id: 21, name: "link-color-menu", colorPicker: true, opacity: true,
                            label: "Цвет линии", defColor: "#2a66e3",
                        },
                    ],
                },
                {
                    id: 22, name: "position-submenu", fontSelect: true,
                    label: "Расположение подменю", value: "Center", search: 'search',
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                    ]
                },
                {
                    id: 23, name: "menu-scroll-events", radio: true,
                    label: "Поведение меню при прокрутке страницы", defValue: 'не показывать',
                    array: [
                        { label: 'не показывать', v: 'не показывать' },
                        { label: 'закрепить вверху', v: 'fix_to_top' },
                        { label: 'подгрузить сверху', v: 'load_top' }
                    ]
                },
                {
                    id: 24, name: "menu-scroll-events", radio: true,
                    label: "Отображение иконки \"Корзина\" ", defValue: 'shop',
                    array: [
                        { label: 'только на страницах магазина', v: 'shop' },
                        { label: 'на всех страницах сайта', v: 'all_pages' },
                    ]
                },
                {
                    id: 25, name: "view-basket", radio: true, picture: true,
                    label: "Вид иконки \"Корзина\"", defValue: 'account',
                    array: [
                        // { src: './static/images/1.jpg', v: 'icon-0' },
                        { src: 'account_circle', v: 'account' },
                        { src: 'star', v: 'star' },
                        { src: 'cake', v: 'cake' },
                        { src: 'check_circle', v: 'check' },
                    ]
                },
            ],
        },
    ];
}
