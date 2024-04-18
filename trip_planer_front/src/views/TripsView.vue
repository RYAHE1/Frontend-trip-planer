<template>
    <div>
        <h1>Liste des voyages</h1>
        <Trips />
    </div>
</template>

<script>
import Trips from '../components/Trips.vue';

export default {
    name: 'TripsView',
    components: {
        Trips,
    },
};
</script>
