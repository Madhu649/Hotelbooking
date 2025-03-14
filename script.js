document.addEventListener("DOMContentLoaded", function() {
    // Login Functionality
    document.getElementById("userLoginBtn")?.addEventListener("click", function() {
        window.location.href = "user.html";
    });
    document.getElementById("adminLoginBtn")?.addEventListener("click", function() {
        window.location.href = "admin.html";
    });
    // Hotel Search - Google Style
    const hotels = [
        { name: "Luxury Grand Hotel", location: "New York", price: "$200 per night" },
        { name: "Sunset Resort", location: "California", price: "$150 per night" },
        { name: "City View Inn", location: "Texas", price: "$120 per night" }
    ];
    let selectedHotel = null;
    const hotelList = document.getElementById("hotelList");
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", function() {
            hotelList.innerHTML = "";
            hotels.forEach((hotel, index) => {
                const hotelDiv = document.createElement("div");
                hotelDiv.classList.add("hotel-item");
                hotelDiv.innerHTML = `
 <h3>${hotel.name}</h3>
 <p>Location: ${hotel.location}</p>
 <p>Price: ${hotel.price}</p>
 <button class="bookNow" data-hotel-id="${index}">Book Now</button>
                `;
                hotelList.appendChild(hotelDiv);
            });
            document.querySelectorAll(".bookNow").forEach(button => {
                button.addEventListener("click", function() {
                    selectedHotel = hotels[this.dataset.hotelId].name;
                    document.getElementById("bookingForm").style.display = "block";
                });
            });
        });
    }
    // Booking Data Storage
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    // Booking Confirmation
    const confirmBooking = document.getElementById("confirmBooking");
    if (confirmBooking) {
        confirmBooking.addEventListener("click", function() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const date = document.getElementById("date").value;
            const days = document.getElementById("days").value;
            if (!name || !email || !phone || !date || !days || !selectedHotel) {
                alert("Please fill in all details!");
                return;
            }
            const newBooking = {
                user: name,
                hotel: selectedHotel,
                date,
                days,
                status: "Confirmed"
            };
            bookings.push(newBooking);
            localStorage.setItem("bookings", JSON.stringify(bookings));
            document.getElementById("bookingForm").style.display = "none";
            document.getElementById("bookingMessage").style.display = "block";
        });
    }
    // Load Bookings in Admin Dashboard
    const bookingTable = document.getElementById("bookingTable");
    if (bookingTable) {
        function loadBookings() {
            bookingTable.innerHTML = "";
            bookings.forEach((booking, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
 <td>${booking.user}</td>
 <td>${booking.hotel}</td>
 <td>${booking.date}</td>
 <td>${booking.days}</td>
 <td>${booking.status}</td>
 <td><button class="cancelBooking" data-index="${index}">Cancel</button></td>
                `;
                bookingTable.appendChild(row);
            });
            document.querySelectorAll(".cancelBooking").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.dataset.index;
                    bookings[index].status = "Cancelled";
                    localStorage.setItem("bookings", JSON.stringify(bookings));
                    document.getElementById("cancelMessage").style.display = "block";
                    loadBookings();
                });
            });
        }
        // Function to handle booking cancellation
function cancelBooking(bookingId) {
    // Ask for confirmation before canceling
    let confirmCancel = confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;
    // Get elements
    let statusElement = document.getElementById("status" + bookingId);
    let bookingRow = document.getElementById("booking" + bookingId);
    let cancelMessage = document.getElementById("cancelMessage");
    if (statusElement && bookingRow) {
        // Update status to "Cancelled"
        statusElement.innerText = "Cancelled";
        statusElement.style.color = "red";
        // Hide the booking row after 2 seconds
        setTimeout(() => {
            bookingRow.style.display = "none";
        }, 2000);
        // Show cancellation message
        cancelMessage.innerText = "Booking has been cancelled.";
        cancelMessage.classList.remove("hidden");
    }
 }
        loadBookings();
    }
    
 });