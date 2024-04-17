<template>
    <div>
        <!-- Affiche les détails du voyage si la donnée "trip" existe -->
        <div v-if="trip">
            <!-- Affiche le titre du voyage -->
            <h1>{{ trip.prompt }}</h1>

            <!-- Affiche le contenu du voyage -->
            <p>{{ trip.output }}</p>

            <!-- Formulaire pour mettre à jour le "prompt" du voyage -->
            <form @submit.prevent="updateTrip">
                <!-- Champ de saisie pour le nouveau "prompt" -->
                <label for="prompt">New Prompt:</label>
                <input type="text" id="prompt" v-model="newPrompt" />

                <!-- Bouton de soumission du formulaire -->
                <button type="submit">Update Trip</button>
            </form>
        </div>

        <!-- Affiche un message "Loading..." si la donnée "trip" n'existe pas encore -->
        <div v-else>Loading...</div>
    </div>
</template>

<script>
export default {
    // Données du composant
    data() {
        return {
            // Donnée pour stocker le voyage
            trip: null,

            // Donnée pour stocker le nouveau "prompt" du voyage
            newPrompt: ""
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
            } catch (error) {
                // Affiche l'erreur dans la console
                console.error("Fetch error:", error);
            }
        }
    }
};
</script>