import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        settings: [],
        changesElemSettings: [],
        currentElemSettings: [],
        defaultElemSettings: [],
        counter: 0,
        isDisabledNext: true,
        isDisabledBack: true,
        isDisabledClear: true,
        isOpenSearchIframe: false,
        iFrameURL: 'http://vigbocms.loc',
    },
    getters: {
        getIFrameURL(state) {
            return state.iFrameURL;
        },
        settings(state) {
            return state.settings;
        },
        elementsMap(state) {
            let map = {};

            for(let i = 0; i < state.settings.length; i++) {
                if ( window.location.pathname === state.settings[i].url ) {

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
            return state.changesElemSettings.length;
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
        getOpenSearchStatus(state) {
            return state.isOpenSearchIframe;
        }
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
            if (state.changesElemSettings.length === 0) {
                state.defaultElemSettings = _.cloneDeep(state.currentElemSettings);
            }
            // if (payload.newValue && payload.oldValue) {
                state.changesElemSettings.push(payload);
                state.counter = state.changesElemSettings.length;
            // }
        },
        setSaveElemSettings(state, payload) {// get for next or back
            let currentEl = {};
            if (payload === 'back') {
                currentEl = state.changesElemSettings[state.counter];
                let newValue = currentEl.newValue;
                currentEl.newValue = currentEl.oldValue;
                currentEl.oldValue = newValue;
            }
            if (payload === 'next') {
                currentEl = state.changesElemSettings[state.counter];
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
        isDisabledBtn(state) {
            state.isDisabledNext = state.counter >= state.changesElemSettings.length;
            state.isDisabledBack = state.counter === 0;
            state.isDisabledClear = state.changesElemSettings.length === 0;
        },
        clearChangesElemSettings(state, payload) {
            if (payload.history === 'clear') {
                clear();
                state.currentElemSettings = state.defaultElemSettings;
            }
            if (payload.modal === 'clear') {
                clear();
            }

            function clear() {
                state.changesElemSettings = [];
                state.changesElemSettings.length = 0;
                state.counter = 0;
            }
        },
        clearCurrentElemSettings(state) {
            state.currentElemSettings = [];
            state.currentElemSettings.length = 0;
        },
        loadSettings(state, data) {
            state.settings = data;
        },
        isReplaceElement(state) {
            if (state.counter < state.changesElemSettings.length) {
                state.changesElemSettings.splice(state.counter, state.changesElemSettings.length - state.counter);
            }
        },
        setOpenCloseSearch(state) {
            state.isOpenSearchIframe = !state.isOpenSearchIframe;
        },
    },
    actions: {
        clearChangesElemSettings(store, payload) {
            store.commit('clearChangesElemSettings', payload);
            store.commit('isDisabledBtn');
        },
        isDisabledBtn(store) {
            store.commit('isDisabledBtn');
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
        clearCurrentElemSettings(store) {
            store.commit('clearCurrentElemSettings');
        },
        loadSettings(store) {
            // Vue.http.get('editor/settings.php')
            // 		  .then(response => response.json())
            // 		  .then(data => {
            // 		  	 store.commit('loadSettings', data);
            // 		  });
            store.commit('loadSettings', loadSettings());
        },
        setOpenCloseSearch(store) {
            store.commit('setOpenCloseSearch');
        },
    },
};

// GET settings for Design Editor
function loadSettings() {
    return [
        {
            id: 10,
            page: 'menu',
            url: '/menu',
            elements: [
                {
                    id: 0, name: "bg-color-menu_page", type: "colorPicker",
                    label: "Фон меню", defValue: "rgba(217, 221, 245, 1)", opacity: true,
                    selector: {
                        'key-123': `header .md-menu__main .md-menu__li-l1.active>a,
                        .mod--vertical-menu .md-menu--mobile .md-menu__main .active > a,
                        .mod--vertical-menu .md-menu--mobile .md-menu__wrap-l2 .active > a`
                    },
                    css: { "key-123": "color" }
                },
                {
                    id: 1, name: "font-site-menu_page", type: "fontSelect",
                    label: "Шрифт меню", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ],
                    selector: "body",
                    css: {
                        "font-family": "font-family"
                    }
                },
                {
                    id: 2, name: "size-point-menu_page", type: "slider",
                    label: 'Размер пункта меню', defValue: 70, min: 69, max: 100,
                },
                {
                    id: 3, name: "format-menu_page", type: "fontSelect",
                    label: "Формат меню", defValue: "Center",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ]
                },
                {
                    id: 4, name: "font-letter-spacing-menu_page", type: "slider",
                    label: 'Межбуквенный интервал', defValue: 3, min: 0, max: 7
                },
                {
                    id: 5, name: "font-color-menu_page", type: "colorPicker",
                    label: "Цвет пункта меню", defValue: "rgba(0,0,0,0.87)", opacity: true,
                    selector: ".application.theme--light",
                    css: "color: #000"
                },
                {
                    id: 6, name: "link-color-hover-menu_page", type: "colorPicker",
                    label: "Цвет активного пункта меню", defValue: "#5468f6", hover: true,
                    selector: ".application.theme--light a",
                    css: "color: #0EE7DF"
                },
                {
                    id: 7, name: "arrow-up-color-menu_page", type: "colorPicker",
                    label: "Фон подменю", defValue: "#e73617", hover: false,
                    selector: "",
                    css: "color: #e73617"
                },
                {
                    id: 8, name: "width-catalog-submenu-menu_page", type: "slider", units: true,
                    label: 'Размер пункта подменю',
                    switchId: 9, switchName: "switch-width-catalog-submenu-menu_page", switchValue: 'percent',
                    dim: { 0: 'percent', 1: 'pixel' },
                    range: {
                        percent: { v: 70, min: 69, max: 100, step: 10 },
                        pixel: { v: 700, min: 690, max: 1000, step: 50 }
                    }
                },
                {
                    id: 10, name: "arrow-up-color-hover-menu_page", type: "colorPicker",
                    label: "Цвет пункта подменю", defValue: "#a7e707", hover: true,
                },
                {
                    id: 11, name: "link-color-active-menu_page", type: "colorPicker", show: true,
                    label: "Цвет активного пункта меню", defValue: "#e35e19",
                },
                {
                    id: 12, name: "bg-color-mobile-menu_page", type: "colorPicker", show: true,
                    label: "Фон меню в мобильной версии", defValue: "#a1e3df",
                },
                {
                    id: 13, name: "arrow-up-color-hover-menu_page", type: "colorPicker",
                    label: "Цвет пункта меню в мобильной версии", defValue: "#24e78f", hover: true,
                },
                {
                    id: 14, name: "link-color-active-mobile-menu_page", type: "colorPicker",
                    label: "Цвет активного пункта меню в мобильной версии", defValue: "#0e2287",
                },
                {
                    id: 15, name: "effect-menu-active-menu_page", type: "selectComposite",
                    label: "Эффект при наведении на пункт", defValue: 'выделение цветом',
                    options: [
                        {name: 'выделение цветом'}, {name: 'подчеркивание'},
                        {name: 'зачеркивание'}, {name: 'маркер'}
                    ],
                    components: [
                        {
                            id: 16, name: "effect-link-color-active-menu_page", type: "colorPicker",
                            show: true, label: "Цвет активного пункта меню", defValue: "#e35e19",
                        },
                        {
                            id: 17, name: "effect-link-weight-menu-menu_page", type: "slider",
                            label: "Толщина линии", defValue: 2, min: 1, max: 5,
                        },
                        {
                            id: 18, name: "effect-link-color-menu-menu_page", type: "colorPicker",
                            opacity: true, label: "Цвет линии", defValue: "#2a66e3",
                        },
                    ],
                },
                {
                    id: 19, name: "vertical-indents-menu_page", type: "slider",
                    label: "Вертикальные отступы меню", defValue: 70, min: 69, max: 100,
                },
                {
                    id: 20, name: "font-letter-spacing-menu_page", type: "slider",
                    label: "Расстояние между пунктами меню", defValue: 13, min: 1, max: 27
                },
                {
                    id: 21, name: "link-color-active-mobile-menu_page", type: "colorPicker",
                    label: "Цвет разделительной линии", defValue: "#871e0d",
                },
                {
                    id: 22, name: "align-menu-content-menu_page", type: "switch",
                    label: 'Выровнять меню по ширине контента сайта', defValue: false
                },
                {
                    id: 23, name: "location-submenu-menu_page", type: "fontSelect",
                    label: "Расположение подменю", defValue: "Center",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ]
                },
                {
                    id: 24, name: "menu-scroll-events-menu_page", type: "radio",
                    label: "Поведение меню при прокрутке страницы", defValue: 'не показывать',
                    array: [
                        { label: 'не показывать', v: 'не показывать' },
                        { label: 'закрепить вверху', v: 'fix_to_top' },
                        { label: 'подгрузить сверху', v: 'load_top' }
                    ]
                },
                {
                    id: 25, name: "align-menu-content-menu_page", type: "switch",
                    label: "Эффект плавного появления меню сверху", defValue: false
                },
                {
                    id: 26, name: "location-submenu-menu_page", type: "fontSelect",
                    label: "Разделитель между пунктами меню", defValue: "*",
                    array: [
                        { name: '-' },
                        { name: '*' },
                        { name: '>' },
                        { name: '->' },
                    ]
                },
                {
                    id: 27, name: "align-menu-content-menu_page", type: "switch",
                    label: "Расположить меню под слайдером", defValue: false // (only DEV)
                },
                {
                    id: 28, name: "view-icon-basket-menu_page", type: "radio", picture: true,
                    label: "Вид иконки \"Корзина\"", defValue: 'account',
                    array: [
                        { src: 'account_circle', v: 'account' },
                        { src: 'star', v: 'star' },
                        { src: 'cake', v: 'cake' },
                        { src: 'check_circle', v: 'check' },
                    ]
                },
                {
                    id: 29, name: "menu-scroll-events-menu_page", type: "radio",
                    label: "Отображение иконки \"Корзина\" ", defValue: 'shop',
                    array: [
                        { label: 'только на страницах магазина', v: 'shop' },
                        { label: 'на всех страницах сайта', v: 'all_pages' },
                    ]
                },
                {
                    id: 30, name: "design-menu-menu_page", type: "radio", picture: true,
                    label: "Вид меню", defValue: 'cake', // (есть 14 видов меню)
                    array: [
                        { src: 'account_circle', v: 'account' },
                        { src: 'star', v: 'star' },
                        { src: 'cake', v: 'cake' },
                        { src: 'check_circle', v: 'check' },
                    ]
                },
            ],
        },
        {
            id: 20,
            page: 'general',
            url: '/',
            elements: [
                {
                    id: 0, name: "width-site", type: "slider", units: true,
                    label: "Ширина сайта", //defValue: 900, min: 600, max: 2500, !!!!!step: 50,
                    switchId: 1, switchName: "switch-width-site", switchValue: '%',
                    dim: { 0: '%', 1: 'Px' },
                    range: {
                        '%': { v: 90, min: 1, max: 100, step: 10 },
                        'Px': { v: 900, min: 600, max: 2500, step: 50 }
                    }
                },
                {
                    id: 2, name: "bg-color-site", type: "colorPicker",
                    label: "Фон сайта", defValue: "rgba(224,224,224,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                // {
                //     id: 2, name: "font-site", type: "fontSelect",
                //     label: "Шрифт сайта", defValue: "Rubik", search: 'search',
                //     array: [
                //         { name: 'Rubik', font: "font-family: 'Rubik'" },
                //         { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                //         { name: 'Roboto', font: "font-family: 'Roboto'" },
                //         { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                //         { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                //     ]
                // },
                // {
                //     id: 3, name: "color-font-text", type: "colorPicker",
                //     label: "Цвет текста", defValue: "rgba(0,0,0,0.87)",
                // },
                // {
                //     id: 4, name: "color-links-hover", type: "colorPicker",
                //     label: "Цвет ссылок при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                //     selector: "",
                //     css: ""
                // },
                // {
                //     id: 5, name: "color-arrow-top", type: "colorPicker",
                //     label: "Цвет стрелки \"вверх\"", defValue: "rgba(211,123,123,1)", opacity: true,
                //     selector: "",
                //     css: ""
                // },
                // {
                //     id: 6, name: "color-arrow-top-hover", type: "colorPicker",
                //     label: "Цвет стрелки \"вверх\" при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                //     selector: "",
                //     css: ""
                // },
                // {
                //     id: 7, name: "color-elem-slider", type: "colorPicker",
                //     label: "Элементы навигации слайдера", defValue: "rgba(211,123,123,1)", opacity: true,
                //     selector: "",
                //     css: ""
                // },
                // {
                //     id: 8, name: "color-elem-slider-hover", type: "colorPicker",
                //     label: "Элементы навигации слайдера при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                //     selector: "",
                //     css: ""
                // },
            ],
        },
        {
            id: 30,
            page: 'search',
            url: '/search',
            elements: [
                {
                    id: 0, name: "bg-color-search", type: "colorPicker",
                    label: "Фон страницы поиска", defValue: "rgba(224,224,224,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 1, name: "color-search-close", type: "colorPicker",
                    label: "Элементы страницы поиска", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: "",
                    css: ""
                },
            ],
        },
        {
            id: 40,
            page: 'blog_categories',
            url: '/categories',
            elements: [
                {
                    id: 0, name: "font-categories", type: "fontSelect",
                    label: "Шрифт категории", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 1, name: "size-font-categories", type: "slider",
                    label: "Размер шрифта категории", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 2, name: "color-categories", type: "colorPicker",
                    label: "Цвет категории", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 3, name: "color-active-categories", type: "colorPicker",
                    label: "Цвет активной категории", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 4, name: "position-categories", type: "fontSelect",
                    label: "Расположение категории", defValue: "Center",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ]
                },
            ],
        },
        {
            id: 50,
            page: 'blog_page',
            url: '/page',
            elements: [
                {
                    id: 0, name: "width-blog-page", type: "slider", units: true,
                    label: "Размер пункта подменю",
                    switchId: 1, switchName: "switch-blog-page", switchValue: 'percent',
                    dim: { 0: 'percent', 1: 'pixel' },
                    range: {
                        percent: { v: 20, min: 1, max: 100, step: 30 },
                        pixel: { v: 4, min: 1, max: 5, step: 1 }
                    }
                },
                {
                    id: 2, name: "bg-blog-page", type: "selectComposite",
                    label: "Фон записи", defValue: 'использовать фон сайта',
                    options: [
                        {name: 'использовать фон сайта'},
                        {name: 'цвет фона'},
                    ],
                    components: [
                        {
                            id: 3, name: "sub_bg-blog-page", type: "colorPicker",
                            label: "", defValue: "#e35e19",
                        },
                    ],
                },
                {
                    id: 4, name: "bg-side-panel", type: "selectComposite",
                    label: "Фон боковой панели", defValue: 'цвет фона',
                    options: [
                        {name: 'использовать фон сайта'},
                        {name: 'цвет фона'},
                    ],
                    components: [
                        {
                            id: 5, name: "sub_bg-side-panel", type: "colorPicker",
                            label: "", defValue: "#193EE3",
                        },
                    ],
                },
                {
                    id: 6, name: "color-preview-blog-page", type: "colorPicker",
                    label: "Фон превью", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 7, name: "size-preview-blog-page", type: "slider",
                    label: "Расстояние между превью", defValue: 2, min: 1, max: 10,
                },
                {
                    id: 8, name: "location-description-blog-page", type: "fontSelect",
                    label: "Расположение описания", defValue: "Center",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ]
                },
                {
                    id: 9, name: "width-border-post-blog-page", type: "slider",
                    label: "Толщина границы записи", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 10, name: "color-border-post-blog-page", type: "colorPicker",
                    label: "Цвет границы записи", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 11, name: "color-line-under-post", type: "colorPicker",
                    label: "Цвет линии под записью", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 12, name: "color-icons-blog-page", type: "colorPicker",
                    label: "Цвет иконок", defValue: "rgba(123,177,211,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 13, name: "color-decor_elem-blog-page", type: "colorPicker",
                    label: "Цвет декоративных элементов", defValue: "rgba(222, 236, 245, 1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 14, name: "color-decor_line-blog-page", type: "colorPicker",
                    label: "Цвет декоративных линий", defValue: "rgba(239, 230, 189, 1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 15, name: "color-navigation-blog-page", type: "colorPicker",
                    label: "Цвет навигации", defValue: "rgba(123,177,211,1)", opacity: true,
                    selector: "",
                    css: ""
                },
                {
                    id: 16, name: "bg-button-blog-page", type: "colorPicker",
                    label: "Цвет фона кнопки \"Читать далее\"", defValue: "#D70CF2",
                    selector: "",
                    css: ""
                },
                {
                    id: 17, name: "font-header-blog-page", type: "fontSelect",
                    label: "Шрифт заголовка", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 18, name: "size-header-blog-page", type: "slider",
                    label: "Размер шрифта заголовка", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 19, name: "bg-header-blog-page", type: "colorPicker",
                    label: "Цвет заголовка", defValue: "#000",
                    selector: "",
                    css: ""
                },
                {
                    id: 20, name: "font-text-blog-page", type: "fontSelect",
                    label: "Шрифт текста", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 21, name: "size-font-text-blog-page", type: "slider",
                    label: "Размер шрифта текста", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 22, name: "bg-text-blog-page", type: "colorPicker",
                    label: "Цвет текста", defValue: "#959899",
                    selector: "",
                    css: ""
                },
                {
                    id: 23, name: "font-description-blog-page", type: "fontSelect",
                    label: "Шрифт описания", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 24, name: "size-font-descript-blog-page", type: "slider",
                    label: "Размер шрифта описания", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 25, name: "bg-descript-blog-page", type: "colorPicker",
                    label: "Цвет описания", defValue: "#dadee3",
                    selector: "",
                    css: ""
                },
                {
                    id: 26, name: "font-date-blog-page", type: "fontSelect",
                    label: "Шрифт даты", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 27, name: "size-font-date-blog-page", type: "slider",
                    label: "Размер шрифта даты", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 28, name: "bg-date-blog-page", type: "colorPicker",
                    label: "Цвет даты", defValue: "#589939",
                },
                {
                    id: 29, name: "font-tags-blog-page", type: "fontSelect",
                    label: "Шрифт тегов", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 30, name: "size-font-tags-blog-page", type: "slider",
                    label: "Размер шрифта тегов", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 31, name: "bg-tags-blog-page", type: "colorPicker",
                    label: "Цвет тегов", defValue: "#997920",
                },
                {
                    id: 32, name: "font-links-blog-page", type: "fontSelect",
                    label: "Шрифт ссылки \"Читать далее\"", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 33, name: "size-font-links-blog-page", type: "slider",
                    label: "Размер шрифта ссылки \"Читать далее\"", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 34, name: "color-link-read-blog-page", type: "colorPicker",
                    label: "Цвет ссылки \"Читать далее\"", defValue: "#99341d",
                },
                {
                    id: 35, name: "size-font-text-blog-page", type: "fontSelect",
                    label: "Размер шрифта текста \"Читать далее\"", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 36, name: "color-text-read-blog-page", type: "colorPicker",
                    label: "Цвет текста \"Читать далее\"", defValue: "#079993",
                },
            ],
        },
        {
            id: 60,
            page: 'blog_post',
            url: '/post',
            elements: [
                {
                    id: 0, name: "width-blog-post", type: "slider", units: true,
                    label: 'Ширина страницы записи',
                    switchId: 1, switchName: "switch-width-blog-post", switchValue: 'percent',
                    dim: { 0: 'percent', 1: 'pixel' },
                    range: {
                        percent: { v: 90, min: 1, max: 100, step: 10 },
                        pixel: { v: 900, min: 600, max: 2500, step: 50 }
                    }
                },
                {
                    id: 2, name: "effect-menu-active", type: "selectComposite",
                    label: "Фон записи", defValue: 'использовать фон сайта',
                    options: [
                        {name: 'использовать фон сайта'},
                        {name: 'цвет фона'},
                    ],
                    components: [
                        {
                            id: 3, name: "sub_bg-blog-post", type: "colorPicker",
                            label: "", defValue: "#b2e354",
                        },
                    ],
                },
                {
                    id: 4, name: "weight-border-blog-post", type: "slider",
                    label: "Толщина границы записи", defValue: 2, min: 1, max: 10,
                },
                {
                    id: 5, name: "color-border-blog-post", type: "colorPicker",
                    label: "Цвет границы записи", defValue: "#e35e19",
                },
                {
                    id: 6, name: "color-line-under-blog-post", type: "colorPicker",
                    label: "Цвет линии под записью", defValue: "#43a1e3",
                },
                {
                    id: 7, name: "color-elem-under-blog-post", type: "colorPicker",
                    label: "Цвет элементов под записью", defValue: "#e393aa",
                },
                {
                    id: 8, name: "color-decor-elem-blog-post", type: "colorPicker",
                    label: "Цвет декоративных элементов", defValue: "#997920",
                },
                {
                    id: 9, name: "color-navigation-blog-post", type: "colorPicker",
                    label: "Цвет навигации", defValue: "#bfbab1",
                },
                {
                    id: 10, name: "font-header-blog-post", type: "fontSelect",
                    label: "Шрифт заголовка", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 11, name: "size-font-blog-post", type: "slider",
                    label: "Размер шрифта заголовка", defValue: 2, min: 1, max: 10,
                },
                {
                    id: 12, name: "color-heading-blog-post", type: "colorPicker",
                    label: "Цвет заголовка", defValue: "#2d2927",
                },
                {
                    id: 13, name: "font-text-blog-post", type: "fontSelect",
                    label: "Шрифт текста", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 14, name: "size-font-text-blog-post", type: "colorPicker",
                    label: "Размер шрифта текста", defValue: "#a1e3df",
                },
                {
                    id: 15, name: "color-heading-blog-post", type: "colorPicker",
                    label: "Цвет текста", defValue: "#000000",
                },
                {
                    id: 16, name: "font-date-blog-post", type: "fontSelect",
                    label: "Шрифт даты", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 17, name: "size-font-date-blog-post", type: "slider",
                    label: "Размер шрифта даты", defValue: 2, min: 1, max: 10,
                },
                {
                    id: 18, name: "color-heading-blog-post", type: "colorPicker",
                    label: "Цвет даты", defValue: "#cb692d",
                },
            ],
        },
        {
            id: 70,
            page: 'blog_slider',
            url: '/slider',
            elements: [
                {
                    id: 0, name: "height-blog-slider", type: "slider",
                    label: "Высота слайдера", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 1, name: "width-blog-slider", type: "slider",
                    label: "Ширина слайдера", defValue: 1500, min: 600, max: 2590,
                },
                {
                    id: 2, name: "indent-preview-blog-slider", type: "slider",
                    label: "Отступ между превью", defValue: 30, min: 1, max: 100,
                },
                {
                    id: 3, name: "bg-blog-slider", type: "colorPicker",
                    label: "Цвет фона", defValue: "#c9dfe2",
                },
                {
                    id: 4, name: "show-button-blog-slider", type: "switchComposite",
                    label: "Отображать кнопки для пролистывания", defValue: false, tag: "enable-buttons",
                    components: [
                        {
                            id: 5, name: "color-button-blog-slider", type: "colorPicker",
                            label: "Цвет кнопок", defValue: "#2d88e3",
                        },
                        {
                            id: 6, name: "color-button-hover-blog-slider", type: "colorPicker",
                            label: "Цвет кнопок при наведении", defValue: "#bfbab1",
                        },
                    ],
                },
                {
                    id: 7, name: "show-arrow-blog-slider", type: "switchComposite",
                    label: "Отображать стрелки для пролистывания", defValue: false, tag: "enable-arrows",
                    components: [
                        {
                            id: 8, name: "color-arrow-blog-slider", type: "colorPicker",
                            label: "Цвет стрелок", defValue: "#19e3cb",
                        },
                        {
                            id: 9, name: "color-arrow-hover-blog-slider", type: "colorPicker",
                            label: "Цвет стрелок при наведении", defValue: "#3089bf",
                        },
                    ],
                },
                {
                    id: 10, name: "color-scroll-blog-slider", type: "colorPicker",
                    label: "Цвет прокрутки", defValue: "#adc3c6",
                },
                {
                    id: 11, name: "bg-under-text-blog-slider", type: "colorPicker",
                    label: "Фон под текстом", defValue: "#da3b76",
                },
                {
                    id: 12, name: "font-heading-blog-slider", type: "fontSelect",
                    label: "Шрифт заголовка", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 13, name: "size-heading-blog-slider", type: "slider",
                    label: "Размер заголовка", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 14, name: "color-heading-blog-slider", type: "colorPicker",
                    label: "Цвет заголовка", defValue: "#4d5556",
                },
                {
                    id: 15, name: "font-description-blog-slider", type: "fontSelect",
                    label: "Шрифт описания", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 16, name: "size-description-blog-slider", type: "slider",
                    label: "Размер описания", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 17, name: "color-description-blog-slider", type: "colorPicker",
                    label: "Цвет описания", defValue: "#43a1e3",
                },
                {
                    id: 18, name: "color-links-hover-blog-slider", type: "colorPicker",
                    label: "Цвет ссылки при наведении", defValue: "#b2e354",
                },
                {
                    id: 19, name: "position-text-blog-slider", type: "slider",
                    label: "Расположение текста", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 20, name: "show-arrow-blog-slider", type: "switchComposite",
                    label: "Включить слайдшоу", defValue: false, tag: "enable-slide-show",
                    components: [
                        {
                            id: 21, name: "interval-blog-slider", type: "slider",
                            label: "Интервал", defValue: 2, min: 1, max: 5,
                        },
                    ],
                },
            ],
        },
        {
            id: 80,
            page: 'shop_categories',
            url: '/categories',
            elements: [
                {
                    id: 0, name: "shop-font-categories", type: "fontSelect",
                    label: "Шрифт категории", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 1, name: "shop-size-categories", type: "slider",
                    label: "Размер категории", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 2, name: "format-categories", type: "fontSelect",
                    label: "Формат категории", defValue: "Center",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ]
                },
                {
                    id: 3, name: "letter-spacing-categories", type: "slider",
                    label: "Межбуквенный интервал категорий", defValue: 3, min: 1, max: 5,
                },
                {
                    id: 4, name: "line-spacing-categories", type: "slider",
                    label: "Межстрочный интервал категорий", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 5, name: "color-categories", type: "colorPicker",
                    label: "Цвет категории", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 6, name: "color-active-categories", type: "colorPicker",
                    label: "Цвет активной категории", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 7, name: "color-active-hover-categories", type: "colorPicker",
                    label: "Цвет активной категории при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 8, name: "bg-subcategories", type: "colorPicker",
                    label: "Фон для подкатегорий", defValue: "#43a1e3",
                },
                {
                    id: 9, name: "size-subcategories", type: "slider",
                    label: "Размер подкатегории", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 10, name: "format-name-subcategories", type: "fontSelect",
                    label: "Формат названия подкатегорий", defValue: "Left",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ]
                },
                {
                    id: 11, name: "letter-spacing-subcategories", type: "slider",
                    label: "Межбуквенный интервал подкатегорий", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 12, name: "line-spacing-subcategories", type: "slider",
                    label: "Межстрочный интервал подкатегорий", defValue: 1, min: 1, max: 5,
                },
                {
                    id: 13, name: "color-subcategories", type: "colorPicker",
                    label: "Цвет подкатегории", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 14, name: "color-active-subcategories", type: "colorPicker",
                    label: "Цвет активной подкатегории", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 15, name: "color-active-hover-subcategories", type: "colorPicker",
                    label: "Цвет подкатегории при наведении", defValue: "#b2e354",
                },
            ],
        },
        {
            id: 90,
            page: 'shop_catalog',
            url: '/catalog',
            elements: [
                {
                    id: 0, name: "size-shop_catalog", type: "slider", units: true,
                    label: "Ширина каталога", defValue: 42,
                    switchId: 1, switchName: "switch-size-shop_catalog", switchValue: 'percent',
                    range: {
                        percent: { v: 20, min: 1, max: 100, step: 10 },
                        pixel: { v: 2, min: 1, max: 5, step: 0 }
                    }
                },
                {
                    id: 2, name: "size-font-shop_catalog", type: "slider",
                    label: "Размер шрифта", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 3, name: "color-text-shop_catalog", type: "colorPicker",
                    label: "Цвет текста", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 4, name: "bg-preview-hover-shop_catalog", type: "colorPicker",
                    label: "Фон при наведении на превью", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 5, name: "name-product-shop_catalog", type: "colorPicker",
                    label: "Название товара", defValue: "#b2e354",
                },
                {
                    id: 6, name: "text-up-preview-shop_catalog", type: "colorPicker",
                    label: "Текст над превью", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 7, name: "price-shop_catalog", type: "colorPicker",
                    label: "Цена", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 8, name: "discount-price-shop_catalog", type: "colorPicker",
                    label: "Цена по скидке", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 9, name: "bg-icon-shop_catalog", type: "colorPicker",
                    label: "Фон иконки \"В корзину\"", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 10, name: "bg-icon-hover-shop_catalog", type: "colorPicker",
                    label: "Фон иконки \"В корзину\" при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 11, name: "basket-icon-shop_catalog", type: "colorPicker",
                    label: "Иконка \"В корзину\"", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 12, name: "basket-icon-hover-shop_catalog", type: "colorPicker",
                    label: "Иконка \"В корзину\" при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                },
            ],
        },
        {
            id: 100,
            page: 'shop_product',
            url: '/product',
            elements: [
                {
                    id: 0, name: "size-shop_product", type: "slider", units: true,
                    label: "Ширина страницы товара", defValue: 12,
                    switchId: 1, switchName: "switch-size-shop_catalog", switchValue: 'percent',
                    range: {
                        percent: { v: 20, min: 1, max: 100, step: 10 },
                        pixel: { v: 2, min: 1, max: 5, step: 0 }
                    }
                },
                {
                    id: 2, name: "font-select-shop_product", type: "fontSelect",
                    label: "Шрифт страницы", defValue: "Helvetica", search: 'search',
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
                    id: 3, name: "size-font-breadcrumbs-shop_product", type: "slider",
                    label: "Размер шрифта \"хлебных крошек\"", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 4, name: "color-breadcrumbs-shop_product", type: "colorPicker",
                    label: "Цвет \"хлебных крошек\"", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 5, name: "color-breadcrumbs-hover-shop_product", type: "colorPicker",
                    label: "Цвет \"хлебных крошек\" при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 6, name: "size-font-name-shop_product", type: "colorPicker",
                    label: "Размер шрифта названия", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 7, name: "color-name-shop_product", type: "colorPicker",
                    label: "Цвет названия товара", defValue: "#43a1e3",
                },
                {
                    id: 8, name: "size-font-price-shop_product", type: "slider",
                    label: "Размер шрифта цены", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 9, name: "color-price-shop_product", type: "colorPicker",
                    label: "Цвет цены", defValue: "#e3875b",
                },
                {
                    id: 10, name: "size-font-price-discount-shop_product", type: "slider",
                    label: "Размер шрифта цены со скидкой", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 11, name: "color-price-discount-shop_product", type: "colorPicker",
                    label: "Цвет цены со скидкой", defValue: "#e31524",
                },
                {
                    id: 12, name: "size-font-price-discount-shop_product", type: "slider",
                    label: "Размер шрифта сообщения о количестве товаров", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 13, name: "color-price-discount-shop_product", type: "colorPicker",
                    label: "Цвет цены со скидкой", defValue: "#2be3d3",
                },
                {
                    id: 14, name: "color-msg-count_price-shop_product", type: "colorPicker",
                    label: "Цвет сообщения о количестве товаров", defValue: "#e31524",
                },
                {
                    id: 15, name: "size-font-description-shop_product", type: "slider",
                    label: "Размер шрифта описания", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 16, name: "color-description-shop_product", type: "colorPicker",
                    label: "Цвет описания", defValue: "#808e90",
                },
                {
                    id: 17, name: "color-icon-add-cart-shop_product", type: "colorPicker",
                    label: "Цвет кнопки \"Добавить в корзину\"", defValue: "#abbdc0",
                },
                {
                    id: 18, name: "color-icon-add-cart-shop_product", type: "colorPicker",
                    label: "Цвет текста \"Добавить в корзину\"", defValue: "#197BC1",
                },
                {
                    id: 19, name: "bg-button-photo-big-size-shop_product", type: "colorPicker",
                    label: "Цвет фона под фото в большом размере", defValue: "#14907c",
                },
            ],
        },
        {
            id: 110,
            page: 'shop_order',
            url: '/order',
            elements: [
                {
                    id: 0, name: "font-page-shop_order", type: "fontSelect",
                    label: "Шрифт страницы", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 1, name: "size-font-heading-shop_order", type: "slider",
                    label: "Размер шрифта заголовка", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 2, name: "color-heading-shop_order", type: "colorPicker",
                    label: "Цвет заголовков на странице", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 3, name: "size-font-name-column-shop_order", type: "slider",
                    label: "Размер шрифта названия колонок в таблице", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 4, name: "color-name-column-shop_order", type: "colorPicker",
                    label: "Цвет названия колонок в таблице", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 5, name: "size-font-product-description-shop_order", type: "slider",
                    label: "Размер шрифта описания товаров", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 6, name: "color-product-description-shop_order", type: "colorPicker",
                    label: "Цвет описания товаров", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 7, name: "size-font-product-params-shop_order", type: "slider",
                    label: "Размер шрифта параметров товаров", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 8, name: "color-product-params-shop_order", type: "colorPicker",
                    label: "Цвет параметров товаров", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 9, name: "size-font-total-price-shop_order", type: "slider",
                    label: "Размер шрифта итоговой суммы", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 10, name: "color-total-price-shop_order", type: "colorPicker",
                    label: "Цвет итоговой суммы", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 11, name: "size-font-bottom-text-block-shop_order", type: "slider",
                    label: "Размер шрифта текстового блока внизу", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 12, name: "color-bottom-text-block-shop_order", type: "colorPicker",
                    label: "Цвет текстового блока внизу", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 13, name: "size-font-delivery-methods-shop_order", type: "slider",
                    label: "Размер шрифта способов доставки", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 14, name: "color-delivery-method-shop_order", type: "colorPicker",
                    label: "Цвет способов доставки", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 15, name: "size-font-payment-methods-shop_order", type: "slider",
                    label: "Размер шрифта способов оплаты", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 16, name: "color-payment-methods-shop_order", type: "colorPicker",
                    label: "Цвет способов оплаты", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                {
                    id: 17, name: "size-font-link-promo-code-shop_order", type: "slider",
                    label: "Размер шрифта текста ссылки на промо-код", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 18, name: "color-split-lanes-shop_order", type: "colorPicker",
                    label: "Цвет разделительных полос", defValue: "rgba(211,123,123,1)", opacity: true,
                },
                //Вид полей
                {
                    id: 19, name: "type-fields-shop_order", type: "radio", sample: true,
                    label: "Вид полей", defValue: 'square',
                    array: [
                        { className: 'sample-square', v: 'square' },
                        { className: 'sample-circle', v: 'circle' },
                        { className: 'sample-ellipse', v: 'ellipse' },
                        { className: 'sample-inline', v: 'inline' },
                    ]
                },
                {
                    id: 20, name: "color-bg-fields-shop_order", type: "colorPicker",
                    label: "Цвет фона полей", defValue: "rgba(86, 73, 73, 1)", opacity: true,
                },
                {
                    id: 21, name: "border-fields-shop_order", type: "selectComposite",
                    label: "Обводка полей", defValue: 'цвет полей',
                    options: [
                        {name: 'цвет полей'},
                        {name: 'толщина линии'},
                    ],
                    components: [
                        {
                            id: 22, name: "border-fields-color-shop_order", type: "colorPicker",
                            label: "", defValue: "#ae93e3",
                        },
                        {
                            id: 23, name: "border-fields-weight-shop_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 3,
                        },
                    ],
                },
                {
                    id: 24, name: "font-text-field-shop_order", type: "fontSelect",
                    label: "Шрифт текста поля", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 25, name: "size-text-field-shop_order", type: "slider",
                    label: "Размер текста поля", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 26, name: "format-text-shop_order", type: "fontSelect",
                    label: "Формат текста", defValue: "regular",
                    array: [
                        { name: 'regular' },
                        { name: 'bold' },
                        { name: 'italic' },
                    ]
                },
                {
                    id: 27, name: "letter-spacing-shop_order", type: "slider",
                    label: "Межбуквенный интервал", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 28, name: "color-field-text-shop_order", type: "colorPicker",
                    label: "Цвет текста поля", defValue: "#313b40",
                },
                {
                    id: 29, name: "color-field-text-input-shop_order", type: "colorPicker",
                    label: "Цвет текста поля при вводе", defValue: "#000",
                },
                {
                    id: 30, name: "color-field-text-input-shop_order", type: "colorPicker",
                    label: "Цвет текста без поля", defValue: "#264027",
                },
                {
                    id: 31, name: "menu-scroll-events-shop_order", type: "radio",
                    label: "Эффект при вводе данных", defValue: 'hidden-field-name',
                    array: [
                        { label: 'скрывать название поля', v: 'hidden-field-name' },
                        { label: 'уменьшать название поля', v: 'lower-field-name' },
                    ]
                },
                {
                    id: 32, name: "distance-between-fields-shop_order", type: "slider",
                    label: "Расстояние между полями", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 33, name: "distance-from-form-to-button-shop_order", type: "slider",
                    label: "Расстояние от формы до кнопки", defValue: 2, min: 1, max: 5,
                },
                //Вид кнопки
                {
                    id: 34, name: "view-button-shop_order", type: "radio", sample: true,
                    label: "Вид кнопки", defValue: 'circle',
                    array: [
                        { className: 'sample-square', v: 'square' },
                        { className: 'sample-circle', v: 'circle' },
                        { className: 'sample-ellipse', v: 'ellipse' },
                    ]
                },
                {
                    id: 35, name: "color-button-shop_order", type: "colorPicker",
                    label: "Цвет кнопки", defValue: "#63c0c0",
                },
                {
                    id: 36, name: "color-button-hover-shop_order", type: "colorPicker",
                    label: "Цвет кнопки при наведении", defValue: "#4c6ec0",
                },
                {
                    id: 37, name: "border-button-shop_order", type: "selectComposite",
                    label: "Обводка кнопки", defValue: 'цвет обводки кнопки',
                    options: [
                        {name: 'цвет обводки кнопки'},
                        {name: 'толщина обводки кнопки'},
                    ],
                    components: [
                        {
                            id: 38, name: "color-border-button-shop_order", type: "colorPicker",
                            label: "", defValue: "#b2e354",
                        },
                        {
                            id: 39, name: "weight-border-button-shop_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 3,
                        },
                    ],
                },
                {
                    id: 40, name: "border-button-hover-shop_order", type: "selectComposite",
                    label: "Обводка кнопки при наведении", defValue: 'толщина обводки кнопки',
                    options: [
                        {name: 'цвет обводки кнопки'},
                        {name: 'толщина обводки кнопки'},
                    ],
                    components: [
                        {
                            id: 41, name: "color-border-button-hover-shop_order", type: "colorPicker",
                            label: "", defValue: "#e37a79",
                        },
                        {
                            id: 42, name: "weight-border-button-hover-shop_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 5,
                        },
                    ],
                },
                {
                    id: 43, name: "font-text-button-shop_order", type: "fontSelect",
                    label: "Шрифт текста", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 44, name: "size-text-button-field-shop_order", type: "slider",
                    label: "Размер текста поля", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 45, name: "format-text-button-shop_order", type: "fontSelect",
                    label: "Формат текста", defValue: "regular",
                    array: [
                        { name: 'regular' },
                        { name: 'bold' },
                        { name: 'italic' },
                    ]
                },
                {
                    id: 46, name: "letter-spacing-button-shop_order", type: "slider",
                    label: "Межбуквенный интервал", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 47, name: "color-text-button-shop_order", type: "colorPicker",
                    label: "Цвет текста", defValue: "#313b40",
                },
                {
                    id: 48, name: "color-text-hover-button-shop_order", type: "colorPicker",
                    label: "Цвет текста при наведении", defValue: "#000",
                },
                {
                    id: 49, name: "size-lateral-indents-in-button-shop_order", type: "slider",
                    label: "Размер боковых отступов внутри кнопки", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 50, name: "format-text-button-shop_order", type: "fontSelect",
                    label: "Bыравнивание", defValue: "left",
                    array: [
                        { name: 'left' },
                        { name: 'center' },
                        { name: 'right' },
                    ]
                },
                {
                    id: 51, name: "stretch-button-full-form-shop_order", type: "switch",
                    label: "Растянуть кнопку на всю ширину формы", defValue: false
                },
            ],
        },
        {
            id: 120,
            page: 'shop_pre_order',
            url: '/pre-order',
            elements: [
                {
                    id: 0, name: "size-heading-ordering-shop_pre_order", type: "slider",
                    label: "Размер заголовка \"Оформление заказа\"", defValue: 500, min: 300, max: 1000,
                },
                {
                    id: 1, name: "color-heading-ordering-shop_pre_order", type: "colorPicker",
                    label: "Цвет заголовка \"Оформление заказа\"", defValue: "rgba(86, 73, 73, 1)", opacity: true,
                },
                {
                    id: 2, name: "size-text-upper-form-shop_pre_order", type: "slider",
                    label: "Размер текста над формой", defValue: 500, min: 300, max: 1000,
                },
                {
                    id: 3, name: "color-text-upper-form-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста над формой", defValue: "rgba(86, 73, 73, 1)", opacity: true,
                },
                //Вид полей
                {
                    id: 19, name: "type-fields-shop_pre_order", type: "radio", sample: true,
                    label: "Вид полей", defValue: 'circle',
                    array: [
                        { className: 'sample-square', v: 'square' },
                        { className: 'sample-circle', v: 'circle' },
                        { className: 'sample-ellipse', v: 'ellipse' },
                        { className: 'sample-inline', v: 'inline' },
                    ]
                },
                {
                    id: 20, name: "color-bg-fields-shop_pre_order", type: "colorPicker",
                    label: "Цвет фона полей", defValue: "rgba(86, 73, 73, 1)", opacity: true,
                },
                {
                    id: 21, name: "border-fields-shop_pre_order", type: "selectComposite",
                    label: "Обводка полей", defValue: 'цвет полей',
                    options: [
                        {name: 'цвет полей'},
                        {name: 'толщина линии'},
                    ],
                    components: [
                        {
                            id: 22, name: "border-fields-color-shop_pre_order", type: "colorPicker",
                            label: "", defValue: "#ae93e3",
                        },
                        {
                            id: 23, name: "border-fields-weight-shop_pre_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 3,
                        },
                    ],
                },
                {
                    id: 24, name: "font-text-field-shop_pre_order", type: "fontSelect",
                    label: "Шрифт текста поля", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 25, name: "size-text-field-shop_pre_order", type: "slider",
                    label: "Размер текста поля", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 26, name: "format-text-shop_pre_order", type: "fontSelect",
                    label: "Формат текста", defValue: "regular",
                    array: [
                        { name: 'regular' },
                        { name: 'bold' },
                        { name: 'italic' },
                    ]
                },
                {
                    id: 27, name: "letter-spacing-shop_pre_order", type: "slider",
                    label: "Межбуквенный интервал", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 28, name: "color-field-text-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста поля", defValue: "#313b40",
                },
                {
                    id: 29, name: "color-field-text-input-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста поля при вводе", defValue: "#000",
                },
                {
                    id: 30, name: "color-field-text-input-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста без поля", defValue: "#264027",
                },
                {
                    id: 31, name: "menu-scroll-events-shop_pre_order", type: "radio",
                    label: "Эффект при вводе данных", defValue: 'hidden-field-name',
                    array: [
                        { label: 'скрывать название поля', v: 'hidden-field-name' },
                        { label: 'уменьшать название поля', v: 'lower-field-name' },
                    ]
                },
                {
                    id: 32, name: "distance-between-fields-shop_pre_order", type: "slider",
                    label: "Расстояние между полями", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 33, name: "distance-from-form-to-button-shop_pre_order", type: "slider",
                    label: "Расстояние от формы до кнопки", defValue: 2, min: 1, max: 5,
                },
                //Вид кнопки
                {
                    id: 34, name: "view-button-shop_pre_order", type: "radio", sample: true,
                    label: "Вид кнопки", defValue: 'square',
                    array: [
                        { className: 'sample-square', v: 'square' },
                        { className: 'sample-circle', v: 'circle' },
                        { className: 'sample-ellipse', v: 'ellipse' },
                    ]
                },
                {
                    id: 35, name: "color-button-shop_pre_order", type: "colorPicker",
                    label: "Цвет кнопки", defValue: "#63c0c0",
                },
                {
                    id: 36, name: "color-button-hover-shop_pre_order", type: "colorPicker",
                    label: "Цвет кнопки при наведении", defValue: "#4c6ec0",
                },
                {
                    id: 37, name: "border-button-shop_pre_order", type: "selectComposite",
                    label: "Обводка кнопки", defValue: 'цвет обводки кнопки',
                    options: [
                        {name: 'цвет обводки кнопки'},
                        {name: 'толщина обводки кнопки'},
                    ],
                    components: [
                        {
                            id: 38, name: "color-border-button-shop_pre_order", type: "colorPicker",
                            label: "", defValue: "#b2e354",
                        },
                        {
                            id: 39, name: "weight-border-button-shop_pre_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 3,
                        },
                    ],
                },
                {
                    id: 40, name: "border-button-hover-shop_pre_order", type: "selectComposite",
                    label: "Обводка кнопки при наведении", defValue: 'толщина обводки кнопки',
                    options: [
                        {name: 'цвет обводки кнопки'},
                        {name: 'толщина обводки кнопки'},
                    ],
                    components: [
                        {
                            id: 41, name: "color-border-button-hover-shop_pre_order", type: "colorPicker",
                            label: "", defValue: "#e37a79",
                        },
                        {
                            id: 42, name: "weight-border-button-hover-shop_pre_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 5,
                        },
                    ],
                },
                {
                    id: 43, name: "font-text-button-shop_pre_order", type: "fontSelect",
                    label: "Шрифт текста", defValue: "Rubik", search: 'search',
                    array: [
                        { name: 'Rubik', font: "font-family: 'Rubik'" },
                        { name: 'Inconsolata', font: "font-family: 'Inconsolata Regular'" },
                        { name: 'Roboto', font: "font-family: 'Roboto'" },
                        { name: 'Montserrat', font: "font-family: 'Montserrat'" },
                        { name: 'Pacifico', font: "font-family: 'Pacifico'" },
                    ]
                },
                {
                    id: 44, name: "size-text-button-field-shop_pre_order", type: "slider",
                    label: "Размер текста поля", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 45, name: "format-text-button-shop_pre_order", type: "fontSelect",
                    label: "Формат текста", defValue: "regular",
                    array: [
                        { name: 'regular' },
                        { name: 'bold' },
                        { name: 'italic' },
                    ]
                },
                {
                    id: 46, name: "letter-spacing-button-shop_pre_order", type: "slider",
                    label: "Межбуквенный интервал", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 47, name: "color-text-button-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста", defValue: "#313b40",
                },
                {
                    id: 48, name: "color-text-hover-button-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста при наведении", defValue: "#000",
                },
                {
                    id: 49, name: "size-lateral-indents-in-button-shop_pre_order", type: "slider",
                    label: "Размер боковых отступов внутри кнопки", defValue: 2, min: 1, max: 5,
                },
                {
                    id: 50, name: "format-text-button-shop_pre_order", type: "fontSelect",
                    label: "Bыравнивание", defValue: "left",
                    array: [
                        { name: 'left' },
                        { name: 'center' },
                        { name: 'right' },
                    ]
                },
                {
                    id: 51, name: "stretch-button-full-form-shop_pre_order", type: "switch",
                    label: "Растянуть кнопку на всю ширину формы", defValue: false
                },
            ],
        },
    ];
}
