// ==UserScript==
// @name        Bandcamp Expense
// @namespace   https://bandcamp.com
// @match       https://bandcamp.com/YOUR_USERNAME/purchases*
// @description Calculate the total amount of money spent on a Bandcamp account
// @author      Kélian Steffe
// @version     1.0
// @grant       none
// ==/UserScript==

function compute_total() {
  // Get every purchased items
  const purchases = document.getElementsByClassName("purchases-item-total");
  // Any ISO 4217 code should works
  const final_currency = "USD";
  var total_per_currency = {};
  var total_spent = 0;

  for(var purchase of purchases) {
    // Get the amount and unit of every purchase
    let spent = parseFloat(purchase.children[0].children[1].innerText.split(" ")[0].substring(1));
    let unit = purchase.children[0].children[1].children[0].innerText;

    // Increment each currencies in the object
    if(total_per_currency[unit] == undefined) {
      total_per_currency[unit] = 0;
    }

    total_per_currency[unit] += spent;
  }

  console.log("Total spent per currency", total_per_currency);

  // Get conversion rates for every currencies 
  fetch(`https://open.er-api.com/v6/latest/${final_currency}`).then((response) => response.json()).then(json => {
    // Add the converted value to a grand total
    for (const [unit, value] of Object.entries(total_per_currency)) {
      total_spent += value / json["rates"][unit]
    }

    alert(`You've spent ${total_spent.toFixed(2)} ${final_currency}`);
  });
}

// Only start once the page has fully loaded
window.addEventListener('load', function () {
  // Click the button that starts showing every purchases
  document.getElementsByClassName("view-all-button")[0].click();
  
  setTimeout(function () {
    // Go to the bottom of the page, every second
    var scrollInterval = setInterval(function () {
      window.scrollTo(0, window.scrollY + 1000);
    }, 1);

    // Check if every purchases has been loaded in, every two second
    var doneInterval = setInterval(function () {
      // If there's nothing more to show
      var loadMoreContainer = document.getElementsByClassName('show-more')[0];
      if (window.getComputedStyle(loadMoreContainer).display === 'none') {
        // We stop the interval and start the computing
        window.clearInterval(scrollInterval);
        window.clearInterval(doneInterval);
        compute_total();
      }
    }, 2000);
  }, 1000);
});
