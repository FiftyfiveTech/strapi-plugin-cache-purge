# Strapi Plugin Cache Purge

Manage Redis Cache from Dashboard

### How to Config

- Create a REST endpoint called `https://strapi_url/api/cache` in strapi with
  - `GET` method to return all cached keys
  - `DELETE` method to delete or clear cache

#### Fetch Keys Request

```ts
// GET http://localhost:1337/api/cache

// Response
interface CacheKeyApiResponse {
  keys: string[];
}
```

#### Clear Cache Request

```ts
// DELETE http://localhost:1337/api/cache

// Response
// Http Status 200 OK
```
