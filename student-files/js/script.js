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

        if (userName.includes(searchInput) || userEmail.includes(searchInput) || userLocation.includes(searchInput)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

const gallery = document.getElementById('gallery');

function addModalListeners(galleryItems, users) {
 //galleryItems = document.querySelectorAll('.card');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            displayModal(users[index]);
        });
    });
}

fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => {
    const users = data.results;
   
    users.forEach((user) => {
            const galleryItem = createGalleryItem(user);
            appendGalleryItem(galleryItem);
    });

     const galleryItems = document.querySelectorAll('.card');
     addModalListeners(galleryItems, users);

     //galleryItems.forEach((item) => {
       //item.addEventListener('click', (event) => {
          // const clickedCard = event.currentTarget;
            //const index = Array.from(galleryItems).indexOf(item);
            //displayModal(users[index]);
        //});
    // });
})
.catch((error) => {
    console.log('Error', error);
});

function createGalleryItem(user) {
    const {name, email, location, picture } = user;

    const galleryItem = document.createElement('div');
    galleryItem.className = 'card';
    galleryItem.innerHTML = `
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
    return galleryItem;
}

function appendGalleryItem(galleryItem) {
    gallery.appendChild(galleryItem);
}

function addModalListeners(galleryIem) {
    gallery.appendChild(galleryItem);


galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        displayModal(users[index]);
    });
});
}

function displayModal(user) {
    const { name, email, location, cell, picture, dob} = user;
    const formattedCell = formatPhoneNumber(cell);
    const formattedBirthday = formatDate(dob.date);
    

const modalContainer = document.createElement('div');
modalContainer.className= 'modal-container';

modalContainer.innerHTML = ` 
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
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
            `;

    document.body.appendChild(modalContainer);
    const modal = modalContainer.querySelector('.modal');
    modal.addEventListener('click', (event) => {
           event.stopPropagation();
    });

    modalContainer.addEventListener('click', () => {
        closeModal();
    });

    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', closeModal);
   

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
    const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
    return date.toLocaleDateString('en-US', options);
}



/**clicking out of the profile card. addacting the card to the page/ had a few missed >  and "" */