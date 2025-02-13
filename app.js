let arrayDetails = [];
let arraySkills = [];
let arrayAbout = [];
let arraySkillsProgress = [];
let aboutTextContent;
let skillsTextContent;
let projectsTextContent;
let btnBurger = document.getElementById('btn_burger')
let navLinks = document.querySelector('.nav-links')
let burgerToggle = document.querySelector('.burger')


let personalDetails = {
    personalTitle: document.getElementById('personal_title'),
    personalName: document.getElementById('personal_name'),
    personalSurname: document.getElementById('personal_surname'),
    personalAge: document.getElementById('personal_age'),
    personalPosition: document.getElementById('personal_position'),
    personalCountry: document.getElementById('personal_country'),
    personalSkills: document.getElementById('personal_skills'),
}
let personalDescription = {
    descriptionAboutTitle: document.getElementById('scroll-description_about_title'),
    descriptionAboutContent: document.getElementById('scroll-description_content_about'),
    descriptionSkillsTitle: document.getElementById('scroll-description_skills_title'),
    descriptionSkillsContent: document.getElementById('scroll-description_skills_content'),
    descriptionProjectsTitle: document.getElementById('scroll-description_projects_title'),
    descriptionProjectsContent: document.getElementById('scroll-description_projects_content')
}
let personalDescriptionSchema = {
    descriptionSchemaAboutEducation: document.getElementById('scroll-description_schema_about_education'),
    descriptionSchemaAboutWork: document.getElementById('scroll-description_schema_about_work'),
    scrollDescriptionSchemaSkill: document.getElementById('scroll_description_schema_skills')
}
async function loadContent(text) {
    try {
        const loadContent = await fetch(text)
        const getContent = await loadContent.json();
        arrayDetails = getContent.about;
        arraySkills = getContent.skills;
        arrayAbout = getContent.aboutDescription;
        arraySkillsProgress = getContent.skillsProgres;
        displayContent();
    }
    catch (error) {
        console.log(personalDetails.title.innerHTML = "Error with load data !", error)
    }
}
async function loadDescriptionText(textContent, skillsContent, projectsContent) {
    try {
        const loadContent = await fetch(textContent)
        const getContent = await loadContent.text()
        const loadSkillsContent = await fetch(skillsContent)
        const getSkillsContent = await loadSkillsContent.text()
        const loadProjectContent = await fetch(projectsContent)
        const getProjectsContent = await loadProjectContent.text();
        aboutTextContent = getContent;
        skillsTextContent = getSkillsContent
        projectsTextContent = getProjectsContent;
        displayAboutContent();
        displayskillProgressBar()
    }
    catch (error) {
        console.log(personalDescription.descriptionAboutContent.innerHTML = "Error with load data !", error)
    }
}
function displayContent() {
    arrayDetails.forEach(element => {
        personalDetails.personalTitle.innerHTML = `${element.title}`
        personalDetails.personalName.innerHTML += `<p><span class="details">${element.name}</span></p>`
        personalDetails.personalSurname.innerHTML += `<p><span class="details">${element.surname}</span></p>`
        personalDetails.personalAge.innerHTML += `<p><span class="details">${element.age}</span></p>`
        personalDetails.personalPosition.innerHTML += `<p><span class="details">${element.position}</span></p>`
        personalDetails.personalCountry.innerHTML += `<p><span class="details">${element.country}</span></p>`
    });
    arraySkills.forEach(element => {
        personalDetails.personalSkills.innerHTML += `<p><span class="details">${element.skill1}, ${element.skill2}, ${element.skill3}, ${element.skill4}</p>`
    })
}
function displayAboutContent() {
    arrayAbout.forEach(element => {
        personalDescription.descriptionAboutContent.innerHTML = aboutTextContent
        personalDescription.descriptionSkillsContent.innerHTML = skillsTextContent
        personalDescription.descriptionProjectsContent.innerHTML = projectsTextContent
        personalDescriptionSchema.descriptionSchemaAboutEducation.innerHTML += `<p><span class="scroll-description-titles">${element.titleEducation} :</span><p>${element.contentEducation}</p></p>`
        personalDescriptionSchema.descriptionSchemaAboutWork.innerHTML += `<p><span class="scroll-description-titles">${element.titleWork} :</span><p>${element.contentWork}</p></p>`
    });
}
function createSkillsProgressElement(languages) {
    const createMainDivContainer = document.createElement('div')
    createMainDivContainer.classList.add('scroll-main-div.container')

    const createLangDivContainer = document.createElement('div');
    createLangDivContainer.classList.add('scroll-language-div-container')

    const createProgressbarDivContainer = document.createElement('div');
    createProgressbarDivContainer.classList.add('scroll-progressBar-div-container')

    const createLanguageName = document.createElement('span')
    createLanguageName.classList.add('scroll-language-name')
    createLanguageName.innerHTML = languages.name;

    const createLanguageProgress = document.createElement('progress')
    createLanguageProgress.classList.add('scroll-language-progress-bar')
    createLanguageProgress.setAttribute('value', languages.progress)
    createLanguageProgress.setAttribute('max', languages.max)

    const progressStatus = document.createElement('span')
    progressStatus.classList.add('scroll-language-progress-status')
    progressStatus.innerHTML = `${languages.progress}%`

    personalDescriptionSchema.scrollDescriptionSchemaSkill.appendChild(createMainDivContainer)

    createMainDivContainer.appendChild(createLangDivContainer)
    createMainDivContainer.appendChild(createProgressbarDivContainer)

    createLangDivContainer.appendChild(createLanguageName)
    createProgressbarDivContainer.appendChild(createLanguageProgress)
    createProgressbarDivContainer.appendChild(progressStatus)
}
function displayskillProgressBar() {
    arraySkillsProgress.forEach(element => {
        createSkillsProgressElement(element)
    });
}



btnBurger.addEventListener('click', () => {

    navLinks.classList.toggle('nav-links-toggle')
    burgerToggle.classList.toggle('burger-toggle')


})


await loadContent('content.json')
await loadDescriptionText('aboutTextContent.text', 'skillsTextContent.text', 'projectsTextContent.text')




