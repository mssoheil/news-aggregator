# Newsly

## A News aggregator that

### Used news apis: `NewsApi, New York Times, Guardian`

The default api keys for each of the news apis have been put inside the .env file as well as url

because the news api will give CORS error on localhost, a proxy middleware has been used for it

For filtering and pagination pagination and filter query parameters have been used

The application supports filtering with keyword, published date and source

The use can set preference for favorite category, source and author

The changing are not live and won't call by just changing the input field

The reason for this is because the `New York Times` has a very strict rate limit implemented that supports only a few api calls per minute

## Usage flow:

by loading the page the apis will be called with the default filters or the preference
In order to refetch articles after change of filters or preference the `Get Articles` button should be clicked
By changing the preference the set value will be added to the local storage and if the `Get Articles` button clicked the articles with the preferred filters will be called

## Running the application

### Running locally

```bash
npm start
```

### Running with docker

Building:

```bash
docker build -t news-aggregator .
```

Running:

```bash
docker run -p 3000:3000 news-aggregator
```
