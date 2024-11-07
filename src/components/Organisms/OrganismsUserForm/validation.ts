import type { Rule } from 'ant-design-vue/es/form';

export const validateFullname = (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Kolom fullname wajib diisi');
  }
  else {
    return Promise.resolve();
  }
};

export const validateEmail = (_rule: Rule, value: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    return Promise.reject('Kolom Email wajib diisi');
  }
  else if (!emailPattern.test(value)) {
    return Promise.reject("Alamat email harus menyertakan tanda '@'");
  }
  else {
    return Promise.resolve();
  }
};

export const validateAgeNumber = (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('Kolom Age wajib diisi');
  }
  else if (isNaN(Number(value))) {
    return Promise.reject('Kolom Age harus berupa angka');
  }
  else if (Number(value) < 0) {
    return Promise.reject('Umur harus positif dan tidak boleh negatif');
  }
  else {
    return Promise.resolve();
  }
};