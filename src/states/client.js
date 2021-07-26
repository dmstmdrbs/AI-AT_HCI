import { atom } from 'recoil';

const clientState = atom({
  key: 'clientState',
  default: '',
});

export default clientState;
