$("#spinner").hide();

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
            $uploadedImg[0].style.backgroundImage='url('+e.target.result+')';
    };

    reader.readAsDataURL(input.files[0]);
  }
}

var $form = $("#imageUploadForm"),
    $file = $("#file"),
    $uploadedImg = $("#uploadedImg"),
    $helpText = $("#helpText")
;

$file.on('change', function(){
  readURL(this);
  $form.addClass('loading');
});
$uploadedImg.on('webkitAnimationEnd MSAnimationEnd oAnimationEnd animationend', function(){
  $form.addClass('loaded');
});
$helpText.on('webkitAnimationEnd MSAnimationEnd oAnimationEnd animationend', function(){
  setTimeout(function() {

    $("#spinner").show();
    var fails = 0;
    var form = document.getElementById('imageUploadForm');
    var result = document.getElementById('result');
    result.innerHTML = "";
    var fileInput = document.getElementById('file');
    var file = fileInput.files[0];
    var formData = new FormData(form);
    formData.append('file', file);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
          result.innerHTML = this.responseText;
          $("#spinner").hide();
          $form.removeClass('loading').removeClass('loaded');
        }
      else if(this.readyState == 3) {
        result.innerHTML = ". . .";
      }
      else if(this.status != 200) {
        fails = fails + 1;
        if(fails > 1){
          result.innerHTML = "Oops something went wrong :/";
          $("#spinner").hide();
          $form.removeClass('loading').removeClass('loaded');
        }
        }
    }
    console.log("sending..?");
    console.log(formData);
    console.log(xhr);
    xhr.open('POST', '/upload', true);
    xhr.send(formData);

  }, 800);
});
