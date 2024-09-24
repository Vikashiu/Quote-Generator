
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.querySelector('.loader');
let apiQuotes ;
//show loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// get quotes from api
function newQuote(){
    if(quoteText.textContent.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = apiQuotes.quote;
    authorText.textContent = '~'+apiQuotes.author;
        

}
async function getQuotes(){
    loading();
    fetch('https://quotes-api-self.vercel.app/quote')
  .then(response => response.json())
  .then(data => {
    // Handle the retrieved quote
    apiQuotes = data;
    newQuote();

    complete();
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click',getQuotes);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();
// loading();
// complete();