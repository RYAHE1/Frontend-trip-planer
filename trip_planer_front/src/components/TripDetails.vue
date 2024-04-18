<template>
    <div>
        <!-- Div pour la carte Leaflet -->
        <div id="map"></div>
        <!-- Affiche les détails du voyage si la donnée "trip" existe -->
        <div v-if="trip">
            <!-- Affiche le contenu du voyage -->
            <h2> {{ trip.prompt }} </h2>
            <button @click="goToHomePage">Modifier le prompt</button>
            <ul>
                <li v-for="(step, index) in trip.output" :key="index">
                    <h3>{{ step.name }}</h3>
                    <p>{{ step.description }}</p>
                </li>
            </ul>
        </div>

        <!-- Affiche un message "Loading..." si la donnée "trip" n'existe pas encore -->
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    // Données du composant
    data() {
        return {
            // Donnée pour stocker le voyage
            trip: null,

            // Donnée pour stocker le nouveau "prompt" du voyage
            newPrompt: "",

            // Référence à la carte Leaflet
            map: null
        };
    },

    // Méthode appelée lorsque le composant est créé
    async created() {
        try {
            // Récupère le voyage depuis l'API en utilisant l'ID du voyage dans l'URL
            const response = await fetch(
                `http://localhost:3001/trips/${this.$route.params.id}`
            );

            // Vérifie si la réponse est OK, sinon lève une erreur
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Convertit la réponse en JSON et stocke les données dans la donnée "trip"
            const data = await response.json();
            this.trip = data;

            console.log("Trip data:", this.trip);

            // Initialise la carte Leaflet
            this.$nextTick(this.initMap); // Utilisation de $nextTick pour s'assurer que l'élément DOM est rendu
        } catch (error) {
            // Affiche l'erreur dans la console
            console.error("Fetch error:", error);
        }
    },

    // Méthodes du composant
    methods: {
        // Méthode pour mettre à jour le "prompt" du voyage
        async updateTrip() {
            try {
                // Envoie une requête PATCH à l'API pour mettre à jour le "prompt" du voyage avec le nouveau "prompt" saisi dans le formulaire
                const response = await fetch(`http://localhost:3001/trips/${this.$route.params.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: this.newPrompt })
                });

                // Vérifie si la réponse est OK, sinon lève une erreur
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Met à jour le "prompt" du voyage dans la donnée "trip"
                this.trip.prompt = this.newPrompt;

                // Réinitialise le champ de saisie du nouveau "prompt"
                this.newPrompt = "";
                this.$router.push({ name: 'Trips', query: { prompt: this.trip.prompt } });
            } catch (error) {
                // Affiche l'erreur dans la console
                console.error("Fetch error:", error);
            }
        },

        goToHomePage() {
            this.$router.push({ name: "Trips", query: { search: this.trip.prompt } });
        },

        // Méthode pour initialiser la carte Leaflet
        initMap() {
            // Crée une instance de carte Leaflet dans un élément avec l'ID 'map'
            this.map = L.map('map').setView([51.505, -0.09], 13);

            // Ajoute une couche de tuiles OpenStreetMap à la carte
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            // Crée un tableau pour stocker tous les marqueurs
            const markers = [];

            // Parcourt chaque étape du voyage et ajoute un marqueur à la carte
            for (const step of this.trip.output) {
                const marker = L.marker([step.location.latitude, step.location.longitude]).addTo(this.map);
                marker.bindPopup(`<strong>${step.name}</strong><br>${step.description}`);
                markers.push(marker);
            }

            // Ajuste la vue de la carte pour afficher tous les marqueurs
            const bounds = L.latLngBounds(markers.map(marker => marker.getLatLng()));
            this.map.fitBounds(bounds);
        }
    }
};
</script>

<style scoped>
#map {
    height: 400px;
}
</style>