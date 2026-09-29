// ===============================
// VRINDAVAN DHAM - JAVASCRIPT
// ===============================

// Page load message
console.log("🪷 Radhe Radhe - Vrindavan Dham");

// Contact form
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("🙏 राधे राधे! आपका संदेश प्राप्त हो गया।");

        form.reset();
    });
}


// ===============================
// Smooth scrolling
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// ===============================
// Welcome message
// ===============================

window.addEventListener("load", function () {

    console.log("🌸 श्री राधा कृष्ण 🌸");
    console.log("🙏 राधे राधे 🙏");

});