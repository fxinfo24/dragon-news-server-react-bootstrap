// Module 62-7

const express = require('express')
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

const categories = require('./data/categories.json');

app.get( '/', (req, res) => {
    res.send('Welcome to Dragon news Server');
})

app.get ( '/categories', (req, res) => {
    res.send(categories);
})

app.listen(port, () => {
    console.log(`Dragon news Server listening on port, ${port}`)
});

// Module 63-2 (News Details)

const news =require('./data/news.json')

app.get( '/news', (req, res) => {
    res.send(news);
})

// For getting specific news details with specific id:
app.get( '/news/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    // Get specific news with specific id using 'find' method; cause we need to 'find' the news with specific id.
    const specificNews = news.find(idNumber => idNumber._id === id);
    res.send(specificNews);
})

// Get specific "category's" news with specific 'category id' using 'filter' method; cause more than one news may exist in a single category.
app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id); // id number as number not as string
    
    // As there is no category id '0' in news.json, but in categories.json, we need to validate the category
    if(id === 0) {
        res.send(news) // no category, all news
    }
    else{
        const specificCategory = news.filter(idNumber => parseInt(idNumber.category_id) === id);
        res.send(specificCategory);
    }

})

/**
 * Chat GPT version
 */

/**
 * 
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const categories = require('./data/categories.json');
const news = require('./data/news.json');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Dragon News Server');
});

app.get('/categories', (req, res) => {
  res.send(categories);
});

// Moved the following two routes inside app.listen to avoid "Cannot GET /news" error
app.get('/news', (req, res) => {
  res.send(news);
});

app.get('/news/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  const specificNews = news.find((newsItem) => newsItem._id === id);
  res.send(specificNews);
});

app.listen(port, () => {
  console.log(`Dragon News Server listening on port ${port}`);
  
  app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);

    if (id === 0) {
      res.send(news);
    } else {
      const specificCategory = news.filter((newsItem) => parseInt(newsItem.category_id) === id);
      res.send(specificCategory);
    }
  });
});

 */