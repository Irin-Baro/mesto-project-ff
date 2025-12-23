import { validateCards } from "./components/validation.js";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/higher-front-back-dev',
    headers: {
        authorization: '564384b0-a943-47c5-aee2-dfb2b45c46cf',
        'Content-Type': 'application/json'
    }
  };

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = async () => {
    const cardsResponse = await fetch(`${config.baseUrl}/cards`, { 
        headers: config.headers 
    });
    const cards = await cardsResponse.json();
    const cardsValid = await validateCards(cards);
    return cardsValid;
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkResponse);
};

export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(checkResponse);
};

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(checkResponse);
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse);
};
  
export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(checkResponse);
};

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse);
};
  
export const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(checkResponse);
};