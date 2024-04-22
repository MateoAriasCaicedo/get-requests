import Movie from "./movie.ts";
import { getMovieSearchParameters, MovieField } from "./movie.ts";

const getMoviesPattern = new URLPattern({ pathname: "/movies" });
const movies: Movie[] = JSON.parse(await Deno.readTextFile("./movies.json"));

/**
 * Hello friend
 * @param requestURL Hello
 * @returns Hello there
 */
function getMoviesHandler(requestURL: URL): Response {
  const movieSearchParameters = getMovieSearchParameters(
    new URLSearchParams(requestURL.searchParams),
  );

  const output = movies.filter((movie) => {
    for (const [key, value] of movieSearchParameters.entries()) {
      switch (key) {
        case MovieField.Id:
          if (movie.id !== Number(value)) return false;
          break;
        case MovieField.Title:
          if (movie.title !== value) return false;
          break;
        case MovieField.Genre:
          if (movie.genre !== value) return false;
          break;
      }
    }

    return true;
  });

  return new Response(JSON.stringify(output), {
    headers: { "content-type": "application/json" },
  });
}

function moviesApplicationRouter(request: Request): Response {
  const requestURL = new URL(request.url);

  if (request.method === "GET" && getMoviesPattern.test(requestURL)) {
    return getMoviesHandler(requestURL);
  }

  return new Response("Not Found", { status: 404 });
}

Deno.serve(moviesApplicationRouter);
