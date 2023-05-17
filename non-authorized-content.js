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

// const initCards = [
//   {
//     owner: 'login__Лиза',
//     image: './images/country.jpg',
//     cardTitle: 'Лучшая страна для релокации из России в 2023 году',
//     subtitle: 'Конкурс для перспективных ИТ-специалистов на определение самой приятной для релаксации страны',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/spain.jpg',
//         name: 'Испания',
//         description: 'Яркая солнечная страна',
//         likes: []
//       },
//       {
//         img: './images/usa.jpg',
//         name: 'США',
//         description: 'Высокотехнологичная держава',
//         likes: []
//       },
//       {
//         img: './images/georgia.jpg',
//         name: 'Грузия',
//         description: 'Страна с богатой культурой',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__Лиза',
//     image: './images/pomegranate.jpg',
//     cardTitle: 'Какой гранатовый сок лучше?',
//     subtitle: 'Конкурс на выбор самого лучшего в соотношении цена-качества сока',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/ayat.jpg',
//         name: 'AYAT',
//         description: 'Без сахара и консервантов',
//         likes: []
//       },
//       {
//         img: './images/rich.jpg',
//         name: 'RICH',
//         description: 'Бюджетный вариант, есть сахар',
//         likes: []
//       },
//       {
//         img: './images/nar.jpg',
//         name: 'NAR',
//         description: 'Самый дорогой, хороший состав',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__Ксюша',
//     image: './images/fruits.png',
//     cardTitle: 'Лучший фрукт',
//     subtitle: 'Настало время наконец определить самый вкусный и сочный фрукт всея Руси!',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/orange.jpg',
//         name: 'Апельсин',
//         description: 'Сладко-кислый, сложно чистить',
//         likes: []
//       },
//       {
//         img: './images/banana.jpg',
//         name: 'Банан',
//         description: 'Сладкий, быстро чистить',
//         likes: []
//       },
//       {
//         img: './images/apple.jpg',
//         name: 'Яблоко',
//         description: 'Сладкое или может и кислое',
//         likes: []
//       },
//       {
//         img: './images/mandarin.jpg',
//         name: 'Мандарин',
//         description: 'Сладкий, под новый год, сочный',
//         likes: []
//       },
//       {
//         img: './images/peach.jpg',
//         name: 'Персик',
//         description: 'Сочный, сладкий, неудобно есть',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__Ксюша',
//     image: './images/vegetables.jpg',
//     cardTitle: 'Лучший овощь',
//     subtitle: 'Ну что, готовы выбрать самый топовый овощь?',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/kapusta.jpg',
//         name: 'Капуста',
//         description: 'Большое содержание витаминов',
//         likes: []
//       },
//       {
//         img: './images/luk.jpg',
//         name: 'Лук',
//         description: 'Противовирусное средство',
//         likes: []
//       },
//       {
//         img: './images/shpinat.jpg',
//         name: 'Шпинат',
//         description: 'Благоприятно влияет',
//         likes: []
//       },
//       {
//         img: './images/patato.jpg',
//         name: 'Картофель',
//         description: 'Плюс инсулин и глюкоза в крови',
//         likes: []
//       },
//       {
//         img: './images/tomato.jpg',
//         name: 'Томаты',
//         description: 'Очень полезны',
//         likes: []
//       },
//       {
//         img: './images/cucumber.jpg',
//         name: 'Огурец',
//         description: 'Много клетчатки. На 90% вода',
//         likes: []
//       },
//       {
//         img: './images/selderey.jpg',
//         name: 'Сельдерей',
//         description: 'Противоопухолевыми средство',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__Даша',
//     image: './images/present.jpg',
//     cardTitle: 'Ваш любимый праздник в году',
//     subtitle: 'Что может быть лучше праздников и выходных? Только ваш любимый праздник. Посмотрим же что наши пользователи предпочитают больше всего',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/birthday.jpg',
//         name: 'День рождения',
//         description: '',
//         likes: []
//       },
//       {
//         img: './images/febrary23.jpg',
//         name: '23 февраля',
//         description: '',
//         likes: []
//       },
//       {
//         img: './images/march8.jpg',
//         name: '8 марта',
//         description: '',
//         likes: []
//       },
//       {
//         img: './images/may1.jpg',
//         name: 'День труда',
//         description: '',
//         likes: []
//       },
//       {
//         img: './images/newyear.jpg',
//         name: 'Новый год',
//         description: '',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__Даша',
//     image: './images/nikes.jpg',
//     cardTitle: 'Какой ваш любимый бренд спортивной обуви?',
//     subtitle: 'Исследование рассчитанное на получение статистики по популярности в России современных брендов обуви!',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/nike.jpg',
//         name: 'Nike',
//         description: 'Американское качество',
//         likes: []
//       },
//       {
//         img: './images/puma.jpg',
//         name: 'Puma',
//         description: 'Топ 3 в мире спортивной одежды',
//         likes: []
//       },
//       {
//         img: './images/newbalance.jpg',
//         name: 'New Balance',
//         description: 'Опытнейший производитель',
//         likes: []
//       },
//       {
//         img: './images/adidas.jpg',
//         name: 'Adidas',
//         description: 'Немецкое качество',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__Саша',
//     image: './images/marks.png',
//     cardTitle: 'Худший производитель автомобилей',
//     subtitle: 'На рынке автомобилей огромное количество разных качественных марок, которые зарекомендовали себя за долгие годы упорной работы. Но среди них есть и недобросовестные производители.',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/suzuki.png',
//         name: 'Suzuki',
//         description: '',
//         likes: []
//       },
//       {
//         img: './images/jeep.png',
//         name: 'Jeep',
//         description: '',
//         likes: []
//       },
//       {
//         img: './images/mini.png',
//         name: 'MINI',
//         description: '',
//         likes: []
//       },
//       {
//         img: './images/chevrolet.png',
//         name: 'Chevrolet',
//         description: '',
//         likes: []
//       }
//     ]
//   },
//   {
//     owner: 'login__Саша',
//     image: './images/banks.jpg',
//     cardTitle: 'Лучший кэшбек за покупки',
//     subtitle: 'В наше время, кэшбек является одной из основных причин выбора того или иного банка. Для всех не определившихся и создан этот конкурс',
//     favourites: [],
//     applicants: [
//       {
//         img: './images/sber.png',
//         name: 'СберБанк',
//         description: '4 уровня привилегий',
//         likes: []
//       },
//       {
//         img: './images/tinkoff.jpg',
//         name: 'Тинькофф',
//         description: 'от 1% до 30%',
//         likes: []
//       },
//       {
//         img: './images/alfa.png',
//         name: 'АльфаБанк',
//         description: '1,5-2% на всё',
//         likes: []
//       },
//       {
//         img: './images/vtb.png',
//         name: 'ВТБ',
//         description: '2-4% на всё',
//         likes: []
//       },
//       {
//         img: './images/otkritie.png',
//         name: 'Открытие',
//         description: '2-3% на всё',
//         likes: []
//       },
//       {
//         img: './images/raiffeisen.png',
//         name: 'РайффайзенБанк',
//         description: '1% на все покупки',
//         likes: []
//       }
//     ]
//   }
// ];
// 
// initCards.forEach(card => {
//   localStorage.setItem('card__' + card.cardTitle, JSON.stringify(card));
// });
// 
// localStorage.setItem('login__Саша', '12345123');
// localStorage.setItem('login__Даша', '12345123');
// localStorage.setItem('login__Лиза', '12345123');
// localStorage.setItem('login__Ксюша', '12345123');
// 
// localStorage.setItem('data__Саша', '{"image":"./images/avatar.png","name":"Саша","description":"Я пользуюсь VoteChain"}');
// localStorage.setItem('data__Даша', '{"image":"./images/avatar.png","name":"Даша","description":"Я пользуюсь VoteChain"}');
// localStorage.setItem('data__Лиза', '{"image":"./images/avatar.png","name":"Лиза","description":"Я пользуюсь VoteChain"}');
// localStorage.setItem('data__Ксюша', '{"image":"./images/avatar.png","name":"Ксюша","description":"Я пользуюсь VoteChain"}');

// localStorage.clear();