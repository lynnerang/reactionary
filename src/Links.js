import React from 'react';
import './Links.scss';

function Links(props) {
  return (
    <>
      <h2>Links</h2>
      <h3 className='resources-heading'>React Docs</h3>
      <p>React has great documentation online with up-to-date information on everything within its framework!</p>
      <a className='resources-link' href='https://reactjs.org/docs/getting-started.html'>https://reactjs.org/docs/getting-started.html</a>
      <h3 className='resources-heading'>React Status</h3>
      <p>A weekly roundup of the latest React and React Native links and tutorials.</p>
      <a className='resources-link' href='https://react.statuscode.com/'>https://react.statuscode.com/</a>
      <h3 className='resources-heading'>Other helpful links</h3>
      <a className='resources-link' href='https://www.udemy.com/react-redux/'>https://www.udemy.com/react-redux/</a>
      <a className='resources-link' href='https://reactjs.org/docs/introducing-jsx.html'>https://reactjs.org/docs/introducing-jsx.html</a>
      <a className='resources-link' href='https://css-tricks.com/learning-react-redux/'>https://css-tricks.com/learning-react-redux/</a>
    </>
  )
}

export default Links;