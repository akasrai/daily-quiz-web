import SecureLS from 'secure-ls';
import { ApiResponse } from 'api/api.type';
import { MESSAGE } from 'helper/helper.constant';
import { serialize, parse, withData, withError } from 'helper/common-helper';

const ls = new SecureLS({
  encodingType: 'des',
  isCompression: true,
  encryptionSecret: process.env.REACT_APP_ENCRYPTION_SECRET,
});
const hasLocalStorage = window.localStorage;

export const storage = {
  get(key: string) {
    const { error, data }: ApiResponse = parse(localStorage.getItem(key) || '');

    if (error) {
      return withError(error);
    }

    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    return withData(data);
  },

  set(key: string, value: any) {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    return withData(localStorage.setItem(key, serialize(value)));
  },

  clear(key: string = '') {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    key ? localStorage.removeItem(key) : localStorage.clear();

    return withData(localStorage.getItem(key));
  },
};

export const securedLS = {
  set(key: string, value: any) {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    return withData(ls.set(key, value));
  },

  get(key: string) {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    return withData(ls.get(key));
  },

  clear(key: string = '') {
    if (!hasLocalStorage) {
      return withError(MESSAGE.NO_LOCAL_STORAGE);
    }

    if (key) {
      return withData(localStorage.removeItem(key));
    }

    return withData(ls.removeAll());
  },
};
