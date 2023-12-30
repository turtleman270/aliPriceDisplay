updatingPricesGcp = false
updatingPricesW = false


//works with https://www.aliexpress.com/gcp
async function updatePricesGcp(mutations){
    if(updatingPricesGcp){
        return
    }
    updatingPricesGcp = true
    console.log(mutations)
    console.log("UPDATE PRICES PLEASE")
    products = document.querySelectorAll('.productContainer')
    for(product of products){
        if(product.getAttribute('updated')){
            continue;
        }
        try{
            let webpageUrl = product.href.split('?')[0]
            let actualPrice = await GET_PRICE_FROM_URL(webpageUrl)
            console.log(actualPrice)
            priceElement = product.children[1].children[0].children[0]
            while(priceElement.children.length>3){
                priceElement.removeChild(priceElement.lastElementChild)
            }
            priceElement.lastChild.innerHTML = actualPrice
            product.setAttribute('price', actualPrice)
            product.setAttribute('updated', 'true')
            console.log(product)

        }
        catch(exception){
            console.log(exception)
        }
    }
    updatingPricesGcp = false
}


//works with https://www.aliexpress.com/w
async function updatePricesW(mutations){
    if(updatingPricesW){
        return
    }
    updatingPricesW = true
    console.log(mutations)
    console.log("UPDATE PRICES PLEASE")
    products = document.querySelectorAll('.search-card-item')
    for(product of products){
        if(product.getAttribute('updated')){
            continue;
        }
        try{
            let webpageUrl = product.href.split('?')[0]
            let actualPrice = await GET_PRICE_FROM_URL(webpageUrl)
            console.log(actualPrice)

            priceElement = product.children[1].children[2].children[0]
            while(priceElement.children.length>2){
                priceElement.removeChild(priceElement.lastElementChild)
            }
            priceElement.lastChild.innerHTML = actualPrice
            product.setAttribute('price', actualPrice)
            product.setAttribute('updated', 'true')
            console.log(product)

        }
        catch(exception){
            console.log(exception)
        }
    }
    updatingPricesW = false
}


function handleMutation(mutations) {
    //console.log(mutations)
    mutations.forEach(async function (mutation) {
      if (mutation.addedNodes.length > 0) {
            console.log(mutation.addedNodes[0])
            await updatePricesGcp()
            await updatePricesW()
      }
    });
}

const observer = new MutationObserver(handleMutation);
const targetNode = document.body;
const config = { childList: true, subtree: true };
observer.observe(targetNode, config);
