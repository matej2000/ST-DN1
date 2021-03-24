const loaded_files = new Array();
const img_tags = new Array();
const first = true;
// TODO:  zvezdica k sliki, opis k sliki (nevem mogoče bom kej popravil), prilagodi za različne naprave, mogoce dodaj se preview(predel ki ti pokaze sliko in opis, nato kliknes okej in se doda)
// FIXME: popravi ročno dodajanje elementov.
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
                    var preview = new Image();
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
                    text.innerHTML = "You cen add a description here.";
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
                        loaded_files.push(file);
                        document.getElementById("dzP").innerHTML = "";
                        preview.src = fr.result;
                        preview.style.display = "";
                        document.getElementById("drop_zone").appendChild(divOutside);
                        document.getElementById("drop_zone").style.outline= "";
                    }, false)
                    fr.readAsDataURL(file);
                    //document.getElementById("drop_zone").style.backgroundImage = "url('"+ file.name +"')";
                    console.log('... file[' + i + '].name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
                }
            }
            else{
                document.getElementById("drop_zone").style.outline = "";
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
    var drop_zone = document.getElementById("drop_zone");
    drop_zone.style.outline = "5px dashed grey"
    var dzp = document.getElementById("dzP");
    dzp.innerHTML = "Drag one or more images to this drop zone"

  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

function previewFile(){
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.style.display = "";
        loaded_files.push(file);
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function dragLeaveHandler(ev){
    document.getElementById("drop_zone").style.outline = "";
    document.getElementById("dzP").innerHTML = "";
    console.log("File left");
}

function dragEnterHandler(ev){
    document.getElementById("drop_zone").style.outline = "";
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