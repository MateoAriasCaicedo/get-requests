import Movie from "./movie.ts";

const movieByID = new URLPattern({ pathname: "/movie/:id" });
const movies: Movie[] = JSON.parse(await Deno.readTextFile("./movies.json"));

function getMovieByIDHandler(requestURL: URL): Response {
  const patternResult = movieByID.exec(requestURL);

  if (patternResult === null) {
    throw new Error(
      "The given URL " + requestURL.pathname +
        " does not matches the specified pattern",
    );
  }

  const requestID = patternResult.pathname.groups.id;

  if (requestID === undefined) {
    throw new Error(
      "The given URL " + requestURL.pathname +
        " does not contains any movie ID",
    );
  }

  const numberRequestID = Number(requestID);

  if (isNaN(numberRequestID)) {
    return new Response("The given ID " + requestID + " is not a number", {
      status: 400,
    });
  }

  const requestedMovie = movies.find((movie) => movie.id === numberRequestID);

  if (requestedMovie === undefined) {
    return new Response("There is no movie with ID " + requestID, {
      status: 404,
    });
  }

  return new Response(JSON.stringify(requestedMovie), {
    headers: { "content-type": "application/json" },
  });
}

function moviesApplicationRouter(request: Request): Response {
  const requestURL = new URL(request.url);

  if (request.method === "GET" && movieByID.test(requestURL)) {
    return getMovieByIDHandler(requestURL);
  }

  return new Response("Not Found", { status: 404 });
}

Deno.serve(moviesApplicationRouter);
