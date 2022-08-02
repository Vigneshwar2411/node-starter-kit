const client = require('./helpers/client');

const options = ({ accessToken }) => ({
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});

const getUserDetails = ({ user }) => client.get('https://graph.microsoft.com/v1.0/me', options(user));

module.exports = {
  getUserDetails,
};
