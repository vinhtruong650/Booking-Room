export default function getNextDay(): Date {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return nextDay;
  }
