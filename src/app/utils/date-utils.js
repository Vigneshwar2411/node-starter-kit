const now = () => new Date();

const getTimeElapsed = (startDate, endDate) => endDate.getTime() - startDate.getTime();

module.exports = {
  now,
  getTimeElapsed
};