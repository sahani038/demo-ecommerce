const products = [
    { id: 1, name: "T-shirt", image: "https://via.placeholder.com/200", price: 19.99, rating: 4.5 },
    { id: 2, name: "Jeans", image: "https://via.placeholder.com/200", price: 39.99, rating: 4.0 },
    { id: 3, name: "Dress", image: "https://via.placeholder.com/200", price: 49.99, rating: 5.0 },
    { id: 4, name: "Jacket", image: "https://via.placeholder.com/200", price: 89.99, rating: 4.2 },
    { id: 5, name: "Sneakers", image: "https://via.placeholder.com/200", price: 59.99, rating: 4.7 },
    { id: 6, name: "Hat", image: "https://via.placeholder.com/200", price: 15.99, rating: 4.3 },
    { id: 7, name: "Sunglasses", image: "https://via.placeholder.com/200", price: 29.99, rating: 4.1 },
    { id: 8, name: "Scarf", image: "https://via.placeholder.com/200", price: 25.99, rating: 4.6 },
    { id: 9, name: "Belt", image: "https://via.placeholder.com/200", price: 19.99, rating: 4.5 },
    { id: 10, name: "Shorts", image: "https://via.placeholder.com/200", price: 29.99, rating: 4.4 },
    { id: 11, name: "Shorts", image: "https://via.placeholder.com/200", price: 29.99, rating: 4.4 },
    { id: 12, name: "Shorts", image: "https://via.placeholder.com/200", price: 29.99, rating: 4.4 },
    { id: 13, name: "Shorts", image: "https://via.placeholder.com/200", price: 29.99, rating: 4.4 },
    { id: 14, name: "Shorts", image: "https://via.placeholder.com/200", price: 29.99, rating: 4.4 },
];

let currentPage = 0;
const itemsPerPage = 8;

function displayProducts() {
    const grid = document.getElementById("productGrid");
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = products.slice(start, end);
    grid.innerHTML = '';

    pageProducts.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <p> ${product.rating}<span class="orange-star">★</span></p>
`;
        grid.appendChild(card);
    });

    const loading = document.getElementById("loading");
    loading.style.display = pageProducts.length ? 'none' : 'block';

    document.getElementById("prevPage").disabled = currentPage === 0;
    document.getElementById("nextPage").disabled = end >= products.length;
}

document.getElementById("loadMore").addEventListener("click", () => {
    currentPage++;
    displayProducts();
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        displayProducts();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(products.length / itemsPerPage) - 1) {
        currentPage++;
        displayProducts();
    }
});

document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navWindow").classList.toggle("active");
});

document.getElementById("closeNav").addEventListener("click", () => {
    document.getElementById("navWindow").classList.remove("active");
});

// Filter toggle functionality
const filterToggle = document.getElementById("filterToggle");
const closeFilters = document.getElementById("closeFilters");
const filters = document.getElementById("filters");
const productsSection = document.querySelector(".products");

function toggleFilters() {
    const isFilterVisible = filters.style.display === "block";
    filters.style.display = isFilterVisible ? "none" : "block";
    filterToggle.textContent = isFilterVisible ? "Show Filters" : "Hide Filters";
    filterToggle.setAttribute("aria-expanded", !isFilterVisible);

    if (window.innerWidth > 768) {
        productsSection.style.marginLeft = isFilterVisible ? "0" : "20px";
    } else {
        productsSection.style.marginLeft = "0";
    }
}

filterToggle.addEventListener("click", toggleFilters);
closeFilters.addEventListener("click", toggleFilters);

// Update filter visibility and layout
function updateFilterVisibility() {
    if (window.innerWidth > 768) {
        filterToggle.style.display = "inline-block";
        filters.style.display = "none";
        productsSection.style.marginLeft = "0";
        filterToggle.textContent = "Show Filters";
        filterToggle.setAttribute("aria-expanded", "false");
    } else {
        filterToggle.style.display = "inline-block";
        filters.style.display = "none";
        productsSection.style.marginLeft = "0";
        filterToggle.textContent = "Show Filters";
        filterToggle.setAttribute("aria-expanded", "false");
    }
}

window.addEventListener("resize", updateFilterVisibility);
updateFilterVisibility();

let cartCount = 0;

document.getElementById('addToCart').addEventListener('click', function () {
    const quantity = parseInt(document.getElementById('quantity').value);
    cartCount += quantity;
    document.getElementById('cartStatus').textContent = `Cart: ${cartCount} items`;
});

// Initialize the product display
displayProducts();
