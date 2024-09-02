document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartElement = document.getElementById('cart');
    const itemCountElement = document.getElementById('item-count');
    const totalElement = document.getElementById('total');
    const cartItemsElement = document.querySelector('.cart-items');
    const openCartButton = document.getElementById('open-cart');
    const closeCartButton = document.getElementById('close-cart');


    function addToCart(product) {
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.dataset.price);

        
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    
    function updateCart() {
        itemCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
        totalElement.textContent = total;

        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span>${item.name}</span>
                <span>  Quantidade: ${item.quantity}</span>
                <span>  Preço: R$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsElement.appendChild(cartItemElement);
        });
    }

    
    openCartButton.addEventListener('click', (e) => {
        e.preventDefault();
        cartElement.style.display = 'block';
    });

  
    closeCartButton.addEventListener('click', () => {
        cartElement.style.display = 'none';
    });

   
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            if (product) {
                addToCart(product);
            }
        });
    });
});
