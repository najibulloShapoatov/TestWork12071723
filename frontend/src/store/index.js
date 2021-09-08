import Vuex from 'vuex'
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';
function getConfig() { 
    let token =  window.localStorage.getItem('jwt');
    return { headers: { 'Authorization': 'Bearer ' +token} } }

const empty = {
    id: 0,
    title: "",
    content: ""
};
const welcome = "You are not logged in!";

export default new Vuex.Store({
    state: {
        authenticated: window.localStorage.getItem('is_auth') ? window.localStorage.getItem('is_auth') : false,
        loading: false,
        user: null,
        welcome: welcome,
        posts: [],
        post: empty,
    },
    getters: {
        getWelcome: (state) => state.welcome,
        getUser: (state) => state.user,
        getPosts: state => { return state.posts },
        getAuth: (state) => state.authenticated,
        getPost: (state) => state.post,

    },
    mutations: {
        SET_AUTH: (state, auth) => { state.authenticated = auth; },
        SET_USR: (state, usr) => state.user = usr,
        SET_MSG: (state, msg) => state.welcome = msg,
        SET_POST: (state, posts) => state.posts = posts,
        RM_POST: (state, id) => {
            state.posts = state.posts.filter(x => x.id != id);
        },
        SET_SPOST: (state, post) => state.post = post,
    },
    actions: {
        setAuth: (context, auth) => context.commit('SET_AUTH', auth),
        setUser(context) {
            axios.get(`${BASE_URL}user`, getConfig()).then(response => {

                context.commit('SET_USR', response.data.user);
                context.commit('SET_MSG', `Hi ${response.data.user.name} !`);
                context.commit('SET_AUTH', true);
                console.log(response.data);
            }).catch((error)=>{console.log(error);});
        },
        login(context, data) {
            axios.post(`${BASE_URL}login`, data, getConfig()).then(res => {
                if (res.data?.message) {
                    window.localStorage.setItem('jwt', res.data.message);
                    window.localStorage.setItem('is_auth', true);
                    context.commit('SET_AUTH', true);
                    window.location.reload();
                }

            }).catch((error)=>{console.log(error);});
        },
        logout: (context) => {
            
            axios.post(`${BASE_URL}logout`, null, getConfig()).then(res => {
                console.log(res);
                window.localStorage.clear();
                context.commit('SET_AUTH', false);
                context.commit('SET_MSG', welcome);
                window.location.reload();
            });

        },
        setPost: (context, data) => {
            if (data.id == 0) {
                axios.post(`${BASE_URL}post`, data, getConfig()).then(res => {
                    console.log(res);
                });
            } else {
                axios.post(`${BASE_URL}post/update/${data.id}`, data, getConfig()).then(res => {
                    console.log(res);
                });
            }
            context.commit('SET_SPOST', empty);

        },
        setPostsFromDb(context) {
            axios.get(`${BASE_URL}post`, getConfig()).then(res => {
                context.commit('SET_POST', res.data.posts);
            });
        },
        deletePost: (context, id) => {
            axios.delete(`${BASE_URL}post/${id}`, getConfig()).then(res => {
                if (res.status) {
                    context.commit('RM_POST', id);
                }
            });
        },
        editPost: async (context, id) => {
            // axios.get(`${BASE_URL}post/${id}`, getConfig()).then(res => {
            context.state.posts.map(x => {
                if (x.id == id) {
                    context.commit('SET_SPOST', x);
                }
            })

            //});

        }



    },
    modules: {}
})
