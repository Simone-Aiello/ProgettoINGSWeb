var acceptedExtensions = ["image/png", "image/jpg", "image/jpeg"];
var numberOfImages = 0;
window.addEventListener("load", () => {
	addDragAndDropListener();
	//addDeleteImageListener();
	addUploadListener();
});
/*
function addDeleteImageListener() {
	let button = document.querySelector(".carousel-control-delete");
	button.addEventListener("click", () => {
		let current = document.querySelector(".active img");
		console.log(current.getAttribute("src"));
	});


}*/
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
		fileReader.addEventListener("load", () => {
			numberOfImages = numberOfImages + 1;
			let divImage = document.createElement("div");
			divImage.setAttribute("id", "img" + numberOfImages);
			divImage.setAttribute("class", "carousel-item");
			let imageElement = document.createElement("img");
			imageElement.setAttribute("class", "d-block w-100 resized-image");
			imageElement.setAttribute("src", fileReader.result);
			imageElement.setAttribute("id", "uploaded-image");
			
			let deleteButton = document.createElement("img");
			 //<img class = "carousel-control-delete" alt="delete" src="/images/x-lg.svg">
			deleteButton.classList.add("carousel-control-delete");
			deleteButton.classList.add("delete-button");
			deleteButton.setAttribute("alt", "delete");
			deleteButton.setAttribute("src", "/images/x-lg.svg");
			deleteButton.addEventListener("click", function(){
				document.getElementById("nextButton").click();
				//alert("delete clicked");
				var carouselItemId = this.parentElement.getAttribute("id");
				//alert(carouselItemId);
				var carouselIndicator = document.querySelector("#sliderTo" + carouselItemId);
				//alert(carouselIndicator.getAttribute("id"));
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
					buttonElement.setAttribute("id" , "sliderToimg" + (parseInt(attributeValue,10)).toString());
				}
				buttonElement.setAttribute(attributeName,attributeValue);
			}
			carouselIndicators.appendChild(buttonElement);
			carousel.appendChild(divImage);
		});
	}
}
