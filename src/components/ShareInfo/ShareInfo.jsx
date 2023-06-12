/*
  *This component was not used in our final product*

  @author: Jason Su <y.su21@ncl.ac.uk>

  @description:
    The components provides an interface that allows users to share a piece of text across different social media
    platforms like Facebook, Twitter, Instagram and Google. The text to share can be edited in a text input field.
    There's also a button to copy the text to the clipboard. What a user clicks on one of the social media buttons, 
    a new window opens up with the relevant social media site.

*/

import React, { useState } from "react";
import "./styles.css";

function ShareInfo() {
  const [textToCopy, setTextToCopy] = useState("TEXT");

  function copyToClipboard() {
    navigator.clipboard.writeText(textToCopy);
  }

  function shareOnFacebook() {
    // window.open("https://www.facebook.com/sharer.php?u=" + window.location.href);
    window.open("https://www.facebook.com")
  }

  function shareOnTwitter() {
    window.open(
      "https://twitter.com/share?url=" +
        encodeURIComponent(window.location.href) +
        "&text=" +
        encodeURIComponent(textToCopy)
    );
  }

  function shareOnInstagram() {
    window.open("https://www.instagram.com/");
  }

  function shareOnGoogle() {
    // window.open("https://plus.google.com/share?url=" + window.location.href);
    window.open("https://www.google.com");
  }

  return (
    <div className="container">
      <h1>SHARE</h1>
      <input
        type="text"
        value={textToCopy}
        onChange={(e) => setTextToCopy(e.target.value)}
      />
      <button onClick={copyToClipboard}>copy</button>
      <div className="share-buttons">
        <button onClick={shareOnFacebook} className="btn-facebook">
          <img
            src="https://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19748.png"
            alt="Facebook"
          />
        </button>
        <button onClick={shareOnTwitter} className="btn-twitter">
          <img
            src="https://th.bing.com/th/id/OIP.F1tVhJTa9p-v1nnO2eoT1gHaHa?pid=ImgDet&rs=1"
            alt="Twitter"
          />
        </button>
        <button onClick={shareOnInstagram} className="btn-instagram">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
          />
        </button>
        <button onClick={shareOnGoogle} className="btn-google">
          <img
            src="https://th.bing.com/th/id/OIP.md8oQ0Rpbg71f9QyvUYE0AHaHj?pid=ImgDet&rs=1"
            alt="Google"
          />
        </button>
      </div>
    </div>
  );
}

export default ShareInfo;
