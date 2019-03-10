import React from 'react';

export default class BackendCallout extends React.Component {

  static getFromApi = async (url, token) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const body = response.json();

    if(response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  static postToApi = async (url, body, token) => {
    const response = await fetch(url, {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });
    if(response.status < 200 || response.status > 299) {
      throw Error(body.message);
    }
    return response.json();
  }

  static putToApi = async (url, body, token) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });
    if(response.status < 200 || response.status > 299) {
      throw Error(body.message);
    }
    return response.json();
  }

  static delete = async (url, token) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    if(response.status !== 204) {
      throw Error('wut');
    }
    return 'success';
  }
}