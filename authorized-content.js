const page = document.querySelector('.page');
const content = page.querySelector('.content');

const contestPopup = page.querySelector('.popup_type_contest');
const popupImage = contestPopup.querySelector('.popup__image');
const popupTitle = contestPopup.querySelector('.popup__title');
const popupSubtitle = contestPopup.querySelector('.popup__text');
const popupCardList = contestPopup.querySelector('.popup__card-list');

const contestSettingsPopup = page.querySelector('.popup_type_contest-settings');
const popupSettingsImage = contestSettingsPopup.querySelector('.popup__input-info-img');
const popupSettingsTitle = contestSettingsPopup.querySelector('.popup__input-info-text-title');
const popupSettingsSubtitle = contestSettingsPopup.querySelector('.popup__input-info-text-subtitle');
const popupSettingsAddButton = contestSettingsPopup.querySelector('.popup__add-button');
const popupSettingsCardList = contestSettingsPopup.querySelector('.popup__card-list');
const popupSettingsSubmitButton = contestSettingsPopup.querySelector('.popup__add-submit-button');

const closeButtons = Array.from(page.querySelectorAll('.popup__button'));

const searchForm = page.querySelector('.header__form');
const searchInput = searchForm.querySelector('.header__search');

// const initCards = [
//   {
//     owner: 'login__SpamJacket',
//     image: './images/fruits.png',
//     cardTitle: 'Какой фрукт вкуснее?',
//     subtitle: 'Какой фрукт вкуснее?',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__kssivi',
//     image: './images/vegetables.jpg',
//     cardTitle: 'Какой овощь вкуснее?',
//     subtitle: 'Какой овощь вкуснее?',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__SpamJacket',
//     image: './images/fruits.png',
//     cardTitle: 'Какой фрукт вкуснее2?',
//     subtitle: 'Какой фрукт вкуснее2?',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__kssivi',
//     image: './images/vegetables.jpg',
//     cardTitle: 'Какой овощь вкуснее2?',
//     subtitle: 'Какой овощь вкуснее2?',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__SpamJacket',
//     image: './images/fruits.png',
//     cardTitle: 'Какой фрукт вкуснее3?',
//     subtitle: 'Какой фрукт вкуснее3?',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       },
//       {
//         img: './images/fruits.png',
//         name: 'Апельсин',
//         description: 'Оранжевый',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__kssivi',
//     image: './images/vegetables.jpg',
//     cardTitle: 'Какой овощь вкуснее3?',
//     subtitle: 'Какой овощь вкуснеe3?',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       },
//       {
//         img: './images/vegetables.jpg',
//         name: 'Кабачек',
//         description: 'Светло-зеленый',
//         likes: []
//       }
//     ]
//   }
// ];

// initCards.forEach(card => {
//   localStorage.setItem('card__' + card.cardTitle, JSON.stringify(card));
// });

// Открытие и закрытие попапов

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

contestSettingsPopup.addEventListener('mousedown', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(contestSettingsPopup);
  }
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  })
});

// Рендер конкурсов

popupSettingsAddButton.addEventListener('click', () => {
  const cardElement = document.querySelector('#popup-card-settings').content.cloneNode(true);
  const cardName = cardElement.querySelector('.popup__input-card-text-title');

  cardName.likes = [];

  popupSettingsCardList.append(cardElement);
});

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

    if(cardImage.owner !== localStorage.getItem('user')) {
      cardButton.classList.add('button_type_favourite');
      if(cardImage.favourites.includes(localStorage.getItem('user'))) {
        cardButton.style = 'background-image: url("../../../../../images/favourite-active.svg");';
      }
    } else {
      cardButton.classList.add('button_type_settings');
    }
  
    content.append(cardElement);
  });

  Array.from(page.querySelectorAll('.content__card')).forEach(card => {
    const cardButton = card.querySelector('.button');
    const cardImage = card.querySelector('.content__image');
    const cardTitle = card.querySelector('.content__title');

    if(cardButton.classList.contains('button_type_favourite')){
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
    } else {
      cardButton.addEventListener('click', () => {
        openPopup(contestSettingsPopup);

        popupSettingsTitle.image = cardImage.image;
        popupSettingsTitle.value = cardImage.cardTitle;
        popupSettingsSubtitle.value = cardImage.subtitle;

        popupSettingsCardList.innerHTML = '';

        cardImage.applicants.forEach(applicant => {
          const cardElement = document.querySelector('#popup-card-settings').content.cloneNode(true);
          const cardName = cardElement.querySelector('.popup__input-card-text-title');
          const cardDescription = cardElement.querySelector('.popup__input-card-text-subtitle');

          cardName.img = applicant.img;
          cardName.value = applicant.name;
          cardDescription.value = applicant.description;
          cardName.likes = applicant.likes;

          popupSettingsCardList.append(cardElement);
        });

        popupSettingsSubmitButton.addEventListener('click', () => {
          localStorage.removeItem('card__' + cardImage.cardTitle);
          
          cardImage.image = './images/' + popupSettingsImage.value.match(/[a-zA-Z]{1,}\.[a-zA-Z]{1,}/)[0];
          cardImage.cardTitle = popupSettingsTitle.value;
          cardImage.subtitle = popupSettingsSubtitle.value;
          cardImage.applicants = Array.from(popupSettingsCardList.querySelectorAll('.popup__card')).map(applicant => {
            return {
              img: './images/' + applicant.querySelector('.popup__input-card-img').value.match(/[a-zA-Z]{1,}\.[a-zA-Z]{1,}/)[0],
              name: applicant.querySelector('.popup__input-card-text-title').value,
              description: applicant.querySelector('.popup__input-card-text-subtitle').value,
              likes: applicant.querySelector('.popup__input-card-text-title').likes
            };
          });

          cardImage.src = cardImage.image;
          cardImage.alt = cardImage.cardTitle;
          cardTitle.textContent = cardImage.cardTitle;

          localStorage.setItem('card__' + cardImage.cardTitle, JSON.stringify(cardImage));

          closePopup(contestSettingsPopup);
        });
      });
    }

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