interface Movie {
  id: number;
  title: string;
  genre: string;
}

enum MovieField {
  Id,
  Title,
  Genre,
}

const ID_FIELD = "id";
const TITLE_FIELD = "title";
const GENRE_FIELD = "genre";

function getMovieSearchParameters(
  searchParameters: URLSearchParams,
): Map<MovieField, string> {
  const output: Map<MovieField, string> = new Map();

  for (const [key, value] of searchParameters) {
    switch (key) {
      case ID_FIELD:
        output.set(MovieField.Id, value);
        break;
      case TITLE_FIELD:
        output.set(MovieField.Title, value);
        break;
      case GENRE_FIELD:
        output.set(MovieField.Genre, value);
        break;
      default:
        break;
    }
  }

  return output;
}

export default Movie;
export { getMovieSearchParameters, MovieField };
