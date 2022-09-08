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
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line
  return !(!email || regex.test(email) === false);
}

export function importAll(r) {
  let images = {};
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

export function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
