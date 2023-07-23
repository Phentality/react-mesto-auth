import React from 'react';

export const CurrentUserContext = React.createContext();

export const currentUser = {
  data: {
    name: '',
    about: '',
    avatar: '',
    cohort: '',
    _id: '',
  },
}; 