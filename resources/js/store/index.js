import { createStore, createLogger } from "vuex";

const plugins = []

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger())
}

export default createStore({
    state: {
        user: null
    },
    getters: {

    },
    actions: {

    },
    mutations: {

    }
});
