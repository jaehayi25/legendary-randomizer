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
    "Black Widow": "path/to/black_widow_image.jpg",
    "Captain America": "path/to/captain_america_image.jpg",
    "Cyclops": "path/to/cyclops_image.jpg",
    "Deadpool": "path/to/deadpool_image.jpg",
    "Emma Frost": "path/to/emma_frost_image.jpg",
    "Gambit": "path/to/gambit_image.jpg",
    "Hawkeye": "path/to/hawkeye_image.jpg",
    "Hulk": "path/to/hulk_image.jpg",
    "Iron Man": "path/to/iron_man_image.jpg",
    "Nick Fury": "path/to/nick_fury_image.jpg",
    "Rogue": "path/to/rogue_image.jpg",
    "Spider-Man": "path/to/spiderman_image.jpg",
    "Storm": "path/to/storm_image.jpg",
    "Thor": "path/to/thor_image.jpg",
    "Wolverine": "path/to/wolverine_image.jpg"
};

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function setupGame() {
    /*
    returns mastermind, scheme, villains, and heroes
    */
    /* complete card text: https://boardgamegeek.com/thread/1243890/complete-card-text-all-cards-through-dimensions */
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

const setupDisplay = document.querySelector(".setup");

function Assemble() {
    let setup = setupGame(); 
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