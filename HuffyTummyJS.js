document.addEventListener('DOMContentLoaded', () => {
    const mealPlusButton = document.querySelector('.plus');
    const mealMinusButton = document.querySelector('.minus');
    const mealCountDisplay = document.querySelector('.count');
    let mealCount = 0;

    mealPlusButton.addEventListener('click', () => {
        mealCount++;
        mealCountDisplay.textContent = mealCount;
    });

    mealMinusButton.addEventListener('click', () => {
        if (mealCount > 0) {
            mealCount--;
            mealCountDisplay.textContent = mealCount;
        }
    });

    // Drink count management
    const drinkPlusButton = document.querySelector('.drinkPlus'); // Add an ID for the drink plus button
    const drinkMinusButton = document.querySelector('.drinkMinus'); // Add an ID for the drink minus button
    const drinkCountDisplay = document.querySelector('.drinkCount'); // Add an ID for the drink count display
    let drinkCount = 0;

    drinkPlusButton.addEventListener('click', () => {
        drinkCount++;
        drinkCountDisplay.textContent = drinkCount;
    });

    drinkMinusButton.addEventListener('click', () => {
        if (drinkCount > 0) {
            drinkCount--;
            drinkCountDisplay.textContent = drinkCount;
        }
    });

    const mealData = [
        {
            name: "Chicken Tato Bomb",
            description: "A delicious chicken dish with a crispy potato crust.",
            price: 130,
            image: "path/to/chicken_tato_bomb_image.jpg" // Add the image path
        },
        {
            name: "Trissedia Fiesta",
            description: "A festive dish with layers of cheese and savory fillings.",
            price: 150,
            image: "path/to/trissedia_fiesta_image.jpg" // Add the image path
        }
    ];

    const drinkData = [
        {
            name: "Lemonade",
            description: "A refreshing lemonade with a hint of mint.",
            price: 50,
            image: "path/to/lemonade_image.jpg" // Add the image path
        },
        {
            name: "Iced Tea",
            description: "A chilled iced tea with a splash of lemon.",
            price: 40,
            image: "path/to/iced_tea_image.jpg" // Add the image path
        }
    ];

    const carousel = document.getElementById('carouselExampleIndicators');
    let currentSlideIndex = 0;

    carousel.addEventListener('slide.bs.carousel', function (event) {
        currentSlideIndex = event.to; // Get the index of the next slide
        const meal = mealData[currentSlideIndex]; // Get the corresponding meal data

        // Update the meal card
        document.getElementById('mealName').textContent = meal.name;
        document.getElementById('mealDescription').textContent = meal.description;
        document.getElementById('mealPrice').textContent = `$${meal.price.toFixed(2)}`; // Update price
        document.getElementById('mealImage').src = meal.image; // Update image
    });

    // Drink carousel functionality
    const drinkCarousel = document.getElementById('carouselExampleDrinkIndicators');
    let currentDrinkSlideIndex = 0;

    drinkCarousel.addEventListener('slide.bs.carousel', function (event) {
        currentDrinkSlideIndex = event.to; // Get the index of the next slide
        const drink = drinkData[currentDrinkSlideIndex]; // Get the corresponding drink data

        // Update the drink card
        document.getElementById('drinkName').textContent = drink.name;
        document.getElementById('drinkDescription').textContent = drink.description;
        document.getElementById('drinkPrice').textContent = `$${drink.price.toFixed(2)}`; // Update price
        document.getElementById('drinkImage').src = drink.image; // Update image
    });

    let cart = [];
    let total = 0;

    // Function to add a meal or drink to the cart
    function addToCart(item, quantity) {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += quantity; // Increase quantity if already in cart
        } else {
            item.quantity = quantity; // Set initial quantity
            cart.push({ ...item }); // Add new item to cart
        }
        total += item.price * quantity; // Update total price
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // Clear previous items

        cart.forEach((meal, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${meal.name} - $${meal.price.toFixed(2)} x ${meal.quantity}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.getElementById('cartTotal').textContent = total.toFixed(2);
    }
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = ''; // Clear previous items

        cart.forEach((drink, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${drink.name} - $${drink.price.toFixed(2)} x ${drink.quantity}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.getElementById('cartTotal').textContent = total.toFixed(2);
    }

    // Function to remove a meal from the cart
    window.removeFromCart = function(index) {
        total -= cart[index].price * cart[index].quantity; // Subtract total price of the meal
        cart.splice(index, 1); // Remove meal from cart
        updateCartDisplay();
    };

    // Add event listener for the Add to Cart button
    document.getElementById('addToCartMealButton').addEventListener('click', () => {
        const quantity = parseInt(mealCountDisplay.textContent); // Get the current count
        if (quantity > 0) {
            const meal = mealData[currentSlideIndex]; // Get the currently displayed meal
            addToCart(meal, quantity); // Add the selected meal to the cart
            mealCount = 0; // Reset count after adding to cart
            mealCountDisplay.textContent = mealCount;
            unt; // Update display
        } else {
            alert("Please select a quantity before adding to cart.");
        }
    });
    document.getElementById('addToCartDrinkButton').addEventListener('click', () => {
        const quantity = parseInt(drinkCountDisplay.textContent); // Get the current count
        if (quantity > 0) {
            const drink = drinkData[currentSlideIndex]; // Get the currently displayed meal
            addToCart(drink, quantity); // Add the selected meal to the cart
            drinkCount = 0; // Reset count after adding to cart
            drinkCountDisplay.textContent = drinkcount; // Update display
        } else {
            alert("Please select a quantity before adding to cart.");
        }
    });
    document.getElementById('checkoutButton').addEventListener('click', () => {
        alert("Unable To Checkout: Server Problem\nError Code: 422");
    });
});