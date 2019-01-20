import React from 'react';

export default class BackendCallout extends React.Component {

  static getFromApi = async (url) => {
    const response = await fetch(url);
    const body = response.json();

    if(response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  }

  static postToApi = async (url,body) => {
    const response = await fetch(url, {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });

    if(response.status !== 201) {
      throw Error(body.message);
    }
    return response.json();
  }
}