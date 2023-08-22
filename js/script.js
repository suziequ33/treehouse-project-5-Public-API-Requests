const searchContainer = document.querySelector('.search-container');
const galleryContainer = document.getElementById('gallery');
const modalContainer = document.createElement('div');
let users;

    const searchMarkup =  `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;
searchContainer.insertAdjacentHTML('beforeend', searchMarkup);

function fetchData(url) {
    return fetch(url)
        .then((response) => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then((data) => data.results)
        .catch((error) => {
            console.log('Error:', error);
        });
}
fetchData('https://randomuser.me/api/?results=12')
.then((data) => {
    users = data;
    users.forEach((user) => {
        createGallyItem(user);
    });
})
.catch((error) =>{
    console.log('Error:', error);
});

function createGallyItem(data) {
    const {picture, name, email, location} = data;
const cardMarkup =  ` 
<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${picture.large}" alt="profile picture">
     </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${location.city}, ${location.state}</p>
    </div>
</div>
`;
galleryContainer.insertAdjacentHTML('beforeend', cardMarkup);
}

function createModal(data) {
    const {picture, name, email, location, cell, dob} = data;

    const formattedCell = formatCellNumber(cell);
    const formattedAddress = `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.postcode}`;
    const formattedBirthday = formatBirthday(dob.date);

const modalMarkup = `
<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${location.city}</p>
            <hr>
            <p class="modal-text">${formattedCell}</p>
            <p class="modal-text">${formattedAddress}</p>
            <p class="modal-text">Birthday: ${formattedBirthday}</p>
        </div>
 </div>
 </div>
`;
modalContainer.innerHTML = modalMarkup;
document.body.appendChild(modalContainer);

const closeButton = document.getElementById('modal-close-btn')
closeButton.addEventListener('click', closeModal);

modalContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal-container')) {
        closeModal();
    }
});
modalContainer.classList.add('show-modal');
}

function closeModal() {
    modalContainer.remove();
}

function formatCellNumber(cell) {
    const cleaned = ('' + cell).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if(match) {
        return '(' + match[1] + ')' + match[2] + '-' + match[3];
    }
    return cell;
}

function formatBirthday(birthday) {
    const date = new Date(birthday);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

galleryContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if(card) {
        const index = Array.from(galleryContainer.children).indexOf(card);
        const user = users[index];
        createModal(user);
    }
});

document.body.style.backgroundColor = '#A8A8A8';

/** i used a lot of the structure of this project from the (treehouse)workplace-Working with fetch API.
 * and the treehouse-workplace-AJAX Basics. 
 * fetch/ deceloper.mozilla.ord /javacripttutorial.net examples
 * i got stuck when i had to implement code. I was constantly missing quotation and > symbols..
 * for the formating of the cell number and birthday i foound examples at gabrieleromanato.name,javascript-coder.com
 * for format number at stackoverflow.com,and  learnsbucket.com 
 * the modal was where i had trouble. i couldn't get the card to show or when i did it was darker then the example.
 * then the elements wouldnt show. ( I deleted and rewrote program twice because of this.) 
 * i then looked at the link modals with javascript. that helped to figure out where i was going wrong.
 * also sites:: w3school.com/freecodecamp.org/even how to create popup modal box with HTML CSS and JavaScript Youtoube/CodingLab.
 * i only changed the background of the boday. 
*/
