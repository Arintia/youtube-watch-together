import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className="absolute bottom-0 right-0 text-gray-800">
        <p className="mr-2 mb-2 text-sm md:text-lg">Developed by Yigit Atak <a href="https://github.com/Arintia/youtube-watch-together"><FontAwesomeIcon className="ml-1 text-md md:text-2xl" icon={faGithub} /></a></p>
    </footer>
  );
}

export default Footer;