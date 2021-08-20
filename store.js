if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
  

function ready(){
    let removeItemButton = document.getElementsByClassName("btn-danger")
    for(let i =0; i<removeItemButton.length; i++){
        let removeButton = removeItemButton[i]
    removeButton.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(let i =0; i<quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButton = document.getElementsByClassName('shop-item-button')
    for(let i =0; i<addToCartButton.length; i++){
        let button = addToCartButton[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


function purchaseClicked(){
    let cartItems = document.getElementsByClassName('cart-items')[0]
    if(cartItems.length ==0 ){
        alert('Shopping Cart Empty!')
    }else{
        alert('Thank you for your purchase! Come shop with us again!')
        
        while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild) 
        }
    }
    
    updateCartTotal()
}



function removeCartItem(event){
    let removeButtonClicked = event.target
        removeButtonClicked.parentElement.parentElement.remove()
        updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
        if(isNaN(input.value) || input.value<=0){
            input.value=1
        }
        updateCartTotal()
}

function addToCartClicked(event){
    
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('title')[0].innerText
    let price = shopItem.getElementsByClassName('item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('item-image')[0].src
    alert( title + ' Added to Shopping Cart')
    console.log(title, price , imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal() /*********************ETO YUNG UPDATEPRICE BAKIT DI NAGUUPDATE AHHHHHHHHHHH ****** */
    console.log('price updated')
}

function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItem = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItem.getElementsByClassName('cart-item-title')
    for (let i =0; i<cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert( title + ' has already been added to your cart!')
            return
        }
    }
    let cartRowContent =
            `<div class="cart-item cart-column">
                <img class="item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
                <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
             </div>`
    cartRow.innerHTML = cartRowContent
    cartItem.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal(){
    let shoppingCart = document.getElementsByClassName('cart-items')[0]
    let cartRows = shoppingCart.getElementsByClassName("cart-row")
    let totalness = 0
    for(let i = 0; i<cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$',''))
        let quantity = quantityElement.value
        console.log(price)
        totalness = totalness + (price*quantity)
    }
    totalness = Math.round(totalness*100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + totalness
}


