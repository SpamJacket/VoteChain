const page = document.querySelector('.page');
const content = page.querySelector('.content');

const contestPopup = page.querySelector('.popup_type_contest');
const popupImage = contestPopup.querySelector('.popup__image');
const popupTitle = contestPopup.querySelector('.popup__title');
const popupSubtitle = contestPopup.querySelector('.popup__text');
const popupCardList = contestPopup.querySelector('.popup__card-list');

const closeButton = page.querySelector('.popup__button');

const searchForm = page.querySelector('.header__form');
const searchInput = searchForm.querySelector('.header__search');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(page.querySelector('.popup_opened'));
  }
}

contestPopup.addEventListener('mousedown', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(contestPopup);
  }
});

closeButton.addEventListener('click', () => {
    closePopup(contestPopup);
});

// Рендер конкурсов

function renderImages(searchInputValue = '') {
  let cardsLocalStorage = [];
  for(let i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i).startsWith('card__')) {
      cardsLocalStorage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  cardsLocalStorage = cardsLocalStorage.map(card => {
    if(card.cardTitle.toLowerCase().includes(searchInputValue.toLowerCase())) {
      return card;
    } else {
      return '';
    }
  }).filter(el => {
    return (el != "");
  })
  
  content.innerHTML = '';

  cardsLocalStorage.forEach(card => {
    card.favourites.forEach(favourite => {
      if(localStorage.getItem('user') === favourite) {
        const cardElement = document.querySelector('#content-card').content.cloneNode(true);
        const cardImage = cardElement.querySelector('.content__image');
        const cardTitle = cardElement.querySelector('.content__title');
        const cardButton = cardElement.querySelector('.button');
      
        cardImage.owner = card.owner;
        cardImage.image = card.image;
        cardImage.cardTitle = card.cardTitle;
        cardImage.subtitle = card.subtitle;
        cardImage.favourites = card.favourites;
        cardImage.applicants = card.applicants;

        cardImage.src = cardImage.image;
        cardImage.alt = cardImage.cardTitle;
        cardTitle.textContent = cardImage.cardTitle;
        cardButton.classList.add('button_type_favourite');
        cardButton.style = 'background-image: url("../../../../../images/favourite-active.svg");';

        content.append(cardElement);
      }
    });
  });

  Array.from(page.querySelectorAll('.content__card')).forEach(card => {
    const cardButton = card.querySelector('.button');
    const cardImage = card.querySelector('.content__image');
    const cardTitle = card.querySelector('.content__title');

    cardButton.addEventListener('click', () => {
      if(!cardImage.favourites.includes(localStorage.getItem('user'))) {
        cardButton.style = 'background-image: url("../../../../../images/favourite-active.svg");';
        cardImage.favourites.push(localStorage.getItem('user'));
        localStorage.setItem('card__' + cardImage.cardTitle, JSON.stringify(cardImage));
      } else {
        cardButton.style = 'background-image: url("../../../../../images/favourite.svg");';
        cardImage.favourites = cardImage.favourites.filter(user => user !== localStorage.getItem('user'));
        localStorage.setItem('card__' + cardImage.cardTitle, JSON.stringify(cardImage));
      }
    });

    cardImage.addEventListener('click', () => {
      openPopup(contestPopup);
  
      popupImage.src = cardImage.image;
      popupTitle.textContent = cardImage.cardTitle;
      popupSubtitle.textContent = cardImage.subtitle;
  
      popupCardList.innerHTML = '';
  
      cardImage.applicants.forEach(applicant => {
        const cardElement = document.querySelector('#popup-card').content.cloneNode(true);
        const cardImg = cardElement.querySelector('.popup__card-img');
        const cardName = cardElement.querySelector('.popup__card-title');
        const cardDescription = cardElement.querySelector('.popup__card-description');
        const cardLike = cardElement.querySelector('.popup__like');
        const cardLikesCounter = cardElement.querySelector('.popup__counter');
  
        cardImg.src = applicant.img;
        cardImg.alt = applicant.name;
        cardName.textContent = applicant.name;
        cardDescription.textContent = applicant.description;
        cardLikesCounter.textContent = applicant.likes.length;
  
        if(!applicant.likes.includes(localStorage.getItem('user'))) {
          cardLike.style = 'background-image: url("../../../images/like.svg");';
        } else {
          cardLike.style = 'background-image: url("../../../images/like-active.svg");';
        }
  
        cardLike.addEventListener('click', () => {
          if(!applicant.likes.includes(localStorage.getItem('user'))) {
            cardLike.style = 'background-image: url("../../../images/like-active.svg");';
            cardLikesCounter.textContent++;
            applicant.likes.push(localStorage.getItem('user'));
            localStorage.setItem('card__' + cardImage.cardTitle, JSON.stringify(cardImage));
          } else {
            cardLike.style = 'background-image: url("../../../images/like.svg");';
            cardLikesCounter.textContent--;
            applicant.likes = applicant.likes.filter(user => user !== localStorage.getItem('user'));
            localStorage.setItem('card__' + cardImage.cardTitle, JSON.stringify(cardImage));
          }
        });
        
        popupCardList.append(cardElement);
      });
    });
  });
}

renderImages();

// Поиск

function searchFunc(evt) {
  searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    
    if(searchInput.contains(evt.relatedTarget)) {
      return;
    } else {
      renderImages(searchInput.value);
    }
  });
  
  searchInput.addEventListener('focusout', evt => {
    if(searchInput.contains(evt.relatedTarget)) {
      return;
    } else {
      renderImages(searchInput.value);
    }
  });
}

searchFunc();