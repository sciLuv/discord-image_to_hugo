let imageItem = document.querySelectorAll('.image-item');
let images = document.querySelectorAll('.image-item img');
let lightbox = document.getElementById('lightbox');
let lightboxImg = document.getElementById('lightbox-img');
let zoomSlider = document.getElementById('zoom-slider');
let lightboxContainer = document.querySelector('.lightbox-container');
let imageNum = document.querySelector('.actual-img-num')
let totalImageNum = document.querySelector('.total-img-num')
let currentIndex = 0;
let scale = 1

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        openLightbox(index);
        imageItem.forEach((imgItem) => {
          imgItem.style.display = 'none';
        })
    });
});

function openLightbox(index) {
    
    currentIndex = index;
    lightbox.style.display = 'flex';
    lightboxImg.src = images[currentIndex].src;
    lightboxContainer.scrollTop = 0;

    imageNum.innerHTML = currentIndex+1
    totalImageNum.innerHTML = images.length+1
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxContainer.scrollTop = 0;

    imageNum.innerHTML = currentIndex+1
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxContainer.scrollTop = 0;

    imageNum.innerHTML = currentIndex+1
}

document.addEventListener("keydown", (event) => {
  if (lightbox.style.display == 'flex'){
    if (event.key === "ArrowLeft")  prevImage();
    else if (event.key === "ArrowRight") nextImage();
    else if (event.key === "Escape") closeLightbox()
  }
});



function scrollToBottom() {
  window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
  });
}


function updateScrollButton() {
    if (lightbox.style.display === 'flex') {
        document.body.classList.add('lightbox-active');
    } else {
        document.body.classList.remove('lightbox-active');
    }
}

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        openLightbox(index);
        updateScrollButton();
    });
});

function closeLightbox() {
    lightboxImg.style.transform = 'scale(1)';
    zoomSlider.value = 1;
    lightbox.style.display = 'none';
    imageItem.forEach((imgItem) => imgItem.style.display = 'block');
    updateScrollButton();
}

zoomSlider.addEventListener('input', () => {
    scale = zoomSlider.value;

    lightboxImg.style.transform = `scale(${scale})`;

    if (scale > 1) lightboxContainer.style.overflow = "auto";
    else lightboxContainer.style.overflow = "hidden";
    
    simulateCloseOpen();
});

document.addEventListener("wheel", (event) => {
  isNegOrPos = event.deltaY

  if (lightbox.style.display === 'flex') {
    
    if (isNegOrPos < 0)  scale = scale + 0.1
    else scale = scale - 0.1

    scale = Math.max(1, Math.min(scale, 2));

    zoomSlider.value = scale;
    lightboxImg.style.transform = `scale(${scale})`;

    
    if (scale > 1) lightboxContainer.style.overflow = "auto";
    else lightboxContainer.style.overflow = "hidden";
  
    simulateCloseOpen();
  }
});

function simulateCloseOpen() {
    lightboxContainer.style.display = "none"; 
    setTimeout(() => {
        lightboxContainer.style.display = "flex"; 
    }, 1);
}