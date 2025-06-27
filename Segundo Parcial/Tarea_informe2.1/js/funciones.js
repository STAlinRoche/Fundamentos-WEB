// Redirigir al hacer clic en logout
document.addEventListener('DOMContentLoaded', function () {
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      // Cambia esta ruta a la que desees
      window.location.href = 'index.html';
    });
  }

  // Mostrar u ocultar la sidebar al pasar el mouse
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.addEventListener('mouseenter', () => {
      sidebar.classList.add('sidebar-expandida');
    });

    sidebar.addEventListener('mouseleave', () => {
      sidebar.classList.remove('sidebar-expandida');
    });
  }
});
