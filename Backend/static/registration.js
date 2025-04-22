document.querySelectorAll(".role-option").forEach((elem)=>{
    elem.addEventListener("click",check=>{
        console.log(elem.innerHTML);
        
    if (elem.innerHTML == "Client") {
        document.querySelector("#register-form").setAttribute("action","/login/1")
         console.log(document.querySelector("#register-form").getAttribute("action")
        );

    }       
    else if (elem.innerHTML == "government") {
        id=0
    } 
    else if (elem.innerHTML == "Business") {
        id=-1
    } 
    })
})

