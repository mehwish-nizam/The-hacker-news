import { createApp } from 'vue';
import store from './store/index.js';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';


import PostHeader from "./layout/RowAfterHeader.vue";
import NewPage from './pages/NewPage.vue';
import TopPage from './pages/TopPage.vue';
import JobsPage from './pages/JobsPage.vue';
import ShowPage from './pages/ShowPage.vue';
import AskPage from "./pages/AskPage.vue";
import TheArticle from "./components/TheArticle.vue";
import TheUser from "./pages/Theuser.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/top/1"
    },
    {
      path: "/top/1",
      component: TopPage
    },
    {
      path: "/top/:pno",
      component: TopPage
    },
    {
      path: "/user/:user",
      component: TheUser
    },
    {
      path: '/story/:id',
      component: TheArticle
    },
    {
      path: "/new",
      component: NewPage
    },
    {
      path: "/new/:pageno",
      component: NewPage
    },
    {
      path: "/ask",
      component: AskPage
    },
    {
      path: "/ask/:pno",
      component: TopPage
    },
    {
      path: "/show",
      component: ShowPage
    },
    {
      path: "/show/:pno",
      component: TopPage
    },
    {
      path: "/jobs",
      component: JobsPage
    },
    {
      path: "/jobs/:pno",
      component: TopPage
    }
  ]
});
const app = createApp(App);
app.component("post-header", PostHeader);
app.use(store);
app.use(router);
app.mount('#app');
