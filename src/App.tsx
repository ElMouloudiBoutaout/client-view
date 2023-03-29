import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Card } from "./components/Card";

import { ResponseAPI } from "./interface";
import Loading from "./components/Loading";
import "./App.css";
import "./index.css";
import Login from "./components/Login/Login";

const fetcher = (page: number): Promise<ResponseAPI> =>
  fetch(`http://localhost:8080/api/agents?page=${page}`).then((res) =>
    res.json()
  );

const App = () => {
  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery(
    ["characters"],

    ({ pageParam = 1 }) => fetcher(pageParam),

    {
      getNextPageParam: (lastPage: ResponseAPI) => {
        const previousPage = lastPage.info.prev
          ? +lastPage.info.prev.split("=")[1]
          : 0;

        const currentPage = previousPage + 1;

        if (currentPage === lastPage.info.pages) return false;
        return currentPage + 1;
      },
    }
  );

  const characters = useMemo(
    () =>
      data?.pages.reduce((prev, page) => {
        return {
          info: page.info,
          results: [...prev.results, ...page.results],
        };
      }),
    [data]
  );

  if (status === "loading") return <Loading />;

  if (status === "error") return <h4>Ups!, {`${error}` as string}</h4>;

  return (
    <div>
      <h1 className="title">React Infinite Scroll</h1>
      <InfiniteScroll
        dataLength={characters ? characters.results.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Loading />}
      >
        <div className="flex flex-wrap">
          {characters &&
            characters.results.map((character) => (
              <Card key={character.id} character={character} />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default App;
