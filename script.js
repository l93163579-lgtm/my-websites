// ==========================================
// ROYAL STAY - JAVASCRIPT
// ==========================================


// Get booking form
const bookingForm = document.querySelector(".booking form");


// ==========================================
// BOOKING FORM
// ==========================================

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const checkin = document.querySelector("#checkin").value;
    const checkout = document.querySelector("#checkout").value;
    const room = document.querySelector("#room").value;


    // Check empty fields
    if (
        name === "" ||
        email === "" ||
        checkin === "" ||
        checkout === "" ||
        room === ""
    ) {
        alert("Please fill all the booking details.");
        return;
    }


    // Check dates
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);


    if (checkOutDate <= checkInDate) {
        alert("Check-out date must be after check-in date.");
        return;
    }


    // Success message
    alert(
        `Thank you, ${name}!\n\n` +
        `Your booking request for a ${room.replace("-", " ")} has been received.\n\n` +
        `We will contact you soon at ${email}.`
    );


    // Reset form
    bookingForm.reset();

});


// ==========================================
// SET MINIMUM CHECK-IN DATE
// ==========================================

const checkinInput = document.querySelector("#checkin");
const checkoutInput = document.querySelector("#checkout");


// Get today's date
const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const todayDate = `${year}-${month}-${day}`;


// Prevent past dates
checkinInput.min = todayDate;
checkoutInput.min = todayDate;


// ==========================================
// CHECK-OUT DATE UPDATE
// ==========================================

checkinInput.addEventListener("change", function () {

    checkoutInput.min = this.value;

});


// ==========================================
// SCROLL REVEAL
// ==========================================

const sections = document.querySelectorAll("section");


const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.12
    }
);


sections.forEach(function (section) {

    section.style.opacity = "0";
    section.style.transform = "translateY(25px)";
    section.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(section);

});


// ==========================================
// WELCOME MESSAGE
// ==========================================

console.log("Royal Stay website loaded successfully!");