//console.log('test');

const searchContainer = document.querySelector('.search-container');

const searchMarkup = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;
searchContainer.insertAdjacentHTML('beforeend', searchMarkup);

const searchForm = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-submit');

searchForm.addEventListener('keyup', searchUsers);
searchButton.addEventListener('click', searchUsers);

function searchUsers(event) {
    event.preventDefault();

    const searchInput = searchForm.value.toLowerCase();
    const galleryItems = document.querySelectorAll('.card');

    galleryItems.forEach(item => {
        const userName = item.querySelector('.card-name').textContent.toLowerCase();
        const userEmail = item.querySelector('.card-text').textContent.toLowerCase();
        const userLocation = item.querySelector('.card-text.cap').textContent.toLowerCase();

        if (
            userName.includes(searchInput) ||
            userEmail.includes(searchInput) ||
            userLocation.includes(searchInput)
        ) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

const request = new XMLHttpRequest();
request.open('GET', 'https://randomuser.me/api/?results=12')
request.onload = function () {
//fetch('https://randomuser.me/api/?results=12')
//.then(response => response.json())
//.then(data => {
    if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        const users = data.results;

        users.forEach(user => {
            const galleryItem = createGalleryItem(user);
            appendGalleryItem(galleryItem);
    });

    const galleryItems = document.querySelectorAll('.card');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            displayModal(users[index]);
        });
    });
} else {
    console.log('Error:', request.status);
}
};
request.onerror= function () {
    console.long('Reguest faild');
};
request.send();

function createGalleryItem(user) {
    const {name, email, location, picture } = user;

    const galleryItem = document.createElement('div');
    galleryItem.className = 'card';
    galleryItem.innerHTML = `
    <div class="card-img-container">
        <img class="card-img" src="${picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${location.city}, ${location.state}</p>
        </div>
    `;
    return galleryItem;
}

function appendGalleryItem(galleryItem) {
    const gallery = document.getElementById('gallery');
    gallery.appendChild(galleryItem);
}

function displayModal(user) {
    const { name, email, location, cell, picture, dob} = user;

    const formattedCell = formatPhoneNumber(cell);

    const formattedBirthday = formatDate(dob.date);

    const modalHTML = `
        <div class="modal-container:>
            <div class="modal">
                <button type="button" id="modal-close-btn" class+'modal-close-btn"><strong>X<?strong><?button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${location.city}</p>
                    <hr>
                    <p class"modal-text">${formattedCell}</p>
                    <p class"modal-text">${location.street.number} ${location.street.name}, ${location.state} ${location.postcode}</p>
                    <p class"modal-text">Birthday: ${formattedBirthday}</p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', () => {
        closeModal();
    });
}

function closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.remove();
}

function formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() +1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}