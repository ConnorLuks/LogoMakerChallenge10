const inquirer = require('inquirer');
const fs = require('fs');

const writeToFile = (fileName, data, callback) => {
    fs.writeFile(fileName, data, callback);
};

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter the text for your logo:'
    },
    {
        type: 'input',
        name: 'fontSize',
        message: 'Enter the font size (e.g., 20):'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the color for the text (e.g., #000000):'
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the SVG shape color (e.g., #ffffff):'
    },
    {
        type: 'input',
        name: 'width',
        message: 'Enter the width of the SVG logo (e.g., 400):'
    },
    {
        type: 'input',
        name: 'height',
        message: 'Enter the height of the SVG logo (e.g., 400):'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose the shape of your SVG logo',
        choices: ['circle', 'square', 'triangle']
    }
];

const generateSVG = (answers) => {
    let shapeSVG;
    switch (answers.shape) {
        case 'circle':
            shapeSVG = `<circle cx="${answers.width / 2}" cy="${answers.height / 2}" r="${Math.min(answers.width, answers.height) / 4}" fill="${answers.shapeColor}" />`; 
            break;
        case 'square':
            shapeSVG = `<rect x="${answers.width * 0.1}" y="${answers.height * 0.1}" width="${answers.width * 0.8}" height="${answers.height * 0.8}" fill="${answers.shapeColor}" />`;
            break;
        case 'triangle':
            shapeSVG = `<polygon points="${answers.width / 2},${answers.height * 0.1} ${answers.width * 0.9},${answers.height * 0.9} ${answers.width * 0.1},${answers.height * 0.9}" fill="${answers.shapeColor}" />`;
            break;
        default:
            shapeSVG = '';
    }

    return `

<svg width="${answers.width}" height="${answers.height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="transparent" />
   ${shapeSVG}
   <text x="50%" y="50%" font-size="${answers.fontSize}" fill="${answers.textColor}" text-anchor="middle" dy=".3em">${answers.text}</text>
</svg>
    `;
};

inquirer.prompt(questions).then((answers) => {
    const svgContent = generateSVG(answers);
    writeToFile('logo.svg', svgContent, (err) => {
        if (err) throw err;
        console.log('SVG logo has been generated :D !');
    });
});

