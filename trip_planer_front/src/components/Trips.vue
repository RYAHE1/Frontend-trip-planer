<template>
  <div>
    <h1>Trips</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <form @submit.prevent="createTrip">
        <label for="prompt">Prompt:</label>
        <input type="text" id="prompt" v-model="prompt" required />
        <button type="submit">Create Trip</button>
      </form>
      <ul>
        <li v-for="trip in trips" :key="trip.id">
          <router-link :to="`/trips/${trip.id}`">{{ trip.prompt }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trips: [],
      prompt: "",
      loading: false,
    };
  },
  async created() {
    try {
      const response = await fetch("http://localhost:3001/trips");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.trips = data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  },
  methods: {
    async createTrip() {
      try {
        const response = await fetch("http://localhost:3001/trips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: this.prompt }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.trips.push(data);
        this.prompt = "";
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
  },
};
</script>
