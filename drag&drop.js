const loaded_files = new Array();
const img_tags = new Array();
var last_file;
var edit;

// TODO:  zvezdica k sliki


function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    var drop_zone = document.getElementById("border");
    drop_zone.style.outline = "5px dashed grey"
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

function previewFile(){
    const file = document.querySelector('input[type=file]').files[0];
    if(file.type.split("/")[0].localeCompare("image") == 0){
        const fr = new FileReader();
        var preview = document.getElementById("image_preview");

        fr.addEventListener("load",function(){
            visiblePreview();
            last_file = file;
            preview.src = fr.result;
            preview.style.display = "";
            document.getElementById("border").style.outline= "";
        }, false)
        fr.readAsDataURL(file);
        console.log('... file.name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
    }
    else{
        console.log("Error: wrong file format");
    }
}

function dropHandlerPreview(ev){
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if(ev.dataTransfer.items){
        for(var i = 0; i < ev.dataTransfer.items.length; i++){
            if(ev.dataTransfer.items[i].kind == 'file'){
                var file = ev.dataTransfer.items[i].getAsFile();
                if(file.type.split("/")[0].localeCompare("image") == 0){
                    var fr = new FileReader();
                    var preview = document.getElementById("image_preview");

                    fr.addEventListener("load",function(){
                        last_file = file;
                        preview.src = fr.result;
                        visiblePreview();
                        preview.style.display = "";
                        document.getElementById("border").style.outline= "";
                    }, false)
                    fr.readAsDataURL(file);
                    console.log('... file[' + i + '].name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
                }
            }
            else{
                document.getElementById("border").style.outline = "";
            }
        }
    }
}

function visiblePreview(){
    document.getElementById("dropP").style.visibility = "hidden";
    document.getElementById("buttons").style.visibility = "visible";
    var textArea = document.getElementById("description");
    textArea.style.visibility = "visible";
    document.getElementById("image_preview").style.visibility = "visible";
}

function clearPreview(){
    document.getElementById("buttons").style.visibility = "hidden";
    var textArea = document.getElementById("description");
    textArea.style.visibility = "hidden";
    textArea.value = "";
    document.getElementById("image_preview").style.visibility = "hidden";
    document.getElementById("dropP").style.visibility = "visible";
    document.getElementById("selectFile").value = "";
}

function addToGallery(){
    var fr = new FileReader();
    var file = last_file;
    var preview = new Image();
    var divOutside = document.createElement("div");
    var divInside = document.createElement("div");
    var text = document.createElement("p");
    
    preview.setAttribute('draggable', false);
    preview.style.maxWidth = "500px";
    divOutside.style.display = "inline-block";
    divOutside.style.padding = "20px 20px 20px 20px"
    divOutside.style.position = "relative";
    divInside.style.position = "relative";
    divInside.style.textAlign = "center";
    divInside.style.top = "50%";
    divInside.style.padding = "10px 20px 40px 10px";
    text.style.width = "100%";
    text.style.maxHeight = "100px";
    text.style.overflow = "hidden";
    text.innerHTML = document.getElementById("description").value;
    divInside.appendChild(preview);
    divInside.appendChild(text);
    divOutside.appendChild(divInside);

    console.log(document.getElementsByClassName("example_gallery")[0]);
    document.getElementsByClassName("example_gallery")[0].style.visibility = "hidden";
    document.getElementsByClassName("example_gallery")[0].style.position = "absolute";
    
    divOutside.addEventListener('dblclick', function (e) {
        document.getElementById("drop_zone").removeChild(this);
        showExample();
    });

    divOutside.addEventListener('contextmenu', function (e){
        document.getElementById("drop_zone").removeChild(this);
        
        var fr = new FileReader();
        var preview = document.getElementById("image_preview");
        preview.src = this.childNodes[0].childNodes[0].src;
        last_file = this.childNodes[0].childNodes[0];
        document.getElementById("description").value = this.childNodes[0].childNodes[1].innerHTML;
        visiblePreview();
        showExample();
    });
    

    if(file instanceof File){
        fr.addEventListener("load",function(){
            preview.src = fr.result;
            preview.style.display = "";
            document.getElementById("drop_zone").appendChild(divOutside);
        }, false)
        clearPreview();
        fr.readAsDataURL(file);
        console.log('... file.name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
    }
    else{
        preview.src = file.src;
        preview.style.display = "";
        document.getElementById("drop_zone").appendChild(divOutside);
        clearPreview();
    }
}

function showExample(){
    if(document.getElementById("drop_zone").childNodes.length <= 3){
        document.getElementsByClassName("example_gallery")[0].style.position = "relative";
        document.getElementsByClassName("example_gallery")[0].style.visibility = "visible";
    }
}


function dragLeaveHandler(ev){
    document.getElementById("border").style.outline = "";
    console.log("File left");
}

function dragEnterHandler(ev){
    document.getElementById("border").style.outline = "";
    console.log("File entered");
}



/*<!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <!-- jQuery library -->
   
    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript onerror="this.style.display='none'"-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>*/