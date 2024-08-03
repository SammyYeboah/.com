document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const data = new FormData(form);

        fetch("https://formspree.io/f/xblrozkg", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                status.innerHTML = "Thanks for your submission!";
                form.reset();
            } else {
                response.json().then(data => {
                    if (data.errors) {
                        status.innerHTML = data.errors.map(error => error.message).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem with your submission.";
                    }
                });
            }
        })
        .catch(error => {
            status.innerHTML = "Oops! There was a problem with your submission.";
        });
    });
});
