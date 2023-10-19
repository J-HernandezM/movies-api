# MOVIES API

This is an API that allows you to practice fetch requests (GET, POST, PUT, PATCH) by writing your own solution in the frontend to handle the requests.

## Execution

To execute the server type in terminal:

```
node --watch server.js
```

and remember to run as well:

```
npm install
```

## Practice

To practice your skills with fetch requests check the server.js and the movieSchema.js to understand how the server is written and the verifications for the requests inputs.

The verifications are handled with [zod](https://zod.dev) librarie so check it out if you need more information. For example the post request need all the fields for it to work

The server handles DELETE, POST, PATCH and GET requests. You can simulate those requests in the app.http file using the REST CLIENT vs code extension.

Write your solution in a new index.js in the public directory and link it. You can add as many requests as you want, the html is prepared to delete and post to the server, the challenge is to write in the frontend how to handle those requests.

The actual index.js is the proposed solution for some of the requests.

## Author

- Website - [Portfolio en construccion](https://j-hernandezm.github.io)
- Github - [@J-HernandezM](https://github.com/J-HernandezM)
- Twitter - [@juanh031](https://twitter.com/juanh031)
