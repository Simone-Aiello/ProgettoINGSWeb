var acceptedExtensions = ["image/png", "image/jpg", "image/jpeg"];
var numberOfImages = 0;
var listOfImages = new Map();

window.addEventListener("load", () => {
	addDragAndDropListener();
	addUploadListener();
});

function addDragAndDropListener() {
	let area = document.querySelector(".drag-area");
	//Prevent default sul dragover altrimenti l'evento drop sulle div non si attiva
	area.addEventListener("dragover", (ev) => {
		ev.preventDefault();
	});
	area.addEventListener("drop", (ev) => {
		console.log('File(s) dropped');
		// Prevent default behavior (Prevent file from being opened)
		ev.preventDefault();

		if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (ev.dataTransfer.items[i].kind === 'file') {
					var file = ev.dataTransfer.items[i].getAsFile();
					handleFile(file);
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

function addUploadListener(){
	let fileChooser = document.getElementById("fileChooser");
	fileChooser.onchange = function(){
		var fileList =  fileChooser.files;
		for(var i=0; i < fileList.length; i++){
			handleFile(fileList[i]);
		}
		fileChooser.value = "";
	}
}

var handleFile = function(file){
	let carousel = document.querySelector(".carousel-inner");
	let carouselIndicators = document.querySelector(".carousel-indicators");
	if (acceptedExtensions.includes(file.type)) {
		//console.log('... file[' + i + '].name = ' + file.name);
		let fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		let imageName = file.name.substr(0, file.name.lastIndexOf("."));
		fileReader.addEventListener("load", () => {
			if(listOfImages.has(imageName)){
				//alert("ALREADY ADDED THIS IMAGE");
				return;
			}
			var imageBuilder = new Image.Builder();
			imageBuilder.withValue(fileReader.result);
			var image = imageBuilder.build();
			listOfImages.set(imageName, image);
			numberOfImages = numberOfImages + 1;
			let divImage = document.createElement("div");
			//console.log(listOfImages);
			divImage.setAttribute("id", imageName);
			divImage.setAttribute("class", "carousel-item");
			let imageElement = document.createElement("img");
			imageElement.classList.add("d-block");
			imageElement.classList.add("w-100");
			imageElement.classList.add("resized-image");
			imageElement.setAttribute("src", fileReader.result);
			imageElement.setAttribute("id", "uploaded-image" + numberOfImages);
			
			let deleteButton = document.createElement("img");
			 //<img class = "carousel-control-delete" alt="delete" src="/images/x-lg.svg">
			deleteButton.classList.add("carousel-control-delete");
			deleteButton.classList.add("delete-button");
			deleteButton.setAttribute("alt", "delete");
			deleteButton.setAttribute("src", "/images/x-lg.svg");
			deleteButton.addEventListener("click", function(){
				//move visualization to the next image (drag&drop section if there are no other images)
				document.getElementById("nextButton").click();
				//alert("delete clicked");
				var carouselItemId = this.parentElement.getAttribute("id");
				//alert(carouselItemId);
				var carouselIndicator = document.querySelector("#sliderTo" + carouselItemId);
				//alert(carouselIndicator.getAttribute("id"));
				listOfImages.delete(carouselItemId);
				//console.log(listOfImages);
				carouselIndicator.remove();
				this.parentNode.remove();
				numberOfImages = numberOfImages-1;

			});
			
			divImage.appendChild(deleteButton);
			divImage.appendChild(imageElement);

							
			let lastButton = carouselIndicators.lastElementChild;
			let buttonElement = document.createElement("button");
			let attributes = lastButton.attributes;
			for(let i = 0; i < attributes.length;i++){
				let attributeName = attributes[i].nodeName;
				let attributeValue = attributes[i].nodeValue;
				if(attributeName === "data-bs-slide-to"){
					attributeValue = (parseInt(attributeValue,10) + 1).toString();
					console.log(parseInt(attributeValue,10));
					buttonElement.setAttribute("id" , "sliderTo" + imageName);
				}
				buttonElement.setAttribute(attributeName,attributeValue);
			}
			carouselIndicators.appendChild(buttonElement);
			carousel.appendChild(divImage);
		});
	}
}
