import store from '@/store';

export const getSettings = (http, alert) => {
    debugger
    http({
        method: 'get',
        url: '',
    })
        .then(({ data }) => {
            store.commit('loadSettings', data);
        }, (reason) => {
            alert && alert.danger({ message: reason });
        });
};
