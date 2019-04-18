import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import Dashboard from './components/Dashboard.vue';
import PostsMain from './components/posts/Main.vue';
import ListPosts from './components/posts/List.vue';
import ManagePosts from './components/posts/Manage.vue';
import ListTags from './components/tags/List.vue';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VeeValidate);

const routes = [
  { path: '/', component: Dashboard, name: "dashboard" },
  {
    path: '/posts', component: PostsMain, children: [
      { path: '', name: 'posts.index', component: ListPosts },
      { path: 'tags/:tag', name: 'posts.tags', component: ListPosts },
      { path: 'create', name: 'posts.create', component: ManagePosts },
      { path: ':id/edit', name: 'posts.edit', component: ManagePosts },
    ],
  },
  { path: '/tags', component: ListTags, name: "tags" },
];

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')