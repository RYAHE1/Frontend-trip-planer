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
export default {
  // Données du composant
  data() {
    return {
      // Tableau vide initialement pour stocker les voyages
      trips: [],

      // Chaîne vide initialement pour stocker le 'prompt' du nouveau voyage
      prompt: "",

      // Booléen initialement faux pour indiquer si les données sont en cours de chargement
      loading: false
    };
  },

  // Méthode appelée lorsque le composant est créé
  async created() {
    try {
      // Définit la donnée 'loading' à vrai
      this.loading = true;

      // Récupère tous les voyages à partir de l'API
      const response = await fetch("http://localhost:3001/trips");

      // Vérifie si la réponse est OK, sinon lève une erreur
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Convertit la réponse en JSON et stocke les données dans la donnée 'trips'
      const data = await response.json();
      this.trips = data;
    } catch (error) {
      // Affiche l'erreur dans la console
      console.error("Fetch error:", error);
    } finally {
      // Définit la donnée 'loading' à faux
      this.loading = false;
    }
  },

  // Méthodes du composant
  methods: {
    // Méthode pour créer un nouveau voyage
    async createTrip() {
      try {
        // Envoie une requête POST à l'API pour créer un nouveau voyage avec le 'prompt' du formulaire
        const response = await fetch("http://localhost:3001/trips", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: this.prompt })
        });

        // Vérifie si la réponse est OK, sinon lève une erreur
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convertit la réponse en JSON et ajoute le nouveau voyage à la liste des voyages


        const data = await response.json();
        this.trips.push(data);

        // Vide le champ de saisie 'prompt'
        this.prompt = "";

      } catch (error) {
        // Affiche l'erreur dans la console
        console.error("Fetch error:", error);
      }
    },
  },
};

</script>
