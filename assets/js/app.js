// variables
 
const listaTweets = document.getElementById('lista-tweets');

// event listener

eventListener();

function eventListener(){
    
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);
    listaTweets.addEventListener('click', borrarTare);
    document.addEventListener('DOMContentLoaded' , localStorageListo);
}

// Funciones

function agregarTarea(e){
    // paramos la accion por defecto
    e.preventDefault();
    // recuperamos el valor de la tarea
    let tweet =  document.querySelector('#tweet').value;
    //crear boton borrar
    const btnBorrar = document.createElement('a');
    btnBorrar.classList = 'borrar-tweet';
    btnBorrar.innerText = 'X';
    // creamos elemento li 
    const li =document.createElement('li');
    li.innerText = tweet;
    li.appendChild(btnBorrar);
    listaTweets.appendChild(li);
    agregatTareaLocalStorage(tweet);
}
function borrarTare(e){
    e.preventDefault();
    if ( e.target.className === 'borrar-tweet' ){
        e.target.parentElement.remove();
       borrarLocalStorage( e.target.parentElement.innerText);

    } else{
        console.log('Tarea no borrada');

    }

}

function localStorageListo(){
    let tweets;
    tweets = obtenerTareas();
    tweets.forEach(tweet => {
        const btnBorrar = document.createElement('a');
        btnBorrar.classList = 'borrar-tweet';
        btnBorrar.innerText = 'X';
        // creamos elemento li 
        const li =document.createElement('li');
        li.innerText = tweet;
        li.appendChild(btnBorrar);
        listaTweets.appendChild(li);       
    });
}
function agregatTareaLocalStorage(tweet){
    let tweets;
    tweets = obtenerTareas();
    tweets.push(tweet);
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function obtenerTareas(){
    let tweets;
    if(localStorage.getItem('tweets')=== null){
        tweets =  new Array();
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

function borrarLocalStorage( tweet){
    let tweets, borrarTw;
    tweets =  obtenerTareas();
    borrarTw = tweet.substring(0,tweet.length -1);
    tweets.forEach((tweet, index) =>{
        console.log(`Tweet: ${tweet} borrar: ${borrarTw}`)
        borrarTw  === tweet ? tweets.splice(index, 1): console.log(`No existe el tweet ${borrarTw}`)
    });
 
    localStorage.setItem('tweets',JSON.stringify(tweets));

}