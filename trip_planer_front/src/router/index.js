import { createRouter, createWebHistory } from "vue-router";
import Trips from "../components/Trips.vue";
import TripDetails from "../components/TripDetails.vue";

const routes = [
  {
    path: "/",
    name: "Trips",
    component: Trips,
  },
  {
    path: "/trips/:id",
    name: "TripDetails",
    component: TripDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
