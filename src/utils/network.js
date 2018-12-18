/* @flow */
/* global: fetch */

const baseUrl = 'http://10.0.2.2:3000';

const fetchRequest = async (url: string, body: Object): Promise<*> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response;
};


export default {

  postBase64: async (body: Object): Promise<*> => {
    const response = await fetchRequest(`${baseUrl}/base64`, body);
    return response;
  },


  serverLog: async (body: Object): Promise<void> => {
    await fetchRequest(`${baseUrl}/log`, body);
  },


  endOfTests: async (body: Object): Promise<void> => {
    await fetchRequest(`${baseUrl}/endOfTests`, body);
  },
};