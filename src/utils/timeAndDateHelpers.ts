function getTimeOffsetFromEST(): number {
  const clientTimeConvertedToEST = new Date(
    new Date().toLocaleString("en", { timeZone: "America/New_York" })
  );
  const clientTime = new Date();

  return clientTimeConvertedToEST.getTime() - clientTime.getTime();
}

function coerceToClientTime(serverDate, clientESTOffset): Date {
  // serverDate: "Mon Dec 12 2022 8:30 AM"
  const clientTime = new Date(new Date(serverDate).getTime() - clientESTOffset);
  return clientTime;
}

function buildEventDate(day, time): Date {
  // Economic events API releases details for only current year
  const clientESTOffset = getTimeOffsetFromEST();
  const currentYear = new Date().getFullYear();
  const eventDate = `${day} ${currentYear} ${time}`;
  const clientEventDate = coerceToClientTime(eventDate, clientESTOffset);

  return clientEventDate;
}

function formatDateString(date: Date): string {
  return date.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function millisecondsToStr(milliseconds: number): string {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding(number) {
    return number > 1 ? "s" : "";
  }

  let temp = Math.floor(milliseconds / 1000);
  const years = Math.floor(temp / 31536000);
  if (years) {
    return `${years} year${numberEnding(years)}`;
  }
  // TODO: Months! Maybe weeks?
  const days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return `${days} day${numberEnding(days)}`;
  }
  const hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return `${hours} hour${numberEnding(hours)}`;
  }
  const minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return `${minutes} minute${numberEnding(minutes)}`;
  }
  const seconds = temp % 60;
  if (seconds) {
    return `${seconds} second${numberEnding(seconds)}`;
  }
  return "less than a second"; // 'just now' //or other string you like;
}

function getTimeDifferenceString(date1: Date, date2: Date): string {
  const timeDiffInMilliseconds = date1.getTime() - date2.getTime();
  const timeDiff = millisecondsToStr(Math.abs(timeDiffInMilliseconds));

  if (timeDiffInMilliseconds > 0) {
    return `${timeDiff} to go.`;
  }
  return `${timeDiff} ago.`;
}

const valueFormatter = number => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export {
  valueFormatter,
  getTimeOffsetFromEST,
  coerceToClientTime,
  buildEventDate,
  formatDateString,
  getTimeDifferenceString
};
