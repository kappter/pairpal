let pairings = [];

async function loadPairings() {
    try {
        const response = await fetch('data.json');
        pairings = await response.json();
        updateOutput(); // Initial update after data is loaded
    } catch (error) {
        console.error('Error loading pairings:', error);
        document.getElementById("description").textContent = "Error loading pairing data.";
    }
}

function updateOutput() {
    const volume1 = document.getElementById("volume1").value;
    const focus1 = document.getElementById("focus1").value;
    const trait1 = document.getElementById("trait1").value;
    const volume2 = document.getElementById("volume2").value;
    const focus2 = document.getElementById("focus2").value;
    const trait2 = document.getElementById("trait2").value;

    // Create both possible pairing strings (forward and reverse)
    const forwardPairing = `${volume1}-${focus1}-${trait1} x ${volume2}-${focus2}-${trait2}`;
    const reversePairing = `${volume2}-${focus2}-${trait2} x ${volume1}-${focus1}-${trait1}`;

    // Find a match in the pairings array
    let match = pairings.find(p => p.pairing === forwardPairing || p.pairing === reversePairing);

    // If no match is found, provide a fallback
    if (!match) {
        match = {
            pairing: forwardPairing,
            description: "This personality pairing is not defined in the database.",
            cautions: "Proceed with caution, as compatibility is unknown.",
            advice: "Communicate openly to understand each other's needs."
        };
    }

    // Update the output
    document.getElementById("pairing").textContent = forwardPairing;
    document.getElementById("description").textContent = match.description;
    document.getElementById("cautions").textContent = match.cautions;
    document.getElementById("advice").textContent = match.advice;
}

// Add event listeners to all dropdowns
const dropdowns = ["volume1", "focus1", "trait1", "volume2", "focus2", "trait2"];
dropdowns.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener("change", updateOutput);
    }
});

// Load pairings and initialize
loadPairings();