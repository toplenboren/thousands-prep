tinymce.init({
    selector:'textareaRich',
    menubar: false,
    statusbar: false,
    min_height: 500,
    init_instance_callback: function (editor) {
        editor.on('NodeChange', callback)
        editor.on('KeyPress', updateCount)
      }
});

const TextToTranslate = document.getElementById('TextForTranslation')
const Translation = document.getElementById('Translation')
const Push = document.getElementById('Push')
const Pop = document.getElementById('Pop')
const Info = document.getElementById('Info')
const StaticWordCount = document.getElementById('StaticWordCount')
const StaticWordlistCount = document.getElementById('StaticWordlistCount')

const wordList = new Stack();

TextToTranslate.oninput=function(){
    textToTranslate = TextToTranslate.value 
    getTranslation(textToTranslate)
};

function countSymbolsWOSpaces(){
    var textRaw = tinyMCE.activeEditor.getContent({format: 'text'})
    // var spaceCount = (textRaw.split(" ").length - 1);
    // return textRaw.length - spaceCount
    return textRaw.replace(/\s/g,'').length
}

Push.onclick=function(){
    if(canAddNewEntry()){
        alert("New word pushed " + formWordlistEntry())
        wordList.push(formWordlistEntry())
    }
    StaticWordlistCount.value = wordList.getQuanityOfElements()
}

Pop.onclick=function(){
    wordList.pop()
    StaticWordlistCount.value = wordList.getQuanityOfElements()
}

Info.onclick=function(){    
    wordListElements = wordList.getElementsList().join('\n')
    alert(wordListElements)
}

function canAddNewEntry(){
    return TextToTranslate.value != "" && Translation.value != "";
} 

function formWordlistEntry(){
    return TextToTranslate.value + " | " + Translation.value;
}

function updateCount(e) {
    var sym = countSymbolsWOSpaces()
    StaticWordCount.value = sym
}

function callback(e) {
    var textToTranslate = tinymce.activeEditor.selection.getContent({format: 'text'});
    TextToTranslate.value = textToTranslate
    getTranslation(textToTranslate)
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
