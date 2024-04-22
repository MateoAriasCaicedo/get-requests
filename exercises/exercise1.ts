/*
    1. Create a new Deno project/workspace

    2. Read in the movies.json file as a string and
       parse it in to a Javascript Object (JSON.parse)

    3. Use the URLPattern API to create a route for:
       /movies

    4. Respond to any GET request to the /movies route
       with all the movies in the file as a JSON string,
       but any other method (POST, PUT etc) or route
       should return a 404 status code

    5. Test this in Insomnia and change the request
       method type to check if the /movies route works
       as well as any of the 404 routes
*/

const MOVIES_URL = new URLPattern({ pathname: "/movies" });

const movies = await Deno.readTextFile("./movies.json");

function moviesApplicationRouter(request: Request): Response {
  const requestURL = new URL(request.url);

  if (request.method === "GET" && MOVIES_URL.test(requestURL)) {
    return new Response(movies, {
      headers: { "content-type": "application/json" },
    });
  }

  return new Response("Not found", {
    status: 404,
    headers: { "content-type": "plain/text" },
  });
}

Deno.serve(moviesApplicationRouter);
