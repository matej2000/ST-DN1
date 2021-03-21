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
                   
                    fr.onload = function(e){
                        console.log(e.target.result);
                    }
                    //fr.readAsDataURL(file);
                    fr.addEventListener("load",function(){
                        preview.src = fr.result;
                    }, false)
                    fr.readAsDataURL(file);
                    //document.getElementById("drop_zone").style.backgroundImage = "url('"+ file.name +"')";
                    //document.getElementById("drop_zone").style.backgroundColor = "red";
                    console.log('... file[' + i + '].name = ' + file.name + ", type = " + file.type + ", src = " + file.src);
                }
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
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

function previewFile(){
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}