import React from 'react';
import './Links.scss';

function Links(props) {
  return (
    <>
      <h2>Links</h2>
      <h3 className='resources-heading'>React Docs</h3>
      <p>React has great documentation online with up-to-date information on everything within its framework!</p>
      <a className='resources-link' href='https://reactjs.org/docs/getting-started.html'>https://reactjs.org/docs/getting-started.html</a>
    </>
  )
}

export default Links;