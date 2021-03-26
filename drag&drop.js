const loaded_files = new Array();
const img_tags = new Array();
var last_file;
var edit;

// TODO:  zvezdica k sliki, opis k sliki (nevem mogoče bom kej popravil), prilagodi za različne naprave
// FIXME: Urejanje elementov, en se uredu doda za urejnje ostali ne. Najbrs je neki narobe z spremenljivko last_file.
function dropHandler(ev){
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if(ev.dataTransfer.items){
        for(var i = 0; i < ev.dataTransfer.items.length; i++){
            if(ev.dataTransfer.items[i].kind == 'file'){
                var file = ev.dataTransfer.items[i].getAsFile();
                if(file.type.split("/")[0].localeCompare("image") == 0){
                    var fr = new FileReader();
                    //var preview = document.querySelector('img');
                    var preview = getElementById("image_preview");
                    var divOutside = document.createElement("div");
                    var divInside = document.createElement("div");
                    var text = document.createElement("p");
                    
                    divOutside.style.display = "inline-block";
                    divOutside.style.padding = "20px 20px 20px 20px"
                    divOutside.style.position = "relative";
                    divInside.style.position = "relative";
                    divInside.style.textAlign = "center";
                    divInside.style.top = "50%";
                    divInside.style.width = "300px";
                    divInside.style.padding = "10px 20px 40px 10px";
                    /*divInside.style.backgroundColor = "#eeeeee";*/
                    text.contentEditable = "true";
                    text.style.width = "300px";
                    text.style.maxHeight = "100px";
                    text.style.overflow = "hidden";
                    text.innerHTML = "You can add a description here.";
                    divInside.appendChild(preview);
                    divInside.appendChild(text);
                    divOutside.appendChild(divInside);
                    
                    divOutside.addEventListener('dblclick', function (e) {
                        console.log("Double click");
                        document.getElementById("drop_zone").removeChild(this);
                      });
                   
                    /*fr.onload = function(e){
                        console.log(e.target.result);
                    }*/
                    fr.addEventListener("load",function(){
                        preview.src = fr.result;
                        preview.style.display = "";
                        document.getElementById("drop_zone").appendChild(divOutside);
                        document.getElementById("pereview_zone").style.outline= "";
                    }, false)
                    fr.readAsDataURL(file);
                    //document.getElementById("drop_zone").style.backgroundImage = "url('"+ file.name +"')";
                    console.log('... preview file[' + i + '].name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
                }
            }
            else{
                document.getElementById("border").style.outline = "";
                document.getElementById("dzP").innerHTML = "";
                //document.getElementById("drop_zone").innerHTML = "Ups something went wrong with loading your file"
            }
        }
    }
    else{
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
    }
}

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
        //document.getElementById("drop_zone").style.backgroundImage = "url('"+ file.name +"')";
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
                    //document.getElementById("drop_zone").style.backgroundImage = "url('"+ file.name +"')";
                    console.log('... file[' + i + '].name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
                }
            }
            else{
                document.getElementById("border").style.outline = "";
                document.getElementById("dzP").innerHTML = "";
                //document.getElementById("drop_zone").innerHTML = "Ups something went wrong with loading your file"
            }
        }
    }
}

function visiblePreview(){
    document.getElementById("dropP").style.visibility = "hidden";
    document.getElementById("buttons").style.visibility = "";
    var textArea = document.getElementById("description");
    textArea.style.visibility = "";
    document.getElementById("image_preview").style.visibility = "";
}

function clearPreview(){
    document.getElementById("buttons").style.visibility = "hidden";
    var textArea = document.getElementById("description");
    textArea.style.visibility = "hidden";
    textArea.value = "";
    document.getElementById("image_preview").style.visibility = "hidden";
    document.getElementById("dropP").style.visibility = "";
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
    divOutside.style.display = "inline-block";
    divOutside.style.padding = "20px 20px 20px 20px"
    divOutside.style.position = "relative";
    divInside.style.position = "relative";
    divInside.style.textAlign = "center";
    divInside.style.top = "50%";
    divInside.style.width = "300px";
    divInside.style.padding = "10px 20px 40px 10px";
    /*divInside.style.backgroundColor = "#eeeeee";*/
    text.style.width = "300px";
    text.style.maxHeight = "100px";
    text.style.overflow = "hidden";
    text.innerHTML = document.getElementById("description").value;
    divInside.appendChild(preview);
    divInside.appendChild(text);
    divOutside.appendChild(divInside);
    
    divOutside.addEventListener('dblclick', function (e) {
        document.getElementById("drop_zone").removeChild(this);
    });

    divOutside.addEventListener('contextmenu', function (e){
        document.getElementById("drop_zone").removeChild(this);
        
        var fr = new FileReader();
        var preview = document.getElementById("image_preview");
        preview.src = this.childNodes[0].childNodes[0].src;
        document.getElementById("description").value = this.childNodes[0].childNodes[1].innerHTML;
        visiblePreview();
        /*fr.addEventListener("load",function(){
            last_file = file;
            preview.src = fr.result;
            visiblePreview();
            preview.style.display = "";
            document.getElementById("border").style.outline= "";
        }, false)
        fr.readAsDataURL(file);*/
    });
    
    /*fr.onload = function(e){
        console.log(e.target.result);
    }*/
    fr.addEventListener("load",function(){
        preview.src = fr.result;
        preview.style.display = "";
        document.getElementById("drop_zone").appendChild(divOutside);
    }, false)
    clearPreview();
    fr.readAsDataURL(file);
    //document.getElementById("drop_zone").style.backgroundImage = "url('"+ file.name +"')";
    console.log('... file.name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
}



function dragLeaveHandler(ev){
    document.getElementById("border").style.outline = "";
    document.getElementById("dzP").innerHTML = "";
    console.log("File left");
}

function dragEnterHandler(ev){
    document.getElementById("border").style.outline = "";
    document.getElementById("dzP").innerHTML = "";
    console.log("File entered");
}


/*function dragOverHandler(ev){
    console.log("File over");
}*/




/*<!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <!-- jQuery library -->
   
    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript onerror="this.style.display='none'"-->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>*/