let prices = document.querySelectorAll(".prices input");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");
let allInputs = document.querySelectorAll("input");
let tbody = document.querySelector("tbody");
let deleteAllBtn = document.querySelector("#delete-all");
let mode = "create";
let temp;
let search = document.querySelector("#search");
// Get total
function getTotal() {
  let result = +price.value + +taxes.value + +ads.value - +discount.value;
  total.innerHTML = ` Total : <span>${result}</span>`;
  total.classList.remove("not-active");
  total.classList.add("active");
}
[...prices].forEach(function (el) {
  el.addEventListener("blur", function () {
    if (price.value != "") {
      getTotal();
    } else {
      total.innerHTML = ` `;
    }
  });
});

// Create Product
let allProducts;
if (localStorage.product != null) {
  allProducts = JSON.parse(localStorage.product);
} else {
  allProducts = [];
}
submit.addEventListener("click", function (e) {
  e.preventDefault();
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mode === "create") {
      if (product.count > 1) {
        for (let i = 0; i <= product.count; i++) {
          allProducts.push(product);
        }
      } else {
        allProducts.push(product);
      }
    } else {
      allProducts[temp] = product;
      mode = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }

  localStorage.setItem("product", JSON.stringify(allProducts));
  showData();
  clearInputs();
});

// clear inputs
function clearInputs() {
  allInputs.forEach((el) => (el.value = ""));
}

// Read
function showData() {
  let row = "";
  for (let i = 0; i < allProducts.length; i++) {
    row += `
        <tr>
          <td>${i + 1}</td>
          <td>${allProducts[i].title}</td>
          <td>${allProducts[i].price}</td>
          <td>${allProducts[i].taxes}</td>
          <td>${allProducts[i].ads}</td>
          <td>${allProducts[i].discount}</td>
          <td>${allProducts[i].total}</td>
          <td>${allProducts[i].category}</td>
          <td><button onclick="updateData(${i})">update</button></td>
          <td><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>`;
  }
  tbody.innerHTML = row;
  if (allProducts.length > 0) {
    deleteAllBtn.innerHTML = `<button oncLick="deleteAll()">delete All (${allProducts.length})</button>`;
  } else {
    deleteAllBtn.innerHTML = ``;
  }
  total.classList.add("not-active");
  total.classList.remove("active");
}
showData();

// Delete
function deleteProduct(i) {
  allProducts.splice(i, 1);
  localStorage.product = JSON.stringify(allProducts);
  showData();
}

// Delete All
function deleteAll() {
  localStorage.clear();
  allProducts.splice(0);
  showData();
}

// Update
function updateData(i) {
  title.value = allProducts[i].title;
  price.value = allProducts[i].price;
  taxes.value = allProducts[i].taxes;
  ads.value = allProducts[i].ads;
  discount.value = allProducts[i].discount;
  category.value = allProducts[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mode = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMode = "title";

function getsearchMode(id) {
  if (id == "searctitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = `Search By ${searchMode}`;
  search.focus();
  search.value = "";
  showData();
}

function searchForProducts(value) {
  let row = "";
  for (let i = 0; i < allProducts.length; i++) {
    if (searchMode === "title") {
      if (allProducts[i].title.includes(value.toLowerCase())) {
        row += `
        <tr>
          <td>${i}</td>
          <td>${allProducts[i].title}</td>
          <td>${allProducts[i].price}</td>
          <td>${allProducts[i].taxes}</td>
          <td>${allProducts[i].ads}</td>
          <td>${allProducts[i].discount}</td>
          <td>${allProducts[i].total}</td>
          <td>${allProducts[i].category}</td>
          <td><button onclick="updateData(${i})">update</button></td>
          <td><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>`;
      }
    } else {
      if (allProducts[i].category.includes(value.toLowerCase())) {
        row += `
        <tr>
          <td>${i}</td>
          <td>${allProducts[i].title}</td>
          <td>${allProducts[i].price}</td>
          <td>${allProducts[i].taxes}</td>
          <td>${allProducts[i].ads}</td>
          <td>${allProducts[i].discount}</td>
          <td>${allProducts[i].total}</td>
          <td>${allProducts[i].category}</td>
          <td><button onclick="updateData(${i})">update</button></td>
          <td><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>`;
      }
    }
  }
  tbody.innerHTML = row;
}
