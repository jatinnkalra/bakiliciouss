let btn = document.querySelectorAll(".addtocart")
console.log(btn)
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];



btn.forEach((b) => {
    b.addEventListener("click", () => {
        let parentEl = b.parentElement;
        console.log(parentEl)
        let imgSrc = parentEl.querySelector("img").src
        console.log(imgSrc)
        let productName = parentEl.querySelector(".card-title").textContent;
        let productPrice = parentEl.querySelector(".card-text").textContent;
        console.log(productName)
        console.log(productPrice)

        let productObj = {
            imageSrc: imgSrc,
            prodName: productName,
            prodPrice: productPrice,
            quantity: 1,
            id: productName + productPrice
        }

        let idx = cartItems.findIndex(item => item.prodName === productName);

        console.log(idx);

        if (idx === -1) {
            cartItems.push(productObj);
            localStorage.setItem("cart", JSON.stringify(cartItems))
            let local = localStorage.getItem("cart")
            console.log(JSON.parse(local))
            let displayMsg = document.querySelector(".cartmsg")
            displayMsg.style.display = "block"
            setTimeout(() => {
                displayMsg.style.display = "none";
            }, 1000);
        } else {
            cartItems[idx].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cartItems))
            let local = localStorage.getItem("cart")
            console.log(JSON.parse(local))
            let displayMsg = document.querySelector(".cartmsg")
            displayMsg.style.display = "block"
            setTimeout(() => {
                displayMsg.style.display = "none";
            }, 1000);
        }

        console.log(cartItems)
    })
})












