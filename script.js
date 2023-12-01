const chocolates = [
    { name: 'Milk Chocolate', price: 2.50 },
    { name: 'Dark Chocolate', price: 3.00 },
    { name: 'White Chocolate', price: 2.75 },
    // Add more chocolate options as needed
];

const chocolateOptionsContainer = document.getElementById('chocolate-options');
const selectedListContainer = document.getElementById('selected-list');
const totalPriceElement = document.getElementById('total-price');

// Keep track of selected chocolates and their quantities
const selectedChocolates = {};

// Dynamically create chocolate options
chocolates.forEach(chocolate => {
    const option = document.createElement('div');
    option.className = 'chocolate-option';
    option.innerHTML = `
        <label>
            <input type="checkbox" class="chocolate-checkbox" data-name="${chocolate.name}" data-price="${chocolate.price}">
            ${chocolate.name} - ₹${chocolate.price.toFixed(2)} <!-- Display price in INR -->
        </label>
        <input type="number" class="quantity-input" min="0" max="8" value="0">
    `;
    chocolateOptionsContainer.appendChild(option);
});

// Event listener for checkbox and quantity changes
chocolateOptionsContainer.addEventListener('change', updateSelectedChocolates);

function updateSelectedChocolates() {
    let totalPrice = 0;
    selectedChocolates.totalQuantity = 0;

    document.querySelectorAll('.chocolate-option').forEach((option, index) => {
        const checkbox = option.querySelector('.chocolate-checkbox');
        const quantityInput = option.querySelector('.quantity-input');

        if (checkbox.checked) {
            const name = checkbox.dataset.name;
            const price = parseFloat(checkbox.dataset.price);
            const quantity = parseInt(quantityInput.value, 10);

            if (quantity > 0) {
                selectedChocolates[name] = { price, quantity };
                totalPrice += price * quantity;
                selectedChocolates.totalQuantity += quantity;
            }
        }
    });

    // Ensure the total quantity does not exceed 8 items
    if (selectedChocolates.totalQuantity > 8) {
        alert('Total quantity cannot exceed 8 items. Please adjust your selection.');
        // Reset quantities and uncheck checkboxes
        resetSelections();
        return;
    }

    // Display selected chocolates and quantities
    selectedListContainer.innerHTML = '';
    for (const name in selectedChocolates) {
        if (name !== 'totalQuantity') {
            const { price, quantity } = selectedChocolates[name];
            const listItem = document.createElement('li');
            listItem.textContent = `${name} - Quantity: ${quantity} - ₹${(price * quantity).toFixed(2)}`; // Display price in INR
            selectedListContainer.appendChild(listItem);
        }
    }

    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`; // Display total price in INR
}

function resetSelections() {
    document.querySelectorAll('.chocolate-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.value = 0;
    });

    selectedChocolates.totalQuantity = 0;
    selectedListContainer.innerHTML = '';
    totalPriceElement.textContent = '₹0.00'; // Display total price in INR
}
