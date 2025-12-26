import { allProblematicDomains } from './utils/unavailableUrls.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/higher-front-back-dev',
    headers: {
        authorization: '564384b0-a943-47c5-aee2-dfb2b45c46cf',
        'Content-Type': 'application/json'
    }
  };

function isUrlProblematic(url) {
    const problematicDomain = allProblematicDomains.find(domain => 
        url.includes(domain)
    );
    if (problematicDomain) {
        return { 
            valid: false, 
            reason: `Проблемный домен: ${problematicDomain}` 
        };
    }
    
    return { valid: true };
}

const validateCards = async (cards) => {
    const validCards = [];

    for (const card of cards) {
        const validation = await isUrlProblematic(card.link);
        
        if (validation.valid) {
            validCards.push(card);
        }
    }

    return validCards;
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = async () => {
    try {
        const cardsResponse = await fetch(`${config.baseUrl}/cards`, { 
            headers: config.headers 
        });
        const cards = await checkResponse(cardsResponse);
        const cardsValid = await validateCards(cards);
        return cardsValid;
    } catch (error) {
        console.error('Ошибка при загрузке карточек:', error);
        throw error;
    }
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