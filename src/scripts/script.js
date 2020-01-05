
  
const prefix = "https://cors-anywhere.herokuapp.com/";

const tweetLink = "https://twitter.com/intent/tweet?text=";

const quoteUrl = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";


function getQuote() {
    fetch(prefix + quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet)
        .catch(function(error) {
          console.log(error);
      });
}

function createTweet(input) {
    let data = input[Math.ceil(Math.random() * 10)]; 

    let dataElement = document.createElement('div');
    dataElement.innerHTML = data.content.rendered;
    let quoteText = dataElement.innerText.trim();
    let quoteAuthor = data.title.rendered;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    let tweetText = "Quote of the day - "  + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
    	getQuote();
	}

	else {	
	    let tweet = tweetLink + encodeURIComponent(tweetText);	   
	    document.querySelector('.quote').innerText = quoteText;	   
	    document.querySelector('.author').innerText = "Author: " + quoteAuthor;
	    document.querySelector('.tweet').setAttribute('href', tweet);
	}

}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});

