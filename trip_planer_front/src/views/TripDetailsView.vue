<template>
    <div class="Home page-background">
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

<style scoped></style>
