const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
};

//Show new quote
const newQuote = () => {
    showLoadingSpinner();
    // Pick a random quote from API quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank and replace with "unknown"
    if (!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;
    }
    // Check quote length to determine style
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, hide loader
    removeLoadingSpinner();
    quoteText.textContent = quote.text;
}

// Get quotes from API
const getQuotes = async() => {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';    
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (err){
        alert(err)
    };
};

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

//On Load
getQuotes();