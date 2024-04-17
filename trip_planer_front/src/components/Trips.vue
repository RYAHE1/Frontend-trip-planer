<template>
  <div class="trips">
    <!-- Titre de la page -->
    <h1>Planificateur de voyage</h1>
    <h2>généré par IA</h2>

    <!-- Affiche un message "Loading..." lorsque la donnée 'loading' est vraie -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- Sinon, affiche le formulaire et la liste des voyages -->
    <div v-else>
      <!-- Formulaire pour créer un nouveau voyage -->
      <form @submit.prevent="createTrip" class="create-trip-form">
        <!-- Utilisation de styles pour agrandir l'input -->
        <input type="text" id="prompt" v-model="prompt" required class="prompt-input" />

        <!-- Bouton de soumission du formulaire -->
        <button type="submit">Create Trip</button>
      </form>

      <!-- Liste non ordonnée des voyages -->
      <ul class="trip-list">
        <!-- Pour chaque voyage dans la donnée 'trips', affiche un élément de liste avec un lien vers la page de détail du voyage -->
        <li v-for="trip in trips" :key="trip.id" class="trip-item">
          <!-- Utilisation du composant router-link pour naviguer vers la page de détail du voyage -->
          <router-link :to="`/trips/${trip.id}`">{{ trip.prompt }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Trips',
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
          this.trips.push(data);
          this.prompt = "";

          // Naviguer vers la page TripDetails.vue avec l'ID du nouveau voyage
          this.$router.push(`/trips/${data.id}`);
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

<style scoped>
/* Style pour les téléphones et les tablettes */
@media (max-width: 768px) {
  .create-trip-form {
    margin-bottom: 20px;
  }

  .trip-list li {
    margin-bottom: 10px;
  }

  /* Styles pour agrandir l'input, arrondir les bords et changer la couleur des bordures */
  .prompt-input {
    width: 100%;
    height: 50px;
    /* Ajustez la hauteur selon vos préférences */
    font-size: 16px;
    /* Ajustez la taille de la police selon vos préférences */
    padding: 10px;
    /* Ajustez le remplissage selon vos préférences */
    border: 1px solid #6D695E;
    /* Changer la couleur des bordures */
    border-radius: 8px;
    /* Arrondir les bords */
    box-sizing: border-box;
    /* Garantit que la taille totale de l'élément inclut le remplissage et la bordure */
    color: white;
    /* Couleur du texte */
  }

  /* Style pour tous les éléments li de la liste */
  .trip-item {
    border: 1px solid #6D695E;
    /* Ajouter un contour */
    border-radius: 8px;
    /* Arrondir les bords */
    padding: 10px;
    /* Ajouter un espace autour du contenu */
    margin-bottom: 10px;
    /* Ajouter un espacement entre les éléments */
    background-color: #262522;
    /* Changer la couleur de fond */
    box-sizing: border-box;
    /* Garantit que la taille totale de l'élément inclut le remplissage et la bordure */
    color: white;
    /* Couleur du texte */
  }

  /* Style pour le titre h1 */
  h1 {
    color: white;
    /* Couleur du texte */
  }
}
</style>
