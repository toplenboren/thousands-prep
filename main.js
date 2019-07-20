tinymce.init({
    selector:'textareaRich',
    menubar: false,
    statusbar: false,
    min_height: 500,
    init_instance_callback: function (editor) {
        editor.on('NodeChange', callback)
      }
});

const TextToTranslate = document.getElementById('TextForTranslation')
const Translation = document.getElementById('Translation')

TextToTranslate.oninput=function(){
    textToTranslate = TextToTranslate.value 
    getTranslation(textToTranslate)
};

function callback(e) {
    var textToTranslate = tinymce.activeEditor.selection.getContent({format: 'text'});
    TextToTranslate.value = textToTranslate
    getTranslation(textToTranslate)
};

function translate(textToTranslate){
    Translation.value = getTranslation(textToTranslate)
};

function getTranslation(textToTranslate){

    const key = "trnsl.1.1.20190720T175043Z.eefd3725047479a5.5c1244b67164e4c3fef0ffef00fdee0dbb18e02c"
    const lang = "en-ru"

    const request = new XMLHttpRequest();
    const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    const params = "key=" + key + "&text=" + textToTranslate + "&lang=" + lang;
 
    request.responseType =	"json";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let obj = request.response;
            Translation.value = obj.text
        }
    });
    
    request.send(params);
}
