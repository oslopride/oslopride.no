/* 
This should be deleted when this is merged:
https://github.com/zeit/now-cli/pull/1883
*/

/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");
const next = require("next");

const app = next({ dev: true });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/a/:slug", (req, res) => {
      const actualPage = "/article";
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/events/:id", (req, res) => {
      const actualPage = "/event";
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/p/:slug", (req, res) => {
      const actualPage = "/page";
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => handle(req, res));

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
