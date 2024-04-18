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
        <button type="submit">C'est parti</button>

        <!-- Bouton pour voir un exemple -->
        <button type="button" @click="fillWithExample">Voir un exemple</button>
      </form>

      <!-- Liste non ordonnée des voyages -->
      <h4>Derniers itinéraires</h4>
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

    // Méthode pour remplir l'input avec un exemple
    fillWithExample() {
      this.prompt = "Roadtrip d'une semaine en France à partir de Lyon";
    }
  },
};
</script>

<style scoped>
/* Styles spécifiques aux téléphones et tablettes */
@media only screen and (max-width: 768px) {
  .trips {
    padding: 10px;
    background-color: #2F2E2B;
    /* Couleur d'arrière-plan */
  }

  .create-trip-form {
    margin-bottom: 20px;
    text-align: center;
    /* Centrer le contenu du formulaire */
    background-color: #2F2E2B;
    /* Couleur d'arrière-plan */
    padding: 20px;
    /* Ajouter un peu d'espace intérieur */
    border-radius: 10px;
    /* Bordures arrondies */
  }

  .prompt-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    /* Bordures arrondies */
    border-color: #6D695E;
    /* Couleur de la bordure */
    border-width: 1px;
    /* Épaisseur de la bordure */
    background-color: #242321;
    /* Couleur de fond de l'input */
    color: #FFFFFF;
    /* Couleur du texte de l'input */
  }
}

/* Styles généraux */
.loading {
  font-size: 20px;
  text-align: center;
  /* Centrer le texte */
  margin-top: 20px;
}

.trip-list {
  list-style-type: none;
  padding: 0;
}

.trip-item {
  margin-bottom: 10px;
  background-color: #242321;
  /* Couleur de fond pour chaque élément de la liste */
  padding: 10px;
  /* Ajouter un peu d'espace intérieur */
}

.trip-item a {
  text-decoration: none;
  color: #FFFFFF;
  /* Couleur du texte */
  display: block;
  /* Assurez-vous que les liens occupent toute la largeur disponible */
  text-align: center;
  /* Centrer le texte dans les liens */
}

/* Centrer les titres */
h1,
h2 {
  text-align: center;
}

/* Centrer le bouton et définir la couleur et les bordures arrondies */
.create-trip-form button {
  display: block;
  margin: 0 auto;
  /* Centrer horizontalement */
  background-color: #6D695E;
  /* Couleur de fond du bouton */
  color: #FFFFFF;
  /* Couleur du texte du bouton */
  border-radius: 10px;
  /* Bordures arrondies */
  box-shadow: none;
  /* Enlever l'ombre */
  padding: 15px 30px;
  /* Augmenter la taille du bouton */
}
</style>
