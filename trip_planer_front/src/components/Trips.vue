<template>
  <div>
    <!-- Titre de la page -->
    <h1>Trips</h1>

    <!-- Affiche un message "Loading..." lorsque la donnée 'loading' est vraie -->
    <div v-if="loading">Loading...</div>

    <!-- Sinon, affiche le formulaire et la liste des voyages -->
    <div v-else>
      <!-- Formulaire pour créer un nouveau voyage -->
      <form @submit.prevent="createTrip">
        <!-- Champ de saisie pour le 'prompt' du voyage -->
        <label for="prompt">Prompt:</label>
        <input type="text" id="prompt" v-model="prompt" required />

        <!-- Bouton de soumission du formulaire -->
        <button type="submit">Create Trip</button>
      </form>

      <!-- Liste non ordonnée des voyages -->
      <ul>
        <!-- Pour chaque voyage dans la donnée 'trips', affiche un élément de liste avec un lien vers la page de détail du voyage -->
        <li v-for="trip in trips" :key="trip.id">
          <router-link :to="`/trips/${trip.id}`">{{ trip.prompt }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  // Données du composant
  data() {
    return {
      trips: [],
      prompt: "",
      loading: false
    };
  },

  // Méthode appelée lorsque le composant est créé
  async created() {
    try {
      this.loading = true;
      const response = await fetch("http://localhost:3001/trips");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.trips = data;
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      this.loading = false;
    }
  },

  // Méthodes du composant
  methods: {
    // Méthode pour créer un nouveau voyage
    async createTrip() {
      try {
        const response = await fetch("http://localhost:3001/trips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: this.prompt })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.id) {
          // Vérifier si this.trips est défini
          if (!this.trips) {
            this.trips = [];
          }
          this.trips.push(data);
          this.prompt = "";

          const router = useRouter();
          router.push(`/trips/${data.id}`);
        } else {
          throw new Error('ID not found in API response');
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
  },
};
</script>
