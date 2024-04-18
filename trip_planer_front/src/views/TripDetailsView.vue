<template>
    <div>
        <h1>Détails du voyage</h1>
        <TripDetails />
    </div>
</template>

<script>
import TripDetails from '../components/TripDetails.vue';

export default {
    name: 'TripDetailsView',
    components: {
        TripDetails,
    },
};
</script>
