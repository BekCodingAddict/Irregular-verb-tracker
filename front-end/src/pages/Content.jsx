const Content = () => {
  return (
    <main className="front container">
      <div className="front-content">
        <h1>KEEP TRACK OF NEW VERBS YOU LEARN</h1>
        <p>
          YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
          SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
          SHOES.
        </p>

        <div className="front-button">
          <button className="primary-btn">Start Now</button>
          <button className="secondary-btn">About</button>
        </div>
        <div className="shopping">
          <div className="brand-icons">
            <img
              src="/images/flipkart.png"
              alt="flipkart-logo"
              id="flipkart-img"
            />
            <img src="/images/amazon.png" alt="amazon-logo" id="amazon-img" />
          </div>
        </div>
      </div>
      <div className="front-image">
        <img src="../public/Study-Logo.png" alt="shoe-image" />
      </div>
    </main>
  );
};

export default Content;
