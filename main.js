

//references to interactive elements

let diving = document.getElementById("adventures");
let dynamicsection1 = document.getElementById("dynamicsection1");//adventure form appears when user select adventure for booking
let roomBookings = document.getElementById("roomBookings");
let dynamicsection2 = document.getElementById("dynamicsection2");//room booking form appears when user select room booking for booking
let bookingForm = document.getElementById("bookingForm");// Get adventure form reference
let bookingForm1 = document.getElementById('bookingForm1');// Get room booking form reference
let formInputs = document.querySelectorAll('#bookingForm1 input');
let bookingTable = document.getElementById("bookingTable").getElementsByTagName("tbody")[0];// adventure current booking updating table
let bookingTable2 = document.getElementById('bookingTable2').getElementsByTagName('tbody')[0];// hotel rooms current booking updating table
let bookingTable3 = document.getElementById("bookingTable3").getElementsByTagName("tbody")[0];// overall booking updating table
let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let singleRoomNightlyRate = 25000;
let doubleRoomNightlyRate = 35000;
let tripleRoomNightlyRate = 40000;
let extraBedRate = 8000;
let kidsAbove5Rate = 5000;
let addToFavoritesButton = document.getElementById("addtofavourites");// Get the "Add to Favorites" button reference
let checkLoyaltyButton = document.getElementById("loyaltyPoints");  // Get the "Check Loyalty" button reference
let bookNowButton = document.getElementById("bookNowBtn");// Get the "Book Now" button reference



//event listeners

//Javascript for the navbar scrolling
document.addEventListener('scroll',()=>{
  let header = document.querySelector('header');

  if (window.scrollY > 0){
     header.classList.add('scrolled');
  }else{
     header.classList.remove('scrolled');
  }
  
})


window.addEventListener('load', function() {
  // Reset booking tables
  bookingTable.innerHTML = "";
  bookingTable2.innerHTML = "";
  bookingTable3.innerHTML = "";

  // Reset forms
  bookingForm.reset();
  bookingForm1.reset();

});

//Here,as the user select the booking type , the relevent booking form appears in the page
adventures.addEventListener("change", function checkadventure() {
  if (adventures.checked) {
     dynamicsection1.style.display = "block";
  } else {
     dynamicsection1.style.display = "none";
     }
});

roomBookings.addEventListener("change", function checkadventure() {
 if (roomBookings.checked) {
    dynamicsection2.style.display = "block";
 } else {
    dynamicsection2.style.display = "none";
 }
});

//Adventure booking section
// Prevent adventureform submission
bookingForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
 });
bookingForm.addEventListener("input", function(evt) {
// Get form input values

 let date = document.getElementById("date").value;
 let localAdults = parseInt(document.getElementById("localAdults").value) || 0;
 let foreignAdults = parseInt(document.getElementById("foreignAdults").value) || 0;
 let localChildren = parseInt(document.getElementById("localChildren").value) || 0;
 let foreignChildren = parseInt(document.getElementById("foreignChildren").value) || 0;
 let durationInputs = document.querySelectorAll('input[name="duration"]:checked');
 let guideInputs = document.querySelectorAll('input[name="guide"]:checked');

 let duration = "";
 durationInputs.forEach(function(input) {
   duration += input.value + ", ";
 });
 duration = duration.slice(0, -2); // Remove trailing comma and space

 let guide = "";
 guideInputs.forEach(function(input) {
   guide += input.value + ", ";
 });
 guide = guide.slice(0, -2); // Remove trailing comma and space

 document.getElementById("thankYouMessage").style.display = "none";


 UpdateAdventureBookingDetails(date, localAdults, foreignAdults, localChildren, foreignChildren, duration, guide);
});


//Book adventure button event listener
document.getElementById("bookAdventurebtn").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the booking details from the form
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let localAdults = parseInt(document.getElementById("localAdults").value) || 0;
  let foreignAdults = parseInt(document.getElementById("foreignAdults").value) || 0;
  let localChildren = parseInt(document.getElementById("localChildren").value) || 0;
  let foreignChildren = parseInt(document.getElementById("foreignChildren").value) || 0;
  let durationInputs = document.querySelectorAll('input[name="duration"]:checked');
  let duration = "";
  durationInputs.forEach(function(input) {
    duration += input.value + ", ";
  });
  duration = duration.slice(0, -2);
//if confirm message for room bookings is being displayed, hide it
  document.getElementById("roomsBookingonfirmMsg").style.display = "none";

  
if (name && date && duration && (localAdults || foreignAdults || localChildren || foreignChildren)) {
  // Display the thank-you message and booking details
  let thankYouMessage = document.getElementById("thankYouMessage");
  thankYouMessage.innerHTML = `
    <p>Thank you ${name} for booking our Diving adventure!</p>
    <p>We are thrilled to inform you that your booking for ${duration} diving session(s) </p>
    <p>on ${date} has been successfully confirmed.</p>
    <p>Your booking details:<p>
    <p>Number of Local Adults: ${localAdults}</p>
    <p>Number of Foreign Adults: ${foreignAdults}</p>
    <p>Number of Local Children: ${localChildren}</p>
    <p>Number of Foreign Children: ${foreignChildren}</p> `;

  thankYouMessage.style.display = "block";
} else {
  alert("Please fill the required fields.");
}
  document.getElementById("adventures").checked = false;
  document.getElementById("bookingForm").reset();
  document.getElementById("bookingForm1").reset();

  // Reset the booking table
  bookingTable.innerHTML = "";
  bookingTable2.innerHTML = "";
  bookingTable3.innerHTML = "";

  
});


/*Hotel booking Javascript section */
//updating the overallbookingtable
formInputs.forEach(function(input) {
  input.addEventListener('input', updateTable);

});


addToFavoritesButton.addEventListener("click", addToFavorites);

checkLoyaltyButton.addEventListener("click", checkLoyaltyPoints);


// Prevent roombookingform submission
bookingForm1.addEventListener("submit", function(evt) {
  evt.preventDefault();
});

//displaying confirming message 
bookNowButton.addEventListener("click", displaynConfirmMsgOfOverallBooking);




//functions
 // update adventure booking details in the table
 function UpdateAdventureBookingDetails(date, localAdults, foreignAdults, localChildren, foreignChildren, duration, guide) {

  let rows = bookingTable.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
      cells[0].textContent === date
      cells[1].textContent = localAdults;
      cells[2].textContent = foreignAdults;
      cells[3].textContent = localChildren;
      cells[4].textContent = foreignChildren;
      cells[5].textContent = duration;
      cells[6].textContent = guide;
      cells[7].textContent = calculateCost(localAdults, foreignAdults, localChildren, foreignChildren, duration, guide);
      return;
    
  }
 
  // Create a new row for the booking
  let newRow = bookingTable.insertRow(-1);
  let dateCell = newRow.insertCell(0);
  let localAdultsCell = newRow.insertCell(1);
  let foreignAdultsCell = newRow.insertCell(2);
  let localChildrenCell = newRow.insertCell(3);
  let foreignChildrenCell = newRow.insertCell(4);
  let durationCell = newRow.insertCell(5);
  let guideCell = newRow.insertCell(6);
  let adventurecostCell = newRow.insertCell(7);
 
  // Set the values for the new row
  
  dateCell.textContent = date;
  localAdultsCell.textContent = localAdults;
  foreignAdultsCell.textContent = foreignAdults;
  localChildrenCell.textContent = localChildren;
  foreignChildrenCell.textContent = foreignChildren;
  durationCell.textContent = duration;
  guideCell.textContent = guide;
  adventurecostCell.textContent = calculateCost(localAdults, foreignAdults, localChildren, foreignChildren, duration, guide);
  
 }
 
 // Calculate current adventure cost
 function calculateCost(localAdults, foreignAdults, localChildren, foreignChildren, duration, guide) {
  let adventureCost = 0;
 
  // Calculate cost for duration
  let durationArray = duration.split(", ");
  durationArray.forEach(function(durationValue) {
    if (durationValue === "1 Hour") {
      adventureCost += (localAdults * 5000) + (foreignAdults * 10000);
      adventureCost += (localChildren * 2000) + (foreignChildren * 5000);
    } else if (durationValue === "2 Hours") {
      adventureCost += (localAdults * 10000) + (foreignAdults * 20000);
      adventureCost += (localChildren * 4000) + (foreignChildren * 10000);
    } else if (durationValue === "3 Hours") {
      adventureCost += (localAdults * 15000) + (foreignAdults * 30000);
      adventureCost += (localChildren * 6000) + (foreignChildren * 15000);
    }
  });
 
 
  // Calculate cost for guide
  let guideArray = guide.split(", ");
  guideArray.forEach(function(guideValue) {
    if (guideValue === "Adult Guide") {
      adventureCost += 1000;
    } 
    if (guideValue === "Child Guide") {
      adventureCost += 500;
    }
  });
 
  return adventureCost;
 }

 function updateTable() {
  let checkInDate = new Date(document.getElementById('checkIn').value);
  let checkOutDate = new Date(document.getElementById('checkOut').value);


  // Check if check-in date is before check-out date
  if (checkInDate >= checkOutDate) {
    // Display an error message
    alert("Check-in date should be before check-out date.");
    return;
  }

  // Check if check-in date and check-out date are the same
  if (checkInDate.toDateString() === checkOutDate.toDateString()) {
    // Display an error message
    alert("Check-in and check-out dates cannot be the same.");
    return;
  }

  // Check if the required fields have been filled
  if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
    let durationInNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    let singleRoomQuantity = parseInt(document.getElementById('singleRoom').value) || 0;
    let doubleRoomQuantity = parseInt(document.getElementById('doubleRoom').value) || 0;
    let tripleRoomQuantity = parseInt(document.getElementById('tripleRoom').value) || 0;
    let kidsAbove5Count = parseInt(document.getElementById('kids').value) || 0;
    let extraBedCount = parseInt(document.getElementById('extraBed').value) || 0;
    let extraRequirementsInputs = document.querySelectorAll('input[name="extraRequirements"]:checked');
    let promoCode = document.getElementById('promoCode').value;


    let extraRequirements = "";
    extraRequirementsInputs.forEach(function (input) {
      extraRequirements += input.value + ", ";
    });
    extraRequirements = extraRequirements.slice(0, -2);


    calculateCost2(
      kidsAbove5Count, 
      durationInNights, 
      singleRoomQuantity, 
      doubleRoomQuantity, 
      tripleRoomQuantity, 
      extraBedCount, 
      kidsAbove5Rate, 
      promoCode
    );
    
    // Update the table with the calculated values
    updateCurrentRoomBooking(
      durationInNights, 
      singleRoomQuantity, 
      doubleRoomQuantity, 
      tripleRoomQuantity, 
      extraBedCount, 
      extraRequirements, 
      kidsAbove5Count,
      promoCode 
    );

    let roomBookingsCost = calculateCost2(
      kidsAbove5Count,
      durationInNights,
      singleRoomQuantity,
      doubleRoomQuantity,
      tripleRoomQuantity,
      extraBedCount,
      kidsAbove5Rate,
      promoCode
    );

    let rows = bookingTable3.getElementsByTagName("tr");
    if (rows.length === 0) {
      // Create a new row for the booking details
      let newRow = bookingTable3.insertRow(0);
      let detailsCell = newRow.insertCell(0);
      let costCell = newRow.insertCell(1);
  
      // Set the values for the new row
      detailsCell.innerHTML = `Single Rooms: ${singleRoomQuantity}<br>
                               Double Rooms: ${doubleRoomQuantity}<br>
                               Triple Rooms: ${tripleRoomQuantity}<br>
                               Duration (Nights): ${durationInNights}`;
      costCell.textContent = roomBookingsCost;
      
    } else {
      // Update the existing row with the booking details
      let cells = rows[0].getElementsByTagName("td");
      cells[0].innerHTML = `Single Rooms: ${singleRoomQuantity}<br>
                            Double Rooms: ${doubleRoomQuantity}<br>
                            Triple Rooms: ${tripleRoomQuantity}<br>
                            Duration (Nights): ${durationInNights}`;
      cells[1].textContent = roomBookingsCost;
      
    }
    
  }

}



function updateCurrentRoomBooking(durationInNights, singleRoomQuantity, doubleRoomQuantity, tripleRoomQuantity, extraBedCount, extraRequirements, kidsAbove5Count,promoCode){

  let rows = bookingTable2.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
      cells[0].textContent = durationInNights;
      cells[1].textContent = singleRoomQuantity;
      cells[2].textContent = doubleRoomQuantity;
      cells[3].textContent = tripleRoomQuantity;
      cells[4].textContent = extraBedCount;
      cells[5].textContent = extraRequirements;
      cells[6].textContent = calculateCost2(kidsAbove5Count, durationInNights, singleRoomQuantity, doubleRoomQuantity, tripleRoomQuantity, extraBedCount, kidsAbove5Rate,promoCode);
      
      return;
    
  }

  // Create a new row for the booking
  let newRow1 = bookingTable2.insertRow(-1);
  let durationCell = newRow1.insertCell(0);
  let singleRoomCell = newRow1.insertCell(1);
  let doubleRoomCell = newRow1.insertCell(2);
  let tripleRoomCell = newRow1.insertCell(3);
  let extraBedCell = newRow1.insertCell(4);
  let extraRequirementsCell = newRow1.insertCell(5);
  let bookingcostCell = newRow1.insertCell(6);


  // Set the values for the new row
  
  durationCell.textContent = durationInNights;
  singleRoomCell.textContent = singleRoomQuantity;
  doubleRoomCell.textContent = doubleRoomQuantity;
  tripleRoomCell.textContent = tripleRoomQuantity;
  extraBedCell.textContent = extraBedCount;
  extraRequirementsCell.textContent = extraRequirements;
  bookingcostCell.textContent = calculateCost2(kidsAbove5Count, durationInNights, singleRoomQuantity, doubleRoomQuantity, tripleRoomQuantity, extraBedCount, kidsAbove5Rate,promoCode);
}

function calculateCost2(kidsAbove5Count, durationInNights, singleRoomQuantity, doubleRoomQuantity, tripleRoomQuantity, extraBedCount, kidsAbove5Rate, promoCode) {
  let singleRoomCost = singleRoomQuantity * singleRoomNightlyRate;
  let doubleRoomCost = doubleRoomQuantity * doubleRoomNightlyRate;
  let tripleRoomCost = tripleRoomQuantity * tripleRoomNightlyRate;
  let extraBedCost = extraBedCount * extraBedRate;
  let kidsAbove5Cost = kidsAbove5Count * kidsAbove5Rate;
  let Cost = durationInNights * (singleRoomCost + doubleRoomCost + tripleRoomCost + extraBedCost + kidsAbove5Cost);

  let discount = 0;
  
  if (promoCode.toLowerCase() === 'promo123') {
    discount = Cost * 0.05; // 5% discount
  } 
  let roomBookingsCost = Cost - discount;
  return roomBookingsCost;
}

// Function to save the booking details in local storage
function addToFavorites() {
  // Get the booking details
  let checkInDate = document.getElementById("checkIn").value;
  let checkOutDate = document.getElementById("checkOut").value;
  let kids = parseInt(document.getElementById("kids").value) || 0;
  let adults = parseInt(document.getElementById("adults").value) || 0;
  let children = parseInt(document.getElementById("children").value) || 0;
  let singleRooms = parseInt(document.getElementById("singleRoom").value) || 0;
  let doubleRooms = parseInt(document.getElementById("doubleRoom").value) || 0;
  let tripleRooms = parseInt(document.getElementById("tripleRoom").value) || 0;
  let extraRequirements = [];
  let extraBed = parseInt(document.getElementById("extraBed").value) || 0;
  

  // Get the selected extra requirements
  let extraRequirementsInputs = document.querySelectorAll('input[name="extraRequirements"]:checked');
  extraRequirementsInputs.forEach(function(input) {
    extraRequirements.push(input.value);
  });

 
  // Create a booking object
  let booking = {
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    kids: kids,
    adults: adults,
    children: children,
    singleRooms: singleRooms,
    doubleRooms: doubleRooms,
    tripleRooms: tripleRooms,
    extraRequirements: extraRequirements,
    extraBed: extraBed,
    
  };

  // Convert the booking object to JSON string
  let bookingJSON = JSON.stringify(booking);

  // Save the booking JSON string in local storage
  localStorage.setItem("favoriteBooking", bookingJSON);

  // Display a confirmation message
  let favouriteConfirmMessage = "Booking added to favorites!";
  alert(favouriteConfirmMessage);
}

// Function to check loyalty points
function checkLoyaltyPoints() {

  // Retrieve the loyalty points from local storage
  let storedLoyaltyPoints = localStorage.getItem("loyaltyPoints");
  let loyaltyPoints = 0;
  let singleRooms = parseInt(document.getElementById("singleRoom").value) || 0;
   let doubleRooms = parseInt(document.getElementById("doubleRoom").value) || 0;
  let tripleRooms = parseInt(document.getElementById("tripleRoom").value) || 0; 
  // Calculate the total number of rooms
  let totalRooms = singleRooms + doubleRooms + tripleRooms;
  
  if (totalRooms > 3) {
    loyaltyPoints = totalRooms * 20;
    let loyaltyPointsMessage = "You have earned " + loyaltyPoints + " loyalty points.";
    alert(loyaltyPointsMessage);
  
    // Check if loyalty points exist in local storage
    if (storedLoyaltyPoints) {
      // Add the earned loyalty points to the existing points
      loyaltyPoints = parseInt(storedLoyaltyPoints) + loyaltyPoints;
    }
  
    // Save updated loyalty points in local storage
    localStorage.setItem("loyaltyPoints", loyaltyPoints);
  } else {
    alert("No points were earned.You have to book more than 3 rooms to get loyalty points");
  }
  }


  function displaynConfirmMsgOfOverallBooking() {

    let name = document.getElementById("name").value;
    let checkInDate = document.getElementById("checkIn").value;
    let checkOutDate = document.getElementById("checkOut").value;
    let singleRooms = parseInt(document.getElementById("singleRoom").value) || 0;
    let doubleRooms = parseInt(document.getElementById("doubleRoom").value) || 0;
    let tripleRooms = parseInt(document.getElementById("tripleRoom").value) || 0;
    
    // Reset rooms booking table
    bookingTable2.innerHTML = "";
    // Displaying overallbookingtable
    overallbookingscontent.style.display = "block"; 
    //uncheck the button user selected to chooose room bookings
    document.getElementById("roomBookings").checked = false;
    
    if (checkInDate && checkOutDate && (singleRooms ||doubleRooms ||tripleRooms ) ) {
    let roomsBookingonfirmMsg = document.getElementById("roomsBookingonfirmMsg");
    roomsBookingonfirmMsg.innerHTML = `
      <p>Thank you ${name} for booking our rooms!</p>
      <p>We are thrilled to inform you that your booking has been successfully confirmed.</p>`;
  
      roomsBookingonfirmMsg.style.display = "block";
    } else {
      alert("Please fill the required fields.");
    }
  
  }
  