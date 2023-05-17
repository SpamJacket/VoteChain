const page = document.querySelector('.page');
const content = page.querySelector('.content');

const loginButtons = Array.from(page.querySelectorAll('.header__link_type_button'));
const signUpPopup = page.querySelector('.popup_type_sign-up');
const logInPopup = page.querySelector('.popup_type_log-in');

const contestPopup = page.querySelector('.popup_type_contest');
const contestCloseButton = page.querySelector('.popup__button');
const popupImage = contestPopup.querySelector('.popup__image');
const popupTitle = contestPopup.querySelector('.popup__title');
const popupSubtitle = contestPopup.querySelector('.popup__text');
const popupCardList = page.querySelector('.popup__card-list');

const searchForm = page.querySelector('.header__form');
const searchInput = searchForm.querySelector('.header__search');

const signupForm = page.querySelector('.popup__form_type_signup');
const loginForm = page.querySelector('.popup__form_type_login');

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

loginButtons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.id === 'signup') {
      openPopup(signUpPopup);
    } else {
      openPopup(logInPopup);
    }
  });
});

logInPopup.addEventListener('mousedown', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(logInPopup);
  }
});

signUpPopup.addEventListener('mousedown', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(signUpPopup);;
  }
});

contestPopup.addEventListener('mousedown', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(contestPopup);
  }
});

contestCloseButton.addEventListener('click', () => {
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
    const cardElement = document.querySelector('#content-card').content.cloneNode(true);
    const cardImage = cardElement.querySelector('.content__image');
    const cardTitle = cardElement.querySelector('.content__title');
  
    cardImage.image = card.image;
    cardImage.cardTitle = card.cardTitle;
    cardImage.subtitle = card.subtitle;
    cardImage.applicants = card.applicants;

    cardImage.src = cardImage.image;
    cardImage.alt = cardImage.cardTitle;
    cardTitle.textContent = cardImage.cardTitle;
  
    content.append(cardElement);
  });

  Array.from(page.querySelectorAll('.content__image')).forEach(card => {
    card.addEventListener('click', () => {
      openPopup(contestPopup);
  
      popupImage.src = card.image;
      popupTitle.textContent = card.cardTitle;
      popupSubtitle.textContent = card.subtitle;
  
      popupCardList.innerHTML = '';
  
      card.applicants.forEach(applicant => {
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
  
        cardLike.addEventListener('click', () => {
          closePopup(contestPopup);
          openPopup(logInPopup);
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

// Регистрация и вход

signupForm.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const login = signupForm.querySelector('.popup__input_type_login');
  const password = signupForm.querySelector('.popup__input_type_password');
  let flag = 0;

  for(let i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i) === ('login__' + login.value)) {
      flag++;
    }
  }

  if(flag !== 0) {
    alert('Пользователь с данным логином уже существует');
  } else {
    localStorage.setItem('login__' + login.value, password.value);
    localStorage.setItem('data__' + login.value, JSON.stringify({ image: './images/avatar.png', name: login.value, description: 'Я пользуюсь VoteChain' }));
    localStorage.setItem('user', 'login__' + login.value);
    window.location.href = './authorized-content.html';
  }
});

loginForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const login = loginForm.querySelector('.popup__input_type_login');
  const password = loginForm.querySelector('.popup__input_type_password');

  if(localStorage.getItem('login__' + login.value) !== password.value) {
    alert('Введен неверный логин или пароль');
  } else {
    localStorage.setItem('user', 'login__' + login.value);
    window.location.href = './authorized-content.html';
  }
});