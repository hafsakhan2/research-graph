document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const redCircle = document.getElementById('redCircle');
    let sensorData = [];

    // Fetch and read the CSV file
    fetch('Copy of 06_19_2023_SensorData.csv')
        .then(response => response.text())
        .then(text => {
            sensorData = parseCSV(text);
            slider.max = sensorData.length - 1;

            // Set the initial value of the slider and update the display
            // after sensorData is populated
            slider.value = 0; 
            updateDisplay(0); 
        });

    slider.oninput = function () {
        updateDisplay(this.value);
    };

    function updateDisplay(value) {
        const data = sensorData[value];
        redCircle.setAttribute('data-tooltip', formatData(data));
        
        const timeStamp = data[0];
        document.getElementById('timestampDisplay').textContent = `Time Stamp: ${timeStamp}`;

        const pm1Value = parseFloat(data[3]);
        if (!isNaN(pm1Value)) {
            updateCircleSize(redCircle, pm1Value);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const infoButton = document.getElementById('infoButton');
    const infoPopup = document.getElementById('infoPopup');

    infoButton.addEventListener('click', function() {
        infoPopup.style.display = infoPopup.style.display === 'block' ? 'none' : 'block';
    });
});


function updateCircleSize(circle, pm1Value) {
    // Define scaling factor and minimum size
    const scaleFactor = 2; // Adjust this value as needed
    const minSize = 10; // Minimum size of the circle in pixels

    // Calculate new size
    const newSize = Math.max(minSize, pm1Value * scaleFactor);

    // Update circle size
    circle.style.width = `${newSize}px`;
    circle.style.height = `${newSize}px`;

    // Adjust position to keep circle centered
    const offset = newSize / 2;
    circle.style.top = `calc(50% - ${offset}px)`;
    circle.style.left = `calc(50% - ${offset}px)`;
}


function parseCSV(csv) {
    const lines = csv.split('\n');
    return lines.slice(1).map(line => line.split(','));
}

function formatData(data) {
    return data ? data.join(', ') : '';
}
