function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

async function GET_PRICE_FROM_URL(webpageUrl){
    let pageResponse = await fetch(webpageUrl)
    let pageText = await pageResponse.text()
    let actualPrice = pageText.match(/actCurrencyFormatPrice\":\".*?\"/)[0].split('-')[1].slice(1,-1)
    console.log(actualPrice)
    return actualPrice
}
