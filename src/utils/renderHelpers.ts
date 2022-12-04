// import i18n from 'i18n'

import i18n from "./i18n";

export const convertUTCDateToLocalDate = (date: Date) => {
  const newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );
  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();
  newDate.setHours(hours - offset);
  return newDate;
};

export const dateToInputFormat = (utcDate?: Date): string => {
  if (!utcDate) return "-";
  const converted = new Date(utcDate);
  const day = converted.getDate();
  const year = converted.getFullYear();
  const month = converted.getMonth() + 1;
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const formats = {
  short: {
    day: "numeric",
    month: "short",
    year: undefined,
    hour: undefined,
    minute: undefined,
  },
  long: {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
  base: {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: undefined,
    minute: undefined,
  },
} as const;

export const localeDate = (
  utcDate?: Date,
  format: keyof typeof formats = "base"
): string => {
  if (!utcDate) {
    return "-";
  }
  const converted = new Date(utcDate);
  return converted.toLocaleString(
    localStorage.getItem("i18nextLng") || undefined,
    formats[format]
  );
};

export const numberWithSpaces = (x?: number) => {
  if (!x) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export function calculateAge(birthday: Date | undefined) {
  if (!birthday) return "-";
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export function parseDrivingLicences(drivingLicences: string[] | undefined) {
  if (!drivingLicences?.length) return "-";
  return drivingLicences
    ?.map((item) => item.toUpperCase().replace("_", "+"))
    .join(", ");
}

export const toFixedLocaleWithSpaces = (startInt: number | undefined) => {
  if (startInt === 0) {
    return 0;
  }
  const regInt = /(?=\B(?:\d{3})+(?!\d))/g;
  // regInt space if regInt>3 numbers
  const lang = i18n.language;

  const numberFixed =
    !!startInt &&
    startInt
      ?.toFixed(2)
      .toString()
      .replace(regInt, " ")
      .replace(".", `${lang === "pl" ? "," : "."}`);

  return numberFixed;
};
