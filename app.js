`use strict`

let clearButon = document.getElementById('btn-clear');
let searchButon = document.getElementById('btn-search');
let ınput = document.getElementById('formInput'); 
let imagesWrapper = document.querySelector('.images-wrapper')

// Temizle butonuna tıklanınca inputun value değeri silindi
clearButon.addEventListener('click', ()=>{ 
    ınput.value = '';
    Array.from(imagesWrapper.children).forEach(childDiv => {
        childDiv.remove();
    });
})

// Ara butonun tıklanınca inputtaki value ile işlem yap
searchButon.addEventListener('click', searchClick)

function searchClick(){
    const ınputValue = ınput.value.trim();
        
    fetch(`https://api.unsplash.com/search/photos?query=${ınputValue}`, {
        method : "GET",
        headers : {
            Authorization: "Client-ID zHbmvD7k7sG8EgYElRmPf_DiOsdzlb7lqpCEln5ut4Y"
        }
    })
    .then((response)=>response.json())
    .then((data)=> {
        (data.results).forEach(images => {
            const urls =images.urls.small
            addImagesToUI(urls)
        });
    })
    .catch((error)=>{
        console.log(error)
    })
}

function addImagesToUI(urls){
    let div = document.createElement('div');
    let img = document.createElement('img');
    let a = document.createElement('a'); // Yeni anchor etiketi oluştur

    div.className = 'image-cards';
    
    a.setAttribute("href", urls);  // Görsele tıklandığında yönlendirme
    a.setAttribute("target", "_blank"); // Yeni sekmede aç

    img.setAttribute("src", urls);
    img.height = '400';
    img.width = '350';
    img.style.padding = '20px';  // 'px' ekleyerek CSS geçerli hale getir
    img.style.margin = '20px';
    img.style.border = '2px solid black';  // Border stilini tam tanımla

    a.appendChild(img);  // Görseli anchor içine ekle
    div.appendChild(a);  // Anchor'u div içine ekle

    imagesWrapper.append(div);  // Oluşturulan yapıyı DOM'a ekle
}



