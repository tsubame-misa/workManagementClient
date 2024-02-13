import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userDictState = atom({
  key: "userDictState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
