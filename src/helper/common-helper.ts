import { ApiResponse } from 'api/api.type';
import { ROMAN_MATRIX } from 'helper/helper.constant';

const toString = Object.prototype.toString;

export const isObject = (arg: any): boolean => {
  return toString.call(arg) === '[object Object]';
};

export const withError = (arg: any): ApiResponse => {
  if (isObject(arg)) {
    const { message = '', ...rest } = arg;

    return {
      data: null,
      error: {
        status: true,
        message,
        ...rest,
      },
    };
  }

  return {
    data: null,
    error: {
      status: true,
      message: arg,
    },
  };
};

export const withData = (data: any): ApiResponse => ({
  error: false,
  data,
});

export const serialize = (data: object): string => JSON.stringify(data);

export const parse = (data: string): object => {
  try {
    const parsedData = JSON.parse(data);

    return withData(parsedData);
  } catch (error) {
    return withError(error);
  }
};

export const isEmpty = (value: any) =>
  !value ||
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const updateObject = (oldObject: object, updatedProperties: object) => ({
  ...oldObject,
  ...updatedProperties,
});

export const isInputEmpty = (input: HTMLInputElement) => {
  if (!input.value) {
    return true;
  } else {
    unsetIsInvalidField(input);

    return false;
  }
};

export const setIsInvalidField = (input: HTMLInputElement) => {
  input.classList.add('is-invalid');
};

export const unsetIsInvalidField = (input: HTMLInputElement) => {
  input.classList.remove('is-invalid');
};

export const getRomanOf = (num: number): any => {
  if (num === 0) return '';

  for (const elem of ROMAN_MATRIX) {
    if (num >= elem[0]) {
      return elem[1] + getRomanOf(num - elem[0]);
    }
  }
};
