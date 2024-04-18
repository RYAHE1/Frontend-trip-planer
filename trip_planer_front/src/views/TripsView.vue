<template>
    <div class="page-container">
        <div class="Home">
            <Trips />
        </div>
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

<style scoped></style>
