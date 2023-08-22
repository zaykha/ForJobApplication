import React, { useEffect, useState } from 'react';

function Card({ title, text, linkTitle, href, target, rel, onClick, linkClassName }) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
        const jsonData = await response.json();

        const formattedData = jsonData.map((item) => ({
          id: item.id,
          title: item.title,
          linkTitle: item.link_title,
          link: item.link,
          text: `${item.body.en.substr(0, 50)}...`,
        }));

        setCards(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  function analyticsTrackClick(url) {
    console.log(`Analytics tracking click on: ${url}`);
  }

  return (
    <div>
      {cards.map((item) => (
        <Card
          key={item.id}
          title={item.title.en}
          linkTitle={item.linkTitle}
          href={item.link}
          text={item.text}
          linkClassName={item.id === 1 ? 'card__link--red' : ''}
          target={item.id === 1 ? '_blank' : ''}
          onClick={() => analyticsTrackClick(item.link)}
        />
      ))}
    </div>
  );
}
