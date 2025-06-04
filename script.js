const menu = document.getElementById("menu") 
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

// abrir carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";

})

//fechar carrinho 
cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event) {

    let parentButtom = event.target.closest(".add-to-cart-btn")

    if(parentButtom){
        const name = parentButtom.getAttribute("data-name")
        const price = parseFloat(parentButtom.getAttribute("data-price"))

        // adicionar no carrinho

        addToCart(name, price)
    }
})

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
      existingItem.quantidy += 1;      
    } else {
        cart.push({
        name, 
        price,
        quantidy: 1,
       })
    }

    updateCartModal()
     
}

//atualiza carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    // loop
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
         <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p>Qtd: ${item.quantidy} </p>
                <p class="font-medium mt-2">R$${item.price.toFixed(2)} </p>
            </div>

             <buttom class="remove-cart-btn" data-name="${item.name}"> 
                Remover 
             </buttom>
         </div>
        `

        total += item.price  * item.quantidy;

        cartItemsContainer.appendChild(cartItemElement) 
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}


//função para remover item carrinho

cartItemsContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }

})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1) {
        const item = cart[index];

        if(item.quantidy > 1) {
            item.quantidy -= 1;
            updateCartModal(); 
            return;
        }
        
        cart.splice(index, 1);
        updateCartModal(); 
    
    }
}

addressInput.addEventListener("input", function(event) {
    let inputValue = event.target.value; 

    if(inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})


// finalizar pedido
checkoutBtn.addEventListener("click", function() {
    if(cart.length === 0) return;

    if(addressInput.value === "") {
        addressWarn.classList.remove("hidden") 
        addressInput.classList.add("border-red-500")
    }

    //enviar pedido
    const cartItems = cart.map((item) => {
        return(
            `${item.name} Quantidade: (${item.quantidy}) Preço: R$ ${item.price}`
        )
    }).join("")


    //  mensagem para o whats
    const menssage = encodeURIComponent(cartItems) 
    const phone = "49988044382"

    window.open(`https://wa.me/${phone}?text=${menssage} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();
}) 



/*
//horario de funcionamento
function checkOpen(){
    const data = new Date();
    const hora = data.getHours(); 
    return hora >= 8 && hora <= 18; //true
}

const spanItem = document.getElementById("date-span")
const isOpen = checkOpen();

if(isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}*/