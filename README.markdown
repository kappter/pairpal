# PairPal: Navigate Your Personality Pairings with Heart

PairPal is an interactive web app that explores personality pairings, offering insights into compatibility, potential challenges, and actionable advice. With a sleek interface and a new mode selector, users can switch between different datasets and personality acronyms to explore diverse pairing dynamics.

## Features
- **Dynamic Personality Selection**: Choose two personality profiles using three dropdowns each (volume, focus, trait), which update dynamically based on the selected mode.
- **Mode Selector**: Switch between three modes (Mode 1, Mode 2, Mode 3) to load different datasets (`dataset1.csv`, `dataset2.csv`, `dataset3.csv`) with unique acronyms and pairing insights.
- **Responsive UI**: Structured with `<header>`, `<nav>`, `<main>`, and a fixed `<footer>`, styled with a custom color scheme for accessibility and aesthetics.
- **Dynamic Pairing Generation**: If a pairing isn’t found in the dataset, PairPal generates a description, cautions, and advice based on trait differences.
- **Accessible Design**: High-contrast colors (WCAG 2.1 compliant) ensure readability across all sections.

## Modes of Operation
PairPal supports three modes, each loading a unique dataset and set of personality acronyms:
- **Mode 1 (Dataset 1)**: Uses `data/dataset1.csv` with volume (R/M/O), focus (P/N/F), and trait (I/M/D).
- **Mode 2 (Dataset 2)**: Uses `data/dataset2.csv` with volume (S/T/U), focus (A/B/C), and trait (X/Y/Z).
- **Mode 3 (Dataset 3)**: Uses `data/dataset3.csv` with volume (V/W/X), focus (D/E/F), and trait (P/Q/R).
Select a mode from the dropdown in the navigation bar to switch datasets and update dropdown options.

## Setup: Get PairPal Running

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, etc.).
- [Git](https://git-scm.com/) (optional, for cloning the repo).
- A code editor like [VS Code](https://code.visualstudio.com/) (optional, for customization).
- [Node.js](https://nodejs.org/) (optional, for local server).
- CSV files (`dataset1.csv`, `dataset2.csv`, `dataset3.csv`) in the `data/` folder.
- A favicon file (`favicon.ico`) in the project root.

### Installation
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/kappter/pairpal.git
   cd pairpal
   ```
   Or download the ZIP from the [GitHub repo](https://github.com/kappter/pairpal).

2. **Ensure Datasets**:
   - Place `dataset1.csv`, `dataset2.csv`, and `dataset3.csv` in the `data/` folder.
   - Expected CSV format:
     ```csv
     pairing,description,cautions,advice
     "R-P-I x M-F-D","Mode 1: quiet reflective independent meets balanced forward-thinking reliant.","Mode 1: Watch for misalignment.","Mode 1: Bridge differences."
     ```
   - Ensure each dataset uses the correct acronyms for its mode (e.g., S-A-X for Mode 2).

3. **Add Favicon**:
   - Place a `favicon.ico` file in the project root to avoid 404 errors.

4. **Serve the Site**:
   - **Option 1**: Open `index.html` in a browser (note: `fetch` may fail due to CORS).
   - **Option 2**: Use a local server:
     ```bash
     npm install -g http-server
     http-server
     ```
     Visit `http://localhost:8080`.

5. **Explore the App**:
   - Select a mode from the navigation bar to load a dataset and update dropdowns.
   - Choose personality traits to see pairing insights.
   - Check the console (DevTools > Console) for debug logs if issues arise.

## Project Structure
```
pairpal/
├── data/
│   ├── dataset1.csv
│   ├── dataset2.csv
│   └── dataset3.csv
├── index.html
├── styles.css
├── script.js
├── favicon.ico
└── README.md
```

## UI Structure and Styling
- **Header**: Contains the app title, styled with `#266A46` (green) and white text.
- **Navigation**: Houses the mode selector, styled with `#6A4626` (brown) and white text.
- **Main Content**: Includes personality dropdowns and output, styled with white background and black text.
- **Footer**: Fixed at the bottom with `#46266A` (purple) and white text, containing the copyright notice and links.
- **Accents**: Uses `#5F3390` (deep purple) for borders and buttons.
- All colors meet WCAG 2.1 Level AA contrast requirements.

## Footer
The fixed footer displays:
> © 2025 Ken Kapptie | For educational use only | All rights reserved. [More tools like this](#) | [Want your own?](#) | [Learn by Quiz](#)

Links are placeholders; update with actual URLs as needed.

## Debugging
If the mode selector doesn’t update the output:
1. **Check Datasets**: Ensure `data/dataset1.csv`, `dataset2.csv`, and `dataset3.csv` exist and contain unique data.
2. **Console Logs**: Open DevTools (F12) > Console and look for:
   - `Attempting to load dataset: data/datasetX.csv`
   - `Updating dropdowns for mode: datasetX`
   - `Parsed datasetX.csv, found X valid pairings`
3. **Test Locally**: Use `http-server` to avoid CORS issues.
4. **Verify Dropdowns**: Confirm dropdown options change (e.g., R/M/O to S/T/U) when switching modes.

## Customization
- **Update Acronyms**: Modify `modeConfigs` in `script.js` to use your dataset-specific acronyms.
- **Add Links**: Update footer links in `index.html` with actual URLs.
- **Enhance Styling**: Adjust colors in `styles.css` if different contrast is needed.

## Known Issues
- **Favicon 404**: Add `favicon.ico` to the project root.
- **content.js Message**: If you see `[MindStudio][Content] Initializing content script`, test in incognito mode to rule out extensions. Share environment details if it persists.

## License
© 2025 Ken Kapptie. For educational use only. All rights reserved.

---

Happy exploring with PairPal! For support or contributions, open an issue or pull request on [GitHub](https://github.com/kappter/pairpal).