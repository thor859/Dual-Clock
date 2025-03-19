// Get DOM elements
const timeFormatToggle = document.getElementById('timeFormatToggle');
const abbottabadTime = document.querySelector('.abbottabad .time');
const abbottabadDate = document.querySelector('.abbottabad .date');
const abbottabadDay = document.querySelector('.abbottabad .day');
const abbottabadGreeting = document.querySelector('.abbottabad .greeting');
const texasTime = document.querySelector('.texas .time');
const texasDate = document.querySelector('.texas .date');
const texasDay = document.querySelector('.texas .day');
const texasGreeting = document.querySelector('.texas .greeting');
const timeOfDay = document.querySelector('.time-of-day');

// Format date
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return date.toLocaleDateString('en-US', options);
}

// Get time of day greeting
function getTimeOfDay(hour) {
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 22) return 'Evening';
    return 'Night';
}

// Format time
function formatTime(date, is24Hour) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour
    };
    return date.toLocaleTimeString('en-US', options);
}

// Update the time for both locations
function updateTime() {
    const now = new Date();
    const is24Hour = timeFormatToggle.checked;

    // Abbottabad, Pakistan (Dynamic Time)
    const abbottabadTimeObject = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
    const abbottabadDateObject = new Date(abbottabadTimeObject);
    const abbottabadHour = abbottabadDateObject.getHours();
    abbottabadTime.textContent = formatTime(abbottabadDateObject, is24Hour);
    abbottabadDate.textContent = formatDate(abbottabadDateObject).split(',')[1];
    abbottabadDay.textContent = formatDate(abbottabadDateObject).split(',')[0];
    abbottabadGreeting.textContent = getTimeOfDay(abbottabadHour);

    // Texas, USA (Dynamic Time with Daylight Saving)
    const texasTimeObject = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
    const texasDateObject = new Date(texasTimeObject);
    const texasHour = texasDateObject.getHours();
    texasTime.textContent = formatTime(texasDateObject, is24Hour);
    texasDate.textContent = formatDate(texasDateObject).split(',')[1];
    texasDay.textContent = formatDate(texasDateObject).split(',')[0];
    texasGreeting.textContent = getTimeOfDay(texasHour);

    // Update main greeting
    timeOfDay.textContent = getTimeOfDay(now.getHours());
}

// Update the time every second
setInterval(updateTime, 1000);
updateTime();

// Listen for format toggle
timeFormatToggle.addEventListener('change', updateTime);
