async function handleSubmit(event) {
    event.preventDefault();

    let username = document.querySelector('#fname');
    let mobile = document.querySelector('#mobile');
    let email = document.querySelector('#emailID');
    let city = document.querySelector('#city');
    let state = document.querySelector('#state')
    let checkboxes1 = document.querySelectorAll('input[name="interests"]:checked');
    const selectedChargers = Array.from(checkboxes1).map(checkbox => checkbox.value);
    let checkboxes2 = document.querySelectorAll('input[name="locationType"]:checked')
    const selectedLocations = Array.from(checkboxes2).map(checkbox => checkbox.value);
    //Storing data in json
    let userData = {};
    userData.username = username.value;
    userData.mobile = mobile.value;
    userData.email = email.value;
    userData.city = city.value;
    userData.state = state.value;
    userData.selectedLocation = selectedLocations; //Location of selected items.
    userData.selectedChargers = selectedChargers; //charger ID of selected items.

    // generatePDF(userData);
    if (handleNumberVerify(mobile)) {
        try {
            const response = await fetch('http://localhost:3000/getUserData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            console.log('Response from server:', result);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
}


function vehicleTypeCheckbox(element) {
    // Get all checkboxes within the target-vehicle div
    const checkboxes = document.querySelectorAll('.vehicleType input[type="checkbox"]');
    const boxes = document.querySelectorAll('.vehicleType');
    boxes.forEach(box => {
        if (box.classList.contains('inverseFilter')) {
            box.classList.remove('inverseFilter');
        }
    })
    // Uncheck all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;

    });


    // Check the clicked checkbox
    const checkbox = element.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    element.classList.add('inverseFilter');

    // 2/3 wheeler category
    if (checkbox.value == '2/3') {
        const container = document.getElementById('charger-cards-holder');
        container.innerHTML = '';
        chargerDetails.forEach(item => {
            if (item.vehicleType == '2W') {
                const companyDiv = document.createElement('div');
                companyDiv.className = 'card';

                // Populate the div with ACF details
                companyDiv.innerHTML = `
                <div class='charger-card' onclick='toggleCheckbox(this)'>
                    <input type="checkbox" name="interests" value='${item.chargerID}'>
        <img src="${item.productImageLocation}" onerror="this.onerror=null; this.src='placeholder.png';" class="charger-img" alt="">
        <div class="charger-details">
            <h3>${item.Name.substring(0, 35)}</h3>
            <span>${item.Price}</span>
            <div class="tabular-display">
                <div class="wattage clm">
                    <span class="clm-heading">Wattage</span>
                    <span>${item.Wattage}</span>
                </div>
                <div class="connector clm">
                    <span class="clm-heading">Connector Type</span>
                    <span>${item.connectorType}</span>
                </div>
                <div class="output clm">
                    <span class="clm-heading">Output Voltage</span>
                    <span>${item.outputVoltage}</span>
                </div>
                <div class="vehicle clm">
                    <span class="clm-heading">vehicle Type</span>
                    <span>${item.vehicleType}</span>
                </div>
            </div>
        </div>
        <div class="charging-time">
            <span class="clm-heading">Charging Time</span>
            <img src="./hour-glass.png" class="hour-glass" alt="">
            <p class="time">${item.chargingTime} hrs <span class="approx">(approx)</span> </p>
        </div> </div>
                `;
                container.appendChild(companyDiv);
            }
        })
    }
    //four wheeler category
    if (checkbox.value == '4') {
        const container = document.getElementById('charger-cards-holder');
        container.innerHTML = '';
        chargerDetails.forEach(item => {
            if (item.vehicleType == '3W') {
                const companyDiv = document.createElement('div');
                companyDiv.className = 'card';

                // Populate the div with ACF details
                companyDiv.innerHTML = `
                <div class='charger-card' onclick='toggleCheckbox(this)'>
                    <input type="checkbox" name="interests" value='${item.chargerID}'>
        <img src="${item.productImageLocation}" onerror="this.onerror=null; this.src='placeholder.png';" class="charger-img" alt="">
        <div class="charger-details">
            <h3>${item.Name.substring(0, 35)}</h3>
            <span>${item.Price}</span>
            <div class="tabular-display">
                <div class="wattage clm">
                    <span class="clm-heading">Wattage</span>
                    <span>${item.Wattage}</span>
                </div>
                <div class="connector clm">
                    <span class="clm-heading">Connector Type</span>
                    <span>${item.connectorType}</span>
                </div>
                <div class="output clm">
                    <span class="clm-heading">Output Voltage</span>
                    <span>${item.outputVoltage}</span>
                </div>
                <div class="vehicle clm">
                    <span class="clm-heading">vehicle Type</span>
                    <span>${item.vehicleType}</span>
                </div>
            </div>
        </div>
        <div class="charging-time">
            <span class="clm-heading">Charging Time</span>
            <img src="./hour-glass.png" class="hour-glass" alt="">
            <p class="time">${item.chargingTime} hrs <span class="approx">(approx)</span> </p>
        </div> </div>
                `;
                container.appendChild(companyDiv);
            }
        })

    }
    // all vehicle category
    if (checkbox.value == 'all') {
        const container = document.getElementById('charger-cards-holder');
        container.innerHTML = '';
        chargerDetails.forEach(item => {
            if (item.vehicleType) {
                const companyDiv = document.createElement('div');
                companyDiv.className = 'card';

                // Populate the div with ACF details
                companyDiv.innerHTML = `
                <div class='charger-card' onclick='toggleCheckbox(this)'>
                    <input type="checkbox" name="interests" value='${item.chargerID}'>
        <img src="${item.productImageLocation}" onerror="this.onerror=null; this.src='placeholder.png';" class="charger-img" alt="">
        <div class="charger-details">
            <h3>${item.Name.substring(0, 35)}</h3>
            <span>${item.Price}</span>
            <div class="tabular-display">
                <div class="wattage clm">
                    <span class="clm-heading">Wattage</span>
                    <span>${item.Wattage}</span>
                </div>
                <div class="connector clm">
                    <span class="clm-heading">Connector Type</span>
                    <span>${item.connectorType}</span>
                </div>
                <div class="output clm">
                    <span class="clm-heading">Output Voltage</span>
                    <span>${item.outputVoltage}</span>
                </div>
                <div class="vehicle clm">
                    <span class="clm-heading">vehicle Type</span>
                    <span>${item.vehicleType}</span>
                </div>
            </div>
        </div>
        <div class="charging-time">
            <span class="clm-heading">Charging Time</span>
            <img src="./hour-glass.png" class="hour-glass" alt="">
            <p class="time">${item.chargingTime} hrs <span class="approx">(approx)</span> </p>
        </div> </div>
                `;
                container.appendChild(companyDiv);
            }
        })
    }
}



//function to make full div clickable.
function toggleCheckbox(e) {
    const checkbox = e.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked; // Toggle checkbox state
    e.classList.toggle('checked', checkbox.checked);

}


function toggleLocationType(e) {

    let img = e.querySelector('img')
    const checkbox = e.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked; // Toggle checkbox state
    if (checkbox.checked) {
        e.classList.add('inverseFilter')
    }
    else {
        e.classList.remove('inverseFilter')
    }
    e.classList.toggle('checked', checkbox.checked);
}



function handleNumberVerify(input) {
    const phoneNumber = input.value;
    const phoneNumberPattern = /^[0-9]*$/;
    let redAlert = document.querySelector('.numericalWarning');
    redAlert.style.display = 'none';
    if (phoneNumber.length < 10) {
        redAlert.style.display = 'inline-block';
        if (!phoneNumberPattern.test(phoneNumber)) {
            input.value = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        }
        return false;
    }
    if (phoneNumber.length == 10 && phoneNumberPattern.test(phoneNumber)) {
        return true;
    }
}
function handleEmailVerify(input) {
    let redAlert = document.querySelector('.emailWarning');
    redAlert.style.display = "none"
    if (input.value == '' || !input.value.includes('@')) {
        redAlert.style.display = "inline-block"
    }
}
function handleStateVerify(input) {
    let redAlert = document.querySelector('.emailWarning');
    redAlert.style.display = "none"
    if (input.value == '' || !input.value.includes('@')) {
        redAlert.style.display = "inline-block"
    }
}
function handleCityVerify(input) {
    let redAlert = document.querySelector('.emailWarning');
    redAlert.style.display = "none"
    if (input.value == '' || !input.value.includes('@')) {
        redAlert.style.display = "inline-block"
    }
}

let chargerDetails;
fetch('http://localhost:3000/getChargers')
.then(response => {
    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    // Parse the JSON from the response
    return response.json();
})
.then(data => {
    // Store the fetched data in a variable
    chargerDetails = data;
})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
});

// const chargerDetails = [
//     {
//         "Name": "Massive Mobility AC 8.4kW Portable Modern Home PLUS META 85-10",
//         "Price": "₹32000",
//         "Wattage": "8.4 KW",
//         "connectorType": "Type 2",
//         "outputVoltage": "220V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "2.5",
//         "chargerID": "MMAC841",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "EcoCharge 7.2kW Home Fast Charger",
//         "Price": "₹25000",
//         "Wattage": "7.2 KW",
//         "connectorType": "Type 2",
//         "outputVoltage": "230V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "3.0",
//         "chargerID": "ECOH72C",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "SmartCharge 10kW Ultra-Fast Charger",
//         "Price": "₹45000",
//         "Wattage": "10 KW",
//         "connectorType": "CCS2",
//         "outputVoltage": "400V (AC)",
//         "vehicleType": "3W",
//         "chargingTime": "1.8",
//         "chargerID": "SMC10UF",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "HomeCharge 6.6kW Compact Charger",
//         "Price": "₹28000",
//         "Wattage": "6.6 KW",
//         "connectorType": "Type 2",
//         "outputVoltage": "230V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "4.0",
//         "chargerID": "HCC66CP",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "TurboCharge 12kW Premium Charger",
//         "Price": "₹60000",
//         "Wattage": "12 KW",
//         "connectorType": "CCS2",
//         "outputVoltage": "400V (AC)",
//         "vehicleType": "3W",
//         "chargingTime": "1.5",
//         "chargerID": "TBC12PC",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "QuickCharge 5kW Home Charger",
//         "Price": "₹20000",
//         "Wattage": "5 KW",
//         "connectorType": "Type 1",
//         "outputVoltage": "220V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "5.0",
//         "chargerID": "QCH5HOM",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "PowerPlus 9.6kW Flexible Charger",
//         "Price": "₹37000",
//         "Wattage": "9.6 KW",
//         "connectorType": "Type 2",
//         "outputVoltage": "230V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "2.2",
//         "chargerID": "PPC96FL",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "UltraCharge 15kW Commercial Charger",
//         "Price": "₹75000",
//         "Wattage": "15 KW",
//         "connectorType": "CCS2",
//         "outputVoltage": "480V (AC)",
//         "vehicleType": "3W",
//         "chargingTime": "1.2",
//         "chargerID": "UCC15CM",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "EasyCharge 4.8kW Basic Charger",
//         "Price": "₹18000",
//         "Wattage": "4.8 KW",
//         "connectorType": "Type 1",
//         "outputVoltage": "220V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "6.0",
//         "chargerID": "EBC48BC",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "FastCharge 11kW Residential Charger",
//         "Price": "₹52000",
//         "Wattage": "11 KW",
//         "connectorType": "CCS2",
//         "outputVoltage": "400V (AC)",
//         "vehicleType": "3W",
//         "chargingTime": "1.7",
//         "chargerID": "FCC11RC",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "SolarCharge 8kW Eco-Friendly Charger",
//         "Price": "₹34000",
//         "Wattage": "8 KW",
//         "connectorType": "Type 2",
//         "outputVoltage": "230V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "2.9",
//         "chargerID": "SCE8EFC",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "GreenCharge 7.2kW Home Charger",
//         "Price": "₹26000",
//         "Wattage": "7.2 KW",
//         "connectorType": "Type 2",
//         "outputVoltage": "220V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "3.5",
//         "chargerID": "GCH72HC",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "LightningCharge 10.5kW Fast Charger",
//         "Price": "₹47000",
//         "Wattage": "10.5 KW",
//         "connectorType": "CCS2",
//         "outputVoltage": "400V (AC)",
//         "vehicleType": "3W",
//         "chargingTime": "1.6",
//         "chargerID": "LCC10F5",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "ChargeMaster 9kW Compact Charger",
//         "Price": "₹39000",
//         "Wattage": "9 KW",
//         "connectorType": "Type 2",
//         "outputVoltage": "230V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "2.4",
//         "chargerID": "CMC9CP1",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "EcoFast 6.4kW Charger",
//         "Price": "₹23000",
//         "Wattage": "6.4 KW",
//         "connectorType": "Type 1",
//         "outputVoltage": "220V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "4.5",
//         "chargerID": "EFC64C1",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "MaxPower 14kW Super Charger",
//         "Price": "₹80000",
//         "Wattage": "14 KW",
//         "connectorType": "CCS2",
//         "outputVoltage": "480V (AC)",
//         "vehicleType": "3W",
//         "chargingTime": "1.1",
//         "chargerID": "MPC14SC",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "FamilyCharge 5.5kW Home Charger",
//         "Price": "₹21000",
//         "Wattage": "5.5 KW",
//         "connectorType": "Type 2",
//         "outputVoltage": "230V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "5.2",
//         "chargerID": "FCH5HOM",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "QuickPower 12.5kW Charger",
//         "Price": "₹64000",
//         "Wattage": "12.5 KW",
//         "connectorType": "CCS2",
//         "outputVoltage": "400V (AC)",
//         "vehicleType": "3W",
//         "chargingTime": "1.4",
//         "chargerID": "QP12CC2",
//         "productImageLocation": "./Frame 76.png"
//     },
//     {
//         "Name": "ChargerX 4.2kW Entry Level Charger",
//         "Price": "₹15000",
//         "Wattage": "4.2 KW",
//         "connectorType": "Type 1",
//         "outputVoltage": "220V (AC)",
//         "vehicleType": "2W",
//         "chargingTime": "6.5",
//         "chargerID": "C4E2ELC",
//         "productImageLocation": "./Frame 76.png"
//     }
// ]
