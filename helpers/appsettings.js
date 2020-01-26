const production = true;

/**
 * The base-url for api-requests
 * @return {string}
 */
export const baseUrl = () => production ? 'http://impuls-api.herokuapp.com' : 'http://localhost:3001';
