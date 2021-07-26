import { atom } from 'recoil';

export const nameState = atom({
  key: 'nameState',
  default: '',
});

export const phoneState = atom({
  key: 'phoneState',
  default: '',
});

export const emailState = atom({
  key: 'emailState',
  default: '',
});
