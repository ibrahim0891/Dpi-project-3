const timeStamp = new Date().toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });


  export default function TimeStamp() {
    return timeStamp;
  }