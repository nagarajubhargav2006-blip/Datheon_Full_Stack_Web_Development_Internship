const STORAGE_KEY = 'cart_state_v1';
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 100;
const FLAT_SHIPPING = 10;

const state = {
  products: [],
  category: 'all',
  search: '',
  cart: loadCart()
};

const els = {
  productGrid: document.getElementById('productGrid'),
  statusMessage: document.getElementById('statusMessage'),
  searchInput: document.getElementById('searchInput'),
  filterBtns: document.querySelectorAll('.filter-btn'),
  openCartBtn: document.getElementById('openCartBtn'),
  closeCartBtn: document.getElementById('closeCartBtn'),
  cartDrawer: document.getElementById('cartDrawer'),
  drawerBackdrop: document.getElementById('drawerBackdrop'),
  cartItems: document.getElementById('cartItems'),
  cartBadge: document.getElementById('cartBadge'),
  subtotalVal: document.getElementById('subtotalVal'),
  taxVal: document.getElementById('taxVal'),
  shippingVal: document.getElementById('shippingVal'),
  totalVal: document.getElementById('totalVal'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  checkoutModal: document.getElementById('checkoutModal'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  checkoutForm: document.getElementById('checkoutForm'),
  modalTotalVal: document.getElementById('modalTotalVal'),
  orderConfirmation: document.getElementById('orderConfirmation')
};

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function matchesCategory(productCategory, selectedCategory) {
  const cat = (productCategory || '').toLowerCase();
  if (selectedCategory === 'all') return true;
  if (selectedCategory === 'clothing') return cat.includes('clothing');
  return cat === selectedCategory.toLowerCase();
}

function getFilteredProducts() {
  const q = state.search.trim().toLowerCase();
  return state.products.filter((p) => {
    const categoryOk = matchesCategory(p.category, state.category);
    const searchOk =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return categoryOk && searchOk;
  });
}

function addToCart(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  openDrawer();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function updateQuantity(productId, delta) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;

  const nextQty = item.quantity + delta;
  if (nextQty <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantity = nextQty;
  saveCart();
  renderCart();
}

function calculateTotal() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + tax + shipping;
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, tax, shipping, total, itemCount };
}

function formatMoney(amount) {
  return `₹${Number(amount).toFixed(2)}`;
}

function renderProducts() {
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    els.productGrid.innerHTML = '';
    els.statusMessage.textContent = 'No products match your search or filter.';
    els.statusMessage.classList.remove('hidden');
    return;
  }

  els.statusMessage.classList.add('hidden');
  els.productGrid.innerHTML = filtered
    .map((product) => {
      const rating = product.rating?.rate ?? 'N/A';
      const count = product.rating?.count ?? 0;
      const badgeText = product.rating?.rate >= 4.5 ? 'Top Rated' : product.category;

      return `
        <article class="card">
          <span class="badge-pill">${badgeText}</span>
          <div class="card-img-wrap">
            <img src="${product.image}" alt="${product.title}" loading="lazy" />
          </div>
          <h3 class="card-title" title="${product.title}">${product.title}</h3>
          <p class="card-rating">★ ${rating} (${count})</p>
          <div class="card-footer">
            <strong class="card-price">${formatMoney(product.price)}</strong>
            <button class="primary-btn small-btn" data-add-id="${product.id}">Add to Cart</button>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderCart() {
  const { subtotal, tax, shipping, total, itemCount } = calculateTotal();

  els.cartBadge.textContent = itemCount;
  els.subtotalVal.textContent = formatMoney(subtotal);
  els.taxVal.textContent = formatMoney(tax);
  els.shippingVal.textContent = shipping === 0 && subtotal > 0 ? 'FREE' : formatMoney(shipping);
  els.totalVal.textContent = formatMoney(total);
  els.modalTotalVal.textContent = formatMoney(total);
  els.checkoutBtn.disabled = state.cart.length === 0;

  if (state.cart.length === 0) {
    els.cartItems.innerHTML = '<p class="empty-cart">Your cart is currently empty.</p>';
    return;
  }

  els.cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" />
          <div class="cart-item-info">
            <h4>${item.title}</h4>
            <p>${formatMoney(item.price)} each</p>
            <div class="qty-controls">
              <button class="qty-btn" data-dec-id="${item.id}" aria-label="Decrease quantity">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-inc-id="${item.id}" aria-label="Increase quantity">+</button>
              <button class="remove-btn" data-rem-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `
    )
    .join('');
}

function openDrawer() {
  els.cartDrawer.classList.add('open');
  els.drawerBackdrop.classList.remove('hidden');
}

function closeDrawer() {
  els.cartDrawer.classList.remove('open');
  if (els.checkoutModal.classList.contains('hidden')) {
    els.drawerBackdrop.classList.add('hidden');
  }
}

function openCheckout() {
  els.orderConfirmation.classList.add('hidden');
  els.orderConfirmation.innerHTML = '';
  els.checkoutForm.classList.remove('hidden');
  els.checkoutModal.classList.remove('hidden');
  els.drawerBackdrop.classList.remove('hidden');
}

function closeCheckout() {
  els.checkoutModal.classList.add('hidden');
  if (!els.cartDrawer.classList.contains('open')) {
    els.drawerBackdrop.classList.add('hidden');
  }
}

async function init() {
  renderCart();

  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to load catalog');
    state.products = await res.json();
    renderProducts();
  } catch {
    els.statusMessage.textContent = 'Could not load products. Please refresh and try again.';
  }
}

els.filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    els.filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state.category = btn.dataset.category;
    renderProducts();
  });
});

els.searchInput.addEventListener('input', (e) => {
  state.search = e.target.value;
  renderProducts();
});

els.productGrid.addEventListener('click', (e) => {
  const addBtn = e.target.closest('[data-add-id]');
  if (addBtn) {
    addToCart(Number(addBtn.dataset.addId));
  }
});

els.cartItems.addEventListener('click', (e) => {
  const incBtn = e.target.closest('[data-inc-id]');
  const decBtn = e.target.closest('[data-dec-id]');
  const remBtn = e.target.closest('[data-rem-id]');

  if (incBtn) updateQuantity(Number(incBtn.dataset.incId), 1);
  if (decBtn) updateQuantity(Number(decBtn.dataset.decId), -1);
  if (remBtn) removeFromCart(Number(remBtn.dataset.remId));
});

els.openCartBtn.addEventListener('click', openDrawer);
els.closeCartBtn.addEventListener('click', closeDrawer);
els.checkoutBtn.addEventListener('click', openCheckout);
els.closeModalBtn.addEventListener('click', closeCheckout);

els.drawerBackdrop.addEventListener('click', () => {
  closeDrawer();
  closeCheckout();
});

els.checkoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const totals = calculateTotal();

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name, email },
        items: state.cart,
        totals
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Checkout failed');

    state.cart = [];
    saveCart();
    renderCart();
    els.checkoutForm.reset();
    els.checkoutForm.classList.add('hidden');
    els.orderConfirmation.classList.remove('hidden');
    els.orderConfirmation.innerHTML = `
      <h3>Order Confirmed</h3>
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>Customer:</strong> ${data.customer.name} (${data.customer.email})</p>
      <p><strong>Total:</strong> ${formatMoney(data.totals.total)}</p>
    `;
  } catch (err) {
    els.orderConfirmation.classList.remove('hidden');
    els.orderConfirmation.innerHTML = `<p>${err.message}</p>`;
  }
});

init();