// eslint-disable-next-line no-use-before-define
export function caculatePage(totalPages, size = 15) {
  const calPage = totalPages / size;
  const intPage = Math.floor(calPage);

  if (calPage !== intPage) {
    return intPage + 1;
  } else {
    return intPage;
  }
}

export function caculateOffSet(page, size = 15) {
  if (page < 1) return page;
  return size * page - size;
}

export function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export function phoneValidation(numPhone) {
  const regex = /^(84|0[3|5|7|8|9])+([0-9]{8})\b/i;
  return !(!numPhone || regex.test(numPhone) === false);
}

export function emailValidation(email) {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line
  return !(!email || regex.test(email) === false);
}

export function importAll(r) {
  let images = {}; // eslint-disable-next-line
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

export function convertYMD(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

export function convertDMY(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("-");
}

export function convertMDY(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [mnth, day, date.getFullYear()].join("-");
}

export function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export function isEmpty(val) {
  return val === undefined || val == null || val.length < 1 ? true : false;
}

export function postUrlParam(url, param) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams(param),
  };
  return fetch(url, requestOptions).then((response) => response.json());
}

export function getUrl(url) {
  return fetch(url).then((response) => response.json());
}

export function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

export function timePost(datetime) {
  const milliseconds = new Date() - new Date(datetime);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const seconds = Math.floor((milliseconds / 1000) % 60);

  var returnValue = datetime;

  if (hours < 24 && hours > 0) {
    returnValue = hours + " giờ trước";
  } else if (minutes !== 0) {
    returnValue = minutes + " phút trước";
  } else if (seconds < 60) {
    returnValue = "Mới";
  }
  return returnValue;
}

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
