<template>
    <div v-if="trip">
        <h1>{{ trip.prompt }}</h1>
        <p>{{ trip.output }}</p>
        <form @submit.prevent="updateTrip">
            <label for="prompt">New Prompt:</label>
            <input type="text" id="prompt" v-model="newPrompt" />
            <button type="submit">Update Trip</button>
        </form>
    </div>
    <div v-else>Loading...</div>
</template>

<script>
export default {
    data() {
        return {
            trip: null,
            newPrompt: "",
        };
    },
    async created() {
        try {
            const response = await fetch(
                `http://localhost:3001/trips/${this.$route.params.id}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.trip = data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    methods: {
        async updateTrip() {
            try {
                const response = await fetch(`http://localhost:3001/trips/${this.$route.params.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: this.newPrompt }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                this.trip.prompt = this.newPrompt;
                this.newPrompt = "";
            } catch (error) {
                console.error("Fetch error:", error);
            }
        },
    },
};
</script>