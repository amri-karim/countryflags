function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

window.onload = function() {
    const flagsList = document.getElementById('flags-list');
    const mainFlag = document.getElementById('main-flag');
    const favIcon = document.getElementById('favicon');
    const countryName = document.getElementById('country-name');
    const randomizeButton = document.getElementById('randomize-button');

    function addFlagsToMenu(flags) {
        // Remove all existing flags from the menu
        while (flagsList.firstChild) {
            flagsList.removeChild(flagsList.firstChild);
        }

        // Add flags to the menu
        flags.forEach(flag => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = flag.imageUrl;
            img.alt = flag.name;
            img.width = 128;
            img.style.border = '2px solid black'; 
            img.onclick = function() {
                mainFlag.src = flag.imageUrl;
                mainFlag.alt = flag.name; 
                favIcon.href = flag.imageUrl;
                countryName.textContent = "Click flag to reveal";
            };
            li.appendChild(img);
            flagsList.appendChild(li);
        });
    }

    // Initial population of the flags menu
    let shuffledFlags = shuffleArray(flagsData);
    addFlagsToMenu(shuffledFlags);

    // Randomize flags when the button is clicked
    randomizeButton.onclick = function() {
        shuffledFlags = shuffleArray(flagsData);
        addFlagsToMenu(shuffledFlags);
    };

    // Show country name when the main flag is clicked
    mainFlag.onclick = function() {
        countryName.textContent = mainFlag.alt;
    };

    // Pick a random country to initialize the main page
    const randomIndex = Math.floor(Math.random() * flagsData.length);
    const randomFlag = flagsData[randomIndex];
    mainFlag.src = randomFlag.imageUrl;
    mainFlag.alt = randomFlag.name;
    favIcon.href = randomFlag.imageUrl;
    countryName.textContent = "Click flag to reveal";
};