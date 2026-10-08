// Matches the frontend display format: "Sep 28, 09:30 AM"
const formatDate = (date = new Date()) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
  date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

module.exports = formatDate;
