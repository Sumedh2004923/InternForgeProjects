document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('#navLinks .nav-link');

  function onScroll() {
    const scrollPos = window.scrollY + 120; 
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`#navLinks a[href="#${section.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // --- LIGHTBOX ---
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) {
    lightboxModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const imgSrc = button.getAttribute('data-bs-image');
      const img = document.getElementById('lightboxImage');
      img.src = imgSrc;
      img.alt = button.querySelector('img')?.alt || 'Gallery image';
    });
  }

  // --- CONTACT FORM VALIDATION ---
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); 
    formMsg.style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
      formMsg.style.display = 'none';
    }, 3000);
  });
}

  // --- TODAY'S SPECIAL ---
  const specials = [
    'Gobi rice',        
    'Davagere Benne Dose',             
    'Ghee rice',            
    'Brahmins Special',       
    'Jeera Rice',        
    'Palak rice',
    'Kashmiri palav'
  ];
  const specialBadge = document.getElementById('specialBadge');
  const specialText = document.getElementById('specialText');
  if (specialBadge && specialText) {
    const today = new Date().getDay(); 
    specialText.textContent = specials[today];
    specialBadge.classList.remove('visually-hidden');
    specialBadge.setAttribute('aria-hidden', 'false');
  }

  // --- DARK MODE TOGGLE ---
  const darkToggle = document.getElementById('darkToggle');
  const body = document.body;
  const saved = localStorage.getItem('bv-dark-mode');
  if (saved === '1') {
    body.classList.add('dark');
    if (darkToggle) {
      darkToggle.setAttribute('aria-pressed', 'true');
      darkToggle.innerHTML = '<i class="bi bi-brightness-high"></i>';
    }
  }
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark');
      darkToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      darkToggle.innerHTML = isDark ? '<i class="bi bi-brightness-high"></i>' : '<i class="bi bi-moon"></i>';
      localStorage.setItem('bv-dark-mode', isDark ? '1' : '0');
    });
  }

  // --- NAVBAR TOGGLER ACCESSIBILITY ---
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler) {
    navbarToggler.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') navbarToggler.click();
    });
  }

  // --- CART FUNCTIONALITY ---
  const cart = [];
  const cartList = document.getElementById('cartList');
  const cartTotal = document.getElementById('cartTotal');
  const payBtn = document.getElementById('payBtn');
  const cartToastEl = document.getElementById('cartToast');
  const cartToast = cartToastEl ? new bootstrap.Toast(cartToastEl) : null;

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      cart.push({ name, price });
      renderCart();
      if (cartToast) cartToast.show();
    });
  });

  function renderCart() {
    if (!cartList || !cartTotal || !payBtn) return;

    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        ${item.name} - ₹${item.price}
        <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">x</button>
      `;
      cartList.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    payBtn.disabled = cart.length === 0;

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        cart.splice(index, 1);
        renderCart();
      });
    });
  }

  if (payBtn) {
  payBtn.addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    
    if (cartToast) {
      cartToastEl.querySelector('.toast-body').textContent = `✅ Payment successful! Amount paid: ₹${total.toFixed(2)}`;
      cartToast.show();
    }

    cart.length = 0; // clear cart
    renderCart();
  });
}


  // --- RESERVE TABLE FORM ---
  const reserveForm = document.getElementById('reserveForm');
  const reserveAlert = document.getElementById('reserveAlert');
  if (reserveForm && reserveAlert) {
    reserveForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!reserveForm.checkValidity()) {
        reserveForm.classList.add('was-validated');
        reserveAlert.className = 'text-danger';
        reserveAlert.textContent = 'Please fill out all required fields correctly.';
        return;
      }
      reserveAlert.className = 'text-success';
      reserveAlert.textContent = '✅ Table reserved successfully!';
      reserveForm.reset();
      reserveForm.classList.remove('was-validated');
    });
  }

});
