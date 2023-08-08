# Bandcamp-Expense
A [Grease Monkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)/[Tamper Monkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) script which calculate the total amount of money spent on a Bandcamp account.

## Usage
1. Import [BandcampExpense](https://raw.githubusercontent.com/KelianSteffe/Bandcamp-Expense/main/BandcampExpense.user.js) into Grease Monkey or Tamper Monkey by simply clicking the links (should bring up the install dialog)
2. Change the value of YOUR_USERNAME to your actual Bandcamp username
3. Change the value of final_currency to the desired one, it must respect the ISO 4217 standard:
  - Example of valid codes...
    - USD (Default)
    - EUR
    - GBP
    - CAD
    - JPY
4. Make sure Grease Monkey/Tamper Monkey is enabled.
5. Go on https://bandcamp.com/YOUR_USERNAME/purchases and wait a few seconds.
