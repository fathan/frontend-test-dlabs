import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import mitt from 'mitt';

import App from './App.vue';
import router from './router';
import '@styles/tailwindcss.css';

import AtomButton from '@components/Atoms/AtomButton';
import AtomIcon from '@components/Atoms/AtomIcon';
import AtomLoaderSpiner from '@components/Atoms/AtomLoaderSpiner';

import MoleculeBreadcrumbs from '@components/Molecules/MoleculeBreadcrumbs';
import MoleculeTitlePageActionTop from '@components/Molecules/MoleculeTitlePageActionTop';

/** 
 * Initialize Create app
 * */
const app = createApp(App);

/** 
 * Event Bus Emitter 
 * */
const emitter = mitt();
app.provide('$emitter', emitter);

/** 
 * Pinia State Management 
 * */
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

/** 
 * Vue Router
 * */
app.use(router);

/**
 * Global Components
 */
app.component('AtomButton', AtomButton);
app.component('AtomIcon', AtomIcon);
app.component('AtomLoaderSpiner', AtomLoaderSpiner);
app.component('MoleculeBreadcrumbs', MoleculeBreadcrumbs);
app.component('MoleculeTitlePageActionTop', MoleculeTitlePageActionTop);

/** 
 * Mount App
 * */
app.mount('#app');
