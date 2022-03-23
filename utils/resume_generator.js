const pdfDocument = require('pdfkit');
const fs = require('fs');
const { User, Language } = require('../models');

const generatePDF = async (userId) => {
    const user = await User.findByPk(userId);
    const resumeData = user.resume_data;

    const doc = new pdfDocument();
    const stream = doc.pipe(fs.createWriteStream('resume.pdf'));
    // Title Block
    doc
        .font('fonts/PalatinoBold.ttf')
        .fontSize(25)
        .text('Joseph Slater McArdle');

    // Contact Info
    doc.text(`${user.email} | ${resumeData.phone_number} | ${resumeData.location}`, {align: 'center'});

    // Content Links
    doc.text(`Linkedin: ${resumeData.linkedin} | Github: ${user.github} | Portfolio: ${resumeData.portfolio_link}`);

    // Introduction paragraph
    doc.text(`${resumeData.introduction}`);

    // Relevant technical skills
    let techSkills = '';

    const knownLanguages = Language.findAll({
        where: {
            user_id: user.id
        }
    });
    // map the objects into an array of strings
    knownLanguages.map((language) => {return language.language;});
    // loop over the foreach 
    knownLanguages.forEach((language) => {
        techSkills += language.name + ', ';
    });
    // remove the last comma and space from the string
    techSkills.slice(0, -2);
    // Add tech skills to pdf
    doc.text(`Technical Skills: ${techSkills}`);

    doc.end();

    stream.on('finish', () => {
        
    });
};

const stream = doc.creapipe(blobStream());

doc
    .font('fonts/PalatinoBold.ttf')
    .fontSize(25)
    .text('Joseph Slater McArdle');

doc.text('slater.mcardle@outlook.com | +1 (442) 266-7320 | Oceanside, CA', {align: 'center'});

doc.text('Linkedin: /SlaterMcArdle | Github: /SlaterMcArdle | Portfolio: Github Portfolio');

doc.text('Physicist turned robotic engineer. Traveled halfway around the globe, now returned and pursuing my passion for software development.');

doc.text('Technical Skills');

doc.end();

stream.on('finish', () => {
