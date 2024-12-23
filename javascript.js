heroes = ["Black Widow", "Captain America", "Cyclops", "Deadpool", "Emma Frost", "Gambit", "Hawkeye", "Hulk", "Iron Man", "Nick Fury", "Rogue", "Spider-Man", "Storm", "Thor", "Wolverine"]; 
masterminds = ["Dr. Doom", "Loki", "Magneto", "Red Skull"]; 
schemes = [
    "The Legacy Virus",
    "Midtown Bank Robbery",
    "Negative Zone Prison Breakout",
    "Portals to the Dark Dimension",
    "Replace Earth's Leaders with Killbots",
    "Secret Invasion of the Skrull Shapeshifters",
    "Super Hero Civil War",
    "Unleash the Power of the Cosmic Cube"
]; 
alwaysleads = {
    "Dr. Doom" : "Doombot Legion", 
    "Loki" : "Enemies of Asgard", 
    "Magneto" : "Brotherhood", 
    "Red Skull": "HYDRA"
}
villains = ["Brotherhood", "Enemies of Asgard", "HYDRA", "Masters of Evil", "Skrulls", "Spider-foes"]; 
henchmen = ["Doombot Legion", "Hand Ninjas", "Savage Land Mutates", "Sentinel"]; 

const heroImages = {
    "Black Widow": "images/heroes/black-widow.jpg",
    "Captain America": "images/heroes/captain-america.jpg",
    "Cyclops": "images/heroes/cyclops.jpg",
    "Deadpool": "images/heroes/deadpool.jpg",
    "Emma Frost": "images/heroes/emma-frost.jpg",
    "Gambit": "images/heroes/gambit.jpg",
    "Hawkeye": "images/heroes/hawkeye.jpg",
    "Hulk": "images/heroes/hulk.jpg",
    "Iron Man": "images/heroes/iron-man.jpg",
    "Nick Fury": "images/heroes/nick-fury.jpg",
    "Rogue": "images/heroes/rogue.jpg",
    "Spider-Man": "images/heroes/spider-man.jpg",
    "Storm": "images/heroes/storm.jpg",
    "Thor": "images/heroes/thor.jpg",
    "Wolverine": "images/heroes/wolverine.jpg"
};

const mastermindImages = {
    "Dr. Doom": "images/masterminds/dr-doom.jpg",
    "Loki": "images/masterminds/loki.jpg",
    "Magneto": "images/masterminds/magneto.jpg",
    "Red Skull": "images/masterminds/red-skull.jpg",
}

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function setupGame() {
    /*
    returns mastermind, scheme, villains, and heroes
    */
    /* complete card text: https://boardgamegeek.com/thread/1243890/complete-card-text-all-cards-through-dimensions 
    // marvel image policy: https://marvel.fandom.com/wiki/Marvel_Database:Image_Policy#:~:text=Images%20created%20by%20Marvel%20contracted,policy%2C%20please%20notify%20an%20administrator.
    // */
    const selectedHeroes = [];
    while (selectedHeroes.length < 5) {
        const hero = getRandomItem(heroes);
        if (!selectedHeroes.includes(hero)) {
            selectedHeroes.push(hero);
        }
    }

    const selectedMastermind = getRandomItem(masterminds); 
    const selectedScheme = getRandomItem(schemes);

    const selectedVillains = [];
    if (villains.includes(alwaysleads[selectedMastermind])) {
        selectedVillains.push(alwaysleads[selectedMastermind])
    }

    while (selectedVillains.length < 3) {
        const villain = getRandomItem(villains);
        if (!selectedVillains.includes(villain)) {
            selectedVillains.push(villain);
        }
    }

    const selectedHenchmen = henchmen.includes(alwaysleads[selectedMastermind]) ? alwaysleads[selectedMastermind] : getRandomItem(henchmen);

    return {
        Heroes: selectedHeroes,
        Mastermind: selectedMastermind,
        Scheme: selectedScheme, 
        Villains: selectedVillains,
        Henchmen: selectedHenchmen,
    };
}

function updateHeroInfo(selectedHeroes, mastermind) {
    const imageBlocks = document.querySelectorAll('.image-row .image-block');

    imageBlocks.forEach((block, index) => {
        if (index == 5) {
            const mmImage = block.querySelector('img');
            const mmText = block.querySelector('div');
            console.log(mastermind); 

            if (mmImage && mastermindImages[mastermind]) {
                mmImage.src = mastermindImages[mastermind];
                mmImage.alt = mastermind; 
            }

            if (mmText) {
                mmText.textContent = mastermind; 
            }
        }
        else {
            const hero = selectedHeroes[index];  
        
            const heroImage = block.querySelector('img');
            const heroText = block.querySelector('div');
            
            if (heroImage && heroImages[hero]) {
                heroImage.src = heroImages[hero];
                heroImage.alt = hero; 
            }
    
            if (heroText) {
                heroText.textContent = hero;
            }
        }
    });
}



const setupDisplay = document.querySelector(".setup");

function Assemble() {
    let setup = setupGame(); 

    updateHeroInfo(setup["Heroes"], setup["Mastermind"]); 

    setupStr = "";
    for (let key in setup) {
        let val = ""; 
        if (Array.isArray(setup[key])) {
            val = setup[key].join(", "); 
        }
        else {
            val = setup[key]; 
        }
        setupStr += key + ": " + val + "\n\n";
    }
    setupDisplay.innerHTML = setupStr.replace(/\n/g, "<br>"); 
}


Assemble(); 


const assembleButton = document.querySelector(".assemble"); 

assembleButton.addEventListener("click", () => Assemble())


/*

function add(a, b) {
    return a + b; 
}

function subtract(a, b) {
    return a - b; 
}

function multiply(a, b) {
    return a * b; 
}

function divide(a, b) {
    if (b == 0) return "lolz"; 
    return a / b; 
}

let mem = 0;
let input = 0; 
let op = null;
let clear = true;  // determines if input should clear (set to 0) if new digit is pressed

function operate(mem, op, input) {
    switch(op) {
        case '+': 
            return add(mem, input)
        case '-': 
            return subtract(mem, input)
        case '*': 
            return multiply(mem, input)
        case '/': 
            return divide(mem, input)
    }
}
    
const digitButtons = document.querySelectorAll(".digit");

const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear"); 

const display = document.querySelector(".display"); 

clearButton.addEventListener("click", () => {
        mem = 0; 
        input = 0; 
        op = null; 
        clear = true; 
        display.textContent = 0; 
    });

const textcolors = ["#008080", "#95424E", "#87CEEB", "#d3494e"]; 

display.style.color = textcolors[0]; 
clearButton.style.color = textcolors[3]; 

operatorButtons.forEach((button) => {
    button.style.color = textcolors[1]; 
    button.addEventListener("click", () => {
        clear = true;
        console.log(button.textContent);
        if (button.textContent == '=') {
            if (op) {
                input = operate(mem, op, input); 
                display.textContent = input; 
                op = null;
            }
        }
        else {
            op = button.textContent;
            mem = input;
        }
    });
});

digitButtons.forEach((button) => {
    button.style.color = textcolors[0]; 
    button.addEventListener("click", () => {
        if (clear) {
            input = 0;
            clear = false;
        }
        input = (input * 10) + parseInt(button.textContent); 
        console.log(input);
        display.textContent = input; 
    });
});
*/