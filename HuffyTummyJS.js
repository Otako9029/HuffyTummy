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
        },
        {
            name: "Trissedia Fiesta",
            description: "A festive dish with layers of cheese and savory fillings.",
            price: 150,
        }
    ];

    const drinkData = [
        {
            name: "Ice Paradise",
            description: "Special flavored sparkling cold drink",
            price: 50,
        },
        {
            name: "Frosty Oasis",
            description: "Shaved ice with special flavors",
            price: 40,
        }
    ];

    const carousel = document.getElementById('carouselExampleIndicators');
    let currentSlideIndex = 0;

    carousel.addEventListener('slide.bs.carousel', function (event) {
        currentSlideIndex = event.to;
        const meal = mealData[currentSlideIndex]; 

        document.getElementById('mealName').textContent = meal.name;
        document.getElementById('mealDescription').textContent = meal.description;
        document.getElementById('mealPrice').textContent = `$${meal.price.toFixed(2)}`;
        document.getElementById('mealImage').src = meal.image; 
    });

 
    const drinkCarousel = document.getElementById('carouselExampleDrinkIndicators');
    let currentDrinkSlideIndex = 0;

    drinkCarousel.addEventListener('slide.bs.carousel', function (event) {
        currentDrinkSlideIndex = event.to; 
        const drink = drinkData[currentDrinkSlideIndex]; 


        document.getElementById('drinkName').textContent = drink.name;
        document.getElementById('drinkDescription').textContent = drink.description;
        document.getElementById('drinkPrice').textContent = `$${drink.price.toFixed(2)}`; 
        document.getElementById('drinkImage').src = drink.image;
    });

    let cart = [];
    let total = 0;


    function addToCart(item, quantity) {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += quantity; 
        } else {
            item.quantity = quantity; 
            cart.push({ ...item }); 
        }
        total += item.price * quantity; 
        updateCartDisplay();
    }


    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';

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
        cartItemsContainer.innerHTML = '';

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

    window.removeFromCart = function(index) {
        total -= cart[index].price * cart[index].quantity; 
        cart.splice(index, 1);
        updateCartDisplay();
    };

    document.getElementById('addToCartMealButton').addEventListener('click', () => {
        const quantity = parseInt(mealCountDisplay.textContent);
        if (quantity > 0) {
            const meal = mealData[currentSlideIndex]; 
            addToCart(meal, quantity); 
            mealCount = 0; 
            mealCountDisplay.textContent = mealCount;
            unt; 
        } else {
            alert("Please select a quantity before adding to cart.");
        }
    });
    document.getElementById('addToCartDrinkButton').addEventListener('click', () => {
        const quantity = parseInt(drinkCountDisplay.textContent); 
        if (quantity > 0) {
            const drink = drinkData[currentSlideIndex]; 
            addToCart(drink, quantity); 
            drinkCount = 0;
            drinkCountDisplay.textContent = drinkcount; 
        } else {
            alert("Please select a quantity before adding to cart.");
        }
    });
    document.getElementById('checkoutButton').addEventListener('click', () => {
        alert("Unable To Checkout: Server Problem\nError Code: 422");
    });
});