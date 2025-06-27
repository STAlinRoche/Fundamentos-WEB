let progress = 0;
const percentageText = document.getElementById('percentage');
const bienvenida = document.getElementById('bienvenida');

function animateProgress() {
  if (progress <= 100) {
    percentageText.textContent = `${progress}%`;
    progress++;
    setTimeout(animateProgress, 30);
  } else {
    percentageText.style.display = "none";
    bienvenida.style.display = "block";
    setTimeout(() => {
      window.location.href = "main.html"; 
    }, 2000);
  }
}

animateProgress();
