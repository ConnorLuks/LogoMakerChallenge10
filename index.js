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
        message: 'Enter the font size (e.g., 24):'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (e.g., #000000):'
    },
    {
        type: 'input',
        name: 'bgColor',
        message: 'Enter the background color (e.g., #ffffff):'
    },
    {
        type: 'input',
        name: 'width',
        message: 'Enter the width of the logo (e.g., 200):'
    },
    {
        type: 'input',
        name: 'height',
        message: 'Enter the height of the logo (e.g., 200):'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for your logo',
        choices: ['circle', 'square', 'triangle']
    }
];

const generateSVG = (answers) => {
    let shapeSVG;
    switch (answers.shape) {
        case 'circle':
            shapeSVG = `<circle cx="50%" cy="50%" r="40%" fill="${answers.bgColor}" />`; 
            break;
        case 'square':
            shapeSVG = `<square width="80%" height="80%" x="10%" y="10%" fill="${answers.bgColor}" />`;
            break;
        case 'triangle':
            shapeSVG = `<polygon points="${answers.width / 2},${answers.height * 0.1} ${answers.width * 0.9},${answers.height * 0.9} ${answers.width * 0.1},${answers.height * 0.9}" fill="${answers.bgColor}" />`;
            break;
    }
    
    return `

<svg width="${answers.width}" height="${answers.height}" xmlns="http://www.w3.org/2000/svg">
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

