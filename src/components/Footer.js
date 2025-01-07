import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Website by{' '}
          <a
            href="https://www.javiermp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            JMP
          </a>
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/jav8319"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/javier-muriel-66a34b190/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} JMP. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
