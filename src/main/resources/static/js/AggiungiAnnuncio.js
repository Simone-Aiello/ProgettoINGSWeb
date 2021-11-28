var acceptedExtensions = ["image/png","image/jpg","image/jpeg"];
window.addEventListener("load",() =>{
	addDragAndDropListener();
});
function addDragAndDropListener(){
	let area = document.querySelector(".drag-area");
	//Prevent default sul dragover altrimenti l'evento drop sulle div non si attiva
	area.addEventListener("dragover",(ev) =>{
		ev.preventDefault();
	});
	area.addEventListener("drop",(ev)=>{
		console.log('File(s) dropped');
		  // Prevent default behavior (Prevent file from being opened)
		  ev.preventDefault();
		  if (ev.dataTransfer.items) {
		    // Use DataTransferItemList interface to access the file(s)
		    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
		      // If dropped items aren't files, reject them
		      if (ev.dataTransfer.items[i].kind === 'file') {
		        var file = ev.dataTransfer.items[i].getAsFile();
				if(acceptedExtensions.includes(file.type)){					
		        	console.log('... file[' + i + '].name = ' + file.name);
					let fileReader = new FileReader();
					fileReader.readAsDataURL(file);
					fileReader.addEventListener("load",() =>{
						let userUrl = fileReader.result;
						let imgTag = document.querySelector("#TEST");
						imgTag.setAttribute("src",userUrl);
						console.log(userUrl);
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
function handleFile(file){
	console.log("ciao")
}