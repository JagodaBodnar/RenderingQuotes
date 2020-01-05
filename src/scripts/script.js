
  
var prefix = "https://cors-anywhere.herokuapp.com/";

var tweetLink = "https://twitter.com/intent/tweet?text=";

var quoteUrl = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";


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
    var data = input[Math.ceil(Math.random() * 10)]; 

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content.rendered;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title.rendered;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    var tweetText = "Quote of the day - "  + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
    	getQuote();
	}

	else {	
	    var tweet = tweetLink + encodeURIComponent(tweetText);	   
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

