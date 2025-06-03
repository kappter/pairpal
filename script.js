const datasetSelector = document.getElementById('dataset-selector');
const dropdownContainer = document.getElementById('personality-dropdowns');
const outputContainer = document.getElementById('pairing-output');
let currentData = [];

const traitOptions = {
  dataset1: {
    trait1: ['R', 'M', 'O'], // Reserved, Measured, Open
    trait2: ['P', 'N', 'F'], // Past, Neutral, Future
    trait3: ['I', 'M', 'D']  // Independent, Mixed, Dependent
  },
  dataset2: {
    trait1: ['L', 'M', 'H'], // Low, Medium, High
    trait2: ['C', 'M', 'O'], // Closed, Mixed, Open
    trait3: ['P', 'B', 'A']  // Passive, Balanced, Active
  },
  dataset3: {
    trait1: ['R', 'M', 'O'],
    trait2: ['P', 'N', 'F'],
    trait3: ['I', 'M', 'D']
  }
};

const datasetFiles = {
  dataset1: 'data/dataset1.csv',
  dataset2: 'data/dataset2.csv',
  dataset3: 'data/dataset3.csv'
};

function loadDataset(dataset) {
  Papa.parse(datasetFiles[dataset], {
    download: true,
    header: true,
    complete: (result) => {
      currentData = result.data;
      updateDropdowns(dataset);
      updatePairingDisplay();
    },
    error: (error) => {
      outputContainer.innerText = 'Error loading dataset.';
      console.error('CSV Error:', error);
    }
  });
}

function updateDropdowns(dataset) {
  const traits = traitOptions[dataset];
  
  ['person1-trait1', 'person1-trait2', 'person1-trait3', 'person2-trait1', 'person2-trait2', 'person2-trait3'].forEach((id, idx) => {
    const select = document.getElementById(id);
    const traitKey = `trait${(idx % 3) + 1}`;
    select.innerHTML = `<option value="">Select Trait ${idx % 3 + 1}</option>` +
      traits[traitKey].map(value => `<option value="${value}">${value}</option>`).join('');
    select.addEventListener('change', updatePairingDisplay);
  });
}

function updatePairingDisplay() {
  const person1 = [
    document.getElementById('person1-trait1').value,
    document.getElementById('person1-trait2').value,
    document.getElementById('person1-trait3').value
  ].join('-');
  const person2 = [
    document.getElementById('person2-trait1').value,
    document.getElementById('person2-trait2').value,
    document.getElementById('person2-trait3').value
  ].join('-');

  if (!person1.includes('-') || !person2.includes('-')) {
    outputContainer.innerHTML = '<p>Please select all traits for both personalities.</p>';
    return;
  }

  const pairingKey = `${person1} x ${person2}`;
  const reversePairingKey = `${person2} x ${person1}`;
  const pairing = currentData.find(row => 
    row.Pairing === pairingKey || row.Pairing === reversePairingKey
  );

  if (pairing) {
    document.getElementById('pairing-result').innerText = pairing.Pairing;
    document.getElementById('description-result').innerText = pairing.Description || 'No description available.';
    document.getElementById('cautions-result').innerText = pairing.Cautions || 'No cautions available.';
    document.getElementById('advice-result').innerText = pairing['Advice/Recommendations'] || 'No advice available.';
  } else {
    outputContainer.innerHTML = '<p>No pairing found for this combination.</p>';
  }
}

datasetSelector.addEventListener('change', () => loadDataset(datasetSelector.value));
loadDataset(datasetSelector.value);
