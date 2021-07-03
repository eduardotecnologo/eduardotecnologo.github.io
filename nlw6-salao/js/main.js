const nav = document.querySelector('#header nav');
const toggle = document.querySelectorAll('nav .toggle');


for(const element of toggle){
    //console.log(element)
    element.addEventListener('click', function(){
        nav.classList.toggle('show');
    });
}

// Esconder o menu ao clicar nos links
const links = document.querySelectorAll('nav ul li a');

for(const link of links){   
    link.addEventListener('click', function(){
        nav.classList.remove('show');
    });
}