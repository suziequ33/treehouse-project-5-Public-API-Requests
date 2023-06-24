const searchContainer = document.querySelector('.search-container');
const galleryContainer = document.getElementById('gallery');
const modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');
let users;

    const searchMarkup =  `
<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;
searchContainer.insertAdjacentHTML('beforeend', searchMarkup);

//let users = [];
fetchData('https://randomuser.me/api/?results=12')
.then((data) => {
    users = data.results;
    users.forEach((user) => {
        createGallyItem(user);
    });
})
    .catch((error) => {
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
    //const formattedCell = formatCellNumber(cell);
   // const formattedBirthday = formatBirthday(dob.date);
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
            <p class="modal-text">${cell}</p>
            <p class="modal-text">${location.street.number} ${location.state.name}, ${location.state}, ${location.postcode}</p>
            <p class="modal-text">Birthday: ${dob.date}</p>
        </div>
 </div>
 </div>
`;
//modalContainer.insertAdjacentHTML('beforeend', modalMarkup);
modalContainer.innerHTML = modalMarkup;
document.body.appendChild(modalContainer);
}

galleryContainer.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
        const cardElement = e.target.closest('.card');
        const userIndex = Array.from(galleryContainer.children).indexOf(e.target.closest('.card'));
        const user = users[userIndex];
        createModal(user);
        //document.body.appendChild(modalContainer);
    }   
});

modalContainer.addEventListener('click', (e) => {
    if(e.target.id === 'modal-close-btn' || e.target.classList.contains('modal-container')) {
        //modalContainer.classList.remove();
        modalContainer.innerHTML = '';
    }
});

//fetchData('https://randomuser.me/api/?results=12')
//.then((data) => {
// users = data.results;
   // users.forEach((user) => {
     //   createGallyItem(user);
   // });
//})
   // .catch((error) => {
      //  console.log('Error:', error);
//});
function formatCellNumber(cell) {
    return cell.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

//function formatCellNumber(cell) {
   // const cleaned = ('' + cell).replace(/\D/g, '');
   // const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
   // if(match) {
       // return '(' + match[1] + ')' + match[2] + '-' + match[3];
   // }
   // return cell;
//}
function formatBirthday(birthday) {
    const date = new Date(birthday);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}${year}`;
}
function fetchData(url) {
    return fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json();
        } 
           throw new Error('Network response was not ok.');
});
}