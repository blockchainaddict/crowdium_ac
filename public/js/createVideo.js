addEventListener('load', function(){


    let linkInput = document.querySelector(".link_input");
    let linkMessage = document.querySelector(".link_message");
    let popup = document.getElementById("myPopup");

    linkInput.addEventListener('focus', function(){
        linkMessage.classList.add('show')
    });
    

    linkInput.addEventListener('blur', function(){
        let regEx = /watch/;
        if(!regEx.test(linkInput.value)){
            popup.classList.toggle("show");
        }
    });

    
})