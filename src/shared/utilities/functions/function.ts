/* eslint-disable @typescript-eslint/no-explicit-any */
const debounceFn = () => {
  let timer: any;
  return function (searchValue: string, fn: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(searchValue);
    }, 700);
  };
};

const debounce = debounceFn();

export default debounce;
