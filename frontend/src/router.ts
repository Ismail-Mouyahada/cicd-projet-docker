import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './shared/guards';
import { useUser } from './shared/stores';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/AppHome.vue')
    },
    {
      path: '/connexion',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/AppLogin.vue')
    },
    {
      path: '/inscription',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/AppSignup.vue')
    },
    {
      path: '/profil',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/AppProfile.vue')
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('@/views/AppNotFound.vue')
    }
  ]
});

router.beforeEach(async () => {
  const userStore = useUser();
  if (!userStore.loaded) {
    await userStore.fetchCurrentUser();
  }
});
