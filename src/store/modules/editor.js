import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        settings: [],
        changesElemSettings: [],
        currentElemSettings: [],
        defaultElemSettings: [],
        fontFamily: [],
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
        getFonts(state) {
            return state.fontFamily;
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
        },
        getData(state) {
            let data = {};
            _.each(state.currentElemSettings, item => {
                data[item.name] = item.newValue;
            });
            return data;
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
            state.changesElemSettings = [];
            state.changesElemSettings.length = 0;
            state.counter = 0;

            if (payload.history === 'clear') {
                state.currentElemSettings = state.defaultElemSettings;
            }
        },
        clearCurrentElemSettings(state) {
            state.currentElemSettings = [];
            state.currentElemSettings.length = 0;
        },
        loadSettings(state, data) {
            state.fontFamily = data[0].fonts;
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
            id: 0,
            name: 'FontFamily',
            fonts: [
                {"name":"Helvetica","font":"Helvetica"},
                {"name":"Didact Gothic","font":"Didact Gothic&Regular"},
                {"name":"Roboto Regular","font":"Roboto&Regular"},{"name":"Roboto Light","font":"Roboto&Light"},
                {"name":"Roboto Bold","font":"Roboto&Bold"},
                {"name":"Playfair Display Regular","font":"Playfair Display&Regular"},
                {"name":"Playfair Display Bold","font":"Playfair Display&Bold"},
                {"name":"Raleway Regular","font":"Raleway&Regular"},{"name":"Raleway Light","font":"Raleway&Light"},
                {"name":"Raleway Bold","font":"Raleway&Bold"},

                // don't load. response 400
                {"name":"Arial"},
                {"name":"Gilroy Light"},{"name":"Gilroy ExtraBold"},
                {"name":"Old Standard TT Regular","font":"OldStandard&Regular"},
                {"name":"Old Standard TT Bold","font":"OldStandard&Bold"},
                {"name":"Proba Pro","font":"probapro-regular"},
                {"name":"Anglecia Pro Display","font":"Anglecia Pro Display&Regular"},
                {"name":"Tex Gyre Termes Regular","font":"Tex Gyre Termes&Regular"},

                {"name":"Open Sans Regular","font":"Open Sans&Regular"},{"name":"Open Sans Light","font":"Open Sans&light"},
                {"name":"Open Sans Bold","font":"Open Sans&bold"},
                {"name":"Open Sans Condensed","font":"Open+Sans+Condensed:300&subset=latin,cyrillic"},
                {"name":"Fira Sans Regular","font":"Fira Sans&Regular"},{"name":"Fira Sans Light","font":"Fira Sans&Light"},
                {"name":"Fira Sans Bold","font":"Fira Sans&Bold"},
                {"name":"Fira Sans Condensed Regular","font":"Fira Sans Condensed&Regular"},
                {"name":"Fira Sans Condensed Light","font":"Fira Sans Condensed&Light"},
                {"name":"Fira Sans Condensed Bold","font":"Fira Sans Condensed&Bold"},

                {"name":"Lato Light","font":"Lato&Light"},{"name":"Lato Bold","font":"Lato&Bold"},
                {"name":"Lato Regular","font":"Lato&Regular"},


                {"name":"Tex Gyre Termes Bold","font":"texgyretermes-bold"},{"name":"Oswald Regular","font":"Oswald-Regular"},
                {"name":"Oswald Light","font":"Oswald-Light"},{"name":"Oswald Bold","font":"Oswald-Bold"},
                {"name":"Crimson Regular","font":"Crimson-Roman"},{"name":"HK Grotesk Regular","font":"HKGrotesk-Regular"},
                {"name":"HK Grotesk Light","font":"HKGrotesk-Light"},{"name":"HK Grotesk Bold","font":"HKGrotesk-Bold"},
                {"name":"Geometria Light","font":"geometria-light"},{"name":"Museo Sans Cyrillic","font":"MuseoSansCyrl_500"},
                {"name":"Georgia","font":"Georgia"},{"name":"Impact","font":"Impact"},{"name":"Tahoma","font":"Tahoma"},
                {"name":"Times New Roman","font":"Times+New+Roman"},{"name":"Trebuchet MS","font":"Trebuchet+MS"},
                {"name":"Verdana","font":"Verdana"},{"name":"Courier New","font":"Courier+New"},
                {"name":"Anonymous Pro Regular","font":"AnonymousPro-Regular"},
                {"name":"Anonymous Pro Bold","font":"AnonymousPro-Bold"},{"name":"Oranienbaum","font":"Oranienbaum-Regular"},
                {"name":"Roboto Condensed Regular","font":"RobotoCondensed-Regular"},
                {"name":"Roboto Condensed Light","font":"RobotoCondensed-Light"},
                {"name":"Roboto Condensed Bold","font":"RobotoCondensed-Bold"},
                {"name":"Roboto Slab Regular","font":"RobotoSlab-Regular"},{"name":"Roboto Slab Light","font":"RobotoSlab-Light"},
                {"name":"Roboto Slab Bold","font":"RobotoSlab-Bold"},{"name":"PT Mono","font":"PT_Mono-Regular"},
                {"name":"PT Sans Regular","font":"PT_Sans-Web-Regular"},{"name":"PT Sans Bold","font":"PT_Sans-Web-Bold"},
                {"name":"PT Serif Regular","font":"PT_Serif-Web-Regular"},{"name":"PT Serif Bold","font":"PT_Serif-Web-Bold"},
                {"name":"Yeseva One","font":"YesevaOne-Regular"},{"name":"New Athena Unicode","font":"new_athena_unicode"},
                {"name":"Tex Gyre Advento Regular","font":"texgyreadventor-regular"},
                {"name":"Tex Gyre Advento Bold","font":"texgyreadventor-bold"},
                {"name":"Ristretto Pro","font":"RistrettoPro-Regular"},
                {"name":"Ristretto Slab Pro","font":"RistrettoSlabPro-Regular"},
                {"name":"Bitter Regular","font":"Bitter-Regular"},{"name":"Bitter Bold","font":"Bitter-Bold"},
                {"name":"Charis Sil Regular","font":"CharisSILR"},{"name":"Charis Sil Bold","font":"CharisSILB"},
                {"name":"Clinica Pro","font":"ClinicaPro-Regular"},{"name":"Cyntho Pro","font":"CynthoPro-Regular"},
                {"name":"Cyntho Slab Pro","font":"CynthoSlabPro-Regular"},
                {"name":"Cormorant Regular","font":"Cormorant-Regular"},{"name":"Cormorant Light","font":"Cormorant-Light"},
                {"name":"Cormorant Bold","font":"Cormorant-Bold"},{"name":"Dejavu Sans Regular","font":"DejaVuSans"},
                {"name":"Dejavu Sans Light","font":"DejaVuSans-ExtraLight"},
                {"name":"Dejavu Sans Bold","font":"DejaVuSans-Bold"},{"name":"Dejavu Serif Regular","font":"DejaVuSerif"},
                {"name":"Dejavu Serif Bold","font":"DejaVuSerif-Bold"},{"name":"Droid Sans Regular","font":"DroidSans"},
                {"name":"Droid Sans Bold","font":"DroidSans-Bold"},{"name":"Droid Sans Mono","font":"DroidSansMono"},
                {"name":"Droid Serif Regular","font":"DroidSerif-Regular"},{"name":"Droid Serif Bold","font":"DroidSerif-Bold"},
                {"name":"Fira Code Regular","font":"FiraCode-Regular"},{"name":"Fira Code Bold","font":"FiraCode-Bold"},

                {"name":"EB Garamond 12","font":"EBGaramond12-Regular"},{"name":"Kelvinch Regular","font":"Kelvinch-Roman"},
                {"name":"Kelvinch Bold","font":"Kelvinch-Bold"},{"name":"Liberation Sans Regular","font":"LiberationSans-Regular"},
                {"name":"Liberation Sans Bold","font":"LiberationSans-Bold"},
                {"name":"Liberation Mono Regular","font":"LiberationMono-Regular"},
                {"name":"Liberation Mono Bold","font":"LiberationMono-Bold"},
                {"name":"Liberation Serif Regular","font":"LiberationSerif-Regular"},
                {"name":"Liberation Serif Bold","font":"LiberationSerif-Bold"},{"name":"Monoid Regular","font":"Monoid-Regular"},
                {"name":"Monoid Bold","font":"Monoid-Bold"},{"name":"Nimbus Mono Regular","font":"nimbusmono-regular"},
                {"name":"Nimbus Mono Bold","font":"nimbusmono-bold"},
                {"name":"Nimbus Roman No9 L Regular","font":"NimbusRomNo9L-Reg"},
                {"name":"Nimbus Roman No9 L Bold","font":"NimbusRomNo9L-Med"},
                {"name":"Nimbus Sans L Regular","font":"NimbusSanL-Reg"},{"name":"Nimbus Sans L Bold","font":"NimbusSanL-Bol"},
                {"name":"Neumann","font":"td-neumann"},{"name":"NotCourierSans Regular","font":"NotCourierSans"},
                {"name":"NotCourierSans Bold","font":"NotCourierSans-Bold"},
                {"name":"Oxygen Regular","font":"Oxygen"},{"name":"Oxygen Bold","font":"Oxygen-Bold"},
                {"name":"Peace Sans","font":"peace_sans"},{"name":"Tex Gyre Bonum Regular","font":"texgyrebonum-regular"},
                {"name":"Tex Gyre Bonum Bold","font":"texgyrebonum-bold"},
                {"name":"Tex Gyre Heros Regular","font":"texgyreheros-regular"},
                {"name":"Tex Gyre Heros Bold","font":"texgyreheros-bold"},
                {"name":"Tex Gyre Pagella Regular","font":"texgyrepagella-regular"},
                {"name":"Tex Gyre Pagella Bold","font":"texgyrepagella-bold"},
                {"name":"Tex Gyre Schola Regular","font":"texgyreschola-regular"},
                {"name":"Tex Gyre Schola Bold","font":"texgyreschola-bold"},{"name":"ZnikomitNo24","font":"ZnikomitNo24"},
                {"name":"Bebas Regular","font":"BebasNeue-Regular"},{"name":"Bebas Light","font":"BebasNeue-Light"},
                {"name":"Bebas Bold","font":"BebasNeue-Bold"},{"name":"Ubuntu Regular","font":"Ubuntu-R"},
                {"name":"Ubuntu Light","font":"Ubuntu-L"},{"name":"Ubuntu Bold","font":"Ubuntu-B"},
                {"name":"Andika","font":"Andika&subset=cyrillic,latin"},
                {"name":"Anonymous Pro","font":"Anonymous+Pro&subset=latin,cyrillic"},
                {"name":"Arial Black","font":"Arial+Black"},{"name":"Arimo","font":"Arimo&subset=latin,cyrillic"},
                {"name":"Bad Script","font":"Bad+Script&subset=latin,cyrillic"},{"name":"Comic Sans MS","font":"Comic+Sans+MS"},
                {"name":"Cousine","font":"Cousine&subset=latin,cyrillic"},{"name":"Cuprum","font":"Cuprum&subset=latin,cyrillic"},
                {"name":"Didact Gothic","font":"Didact+Gothic&subset=latin,cyrillic"},
                {"name":"EB Garamond","font":"EB+Garamond&subset=latin,cyrillic"},
                {"name":"Exo 2","font":"Exo+2&subset=latin,cyrillic"},{"name":"Forum","font":"Forum&subset=latin,cyrillic"},
                {"name":"Istok Web","font":"Istok+Web&subset=latin,cyrillic"},{"name":"Jura","font":"Jura&subset=latin,cyrillic"},
                {"name":"Kelly Slab","font":"Kelly+Slab&subset=latin,cyrillic"},
                {"name":"Ledger","font":"Ledger&subset=latin,cyrillic"},
                {"name":"Lobster","font":"Lobster&subset=latin,cyrillic"},{"name":"Lora","font":"Lora&subset=latin,cyrillic"},
                {"name":"Marck Script","font":"Marck+Script&subset=latin,cyrillic"},
                {"name":"Marmelad","font":"Marmelad&subset=latin,cyrillic"},
                {"name":"Neucha","font":"Neucha&subset=latin,cyrillic"},
                {"name":"Noto Sans","font":"Noto+Sans&subset=latin,cyrillic"},
                {"name":"Noto Serif","font":"Noto+Serif&subset=latin,cyrillic"},
                {"name":"PT Sans","font":"PT+Sans&subset=latin,cyrillic"},
                {"name":"PT Sans Caption","font":"PT+Sans+Caption&subset=latin,cyrillic"},
                {"name":"PT Sans Narrow","font":"PT+Sans+Narrow&subset=latin,cyrillic"},
                {"name":"PT Serif","font":"PT+Serif&subset=latin,cyrillic"},
                {"name":"PT Serif Caption","font":"PT+Serif+Caption&subset=latin,cyrillic"},
                {"name":"Philosopher","font":"Philosopher&subset=latin,cyrillic"},
                {"name":"Play","font":"Play&subset=latin,cyrillic"},
                {"name":"Playfair Display","font":"Playfair+Display&subset=latin,cyrillic"},
                {"name":"Playfair Display SC","font":"Playfair+Display+SC&subset=latin,cyrillic"},
                {"name":"Poiret One","font":"Poiret+One&subset=latin,cyrillic"},
                {"name":"Press Start 2P","font":"Press+Start+2P&subset=latin,cyrillic"},
                {"name":"Prosto One","font":"Prosto+One&subset=latin,cyrillic"},
                {"name":"Roboto","font":"Roboto&subset=latin,cyrillic"},
                {"name":"Roboto Condensed","font":"Roboto+Condensed&subset=latin,cyrillic"},
                {"name":"Roboto Slab","font":"Roboto+Slab&subset=latin,cyrillic"},
                {"name":"Ruslan Display","font":"Ruslan+Display&subset=latin,cyrillic"},
                {"name":"Russo One","font":"Russo+One&subset=latin,cyrillic"},
                {"name":"Scada","font":"Scada&subset=latin,cyrillic"},
                {"name":"Tenor Sans","font":"Tenor+Sans&subset=latin,cyrillic"},
                {"name":"Tinos","font":"Tinos&subset=latin,cyrillic"},
                {"name":"Ubuntu","font":"Ubuntu&subset=latin,cyrillic"},
                {"name":"Ubuntu Condensed","font":"Ubuntu+Condensed&subset=latin,cyrillic"},
                {"name":"Ubuntu Mono","font":"Ubuntu+Mono&subset=latin,cyrillic"},
                {"name":"Underdog","font":"Underdog&subset=latin,cyrillic"},
                {"name":"Terminal Dosis","font":"Dosis"},{"name":"Abel","font":"Abel"},
                {"name":"Alegreya","font":"Alegreya"},{"name":"Alex Brush","font":"Alex+Brush"},
                {"name":"Anton","font":"Anton"},{"name":"Asap","font":"Asap"},
                {"name":"Baumans","font":"Baumans"},{"name":"Crafty Girls","font":"Crafty+Girls"},
                {"name":"Days One","font":"Days+One"},{"name":"Delius Unicase","font":"Delius+Unicase"},
                {"name":"Exo","font":"Exo"},{"name":"Euphoria Script","font":"Euphoria+Script"},
                {"name":"Federo","font":"Federo"},{"name":"Glegoo","font":"Glegoo"},{"name":"Gudea","font":"Gudea"},
                {"name":"Handlee","font":"Handlee"},{"name":"Kranky","font":"Kranky"},
                {"name":"Krona One","font":"Krona+One"},{"name":"Leckerli One","font":"Leckerli+One"},
                {"name":"Marko One","font":"Marko+One"},{"name":"Merienda One","font":"Merienda+One"},
                {"name":"Noticia Text","font":"Noticia+Text"},{"name":"Nova Flat","font":"Nova+Flat"},
                {"name":"Nova Oval","font":"Nova+Oval"},{"name":"Nova Round","font":"Nova+Round"},
                {"name":"Nova Slim","font":"Nova+Slim"},{"name":"Nunito","font":"Nunito"},
                {"name":"Original Surfer","font":"Original+Surfer"},{"name":"Pacifico","font":"Pacifico"},
                {"name":"Quicksand","font":"Quicksand"},{"name":"Rochester","font":"Rochester"},
                {"name":"Rokkitt","font":"Rokkitt"},{"name":"Salsa","font":"Salsa"},
                {"name":"Satisfy","font":"Satisfy"},{"name":"Snippet","font":"Snippet"},
                {"name":"Sofia","font":"Sofia"},{"name":"Stint Ultra Expanded","font":"Stint+Ultra+Expanded"},
                {"name":"Syncopate","font":"Syncopate"},{"name":"Trochut","font":"Trochut"},
                {"name":"Unkempt","font":"Unkempt"},{"name":"Voces","font":"Voces"}
            ],
        },
        {
            id: 10,
            page: 'menu',
            url: '/menu',
            elements: [
                {
                    id: 0, name: "bg-color-menu_page", type: "colorPicker",
                    label: "Фон меню", defValue: "rgba(217, 221, 245, 1)", opacity: true,
                    selector: [
                        `header .md-menu__main .md-menu__li-l1.active>a,
                        .mod--vertical-menu .md-menu--mobile .md-menu__main .active > a,
                        .mod--vertical-menu .md-menu--mobile .md-menu__wrap-l2 .active > a`,
                        '.md-menu__href-l1',
                    ],
                    css: [ 'background-color: %val% !important', 'box-shadow:0 0 10px %val%' ]
                },
                {
                    id: 1, name: "font-site-menu_page", type: "fontSelect",
                    label: "Шрифт меню", defValue: "Roboto", search: 'search',
                    selector: ["body"],
                    css: ["font-family: %val%"]
                },
                {
                    id: 2, name: "size-point-menu_page", type: "slider",
                    label: 'Размер пункта меню', defValue: 10, min: 6, max: 20,
                    selector: [],
                    css: []
                },
                {
                    id: 3, name: "format-menu_page", type: "fontSelect",
                    label: "Формат меню", defValue: "center",
                    array: [
                        { name: 'center' },
                        { name: 'left' },
                        { name: 'right' },
                    ],
                    selector: [".md-menu"],
                    css: ["text-align"]
                },
                {
                    id: 4, name: "font-letter-spacing-menu_page", type: "slider",
                    label: 'Межбуквенный интервал', defValue: 3, min: 0, max: 7,
                    selector: [".md-menu__href-l1"],
                    css: ["letter-spacing"]
                },
                {
                    id: 5, name: "font-color-menu_page", type: "colorPicker",
                    label: "Цвет пункта меню", defValue: "rgba(0,0,0,0.87)", opacity: true,
                    selector: [".application.theme--light"],
                    css: ["color"]
                },
                {
                    id: 6, name: "link-color-hover-menu_page", type: "colorPicker",
                    label: "Цвет активного пункта меню", defValue: "#5468f6",
                    selector: [".application.theme--light a"], opacity: true,
                    css: ["color"]
                },
                {
                    id: 7, name: "arrow-up-color-menu_page", type: "colorPicker",
                    label: "Фон подменю", defValue: "#e73617", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 8, name: "width-catalog-submenu-menu_page", type: "slider",
                    label: 'Размер пункта подменю', defValue: 3, min: 0, max: 7,
                    selector: [
                        `header .md-menu__main .md-menu__li-l1.active>a,
                        .mod--vertical-menu .md-menu--mobile .md-menu__main .active > a,
                        .mod--vertical-menu .md-menu--mobile .md-menu__wrap-l2 .active > a`,
                    ],
                    css: [ "width" ]
                },
                {
                    id: 10, name: "arrow-up-color-hover-menu_page", type: "colorPicker",
                    label: "Цвет пункта подменю", defValue: "#a7e707",
                    selector: ["body"], opacity: true,
                    css: ["color"]
                },
                {
                    id: 11, name: "link-color-active-menu_page", type: "colorPicker", show: true,
                    label: "Цвет активного пункта меню", defValue: "#e35e19",
                    selector: ["body"], opacity: true,
                    css: ["color"]
                },
                {
                    id: 12, name: "bg-color-mobile-menu_page", type: "colorPicker", show: true,
                    label: "Фон меню в мобильной версии", defValue: "#a1e3df",
                    selector: ["body"], opacity: true,
                    css: ["color"]
                },
                {
                    id: 13, name: "arrow-up-color-hover-menu_page", type: "colorPicker",
                    label: "Цвет пункта меню в мобильной версии", defValue: "#24e78f",
                    selector: ["body"], opacity: true,
                    css: ["color"]
                },
                {
                    id: 14, name: "link-color-active-mobile-menu_page", type: "colorPicker",
                    label: "Цвет активного пункта меню в мобильной версии", defValue: "#0e2287",
                    selector: ["body"], opacity: true,
                    css: ["color"]
                },
                {
                    id: 15, name: "effect-menu-active-menu_page", type: "selectComposite",
                    label: "Эффект при наведении на пункт", defValue: 'выделение цветом',
                    selector: ["body"], css: ["color"],
                    options: [
                        {name: 'выделение цветом', slider: false, picker: false },
                        {name: 'подчеркивание', slider: true, picker: false },
                        {name: 'зачеркивание', slider: true, picker: false },
                        {name: 'маркер', slider: true, picker: true }
                    ],
                    components: [
                        {
                            id: 17, name: "effect-link-weight-menu-menu_page", type: "slider",
                            label: "Толщина линии", defValue: 2, min: 1, max: 5,
                            selector: ["body"],
                            css: ["color"]
                        },
                        {
                            id: 18, name: "effect-link-color-menu-menu_page", type: "colorPicker",
                            opacity: true, label: "Цвет линии", defValue: "#2a66e3",
                            selector: ["body"],
                            css: ["color"]
                        },
                    ],
                },
                {
                    id: 19, name: "vertical-indents-menu_page", type: "slider",
                    label: "Вертикальные отступы меню", defValue: 70, min: 69, max: 100,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 20, name: "font-letter-spacing-menu_page", type: "slider",
                    label: "Расстояние между пунктами меню", defValue: 13, min: 1, max: 27,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 21, name: "link-color-active-mobile-menu_page", type: "colorPicker",
                    label: "Цвет разделительной линии", defValue: "#871e0d",
                    selector: ["body"], opacity: true,
                    css: ["color"]
                },
                {
                    id: 22, name: "align-menu-content-menu_page", type: "switch",
                    label: 'Выровнять меню по ширине контента сайта', defValue: false,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 23, name: "location-submenu-menu_page", type: "fontSelect",
                    label: "Расположение подменю", defValue: "menu_center",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ],
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 24, name: "menu-scroll-events-menu_page", type: "radio",
                    label: "Поведение меню при прокрутке страницы", defValue: 'не показывать',
                    array: [
                        { label: 'не показывать', v: 'не показывать' },
                        { label: 'закрепить вверху', v: 'fix_to_top' },
                        { label: 'подгрузить сверху', v: 'load_top' }
                    ],
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 25, name: "align-menu-content-menu_page", type: "switch",
                    label: "Эффект плавного появления меню сверху", defValue: false,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 26, name: "location-submenu-menu_page", type: "input",
                    label: "Разделитель между пунктами меню", defValue: "*", maxLength: 3,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 27, name: "align-menu-content-menu_page", type: "switch",
                    label: "Расположить меню под слайдером", defValue: false, // (only DEV)
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 28, name: "view-icon-basket-menu_page", type: "radio", picture: true,
                    label: "Вид иконки \"Корзина\"", defValue: 'account',
                    array: [
                        { src: 'account_circle', v: 'account' },
                        { src: 'star', v: 'star' },
                        { src: 'cake', v: 'cake' },
                        { src: 'check_circle', v: 'check' },
                    ],
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 29, name: "menu-scroll-events-menu_page", type: "radio",
                    label: "Отображение иконки \"Корзина\" ", defValue: 'shop',
                    array: [
                        { label: 'только на страницах магазина', v: 'shop' },
                        { label: 'на всех страницах сайта', v: 'all_pages' },
                    ],
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 30, name: "design-menu-menu_page", type: "radio", picture: true,
                    label: "Вид меню", defValue: 'cake', // (есть 14 видов меню)
                    array: [
                        { src: 'account_circle', v: 'account' },
                        { src: 'star', v: 'star' },
                        { src: 'cake', v: 'cake' },
                        { src: 'check_circle', v: 'check' },
                    ],
                    selector: ["body"],
                    css: ["color"]
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
                    label: "Ширина сайта",
                    switchId: 1, switchName: "switch-width-site", switchValue: '%',
                    dim: { 0: '%', 1: 'Px' },
                    range: {
                        0: { v: 90, min: 1, max: 100, step: 10 },
                        1: { v: 900, min: 600, max: 2500, step: 50 }
                    },
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 2, name: "bg-color-site", type: "colorPicker",
                    label: "Фон сайта", defValue: "rgba(224,224,224,1)",
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 2, name: "font-site", type: "fontSelect",
                    label: "Шрифт сайта", defValue: "Rubik", search: 'search',
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 3, name: "color-font-text", type: "colorPicker",
                    label: "Цвет текста", defValue: "rgba(0,0,0,0.87)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 4, name: "color-links-hover", type: "colorPicker",
                    label: "Цвет ссылок при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 5, name: "color-arrow-top", type: "colorPicker",
                    label: "Цвет стрелки \"вверх\"", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 6, name: "color-arrow-top-hover", type: "colorPicker",
                    label: "Цвет стрелки \"вверх\" при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 7, name: "color-elem-slider", type: "colorPicker",
                    label: "Элементы навигации слайдера", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 8, name: "color-elem-slider-hover", type: "colorPicker",
                    label: "Элементы навигации слайдера при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
            ],
        },
        {
            id: 30,
            page: 'search',
            url: '/search',
            elements: [
                {
                    id: 0, name: "bg-color-search", type: "colorPicker",
                    label: "Фон страницы поиска", defValue: "rgba(224,224,224,1)",
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 1, name: "color-search-close", type: "colorPicker",
                    label: "Элементы страницы поиска", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
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
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 1, name: "size-font-categories", type: "slider",
                    label: "Размер шрифта категории", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 2, name: "color-categories", type: "colorPicker",
                    label: "Цвет категории", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 3, name: "color-active-categories", type: "colorPicker",
                    label: "Цвет активной категории", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 4, name: "position-categories", type: "fontSelect",
                    label: "Расположение категории", defValue: "Center",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ],
                    selector: ["body"],
                    css: ["color"]
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
                    label: "Ширина блога",
                    switchId: 1, switchName: "switch-blog-page", switchValue: '%',
                    dim: { 0: '%', 1: 'Px' },
                    range: {
                        0: { v: 20, min: 1, max: 100, step: 30 },
                        1: { v: 4, min: 1, max: 5, step: 1 }
                    },
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 2, name: "bg-blog-page", type: "selectComposite",
                    label: "Фон записи", defValue: 'использовать фон сайта',
                    selector: [], css: [], options: [
                        {name: 'использовать фон сайта', picker: false},
                        {name: 'цвет фона', picker: true},
                    ],
                    components: [
                        {
                            id: 3, name: "sub_bg-blog-page", type: "colorPicker",
                            label: "", defValue: "#e35e19", opacity: true,
                            selector: [],
                            css: []
                        },
                    ],
                },
                {
                    id: 4, name: "bg-side-panel", type: "selectComposite",
                    label: "Фон боковой панели", defValue: 'цвет фона',
                    selector: ["body"], css: ["color"], options: [
                        {name: 'использовать фон сайта', picker: false},
                        {name: 'цвет фона', picker: true},
                    ],
                    components: [
                        {
                            id: 5, name: "sub_bg-side-panel", type: "colorPicker",
                            label: "", defValue: "#193EE3", opacity: true,
                            selector: ["body"],
                            css: ["color"]
                        },
                    ],
                },
                {
                    id: 6, name: "color-preview-blog-page", type: "colorPicker",
                    label: "Фон превью", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 7, name: "size-preview-blog-page", type: "slider",
                    label: "Расстояние между превью", defValue: 2, min: 1, max: 10,
                    selector: ["body"], css: ["color"]
                },
                {
                    id: 8, name: "location-description-blog-page", type: "fontSelect",
                    label: "Расположение описания", defValue: "Center",
                    selector: ["body"], css: ["color"],
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ]
                },
                {
                    id: 9, name: "width-border-post-blog-page", type: "slider",
                    label: "Толщина границы записи", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 10, name: "color-border-post-blog-page", type: "colorPicker",
                    label: "Цвет границы записи", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 11, name: "color-line-under-post", type: "colorPicker",
                    label: "Цвет линии под записью", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 12, name: "color-icons-blog-page", type: "colorPicker",
                    label: "Цвет иконок", defValue: "rgba(123,177,211,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 13, name: "color-decor_elem-blog-page", type: "colorPicker",
                    label: "Цвет декоративных элементов", defValue: "rgba(222, 236, 245, 1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 14, name: "color-decor_line-blog-page", type: "colorPicker",
                    label: "Цвет декоративных линий", defValue: "rgba(239, 230, 189, 1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 15, name: "color-navigation-blog-page", type: "colorPicker",
                    label: "Цвет навигации", defValue: "rgba(123,177,211,1)", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 16, name: "bg-button-blog-page", type: "colorPicker",
                    label: "Цвет фона кнопки \"Читать далее\"", defValue: "#D70CF2", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 17, name: "font-header-blog-page", type: "fontSelect",
                    label: "Шрифт заголовка", defValue: "Rubik", search: 'search',
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 18, name: "size-header-blog-page", type: "slider",
                    label: "Размер шрифта заголовка", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 19, name: "bg-header-blog-page", type: "colorPicker",
                    label: "Цвет заголовка", defValue: "#000", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 20, name: "font-text-blog-page", type: "fontSelect",
                    label: "Шрифт текста", defValue: "Rubik", search: 'search',
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 21, name: "size-font-text-blog-page", type: "slider",
                    label: "Размер шрифта текста", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 22, name: "bg-text-blog-page", type: "colorPicker",
                    label: "Цвет текста", defValue: "#959899", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 23, name: "font-description-blog-page", type: "fontSelect",
                    label: "Шрифт описания", defValue: "Rubik", search: 'search',
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 24, name: "size-font-descript-blog-page", type: "slider",
                    label: "Размер шрифта описания", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 25, name: "bg-descript-blog-page", type: "colorPicker",
                    label: "Цвет описания", defValue: "#dadee3", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 26, name: "font-date-blog-page", type: "fontSelect",
                    label: "Шрифт даты", defValue: "Rubik", search: 'search',
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 27, name: "size-font-date-blog-page", type: "slider",
                    label: "Размер шрифта даты", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 28, name: "bg-date-blog-page", type: "colorPicker",
                    label: "Цвет даты", defValue: "#589939", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 29, name: "font-tags-blog-page", type: "fontSelect",
                    label: "Шрифт тегов", defValue: "Rubik", search: 'search',
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 30, name: "size-font-tags-blog-page", type: "slider",
                    label: "Размер шрифта тегов", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 31, name: "bg-tags-blog-page", type: "colorPicker",
                    label: "Цвет тегов", defValue: "#997920", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 32, name: "font-links-blog-page", type: "fontSelect",
                    label: "Шрифт ссылки \"Читать далее\"", defValue: "Rubik", search: 'search',
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 33, name: "size-font-links-blog-page", type: "slider",
                    label: "Размер шрифта ссылки \"Читать далее\"", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 34, name: "color-link-read-blog-page", type: "colorPicker",
                    label: "Цвет ссылки \"Читать далее\"", defValue: "#99341d", opacity: true,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 35, name: "size-font-text-blog-page", type: "slider",
                    label: "Размер шрифта текста \"Читать далее\"", defValue: 2, min: 1, max: 5,
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 36, name: "color-text-read-blog-page", type: "colorPicker",
                    label: "Цвет текста \"Читать далее\"", defValue: "#079993", opacity: true,
                    selector: ["body"],
                    css: ["color"]
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
                    switchId: 1, switchName: "switch-width-blog-post", switchValue: '%',
                    dim: { 0: '%', 1: 'Px' },
                    range: {
                        0: { v: 90, min: 1, max: 100, step: 10 },
                        1: { v: 900, min: 600, max: 2500, step: 50 }
                    },
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 2, name: "effect-menu-active", type: "selectComposite",
                    label: "Фон записи", defValue: 'использовать фон сайта',
                    selector: [], css: [], options: [
                        {name: 'использовать фон сайта', picker: false},
                        {name: 'цвет фона', picker: true},
                    ],
                    components: [
                        {
                            id: 3, name: "sub_bg-blog-post", type: "colorPicker",
                            label: "", defValue: "#b2e354",
                            selector: ["body"], css: ["color"]
                        },
                    ],
                },
                {
                    id: 4, name: "weight-border-blog-post", type: "slider",
                    label: "Толщина границы записи", defValue: 2, min: 1, max: 10,
                    selector: [],
                    css: []
                },
                {
                    id: 5, name: "color-border-blog-post", type: "colorPicker",
                    label: "Цвет границы записи", defValue: "#e35e19", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 6, name: "color-line-under-blog-post", type: "colorPicker",
                    label: "Цвет линии под записью", defValue: "#43a1e3", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 7, name: "color-elem-under-blog-post", type: "colorPicker",
                    label: "Цвет элементов под записью", defValue: "#e393aa", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 8, name: "color-decor-elem-blog-post", type: "colorPicker",
                    label: "Цвет декоративных элементов", defValue: "#997920", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 9, name: "color-navigation-blog-post", type: "colorPicker",
                    label: "Цвет навигации", defValue: "#bfbab1", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 10, name: "font-header-blog-post", type: "fontSelect",
                    label: "Шрифт заголовка", defValue: "Rubik", search: 'search',
                    selector: [],
                    css: []
                },
                {
                    id: 11, name: "size-font-blog-post", type: "slider",
                    label: "Размер шрифта заголовка", defValue: 2, min: 1, max: 10,
                    selector: [],
                    css: []
                },
                {
                    id: 12, name: "color-heading-blog-post", type: "colorPicker",
                    label: "Цвет заголовка", defValue: "#2d2927", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 13, name: "font-text-blog-post", type: "fontSelect",
                    label: "Шрифт текста", defValue: "Rubik", search: 'search',
                    selector: [],
                    css: []
                },
                {
                    id: 14, name: "size-font-text-blog-post", type: "slider",
                    label: "Размер шрифта текста", defValue: 2, min: 1, max: 10,
                    selector: [],
                    css: []
                },
                {
                    id: 15, name: "color-heading-blog-post", type: "colorPicker",
                    label: "Цвет текста", defValue: "#000000", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 16, name: "font-date-blog-post", type: "fontSelect",
                    label: "Шрифт даты", defValue: "Rubik", search: 'search',
                    selector: [],
                    css: []
                },
                {
                    id: 17, name: "size-font-date-blog-post", type: "slider",
                    label: "Размер шрифта даты", defValue: 2, min: 1, max: 10,
                    selector: [],
                    css: []
                },
                {
                    id: 18, name: "color-heading-blog-post", type: "colorPicker",
                    label: "Цвет даты", defValue: "#cb692d", opacity: true,
                    selector: [],
                    css: []
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
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 1, name: "width-blog-slider", type: "slider",
                    label: "Ширина слайдера", defValue: 1500, min: 600, max: 2590,
                    selector: [],
                    css: []
                },
                {
                    id: 2, name: "indent-preview-blog-slider", type: "slider",
                    label: "Отступ между превью", defValue: 30, min: 1, max: 100,
                    selector: [],
                    css: []
                },
                {
                    id: 3, name: "bg-blog-slider", type: "colorPicker",
                    label: "Цвет фона", defValue: "#c9dfe2", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 4, name: "show-button-blog-slider", type: "switchComposite",
                    label: "Отображать кнопки для пролистывания", defValue: false, tag: "enable-buttons",
                    selector: [], css: [],
                    components: [
                        {
                            id: 5, name: "color-button-blog-slider", type: "colorPicker",
                            label: "Цвет кнопок", defValue: "#2d88e3", opacity: true,
                            selector: [],
                            css: []
                        },
                        {
                            id: 6, name: "color-button-hover-blog-slider", type: "colorPicker",
                            label: "Цвет кнопок при наведении", defValue: "#bfbab1", opacity: true,
                            selector: [],
                            css: []
                        },
                    ],
                },
                {
                    id: 7, name: "show-arrow-blog-slider", type: "switchComposite",
                    label: "Отображать стрелки для пролистывания", defValue: false, tag: "enable-arrows",
                    selector: [], css: [],
                    components: [
                        {
                            id: 8, name: "color-arrow-blog-slider", type: "colorPicker",
                            label: "Цвет стрелок", defValue: "#19e3cb", opacity: true,
                            selector: [],
                            css: []
                        },
                        {
                            id: 9, name: "color-arrow-hover-blog-slider", type: "colorPicker",
                            label: "Цвет стрелок при наведении", defValue: "#3089bf", opacity: true,
                            selector: [],
                            css: []
                        },
                    ],
                },
                {
                    id: 10, name: "color-scroll-blog-slider", type: "colorPicker",
                    label: "Цвет прокрутки", defValue: "#adc3c6", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 11, name: "bg-under-text-blog-slider", type: "colorPicker",
                    label: "Фон под текстом", defValue: "#da3b76",
                    selector: [],
                    css: []
                },
                {
                    id: 12, name: "font-heading-blog-slider", type: "fontSelect",
                    label: "Шрифт заголовка", defValue: "Rubik", search: 'search',
                    selector: [],
                    css: []
                },
                {
                    id: 13, name: "size-heading-blog-slider", type: "slider",
                    label: "Размер заголовка", defValue: 2, min: 1, max: 5,
                    selector: [],
                    css: []
                },
                {
                    id: 14, name: "color-heading-blog-slider", type: "colorPicker",
                    label: "Цвет заголовка", defValue: "#4d5556", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 15, name: "font-description-blog-slider", type: "fontSelect",
                    label: "Шрифт описания", defValue: "Rubik", search: 'search',
                    selector: [],
                    css: []
                },
                {
                    id: 16, name: "size-description-blog-slider", type: "slider",
                    label: "Размер описания", defValue: 2, min: 1, max: 5,
                    selector: [],
                    css: []
                },
                {
                    id: 17, name: "color-description-blog-slider", type: "colorPicker",
                    label: "Цвет описания", defValue: "#43a1e3", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 18, name: "color-links-hover-blog-slider", type: "colorPicker",
                    label: "Цвет ссылки при наведении", defValue: "#b2e354", opacity: true,
                    selector: [],
                    css: []
                },
                {
                    id: 19, name: "position-text-blog-slider", type: "fontSelect",
                    label: "Расположение текста", defValue: "Center",
                    selector: [], css: [],
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ]
                },
                {
                    id: 20, name: "show-arrow-blog-slider", type: "switchComposite",
                    label: "Включить слайдшоу", defValue: false, tag: "enable-slide-show",
                    selector: [], css: [],
                    components: [
                        {
                            id: 21, name: "interval-blog-slider", type: "slider",
                            label: "Интервал", defValue: 2, min: 1, max: 5,
                            selector: [], css: [],
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
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 1, name: "shop-size-categories", type: "slider",
                    label: "Размер категории", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 2, name: "format-categories", type: "fontSelect",
                    label: "Формат категории", defValue: "Center",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ],
                    selector: [], css: []
                },
                {
                    id: 3, name: "letter-spacing-categories", type: "slider",
                    label: "Межбуквенный интервал категорий", defValue: 3, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 4, name: "line-spacing-categories", type: "slider",
                    label: "Межстрочный интервал категорий", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 5, name: "color-categories", type: "colorPicker",
                    label: "Цвет категории", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 6, name: "color-active-categories", type: "colorPicker",
                    label: "Цвет активной категории", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 7, name: "color-active-hover-categories", type: "colorPicker",
                    label: "Цвет активной категории при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 8, name: "bg-subcategories", type: "colorPicker",
                    label: "Фон для подкатегорий", defValue: "#43a1e3", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 9, name: "size-subcategories", type: "slider",
                    label: "Размер подкатегории", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 10, name: "format-name-subcategories", type: "fontSelect",
                    label: "Формат названия подкатегорий", defValue: "Left",
                    array: [
                        { name: 'Center' },
                        { name: 'Left' },
                        { name: 'Right' },
                    ],
                    selector: [], css: []
                },
                {
                    id: 11, name: "letter-spacing-subcategories", type: "slider",
                    label: "Межбуквенный интервал подкатегорий", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 12, name: "line-spacing-subcategories", type: "slider",
                    label: "Межстрочный интервал подкатегорий", defValue: 1, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 13, name: "color-subcategories", type: "colorPicker",
                    label: "Цвет подкатегории", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 14, name: "color-active-subcategories", type: "colorPicker",
                    label: "Цвет активной подкатегории", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 15, name: "color-active-hover-subcategories", type: "colorPicker",
                    label: "Цвет подкатегории при наведении", defValue: "#b2e354", opacity: true,
                    selector: [], css: []
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
                    label: "Ширина каталога",
                    switchId: 1, switchName: "switch-size-shop_catalog", switchValue: '%',
                    dim: { 0: '%', 1: 'Px' },
                    range: {
                        0: { v: 20, min: 1, max: 100, step: 10 },
                        1: { v: 2, min: 1, max: 5, step: 0 }
                    },
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 2, name: "size-font-shop_catalog", type: "slider",
                    label: "Размер шрифта", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 3, name: "color-text-shop_catalog", type: "colorPicker",
                    label: "Цвет текста", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 4, name: "bg-preview-hover-shop_catalog", type: "colorPicker",
                    label: "Фон при наведении на превью", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 5, name: "name-product-shop_catalog", type: "colorPicker",
                    label: "Название товара", defValue: "#b2e354", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 6, name: "text-up-preview-shop_catalog", type: "colorPicker",
                    label: "Текст над превью", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 7, name: "price-shop_catalog", type: "colorPicker",
                    label: "Цена", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 8, name: "discount-price-shop_catalog", type: "colorPicker",
                    label: "Цена по скидке", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 9, name: "bg-icon-shop_catalog", type: "colorPicker",
                    label: "Фон иконки \"В корзину\"", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 10, name: "bg-icon-hover-shop_catalog", type: "colorPicker",
                    label: "Фон иконки \"В корзину\" при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 11, name: "basket-icon-shop_catalog", type: "colorPicker",
                    label: "Иконка \"В корзину\"", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 12, name: "basket-icon-hover-shop_catalog", type: "colorPicker",
                    label: "Иконка \"В корзину\" при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
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
                    switchId: 1, switchName: "switch-size-shop_catalog", switchValue: '%',
                    dim: { 0: '%', 1: 'Px' },
                    range: {
                        0: { v: 20, min: 1, max: 100, step: 10 },
                        1: { v: 2, min: 1, max: 5, step: 0 }
                    },
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 2, name: "font-select-shop_product", type: "fontSelect",
                    label: "Шрифт страницы", defValue: "Helvetica", search: 'search',
                    selector: [], css: []
                },
                {
                    id: 3, name: "size-font-breadcrumbs-shop_product", type: "slider",
                    label: "Размер шрифта \"хлебных крошек\"", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 4, name: "color-breadcrumbs-shop_product", type: "colorPicker",
                    label: "Цвет \"хлебных крошек\"", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 5, name: "color-breadcrumbs-hover-shop_product", type: "colorPicker",
                    label: "Цвет \"хлебных крошек\" при наведении", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 6, name: "size-font-name-shop_product", type: "slider",
                    label: "Размер шрифта названия", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 7, name: "color-name-shop_product", type: "colorPicker",
                    label: "Цвет названия товара", defValue: "#43a1e3", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 8, name: "size-font-price-shop_product", type: "slider",
                    label: "Размер шрифта цены", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 9, name: "color-price-shop_product", type: "colorPicker",
                    label: "Цвет цены", defValue: "#e3875b", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 10, name: "size-font-price-discount-shop_product", type: "slider",
                    label: "Размер шрифта цены со скидкой", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 11, name: "color-price-discount-shop_product", type: "colorPicker",
                    label: "Цвет цены со скидкой", defValue: "#e31524", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 12, name: "size-font-price-discount-shop_product", type: "slider",
                    label: "Размер шрифта сообщения о количестве товаров", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                // {
                //     id: 13, name: "color-price-discount-shop_product", type: "colorPicker",
                //     label: "Цвет цены со скидкой", defValue: "#2be3d3",
                //     selector: [], css: []
                // },
                {
                    id: 14, name: "color-msg-count_price-shop_product", type: "colorPicker",
                    label: "Цвет сообщения о количестве товаров", defValue: "#e31524",
                    opacity: true, selector: [], css: []
                },
                {
                    id: 15, name: "size-font-description-shop_product", type: "slider",
                    label: "Размер шрифта описания", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 16, name: "color-description-shop_product", type: "colorPicker",
                    label: "Цвет описания", defValue: "#808e90", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 17, name: "color-icon-add-cart-shop_product", type: "colorPicker",
                    label: "Цвет кнопки \"Добавить в корзину\"", defValue: "#abbdc0", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 18, name: "color-icon-add-cart-shop_product", type: "colorPicker",
                    label: "Цвет текста \"Добавить в корзину\"", defValue: "#197BC1", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 19, name: "bg-button-photo-big-size-shop_product", type: "colorPicker",
                    label: "Цвет фона под фото в большом размере", defValue: "#14907c", opacity: true,
                    selector: [], css: []
                },
            ],
        },
        {
            id: 110,
            page: 'shop_order_page',
            // url: '/order/page',
            elements: [
                {
                    id: 0, name: "font-page-shop_order", type: "fontSelect",
                    label: "Шрифт страницы", defValue: "Rubik", search: 'search',
                    selector: ["body"],
                    css: ["color"]
                },
                {
                    id: 1, name: "size-font-heading-shop_order", type: "slider",
                    label: "Размер шрифта заголовка", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 2, name: "color-heading-shop_order", type: "colorPicker",
                    label: "Цвет заголовков на странице", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 3, name: "size-font-name-column-shop_order", type: "slider",
                    label: "Размер шрифта названия колонок в таблице", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 4, name: "color-name-column-shop_order", type: "colorPicker",
                    label: "Цвет названия колонок в таблице", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 5, name: "size-font-product-description-shop_order", type: "slider",
                    label: "Размер шрифта описания товаров", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 6, name: "color-product-description-shop_order", type: "colorPicker",
                    label: "Цвет описания товаров", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 7, name: "size-font-product-params-shop_order", type: "slider",
                    label: "Размер шрифта параметров товаров", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 8, name: "color-product-params-shop_order", type: "colorPicker",
                    label: "Цвет параметров товаров", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 9, name: "size-font-total-price-shop_order", type: "slider",
                    label: "Размер шрифта итоговой суммы", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 10, name: "color-total-price-shop_order", type: "colorPicker",
                    label: "Цвет итоговой суммы", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 11, name: "size-font-bottom-text-block-shop_order", type: "slider",
                    label: "Размер шрифта текстового блока внизу", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 12, name: "color-bottom-text-block-shop_order", type: "colorPicker",
                    label: "Цвет текстового блока внизу", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 13, name: "size-font-delivery-methods-shop_order", type: "slider",
                    label: "Размер шрифта способов доставки", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 14, name: "color-delivery-method-shop_order", type: "colorPicker",
                    label: "Цвет способов доставки", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 15, name: "size-font-payment-methods-shop_order", type: "slider",
                    label: "Размер шрифта способов оплаты", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 16, name: "color-payment-methods-shop_order", type: "colorPicker",
                    label: "Цвет способов оплаты", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 17, name: "size-font-link-promo-code-shop_order", type: "slider",
                    label: "Размер шрифта текста ссылки на промо-код", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 18, name: "color-split-lanes-shop_order", type: "colorPicker",
                    label: "Цвет разделительных полос", defValue: "rgba(211,123,123,1)", opacity: true,
                    selector: [], css: []
                },
            ],
        },
        {
            id: 111,
            page: 'shop_order_form',
            elements: [
                //Вид полей
                {
                    id: 19, name: "type-fields-shop_order", type: "radio", sample: true,
                    label: "Вид полей", defValue: 'square',
                    selector: [], css: [],
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
                    selector: [], css: []
                },
                {
                    id: 21, name: "border-fields-shop_order", type: "selectComposite",
                    label: "Обводка полей", defValue: 'цвет полей',
                    selector: [], css: [],
                    options: [
                        {name: 'цвет полей', picker: true, slider: false},
                        {name: 'толщина линии', picker: false, slider: true},
                    ],
                    components: [
                        {
                            id: 22, name: "border-fields-color-shop_order", type: "colorPicker",
                            label: "", defValue: "#ae93e3", opacity: true,
                            selector: [], css: []
                        },
                        {
                            id: 23, name: "border-fields-weight-shop_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 3,
                            selector: [], css: []
                        },
                    ],
                },
                {
                    id: 24, name: "font-text-field-shop_order", type: "fontSelect",
                    label: "Шрифт текста поля", defValue: "Rubik", search: 'search',
                    selector: [], css: []
                },
                {
                    id: 25, name: "size-text-field-shop_order", type: "slider",
                    label: "Размер текста поля", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 26, name: "format-text-shop_order", type: "fontSelect",
                    label: "Формат текста", defValue: "regular",
                    selector: [], css: [],
                    array: [
                        { name: 'regular' },
                        { name: 'bold' },
                        { name: 'italic' },
                    ]
                },
                {
                    id: 27, name: "letter-spacing-shop_order", type: "slider",
                    label: "Межбуквенный интервал", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 28, name: "color-field-text-shop_order", type: "colorPicker",
                    label: "Цвет текста поля", defValue: "#313b40", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 29, name: "color-field-text-input-shop_order", type: "colorPicker",
                    label: "Цвет текста поля при вводе", defValue: "#000", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 30, name: "color-field-text-input-shop_order", type: "colorPicker",
                    label: "Цвет текста без поля", defValue: "#264027", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 31, name: "menu-scroll-events-shop_order", type: "radio",
                    label: "Эффект при вводе данных", defValue: 'hidden-field-name',
                    selector: [], css: [],
                    array: [
                        { label: 'скрывать название поля', v: 'hidden-field-name' },
                        { label: 'уменьшать название поля', v: 'lower-field-name' },
                    ]
                },
                {
                    id: 32, name: "distance-between-fields-shop_order", type: "slider",
                    label: "Расстояние между полями", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 33, name: "distance-from-form-to-button-shop_order", type: "slider",
                    label: "Расстояние от формы до кнопки", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                //Вид кнопки
                {
                    id: 34, name: "view-button-shop_order", type: "radio", sample: true,
                    label: "Вид кнопки", defValue: 'circle',
                    selector: [], css: [],
                    array: [
                        { className: 'sample-square', v: 'square' },
                        { className: 'sample-circle', v: 'circle' },
                        { className: 'sample-ellipse', v: 'ellipse' },
                    ]
                },
                {
                    id: 35, name: "color-button-shop_order", type: "colorPicker",
                    label: "Цвет кнопки", defValue: "#63c0c0", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 36, name: "color-button-hover-shop_order", type: "colorPicker",
                    label: "Цвет кнопки при наведении", defValue: "#4c6ec0", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 37, name: "border-button-shop_order", type: "selectComposite",
                    label: "Обводка кнопки", defValue: 'цвет обводки кнопки',
                    selector: [], css: [],
                    options: [
                        {name: 'цвет обводки кнопки', picker: true, slider: false},
                        {name: 'толщина обводки кнопки', picker: false, slider: true},
                    ],
                    components: [
                        {
                            id: 38, name: "color-border-button-shop_order", type: "colorPicker",
                            label: "", defValue: "#b2e354", opacity: true,
                            selector: [], css: []
                        },
                        {
                            id: 39, name: "weight-border-button-shop_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 3,
                            selector: [], css: []
                        },
                    ],
                },
                {
                    id: 40, name: "border-button-hover-shop_order", type: "selectComposite",
                    label: "Обводка кнопки при наведении", defValue: 'толщина обводки кнопки',
                    selector: [], css: [],
                    options: [
                        {name: 'цвет обводки кнопки', picker: true, slider: false},
                        {name: 'толщина обводки кнопки', picker: false, slider: true},
                    ],
                    components: [
                        {
                            id: 41, name: "color-border-button-hover-shop_order", type: "colorPicker",
                            label: "", defValue: "#e37a79", opacity: true,
                            selector: [], css: []
                        },
                        {
                            id: 42, name: "weight-border-button-hover-shop_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 5,
                            selector: [], css: []
                        },
                    ],
                },
                {
                    id: 43, name: "font-text-button-shop_order", type: "fontSelect",
                    label: "Шрифт текста", defValue: "Rubik", search: 'search',
                    selector: [], css: []
                },
                {
                    id: 44, name: "size-text-button-field-shop_order", type: "slider",
                    label: "Размер текста поля", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 45, name: "format-text-button-shop_order", type: "fontSelect",
                    label: "Формат текста", defValue: "regular",
                    selector: [], css: [],
                    array: [
                        { name: 'regular' },
                        { name: 'bold' },
                        { name: 'italic' },
                    ]
                },
                {
                    id: 46, name: "letter-spacing-button-shop_order", type: "slider",
                    label: "Межбуквенный интервал", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 47, name: "color-text-button-shop_order", type: "colorPicker",
                    label: "Цвет текста", defValue: "#313b40", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 48, name: "color-text-hover-button-shop_order", type: "colorPicker",
                    label: "Цвет текста при наведении", defValue: "#000", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 49, name: "size-lateral-indents-in-button-shop_order", type: "slider",
                    label: "Размер боковых отступов внутри кнопки", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 50, name: "format-text-button-shop_order", type: "fontSelect",
                    label: "Выравнивание", defValue: "left",
                    selector: [], css: [],
                    array: [
                        { name: 'left' },
                        { name: 'center' },
                        { name: 'right' },
                    ]
                },
                {
                    id: 51, name: "stretch-button-full-form-shop_order", type: "switch",
                    label: "Растянуть кнопку на всю ширину формы", defValue: false,
                    selector: [], css: []
                },
            ],
        },
        {
            id: 120,
            page: 'shop_pre_order_page',
            // url: '/pre-order',
            elements: [
                {
                    id: 0, name: "size-heading-ordering-shop_pre_order", type: "slider",
                    label: "Размер заголовка \"Оформление заказа\"", defValue: 500, min: 300, max: 1000,
                    selector: [], css: []
                },
                {
                    id: 1, name: "color-heading-ordering-shop_pre_order", type: "colorPicker",
                    label: "Цвет заголовка \"Оформление заказа\"", defValue: "rgba(86, 73, 73, 1)", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 2, name: "size-text-upper-form-shop_pre_order", type: "slider",
                    label: "Размер текста над формой", defValue: 500, min: 300, max: 1000,
                    selector: [], css: []
                },
                {
                    id: 3, name: "color-text-upper-form-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста над формой", defValue: "rgba(86, 73, 73, 1)", opacity: true,
                    selector: [], css: []
                },
            ],
        },
        {
            id: 121,
            page: 'shop_pre_order_form',
            elements: [
                //Вид полей
                {
                    id: 19, name: "type-fields-shop_pre_order", type: "radio", sample: true,
                    label: "Вид полей", defValue: 'circle',
                    selector: [], css: [],
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
                    selector: [], css: []
                },
                {
                    id: 21, name: "border-fields-shop_pre_order", type: "selectComposite",
                    label: "Обводка полей", defValue: 'цвет полей',
                    selector: [], css: [],
                    options: [
                        {name: 'цвет полей', picker: true, slider: false},
                        {name: 'толщина линии', picker: false, slider: true},
                    ],
                    components: [
                        {
                            id: 22, name: "border-fields-color-shop_pre_order", type: "colorPicker",
                            label: "", defValue: "#ae93e3", opacity: true,
                            selector: [], css: []
                        },
                        {
                            id: 23, name: "border-fields-weight-shop_pre_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 3,
                            selector: [], css: []
                        },
                    ],
                },
                {
                    id: 24, name: "font-text-field-shop_pre_order", type: "fontSelect",
                    label: "Шрифт текста поля", defValue: "Rubik", search: 'search',
                    selector: [], css: []
                },
                {
                    id: 25, name: "size-text-field-shop_pre_order", type: "slider",
                    label: "Размер текста поля", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 26, name: "format-text-shop_pre_order", type: "fontSelect",
                    label: "Формат текста", defValue: "regular",
                    selector: [], css: [],
                    array: [
                        { name: 'regular' },
                        { name: 'bold' },
                        { name: 'italic' },
                    ]
                },
                {
                    id: 27, name: "letter-spacing-shop_pre_order", type: "slider",
                    label: "Межбуквенный интервал", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 28, name: "color-field-text-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста поля", defValue: "#313b40", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 29, name: "color-field-text-input-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста поля при вводе", defValue: "#000", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 30, name: "color-field-text-input-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста без поля", defValue: "#264027", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 31, name: "menu-scroll-events-shop_pre_order", type: "radio",
                    label: "Эффект при вводе данных", defValue: 'hidden-field-name',
                    selector: [], css: [],
                    array: [
                        { label: 'скрывать название поля', v: 'hidden-field-name' },
                        { label: 'уменьшать название поля', v: 'lower-field-name' },
                    ]
                },
                {
                    id: 32, name: "distance-between-fields-shop_pre_order", type: "slider",
                    label: "Расстояние между полями", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 33, name: "distance-from-form-to-button-shop_pre_order", type: "slider",
                    label: "Расстояние от формы до кнопки", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                //Вид кнопки
                {
                    id: 34, name: "view-button-shop_pre_order", type: "radio", sample: true,
                    label: "Вид кнопки", defValue: 'square',
                    selector: [], css: [],
                    array: [
                        { className: 'sample-square', v: 'square' },
                        { className: 'sample-circle', v: 'circle' },
                        { className: 'sample-ellipse', v: 'ellipse' },
                    ]
                },
                {
                    id: 35, name: "color-button-shop_pre_order", type: "colorPicker",
                    label: "Цвет кнопки", defValue: "#63c0c0", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 36, name: "color-button-hover-shop_pre_order", type: "colorPicker",
                    label: "Цвет кнопки при наведении", defValue: "#4c6ec0", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 37, name: "border-button-shop_pre_order", type: "selectComposite",
                    label: "Обводка кнопки", defValue: 'цвет обводки кнопки',
                    selector: [], css: [],
                    options: [
                        {name: 'цвет обводки кнопки', picker: true, slider: false},
                        {name: 'толщина обводки кнопки', picker: false, slider: true},
                    ],
                    components: [
                        {
                            id: 38, name: "color-border-button-shop_pre_order", type: "colorPicker",
                            label: "", defValue: "#b2e354", opacity: true, selector: [], css: []
                        },
                        {
                            id: 39, name: "weight-border-button-shop_pre_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 3,
                            selector: [], css: []
                        },
                    ],
                },
                {
                    id: 40, name: "border-button-hover-shop_pre_order", type: "selectComposite",
                    label: "Обводка кнопки при наведении", defValue: 'толщина обводки кнопки',
                    selector: [], css: [],
                    options: [
                        {name: 'цвет обводки кнопки', picker: true, slider: false},
                        {name: 'толщина обводки кнопки', picker: false, slider: true},
                    ],
                    components: [
                        {
                            id: 41, name: "color-border-button-hover-shop_pre_order", type: "colorPicker",
                            label: "", defValue: "#e37a79", opacity: true, selector: [], css: []
                        },
                        {
                            id: 42, name: "weight-border-button-hover-shop_pre_order", type: "slider",
                            label: "", defValue: 2, min: 1, max: 5,
                            selector: [], css: []
                        },
                    ],
                },
                {
                    id: 43, name: "font-text-button-shop_pre_order", type: "fontSelect",
                    label: "Шрифт текста", defValue: "Rubik", search: 'search',
                    selector: [], css: []
                },
                {
                    id: 44, name: "size-text-button-field-shop_pre_order", type: "slider",
                    label: "Размер текста поля", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 45, name: "format-text-button-shop_pre_order", type: "fontSelect",
                    label: "Формат текста", defValue: "regular",
                    selector: [], css: [],
                    array: [
                        { name: 'regular' },
                        { name: 'bold' },
                        { name: 'italic' },
                    ]
                },
                {
                    id: 46, name: "letter-spacing-button-shop_pre_order", type: "slider",
                    label: "Межбуквенный интервал", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 47, name: "color-text-button-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста", defValue: "#313b40", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 48, name: "color-text-hover-button-shop_pre_order", type: "colorPicker",
                    label: "Цвет текста при наведении", defValue: "#000", opacity: true,
                    selector: [], css: []
                },
                {
                    id: 49, name: "size-lateral-indents-in-button-shop_pre_order", type: "slider",
                    label: "Размер боковых отступов внутри кнопки", defValue: 2, min: 1, max: 5,
                    selector: [], css: []
                },
                {
                    id: 50, name: "format-text-button-shop_pre_order", type: "fontSelect",
                    label: "Выравнивание", defValue: "left", selector: [], css: [],
                    array: [
                        { name: 'left' },
                        { name: 'center' },
                        { name: 'right' },
                    ]
                },
                {
                    id: 51, name: "stretch-button-full-form-shop_pre_order", type: "switch",
                    label: "Растянуть кнопку на всю ширину формы", defValue: false,
                    selector: [], css: []
                },
            ],
        }
    ];
}
