const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');
const cors = require('cors')
require('./database/mongoConnection')

const app = express();
const userData = require('./database/userDataModel')
const chargers = require('./database/chargerModel')


const PORT = process.env.PORT || 3000;


// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());



// Navigate the page to a URL.

app.post('/getUserData', async (req, res) => {
    let userInfo = new userData(req.body);
    console.log(userInfo)
    let result = await userInfo.save();
    generatePDF(result);
    res.send(result)


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://massivefoundation.org/', {
        waitUntil: 'networkidle2',
    });
    // Saves the PDF to hn.pdf.
    await page.pdf({
        path: 'hn.pdf',
        format: 'A4',
        printBackground: true,
    });

    await browser.close();
    process.exit();
});

app.get('/getChargers', async (req, res) => {
    let result = await chargers.find({})
    // Navigate the page to a URL.
    res.send(result)

})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

async function generatePDF(data) {
    let template = fs.readFileSync('../pdf.html', 'utf-8');

    // Replace the title and description placeholders
    template = template.replace('{{username}}', data.username);
    template = template.replace('{{date}}', data.mobile);
    template = template.replace('{{refID}}', data.email);

    // Generate the HTML for the list of items by looping through the dynamic data
    // let itemsHTML = '';
    // data.items.forEach(item => {
    //     itemsHTML += `
    //     <div class="item">
    //       <div class="item-title">${item.name}</div>
    //       <div class="item-description">${item.description}</div>
    //       <div class="item-price">Price: $${item.price}</div>
    //     </div>`;
    // });

    // Replace the {{items}} placeholder with the generated HTML for the items
    // template = template.replace('{{items}}', itemsHTML);

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content of the page to the dynamically generated HTML
    await page.setContent(template, { waitUntil: 'networkidle0' });

    // Generate PDF
    await page.pdf({
        path: 'output.pdf', // The file where the PDF will be saved
        format: 'A4', // Page format
        margin: {
            top: '0mm',
            right: '0mm',
            bottom: '0mm',
            left: '0mm',
        }
    });

    // Close the browser
    await browser.close();
    console.log('PDF generated successfully');
}