import { createRouter, createWebHistory } from 'vue-router';
import TripsView from '../views/TripsView.vue';
import TripDetailsView from '../views/TripDetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Trips',
      component: TripsView,
    },
    {
      path: '/trips/:id',
      name: 'tripdetail',
      component: TripDetailsView,
      props: true,
    },
  ],
});

export default router;
