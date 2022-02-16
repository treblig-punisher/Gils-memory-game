const getCardsContainer = document.querySelector(".cards-container");
const getStartButton = document.querySelector(".start-button");
let chosenAmountOfCards = 0;
let amountOfCards = chosenAmountOfCards;
let lastCardClicked = -1;
let currentCardClicked = -1;
let clicksPerformed = 0;
let cardIdNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let assignedIdCount = 0;

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
        newCard.setAttribute("current-y-rotation", "0deg");
        newCard.addEventListener("click", cardClicked); 
        getCardsContainer.appendChild(newCard);
            // document.querySelectorAll(".card")[i]
    }
    // console.log(chosenAmountOfCards);
}
function cardClicked()
{
    if(this.getAttribute("isClicked") === "false" && clicksPerformed < 2)
    {
        
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

function selectStartingAmountOfCards(){

}

// function transitionFinished()
// {
//     const currentAnim = TransitionEvent.propertyName;
//     if(TransitionEvent.propertyName === "transform")
//     {
//         console.log("rotation complete");
//     }
//     // if(this.style.transform === "rotateY(180deg)")
//     // {
//     //     this.style.backgroundImage = "url('https://doggiedonyc.com/wp-content/uploads/2014/06/dog2.jpg')";
//     // }
// }
// function reverseCardFlip()
// {
//     if(lastCardClicked !== -1)
//     {
//         lastCardClicked.setAttribute("isClicked", "false");
//     }
//     // console.log("reverseCardFlip Fired");
// }