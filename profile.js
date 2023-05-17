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

const profile = page.querySelector('.profile');
const profileAvatar = profile.querySelector('.profile__avatar');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const profileButton = profile.querySelector('.button');

const profilePopup = page.querySelector('.popup_type_profile');
const popupProfileAvatar = profilePopup.querySelector('.popup__avatar');
const popupProfileName = profilePopup.querySelector('.popup__input_type_name');
const popupProfileDescription = profilePopup.querySelector('.popup__input_type_description');
const popupProfileButton = profilePopup.querySelector('.popup__profile-button');

const createButton = page.querySelector('.header__create-button');

const closeButtons = Array.from(page.querySelectorAll('.popup__button'));

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

profilePopup.addEventListener('mousedown', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(profilePopup);
  }
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  })
});

// Рендер профиля

function renderProfile() {
  const profile = JSON.parse(localStorage.getItem('data__' + localStorage.getItem('user').slice(7)));

  profileAvatar.src = profile.image;
  profileName.textContent = profile.name;
  profileDescription.textContent = profile.description;
}

renderProfile();

// Рендер конкурсов

function submitCreate() {
  const card = {
    owner: localStorage.getItem('user'),
    image: './images/' + popupSettingsImage.value.match(/[a-zA-Z]{1,}\.[a-zA-Z]{1,}/)[0],
    cardTitle: popupSettingsTitle.value,
    subtitle: popupSettingsSubtitle.value,
    favourites: [],
    applicants: Array.from(popupSettingsCardList.querySelectorAll('.popup__card')).map(applicant => {
      return {
        img: './images/' + applicant.querySelector('.popup__input-card-img').value.match(/[a-zA-Z]{1,}\.[a-zA-Z]{1,}/)[0],
        name: applicant.querySelector('.popup__input-card-text-title').value,
        description: applicant.querySelector('.popup__input-card-text-subtitle').value,
        likes: applicant.querySelector('.popup__input-card-text-title').likes
      };
    })
  };

  localStorage.setItem('card__' + card.cardTitle, JSON.stringify(card));
  renderImages();
  closePopup(contestSettingsPopup);
}

popupSettingsAddButton.addEventListener('click', () => {
  const cardElement = document.querySelector('#popup-card-settings').content.cloneNode(true);
  const cardName = cardElement.querySelector('.popup__input-card-text-title');

  cardName.likes = [];

  popupSettingsCardList.append(cardElement);
});

function renderImages() {
  let cardsLocalStorage = [];
  for(let i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i).startsWith('card__')) {
      cardsLocalStorage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  
  content.innerHTML = '';

  cardsLocalStorage.forEach(card => {
    if(card.owner === localStorage.getItem('user')) {
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
      cardButton.classList.add('button_type_settings');
    
      content.append(cardElement);
    }
  });

  Array.from(page.querySelectorAll('.content__card')).forEach(card => {
    const cardButton = card.querySelector('.button');
    const cardImage = card.querySelector('.content__image');
    const cardTitle = card.querySelector('.content__title');

    function submitSave() {   
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

      localStorage.removeItem('card__' + cardImage.cardTitle);
      localStorage.setItem('card__' + cardImage.cardTitle, JSON.stringify(cardImage));

      closePopup(contestSettingsPopup);
    }

    cardButton.addEventListener('click', () => {
      openPopup(contestSettingsPopup);
      popupSettingsSubmitButton.textContent = 'Сохранить';

      popupSettingsTitle.image = cardImage.image;
      popupSettingsTitle.value = cardImage.cardTitle;
      popupSettingsSubtitle.value = cardImage.subtitle;

      popupSettingsCardList.innerHTML = '';
      popupSettingsSubmitButton.removeEventListener('click', submitCreate);

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
      
      popupSettingsSubmitButton.addEventListener('click', submitSave);
    });

    createButton.addEventListener('click', () => {
      openPopup(contestSettingsPopup);
      popupSettingsSubmitButton.textContent = 'Создать';
    
      popupSettingsTitle.value = '';
      popupSettingsSubtitle.value = '';
      popupSettingsCardList.innerHTML = '';
      popupSettingsSubmitButton.removeEventListener('click', submitSave);
    
      popupSettingsSubmitButton.addEventListener('click', submitCreate);
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

// Редактирование профиля

profileButton.addEventListener('click', () => {
  openPopup(profilePopup);

  popupProfileAvatar.image = profileAvatar.src;
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;

  popupProfileButton.addEventListener('click', () => {
    const profile = {
      image: './images/' + popupProfileAvatar.value.match(/[a-zA-Z]{1,}\.[a-zA-Z]{1,}/)[0],
      name: popupProfileName.value,
      description: popupProfileDescription.value
    };

    localStorage.setItem('data__' + localStorage.getItem('user').slice(7), JSON.stringify(profile));

    renderProfile();
    closePopup(profilePopup);
  });
});