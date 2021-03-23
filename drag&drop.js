const loaded_files = new Array();
const img_tags = new Array();
// TODO: prikazovanje več slik(zanka for skozi loaded_files), zvezdica k sliki, opis k sliki, izbirsi sliko, prilagodi za različne naprave
// FIXME: popravi premikanje slik, popravi bug infinit loop ko prehajas cez sliko.
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
                    var preview = document.querySelector('img');
                   
                    /*fr.onload = function(e){
                        console.log(e.target.result);
                    }*/
                    fr.addEventListener("load",function(){
                        loaded_files.push(file);
                        document.getElementById("dzP").innerHTML = "";
                        preview.src = fr.result;
                        preview.style.display = "";
                        document.getElementById("drop_zone").style.border = "";
                    }, false)
                    fr.readAsDataURL(file);
                    //document.getElementById("drop_zone").style.backgroundImage = "url('"+ file.name +"')";
                    console.log('... file[' + i + '].name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
                }
            }
            else{
                document.getElementById("drop_zone").style.border = "";
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
    drop_zone.style.border = "5px dashed grey"
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
    document.getElementById("drop_zone").style.border = "";
    document.getElementById("dzP").innerHTML = "";
    console.log("File left");
}

function dragEnterHandler(ev){
    document.getElementById("drop_zone").style.border = "";
    document.getElementById("dzP").innerHTML = "";
    console.log("File entered");
}

/*function dragOverHandler(ev){
    console.log("File over");
}*/