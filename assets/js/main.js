// ===== Back to Top Button =====
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '&#8679;';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Toast Notification System =====
function showToast(message, duration = 3000) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 3000);
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address.', 3000);
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        showToast('Thank you, ' + name + '! Your message has been sent. We will get back to you soon.', 4000);
        contactForm.reset();
      } else {
        response.json().then(data => {
          if (data.errors) {
            showToast('Oops! There was a problem sending your message. Please try again.', 4000);
          }
        });
      }
    })
    .catch(() => {
      showToast('Oops! There was a network error. Please try again.', 4000);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  });
}

// ===== Active Nav Link Highlighting =====
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    link.classList.toggle('active', linkPath === currentPath);
  });
});

// ===== Product Search Filter =====
const productSearch = document.getElementById('productSearch');
if (productSearch) {
  productSearch.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.category-item').forEach(item => {
      const name = item.querySelector('h3').textContent.toLowerCase();
      const desc = item.querySelector('p').textContent.toLowerCase();
      item.closest('.col-6, .col-md-4, .col-lg-3, .col-lg').style.display =
        (name.includes(query) || desc.includes(query)) ? '' : 'none';
    });
  });
}
