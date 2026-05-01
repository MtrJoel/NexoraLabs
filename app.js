const elements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});
elements.forEach(el => observer.observe(el));

let endDate;

// Intentar recuperar
if (localStorage.getItem('nexora_countdown')) {
  endDate = parseInt(localStorage.getItem('nexora_countdown'));
} else {
  const now = new Date().getTime();
  endDate = now + (30 * 24 * 60 * 60 * 1000); // 30 días
  localStorage.setItem('nexora_countdown', endDate);
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    document.getElementById('countdown').innerHTML = "OFERTA FINALIZADA";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById('countdown').innerHTML =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();