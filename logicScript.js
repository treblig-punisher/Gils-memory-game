const getCardsContainer = document.querySelector(".cards-container");
const getStartButton = document.querySelector(".start-button");
const winScreenContainer = document.querySelector('.win-screen-container');
const playAgainButton = document.querySelector('.play-again-button');
playAgainButton.addEventListener('click', ()=>{
    winScreenContainer.style.setProperty('--message-visibility', 'none');
    while(gameManager.arrayOfTruth.length > 0)
    {
        gameManager.arrayOfTruth.pop();

    }
    while(getCardsContainer.firstChild)
    {
        getCardsContainer.removeChild(getCardsContainer.firstChild);
    }
    shuffleArray();
})
let chosenAmountOfCards = 0;
let amountOfCards = chosenAmountOfCards;
let lastCardClicked = -1;
let currentCardClicked = -1;
let clicksPerformed = 0;
let cardIdNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// const tl = new TimelineMax();
let scoreManager ={
    tries: 0,
    updateTries(){     
        tries++;
        this.setScoreToElement();
        const triesContainer = document.querySelector('.bottom-ui-container');
        // triesContainer.
        // tl.fromTo(triesContainer, 1, {scale: 1.4}, {scale:1})
        // triesContainer.getKeyFrameAnimationWithName
        // keyframeAnimation.keyframeAnimationFromtriesContainer.style.animation
    },
    getTries(){
        return tries;
    },
    resetScore(){
        tries = 0;
        this.setScoreToElement();
    },
    setScoreToElement(){
        const getTriesElement = document.querySelector('.tries-score');
        getTriesElement.innerHTML = tries;
    },
}
let gameManager = {
    matchCleared: false,
    arrayOfTruth:[],
    addEntryToArray(newEntry){
            this.arrayOfTruth.push(newEntry);
            this.levelCleared();                              
    },
    levelCleared()
    {
        const cards = document.querySelectorAll('.card');
        if(this.arrayOfTruth.length === cards.length/2)
        {
            const setFinalScore = document.querySelector('.final-score');
            setFinalScore.innerHTML = 'Tries: '+document.querySelector('.tries-score').innerHTML;
            const getWinScreen = document.querySelector('.win-screen-container');
            const getVisible = getComputedStyle(getWinScreen).getPropertyValue('--visible');
            getWinScreen.style.setProperty('--message-visibility', getVisible);
        }
    },
}
const timerManager={
    timeElapsed: 0,
}
function print(stringToPrint)
{
    console.log(stringToPrint);
}
let listOfImages =[
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
];
shuffleArray();

let assignedIdCount = 0;
// let cardManager ={
//     firstCard: "",
//     secondCard: "",
//     currentPairNumber: "",
//     pairCount: 0,
//     pairAssigner:()=>{

//     },
//     updatePairCount:()=>{
//         if(pairCount < 2)
//         {
//             pairCount ++;
//         }
//         else
//         {
//             pairCount = 0;
//         }
//     },
// }



// function getStyles()
// {   
//     // console.log(e.computedsyleMap()); 
// }
function startButtonClicked(){
    scoreManager.resetScore();
    chosenAmountOfCards = document.querySelector(".cards-amount").value;
    amountOfCards = chosenAmountOfCards;
    clicksPerformed = 0;
    while(getCardsContainer.firstChild)
    {
        getCardsContainer.removeChild(getCardsContainer.firstChild);
    }
    
    for(let i = 0; i < amountOfCards; i++)
    {
        let newCard = document.createElement('div');
        newCard.classList.add("card");
        newCard.setAttribute("isClicked", "false");
        newCard.setAttribute("cardBackground", "");
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
    // gameManager.level
    if(this.getAttribute("isClicked") === "false" && clicksPerformed < 2)
    {
        // console.log(getComputedStyle(this).getPropertyValue("--current-rotation"));
        this.setAttribute("isClicked", "true");
        clicksPerformed ++;
        
        if(clicksPerformed === 1)
        {
            lastCardClicked = this;
            let getBackgroundImage = lastCardClicked.getAttribute('cardBackground');
            lastCardClicked.style.backgroundImage = `url(${getBackgroundImage})`;
        }
        else if(clicksPerformed === 2)
        {
            scoreManager.updateTries();
            currentCardClicked = this;
            let getBackgroundImage = currentCardClicked.getAttribute('cardBackground');
            currentCardClicked.style.backgroundImage = `url(${getBackgroundImage})`;
            if(lastCardClicked.getAttribute('cardNumber') === currentCardClicked.getAttribute('cardNumber'))
            {
                let winSound = new Audio('sounds/success.wav');
                winSound.play();
                resetCardStoringVariables(); 
                gameManager.addEntryToArray(true);
                clicksPerformed = 0;
            }
            else{
                setTimeout(()=>{
                    lastCardClicked.setAttribute("isClicked", "false");
                    currentCardClicked.setAttribute("isClicked", "false");  
                    lastCardClicked.style.backgroundImage = "url(card.png)";
                    currentCardClicked.style.backgroundImage = "url(card.png)";
                    resetCardStoringVariables(); 
                    clicksPerformed = 0;
                }, 800);

            }
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
    
    let allDivsInContainer = document.querySelectorAll('.card');
    let amountOfNumbers = [];
    let numberOfItems = 0;
    while(amountOfNumbers.length < allDivsInContainer.length/2)
    {
        amountOfNumbers.push(numberOfItems);
        numberOfItems++;
    }
    const copiedArray = amountOfNumbers.slice();
    let newArrayOfPairs = amountOfNumbers.concat(copiedArray);
    let shuffledArray = [];
    const arrayLength = newArrayOfPairs.length;
    let countDownArrayLength = arrayLength;
    // print('new array of pairs: '+ newArrayOfPairs);
    for(let i = 0; i < arrayLength; i++)
    {
        // print('arrayLengthThisTime: '+countDownArrayLength);
        const indexThisTime = Math.floor(Math.random()*countDownArrayLength);
        let valueFromDecreasingArrayThisTime = newArrayOfPairs[indexThisTime];
        newArrayOfPairs.splice(indexThisTime, 1);
        shuffledArray.push(valueFromDecreasingArrayThisTime);
        countDownArrayLength--;
        allDivsInContainer[i].setAttribute('cardNumber', valueFromDecreasingArrayThisTime);
        allDivsInContainer[i].setAttribute('cardBackground', listOfImages[valueFromDecreasingArrayThisTime]);
        
    }

    // print(shuffledArray);
    // print(allDivsInContainer.length);


}

function shuffleArray()
{

    lastIndex = listOfImages.length-1;
    while(lastIndex > 0)
    {
        let randIndex = Math.floor(Math.random() * lastIndex);
        let temp = listOfImages[lastIndex];
        listOfImages[lastIndex] = listOfImages[randIndex];
        listOfImages[randIndex] = temp;
        lastIndex --;

    }
    return listOfImages;
}
