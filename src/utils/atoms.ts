import { atom, selector } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    loged: false,
    user: {},
  },
});

export const userState = selector({
  key: "userState",
  get: ({ get }) => {
    const { user } = get(authState);

    return user;
  },
});

export const logedState = selector({
  key: "logedState",
  get: ({ get }) => {
    const { loged } = get(authState);

    return loged;
  },
});
