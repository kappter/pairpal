let pairings = [];
let currentMode = 'dataset1'; // Default mode

// Mode-specific dropdown options
const modeConfigs = {
    dataset1: {
        volume: [
            { value: 'R', label: 'R (Reserved)' },
            { value: 'M', label: 'M (Measured)' },
            { value: 'O', label: 'O (Outgoing)' }
        ],
        focus: [
            { value: 'P', label: 'P (Past)' },
            { value: 'N', label: 'N (Now)' },
            { value: 'F', label: 'F (Future)' }
        ],
        trait: [
            { value: 'I', label: 'I (Independent)' },
            { value: 'M', label: 'M (Mutual)' },
            { value: 'D', label: 'D (Dependent)' }
        ],
        volumeMap: { 'R': 'quiet', 'M': 'balanced', 'O': 'vocal' },
        focusMap: { 'P': 'reflective', 'N': 'present-focused', 'F': 'forward-thinking' },
        traitMap: { 'I': 'independent', 'M': 'cooperative', 'D': 'reliant' }
    },
    dataset2: {
        volume: [
            { value: 'S', label: 'S (Silent)' },
            { value: 'T', label: 'T (Tempered)' },
            { value: 'U', label: 'U (Upbeat)' }
        ],
        focus: [
            { value: 'A', label: 'A (Ancient)' },
            { value: 'B', label: 'B (Balanced)' },
            { value: 'C', label: 'C (Creative)' }
        ],
        trait: [
            { value: 'X', label: 'X (Solo)' },
            { value: 'Y', label: 'Y (Yoked)' },
            { value: 'Z', label: 'Z (Zealous)' }
        ],
        volumeMap: { 'S': 'silent', 'T': 'tempered', 'U': 'upbeat' },
        focusMap: { 'A': 'ancient', 'B': 'balanced', 'C': 'creative' },
        traitMap: { 'X': 'solo', 'Y': 'yoked', 'Z': 'zealous' }
    },
    dataset3: {
        volume: [
            { value: 'V', label: 'V (Veiled)' },
            { value: 'W', label: 'W (Weighted)' },
            { value: 'X', label: 'X (Expressive)' }
        ],
        focus: [
            { value: 'D', label: 'D (Distant)' },
            { value: 'E', label: 'E (Engaged)' },
            { value: 'F', label: 'F (Forward)' }
        ],
        trait: [
            { value: 'P', label: 'P (Private)' },
            { value: 'Q', label: 'Q (Quasi)' },
            { value: 'R', label: 'R (Reliant)' }
        ],
        volumeMap: { 'V': 'veiled', 'W': 'weighted', 'X': 'expressive' },
        focusMap: { 'D': 'distant', 'E': 'engaged', 'F': 'forward' },
        traitMap: { 'P': 'private', 'Q': 'quasi', 'R': 'reliant' }
    }
};

function updateDropdowns(mode) {
    console.log(`Updating dropdowns for mode: ${mode}`);
    const config = modeConfigs[mode];

    // Update first personality dropdowns
    const volume1 = document.getElementById('volume1');
    const focus1 = document.getElementById('focus1');
    const trait1 = document.getElementById('trait1');
    volume1.innerHTML = config.volume.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    focus1.innerHTML = config.focus.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    trait1.innerHTML = config.trait.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');

    // Update second personality dropdowns
    const volume2 = document.getElementById('volume2');
    const focus2 = document.getElementById('focus2');
    const trait2 = document.getElementById('trait2');
    volume2.innerHTML = config.volume.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    focus2.innerHTML = config.focus.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    trait2.innerHTML = config.trait.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
}

async function loadPairings(mode) {
    try {
        console.log(`Attempting to load dataset: data/${mode}.csv`);
        const response = await fetch(`data/${mode}.csv`);
        if (!response.ok) {
            throw new Error(`Failed to load ${mode}.csv: ${response.statusText}`);
        }
        const csvText = await response.text();
        console.log(`Fetched ${mode}.csv, parsing...`);
        Papa.parse(csvText, {
            header: true,
            complete: (result) => {
                pairings = result.data.filter(row => row.pairing && row.pairing.trim()); // Filter out invalid rows
                console.log(`Parsed ${mode}.csv, found ${pairings.length} valid pairings:`, pairings);
                document.getElementById("current-mode").textContent = `Mode ${mode === 'dataset1' ? '1' : mode === 'dataset2' ? '2' : '3'} (Dataset ${mode})`;
                updateDropdowns(mode); // Update dropdowns after loading dataset
                updateOutput(); // Update output after data is loaded
            },
            error: (error) => {
                console.error(`Error parsing ${mode}.csv:`, error);
                document.getElementById("description").textContent = `Error loading ${mode}.csv. Please ensure the dataset file exists in the data/ folder.`;
                document.getElementById("current-mode").textContent = `Mode ${mode === 'dataset1' ? '1' : mode === 'dataset2' ? '2' : '3'} (Failed to load)`;
                updateDropdowns(mode); // Update dropdowns even if data fails
            }
        });
    } catch (error) {
        console.error(`Error loading ${mode}.csv:`, error);
        document.getElementById("description").textContent = `Error loading ${mode}.csv. Please ensure the dataset file exists in the data/ folder.`;
        document.getElementById("current-mode").textContent = `Mode ${mode === 'dataset1' ? '1' : mode === 'dataset2' ? '2' : '3'} (Failed to load)`;
        updateDropdowns(mode); // Update dropdowns even if data fails
    }
}

function getTraitDescription(volume, focus, trait, mode) {
    const config = modeConfigs[mode];
    return `${config.volumeMap[volume] || volume} ${config.focusMap[focus] || focus} ${config.traitMap[trait] || trait}`;
}

function generateDynamicPairing(p1, p2, forwardPairing, mode) {
    console.log(`Generating dynamic pairing for ${forwardPairing} in ${mode}`);
    const [v1, f1, t1] = p1.split('-');
    const [v2, f2, t2] = p2.split('-');

    const desc1 = getTraitDescription(v1, f1, t1, mode);
    const desc2 = getTraitDescription(v2, f2, t2, mode);

    const description = `${desc1} meets ${desc2}—${v1 === v2 ? 'similar' : 'contrasting'} styles in ${f1 === f2 ? 'aligned' : 'differing'} focus and ${t1 === t2 ? 'matched' : 'varied'} dependence.`;
    const cautions = `Potential for ${v1 === 'O' && v2 === 'R' || v1 === 'U' && v2 === 'S' || v1 === 'X' && v2 === 'V' ? 'overwhelm vs. withdrawal' : t1 === 'D' && t2 === 'I' || t1 === 'Z' && t2 === 'X' || t1 === 'R' && t2 === 'P' ? 'reliance vs. independence clash' : 'misalignment'}; ${f1 !== f2 ? 'differing time focus may cause disconnect' : 'similar focus may stagnate'}.`;
    const advice = `First: ${v1 === 'R' || v1 === 'S' || v1 === 'V' ? 'open up slightly' : v1 === 'O' || v1 === 'U' || v1 === 'X' ? 'tone down intensity' : 'maintain balance'}. Second: ${t2 === 'D' || t2 === 'Z' || t2 === 'R' ? 'express needs gently' : t2 === 'I' || t2 === 'X' || t2 === 'P' ? 'offer space' : 'seek mutual ground'}. ${f1 !== f2 ? 'Bridge time focus with shared activities.' : 'Explore shared goals.'}`;

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

    console.log(`Searching for pairing: ${forwardPairing} or ${reversePairing} in ${currentMode}`);
    let match = pairings.find(p => p.pairing === forwardPairing || p.pairing === reversePairing);

    if (!match) {
        console.log(`No match found in ${currentMode}, generating dynamic pairing`);
        match = generateDynamicPairing(
            `${volume1}-${focus1}-${trait1}`,
            `${volume2}-${focus2}-${trait2}`,
            forwardPairing,
            currentMode
        );
    } else {
        console.log(`Match found in ${currentMode}:`, match);
    }

    document.getElementById("pairing").textContent = forwardPairing;
    document.getElementById("description").textContent = match.description || 'No description available.';
    document.getElementById("cautions").textContent = match.cautions || 'No cautions available.';
    document.getElementById("advice").textContent = match.advice || 'No advice available.';
}

const dropdowns = ["volume1", "focus1", "trait1", "volume2", "focus2", "trait2", "mode"];
dropdowns.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener("change", () => {
            if (id === "mode") {
                currentMode = element.value;
                console.log(`Mode changed to ${currentMode}`);
                loadPairings(currentMode);
            } else {
                console.log(`Personality dropdown changed: ${id}`);
                updateOutput();
            }
        });
    }
});

console.log('Initializing PairPal with default mode:', currentMode);
loadPairings(currentMode);
