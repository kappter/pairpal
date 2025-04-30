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

function getTraitDescription(volume, focus, trait) {
    const volumeMap = {
        'R': 'quiet',
        'M': 'balanced',
        'O': 'vocal'
    };
    const focusMap = {
        'P': 'reflective',
        'N': 'present-focused',
        'F': 'forward-thinking'
    };
    const traitMap = {
        'I': 'independent',
        'M': 'cooperative',
        'D': 'reliant'
    };
    return `${volumeMap[volume]} ${focusMap[focus]} ${traitMap[trait]}`;
}

function generateDynamicPairing(p1, p2, forwardPairing) {
    const [v1, f1, t1] = p1.split('-');
    const [v2, f2, t2] = p2.split('-');

    const desc1 = getTraitDescription(v1, f1, t1);
    const desc2 = getTraitDescription(v2, f2, t2);

    const description = `${desc1} meets ${desc2}—${v1 === v2 ? 'similar' : 'contrasting'} styles in ${f1 === f2 ? 'aligned' : 'differing'} focus and ${t1 === t2 ? 'matched' : 'varied'} dependence.`;
    const cautions = `Potential for ${v1 === 'O' && v2 === 'R' ? 'overwhelm vs. withdrawal' : t1 === 'D' && t2 === 'I' ? 'reliance vs. independence clash' : 'misalignment'}; ${f1 !== f2 ? 'differing time focus may cause disconnect' : 'similar focus may stagnate'}.`;
    const advice = `First: ${v1 === 'R' ? 'open up slightly' : v1 === 'O' ? 'tone down intensity' : 'maintain balance'}. Second: ${t2 === 'D' ? 'express needs gently' : t2 === 'I' ? 'offer space' : 'seek mutual ground'}. ${f1 !== f2 ? 'Bridge time focus with shared activities.' : 'Explore shared goals.'}`;

    return {
        pairing: forwardPairing,
        description,
        cautions,
        advice
    };
}

function updateOutput() {
    const volume1 = document.getElementById("volume1").value;
    const focus1 = document.getElementById("focus1").value;
    const trait1 = document.getElementById("trait1").value;
    const volume2 = document.getElementById("volume2").value;
    const focus2 = document.getElementById("focus2").value;
    const trait2 = document.getElementById("trait2").value;

    const forwardPairing = `${volume1}-${focus1}-${trait1} x ${volume2}-${focus2}-${trait2}`;
    const reversePairing = `${volume2}-${focus2}-${trait2} x ${volume1}-${focus1}-${trait1}`;

    let match = pairings.find(p => p.pairing === forwardPairing || p.pairing === reversePairing);

    if (!match) {
        match = generateDynamicPairing(
            `${volume1}-${focus1}-${trait1}`,
            `${volume2}-${focus2}-${trait2}`,
            forwardPairing
        );
    }

    document.getElementById("pairing").textContent = forwardPairing;
    document.getElementById("description").textContent = match.description;
    document.getElementById("cautions").textContent = match.cautions;
    document.getElementById("advice").textContent = match.advice;
}

const dropdowns = ["volume1", "focus1", "trait1", "volume2", "focus2", "trait2"];
dropdowns.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener("change", updateOutput);
    }
});

loadPairings();