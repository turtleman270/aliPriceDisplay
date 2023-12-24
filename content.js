/*
webpageUrl = 'https://www.aliexpress.com/item/1005005569750976.html'
pageResponse = await fetch(webpageUrl)
pageText = await pageResponse.text()
actualPrice = pageText.match(/actCurrencyFormatPrice\":\".*?\"/)[0]

*/

async function updatePrices(){
    products = document.querySelectorAll('.productContainer')
    for(product of products){
        if(product.getAttribute('updated')){
            continue;
        }
        try{
            product.setAttribute('updated', 'true')
            console.log(product)
            let webpageUrl = product.href.split('?')[0]
            let pageResponse = await fetch(webpageUrl)
            let pageText = await pageResponse.text()
            let actualPrice = pageText.match(/actCurrencyFormatPrice\":\".*?\"/)[0].split('-')[1].slice(1,-1)
            console.log(actualPrice)
            priceElement = product.children[1].children[0].children[0]
            while(priceElement.children.length>3){
                priceElement.removeChild(priceElement.lastElementChild)
            }
            priceElement.lastChild.innerHTML = actualPrice
            product.setAttribute('price', actualPrice)


        }
        catch(exception){
            console.log(exception)
        }
    }
}

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


async function first(){
    target = await waitForElm('#aec-list-container')
    let observer = new MutationObserver(updatePrices);
    observer.observe(target, {childList: true, subtree: true});
}


first()


