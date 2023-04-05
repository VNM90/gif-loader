export function displayImages(imageData, imageContainer) {
    imageContainer.innerHTML = '';
    
    imageData.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.images.fixed_width.url;
        imgElement.alt = image.title;
        imageContainer.appendChild(imgElement);
    });
    }

 