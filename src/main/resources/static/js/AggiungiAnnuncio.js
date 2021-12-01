var acceptedExtensions = ["image/png", "image/jpg", "image/jpeg"];
window.addEventListener("load", () => {
	addDragAndDropListener();
	addDeleteImageListener();
});
function addDeleteImageListener() {
	let button = document.querySelector(".carousel-control-delete");
	button.addEventListener("click", () => {
		let current = document.querySelector(".active img");
		console.log(current.getAttribute("src"));
	});

}
function addDragAndDropListener() {
	let area = document.querySelector(".drag-area");
	//Prevent default sul dragover altrimenti l'evento drop sulle div non si attiva
	area.addEventListener("dragover", (ev) => {
		ev.preventDefault();
	});
	/*
		<div class="carousel-item">
			<img src="../images/immagine1.jpg" class="d-block w-100" alt="...">
		</div>
	 */
	area.addEventListener("drop", (ev) => {
		console.log('File(s) dropped');
		// Prevent default behavior (Prevent file from being opened)
		ev.preventDefault();
		let carousel = document.querySelector(".carousel-inner");
		let carouselIndicators = document.querySelector(".carousel-indicators");
		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (ev.dataTransfer.items[i].kind === 'file') {
					var file = ev.dataTransfer.items[i].getAsFile();
					if (acceptedExtensions.includes(file.type)) {
						console.log('... file[' + i + '].name = ' + file.name);
						let fileReader = new FileReader();
						fileReader.readAsDataURL(file);
						fileReader.addEventListener("load", () => {
							let divElement = document.createElement("div");
							divElement.setAttribute("class", "carousel-item");
							let imageElement = document.createElement("img");
							imageElement.setAttribute("class", "d-block w-100 resized-image");
							imageElement.setAttribute("src", fileReader.result);
							imageElement.setAttribute("id", "uploaded-image");
							divElement.appendChild(imageElement);
							//<button type="button" data-bs-target="#upoloaded-image" data-bs-slide-to="1" aria-label="Slide 2"></button>
							let lastButton = carouselIndicators.lastElementChild;
							let lastButtonNumber = lastButton.getAttribute("data-bs-slide-to");
							let buttonElement = document.createElement("button");
							let attributes = lastButton.attributes;
							for(let i = 0; i < attributes.length;i++){
								let attributeName = attributes[i].nodeName;
								let attributeValue = attributes[i].nodeValue;
								if(attributeName === "data-bs-slide-to"){
									attributeValue = (parseInt(attributeValue,10) + 1).toString();
									console.log(parseInt(attributeValue,10));
								}
								buttonElement.setAttribute(attributeName,attributeValue);
							}
							carouselIndicators.appendChild(buttonElement);
							carousel.appendChild(divElement);
						});
					}
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.files.length; i++) {
				console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
			}
		}
	});

}
function handleFile(file) {
	console.log("ciao")
}