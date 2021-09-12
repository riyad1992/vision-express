const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  console.log(products)
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h3>Price: $ ${product.price}</h3>
      <p>Avg Rating: ${product.rating.rate} Total of <span>${product.rating.count}</span></p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const loadDetails = (productId) => {
  fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(data => showDetails(data))
}

const showDetails = (singleProduct) => {
  const details = document.getElementById('details')
  details.textContent = ''
  const div = document.createElement('div')
  div.classList.add('row')
  div.innerHTML = `
  <div class="col-md-4">
    <img src="${singleProduct.image}" class="img-fluid rounded-start p-3"  alt="...">
    <p class="p-2"><small>Avg Rating: ${singleProduct.rating.rate} Total of (<span>${singleProduct.rating.count}</span>)</small></p>
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${singleProduct.title}</h5>
      <p class="card-text">${singleProduct.description}</p>
    </div>
  </div>`
  details.appendChild(div)
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  const totalPrice = parseFloat(total).toFixed(2)
  document.getElementById(id).innerText = totalPrice;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", parseFloat(30).toFixed(2));
    setInnerText("total-tax", parseFloat(priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", parseFloat(50).toFixed(2));
    setInnerText("total-tax", parseFloat(priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", parseFloat(60).toFixed(2));
    setInnerText("total-tax", parseFloat(priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  const total = parseFloat(grandTotal).toFixed(2)
  document.getElementById("total").innerText = total;
};
