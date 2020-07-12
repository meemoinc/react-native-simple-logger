export function log(header, text, expandJson) {
  if (!__DEV__) {
    //to disable log in production mode
    return;
  }
  console.log('\n');

  try {
    if (!text) {
      text = header;
      header = 'LOG';
    }

    if (expandJson) {
      console.log(
        `%c ${header} `,
        'background:green;color:#FFFFFF',
        JSON.stringify(text, null, 4).replace(/'/g, ''),
      );
    } else {
      console.log(`%c ${header} `, 'background:green;color:#FFFFFF', text);
    }

    console.log('\n');
  } catch (err) {
    console.log(`%c ${header} `, 'background:green;color:#FFFFFF', text);
    console.log('\n');
  }
}

export function data(header, text, noJsonExpand) {
  if (!__DEV__) {
    //to disable log in production mode
    return;
  }

  console.log('\n');

  try {
    if (!text) {
      text = header;
      header = 'DATA';
    }

    if (noJsonExpand) {
      console.log(`%c ${header} `, 'background:#00ffff;color:#FFFFFF', text);
    } else {
      console.log(
        `%c ${header} `,
        'background:#00ffff;color:#FFFFFF',
        JSON.stringify(text, null, 4).replace(/\\/g, ''),
      );
    }

    console.log('\n');
  } catch (err) {
    console.log(`%c ${header} `, 'background:#00ffff;color:#FFFFFF', text);
    console.log('\n');
  }
}

export function error(header, err, expandJson) {
  if (!__DEV__) {
    //to disable log in production mode
    return;
  }

  if (!err) {
    //single argument is passed;
    err = header;
    header = 'ERROR';
  }

  console.log('\n');

  try {
    if (!err.stack) {
      if (expandJson) {
        console.log(
          `%c ${header} `,
          'background:red;color:#FFFFFF',
          JSON.stringify(err, null, 4).replace(/'/g, ''),
        );
      } else {
        console.log(`%c ${header} `, 'background:red;color:#FFFFFF', err);
      }
    } else {
      console.log(`%c ${header} `, 'background:red;color:#FFFFFF', err.stack);
    }
    console.log('\n');
  } catch (loggerError) {
    console.log(`%c ${header} `, 'background:red;color:#FFFFFF', err);
    console.log('\n');
  }
}

export function apiError(header, err) {
  if (!__DEV__) {
    //to disable log in production mode
    return;
  }

  console.log('\n');

  if (!err) {
    //single argument is passed;
    err = header;
    header = 'API ERROR';
  }

  console.log(`%c ${header} `, 'background:red;color:#FFFFFF');

  try {
    if (err.config) {
      console.log('%c URL ', 'background:orange;color:#FFFFFF', err.config.url);
      console.log(
        '%c DATA ',
        'background:#00ffff;color:#FFFFFF',
        err.config.data,
      );
    }

    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (err.response.status) {
        console.log(
          '%c STATUS CODE ',
          'background:orange;color:#FFFFFF',
          err.response.status,
        );
      }

      if (err.response.data) {
        console.log(
          '%c RESPONSE DATA ',
          'background:orange;color:#FFFFFF',
          JSON.stringify(err.response.data, null, 4).replace(/'/g, ''),
        );
      }
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      console.log(
        '%c REQUEST ',
        'background:orange;color:#FFFFFF',
        err.request,
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(err);
    }
  } catch (catchedError) {
    console.log('API ERROR', catchedError);
  }

  console.log('\n');
}

export default {log, data, error, apiError};
