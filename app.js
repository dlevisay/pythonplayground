// It's best practice to wait until the HTML is fully loaded before running our script
document.addEventListener('DOMContentLoaded', function() {

    // --- PART 1: ADDING A NEW LINE ITEM ---

    // Select the button for adding a new line item
    // We need to give it an ID in the HTML first!
    // In new-estimate.html, add id="add-line-item-btn" to the "Add Line Item" button.
    const addLineItemBtn = document.getElementById('add-line-item-btn');

    // Select the container where new line items will be placed
    const lineItemsContainer = document.getElementById('line-items-container');

    // Let's also add a subtotal display area. In the HTML, after the <hr>, add:
    // <div class="totals">Subtotal: <span id="subtotal-display">$0.00</span></div>
    // <div class="totals">Total: <span id="total-display">$0.00</span></div>
    const subtotalDisplay = document.getElementById('subtotal-display');
    const totalDisplay = document.getElementById('total-display');


    // Add a click event listener to the button
    addLineItemBtn.addEventListener('click', function() {
        // Create a new div element with the class 'line-item'
        const newLineItem = document.createElement('div');
        newLineItem.classList.add('line-item');

        // Set the inner HTML of the new div with the input fields
        newLineItem.innerHTML = `
            <input type="text" placeholder="Item Description" name="item_description">
            <input type="number" placeholder="Quantity" name="item_quantity" class="quantity-input" value="1">
            <input type="number" placeholder="Price" name="item_price" class="price-input" step="0.01">
            <button type="button" class="remove-item-btn">Remove</button>
        `;

        // Append the new line item div to the container
        lineItemsContainer.appendChild(newLineItem);
    });


    // --- PART 2: CALCULATING THE TOTALS ---

    // We need to calculate the total whenever a quantity or price changes.
    // Since line items are added dynamically, we listen for events on the container.
    lineItemsContainer.addEventListener('input', function(event) {
        // Check if the event was triggered by an input field for quantity or price
        if (event.target.classList.contains('quantity-input') || event.target.classList.contains('price-input')) {
            calculateTotal();
        }
    });

    function calculateTotal() {
        let subtotal = 0;
        // Select all the line item divs currently on the page
        const allLineItems = document.querySelectorAll('.line-item');

        // Loop through each line item div
        allLineItems.forEach(function(item) {
            // Find the quantity and price inputs within this specific line item
            const quantityInput = item.querySelector('.quantity-input');
            const priceInput = item.querySelector('.price-input');

            // Get their values, converting them to numbers. Default to 0 if empty.
            const quantity = parseFloat(quantityInput.value) || 0;
            const price = parseFloat(priceInput.value) || 0;

            // Add the product to the subtotal
            subtotal += quantity * price;
        });

        // Update the display on the page
        // .toFixed(2) ensures the number has two decimal places
        subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
        totalDisplay.textContent = `$${subtotal.toFixed(2)}`; // For now, total is same as subtotal
    }

    // --- PART 3: REMOVING A LINE ITEM ---
    lineItemsContainer.addEventListener('click', function(event) {
        // Check if the clicked element is a remove button
        if (event.target.classList.contains('remove-item-btn')) {
            // Find the parent .line-item div and remove it
            event.target.closest('.line-item').remove();
            // Recalculate the total after removing an item
            calculateTotal();
        }
    });
});
