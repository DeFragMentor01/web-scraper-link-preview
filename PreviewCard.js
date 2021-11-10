import React, {useState} from "react";

const PreviewCard = () => {
  const feedDisplay = document.querySelector("#feed");
  const [text, setText] = useState("");

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    console.log(`Submitting ${text}`)}

  fetch("http://localhost:8000/results")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((article) => {
        const articleItem =
          article.title + article.url + article.description + article.image;
        feedDisplay.insertAdjacentHTML("beforeend", articleItem);
      });
    })
    .catch((err) => {
        console.log("Error")
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Link Preview Generator</h1>
        <textarea
          rows="4"
          cols="50"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h3>{articleItem.title}</h3>
      <img>{articleItem.image}</img>
      <h4>{articleItem.url}</h4>
      <p>{articleItem.description}</p>
    </div>
  );
}

export default PreviewCard;