// const cartQuantityInputs = document.querySelectorAll("form[action='/cart'] input[type='number']");

// console.log(cartQuantityInputs);

// cartQuantityInputs.forEach(el => {

//     el.addEventListener("change", async () => {
//         let itemKey = el.getAttribute("data-item-key");
//         let itemValue = el.value;

//         console.log(itemKey, itemValue);

//         const response = await fetch("/cart/update.js", {
//             method: "post",
//             headers: {
//                 Accept: "application/json",
//                 "Content-type": "application/json",
//             },
//             body: JSON.stringify({ updates: { [itemKey]: itemValue } })
//         });

//         const jsonResponse = await response.json();
//         await updateCart();
//     });
// });

// async function updateCart() {
//     const resCount = await fetch("/cart.json");
//     const cart = await resCount.json();

//     const res = await fetch("/?section_id=main-cart");
//     const text = await res.text();

//     const html = document.createElement("div");
//     html.innerHTML = text;

//     const newBox = html.querySelector(".section_cart").innerHTML;

//     document.querySelector(".section_cart").innerHTML = newBox;

//     console.log("updated cart");
// }
