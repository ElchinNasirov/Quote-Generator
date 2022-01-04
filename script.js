const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader");

let apiQuotes = []

// Show Loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader
const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get Quotes from API
const getQuotes = async () => {
    loading();
    try {
        const res = await fetch("https://type.fit/api/quotes");
        apiQuotes = await res.json();
        newQuote()
    } catch {
        // Error handling but not using for this project
    }
}

// Getting a single new quote
const newQuote = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Checks if the author exists
    if (!quote.author) {
        quoteAuthor.textContent = "Unknown Author";
    } else {
        quoteAuthor.textContent = `${"- "} ${quote.author}`;
    }

    // Checks quote length to determine styling by adding a class name
    if (quote.text.length > 120){
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = `${'"'} ${quote.text} ${'"'}`;
    complete();
}

// Tweeting a Quote function
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

getQuotes();


// Getting a Quote using a local array

// const newQuote = () => {
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//     console.log(quote)
// }

// newQuote()