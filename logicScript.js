const getCardsContainer = document.querySelector(".cards-container");
const getStartButton = document.querySelector(".start-button");
let chosenAmountOfCards = 0;
let amountOfCards = chosenAmountOfCards;
let lastCardClicked = -1;
let currentCardClicked = -1;
let clicksPerformed = 0;
let cardIdNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const listOfImages =[
    "/images/billy.png",
    "/images/charmander.png",
    "/images/coraje.png",
    "/images/dexter.png",
    "/images/diddy-kong.png",
    "/images/donkey-kong.png",
    "/images/fenomenoide.png",
    "/images/goku.png",
    "/images/johnny-bravo.png",
    "/images/kratos.png",
    "/images/luigiPaper.png",
    "/images/marioPaper.png",
    "/images/megaman.png",
    "/images/metabee.png",
    "/images/mikey-simon.png",
    "/images/pikachu.png",
]
let assignedIdCount = 0;
let cardManager ={
    firstCard: "",
    secondCard: "",
    currentPairNumber: "",
    pairCount: 0,
    pairAssigner:()=>{

    },
    updatePairCount:()=>{
        if(pairCount < 2)
        {
            pairCount ++;
        }
        else
        {
            pairCount = 0;
        }
    },
}



function getStyles()
{   
    // console.log(e.computedsyleMap()); 
}
function startButtonClicked(){
    chosenAmountOfCards = document.querySelector(".cards-amount").value;
    amountOfCards = chosenAmountOfCards;
    
    while(getCardsContainer.firstChild)
    {
        getCardsContainer.removeChild(getCardsContainer.firstChild);
    }
    
    for(let i = 0; i < amountOfCards; i++)
    {
        let newCard = document.createElement('div');
        newCard.classList.add("card");
        newCard.setAttribute("isClicked", "false");
        newCard.setAttribute("cardNumber", "");
        newCard.addEventListener("click", cardClicked); 
        // newCard.addEventListener('transitionend', ()=>{
        //    console.log(getComputedStyle(this).getPropertyValue("--current-rotation"));
        // });
        getCardsContainer.appendChild(newCard);
            // document.querySelectorAll(".card")[i]
    }
    assignCardsNumbers();
}
function cardClicked()
{
    
    if(this.getAttribute("isClicked") === "false" && clicksPerformed < 2)
    {
        // console.log(getComputedStyle(this).getPropertyValue("--current-rotation"));
        this.setAttribute("isClicked", "true");
        clicksPerformed ++;
        
        if(clicksPerformed === 1)
        {
            lastCardClicked = this;
        }
        else if(clicksPerformed === 2)
        {
            currentCardClicked = this;
            setTimeout(()=>{
                lastCardClicked.setAttribute("isClicked", "false");
                currentCardClicked.setAttribute("isClicked", "false");  
                resetCardStoringVariables(); 
                clicksPerformed = 0;
            }, 1000);
        }
    }
   
}
function resetCardStoringVariables()
{
    lastCardClicked = -1;
    currentCardClicked = -1;
}

function assignCardsNumbers()
{
    let currentValues = cardIdNumber.slice();
    let count = amountOfCards;
    let cards = [count];
    const allCards = document.querySelectorAll(".card");
    while(count > 0)
    {
        let value = currentValues.pop();
        let value2 = value;
        allCards[count].setAttribute("cardNumber", value);
        allCards[count-1].setAttribute("cardNumber", value2);
        console.log(value, value2);
        count --;
        
    }

}
function getRandomNumber(numberRange)
{
    return Math.floor(Math.random()*numberRange);
}

function selectStartingAmountOfCards(){

}
