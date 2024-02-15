import {NEW_PET} from '../actions/pet.action';

const INITIAL_STATE = {
  pet: null,
};

const PetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_PET:
      return {
        ...state,
        pet: action.pet,
      };
    default:
      return state;
  }
};

export default PetReducer;
