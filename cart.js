let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

let cartContainer = document.querySelector(".cartcontainer");
let totalDiv = document.querySelector(".totaldiv");

function showCart() {
    cartContainer.innerHTML = "";

    cartItems.forEach((item) => {
        let strr = `
        <div class="cont">
        <div class="cartitemcontainer">
        <h3 class="prodname">${item.prodName}</h3>
        <p class="price">${item.prodPrice}</p>
        <p class="Quantity">${item.quantity}x</p>
        <button class="remove-item-btn">Remove Item</button>
        </div>
        <div class="cartimg">
        <img src="${item.imageSrc}">
        </div>
        </div>
        `;
        cartContainer.innerHTML += strr;
    });

    attachRemove();
}

function attachRemove() {
    let removeBtn = document.querySelectorAll(".remove-item-btn");

    removeBtn.forEach((rb, index) => {
        rb.addEventListener("click", () => {
            cartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            showCart();
            updateTotal();
        });
    });
}

function updateTotal() {

    let totalAmt = 0;

    cartItems.forEach(item => {
        let price = Number(item.prodPrice.replace("Rs.", "").trim());
        totalAmt += price * item.quantity;
    });

    let subTotal = totalAmt;
    let tax = subTotal * 0.05;
    let total = subTotal + tax;

    totalDiv.innerHTML = `
    <div class="totalcont">
    <h5>Sub-Total: Rs. ${subTotal.toFixed(2)}</h5>
    <p>Taxes (5%): Rs. ${tax.toFixed(2)}</p>
    <p>Total: Rs. ${total.toFixed(2)}</p>
    <button class="placeorder">Place Order</button>
    </div>
    `;

    let orderBtn = document.querySelector(".placeorder");

    if (orderBtn) {
        if (subTotal <= 0) {
            orderBtn.style.display = "none";
        }
    }
}

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("placeorder")) {
        document.querySelector(".orderform").style.display = "block";
        e.target.style.display = "none"
    }

    if (e.target.classList.contains("closeform")) {
        document.querySelector(".orderform").style.display = "none";
        let placebtn = document.querySelector(".placeorder");
        placebtn.style.display = "block"
    }

    if (e.target.classList.contains("submit")) {
        e.preventDefault();

        let name = document.querySelector(".name").value.trim();
        let phone = document.querySelector(".phone").value.trim();
        let address = document.querySelector(".address").value.trim();

        if (name === "" || phone === "" || address === "") {
            alert("Please fill all fields");
            return;
        }

        let order = {
            customer: {
                name: name,
                phone: phone,
                address: address
            },
            items: cartItems,
            total: document.querySelector(".totalcont h5").textContent,
            date: new Date().toLocaleString()
        };

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        document.querySelector(".orderstatus").style.display = "block";

        localStorage.removeItem("cart");

        setTimeout(() => {
            location.reload();
        }, 1000);
    }
});

showCart();
updateTotal();