// variables
 
const listaTweets = document.getElementById('lista-tweets');

// event listener

eventListener();

function eventListener(){
    
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    listaTweets.addEventListener('click', borrarTare);
    document.addEventListener('DOMContentLoaded' , localStorageListo);
}

// Funciones
// Agregamos Tweet 
function agregarTweet(e){
    // paramos la accion por defecto
    e.preventDefault();
    // recuperamos el valor de la Tweet
    let tweet =  document.querySelector('#tweet').value;
    //crear boton borrar
    const btnBorrar = document.createElement('a');
    btnBorrar.classList = 'borrar-tweet';
    btnBorrar.innerText = 'X';
    // creamos elemento li  y lo añadimos al dom,
    // tambien añadimos el boton boorar al li
    const li =document.createElement('li');
    li.innerText = tweet;
    li.appendChild(btnBorrar);
    listaTweets.appendChild(li);
    // llamamos a la funcion para guardad en local
    agregatTweetLocalStorage(tweet);
}
// borramos el twet
function borrarTare(e){
    e.preventDefault();
    if ( e.target.className === 'borrar-tweet' ){
        e.target.parentElement.remove();
        // funcion para borrar de local
       borrarLocalStorage( e.target.parentElement.innerText);

    } else{
        console.log('Tweet no borrado');

    }

}
// cargamos en pantalla los tweets
function localStorageListo(){
    let tweets;
    tweets = obtenerTweets();
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
// agregamos a local los tweet
function agregatTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweets();
    tweets.push(tweet);
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
// recuperamos los tweet de local
function obtenerTweets(){
    let tweets;
    if(localStorage.getItem('tweets')=== null){
        tweets =  new Array();
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}
// borramos de local
function borrarLocalStorage( tweet){
    let tweets, borrarTw;
    tweets =  obtenerTweets();
    borrarTw = tweet.substring(0,tweet.length -1);
    tweets.forEach((tweet, index) =>{
        console.log(`Tweet: ${tweet} borrar: ${borrarTw}`)
        borrarTw  === tweet ? tweets.splice(index, 1): console.log(`No existe el tweet ${borrarTw}`)
    });
 
    localStorage.setItem('tweets',JSON.stringify(tweets));

}