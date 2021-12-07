import useQuery from "react-query";
import {
  StringParam,
  useQueryParams,
  withDefault,
  NumberParam,
} from "use-query-params";

const constructQuery = (pagination, sort, filter) => {
  const params = [];
  params.push(`_limit=${pagination.limit}`);
  params.push(`_page=${pagination.page}`);
  params.push(`q=${encodeURIComponent(filter)}`);
  params.push(`_sort=${sort.sortColumn}`);
  if (sort.sortOrder) {
    params.push(`_order=${sort.sortOrder === "ascending" ? "asc" : "desc"}`);
  }

  return params.join("&");
};

export const getCharactersWithTotalCount = async ({ queryKey }) => {
  const { pagination, filter, sort } = queryKey[1];

  const query = constructQuery(pagination, sort, filter);

  let totalCountQuery = "";
  if (filter !== "") {
    totalCountQuery = `q=${encodeURIComponent(filter)}`;
  }
};

export const useCharacters = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    filter: withDefault(StringParam, ""),
    page: withDefault(NumberParam, 1),
    limit: withDefault(NumberParam, 10),
    sortColumn: withDefault(StringParam, "name"),
    sortOrder: withDefault(StringParam, "ascending"),
  });
  const { filter, page, limit, sortColumn, sortOrder } = queryParams;
  const pagination = {
    page,
    limit,
  };

  const sort = {
    sortColumn,
    sortOrder,
  };

  const setFilter = (filter) => {
    setQueryParams(
      {
        filter: filter,
      },
      "replaceIn"
    );
  };

  const setPagination = (pagination) => {
    setQueryParams(
      {
        ...pagination,
      },
      "replaceIn"
    );
  };

  const setSort = (sortField) => {
    setQueryParams(
      {
        ...sortField,
      },
      "replaceIn"
    );
  };

  // const query = useQuery(
  //   ["characters", { pagination, filter, sort }],
  //   getCharactersWithTotalCount,
  //   {
  //     keepPreviousData: true,
  //     initialData: {
  //       totalCount: 0,
  //       characters: [],
  //     },
  //   }
  // );

  const onSort = (clickedColumn) => {
    const { sortColumn, sortOrder } = sort;

    let newOrder = sortOrder === "ascending" ? "descending" : "ascending";
    if (sortColumn !== clickedColumn) {
      newOrder = "ascending";
    }

    setPagination({ ...pagination, page: 1 });
    setSort({ sortColumn: clickedColumn, sortOrder: newOrder });
  };

  const onSubmitFilter = (value) => {
    if (value !== filter) {
      setFilter(value);
      setPagination({ ...pagination, page: 1 });
    }
  };

  const onChangeLimit = (limit) => {
    if (limit !== pagination.limit) {
      setPagination({ limit, page: 1 });
    }
  };

  const onChangePage = (page) => {
    if (page !== pagination.page) {
      setPagination({ ...pagination, page });
    }
  };

  return {
    onSort,
    onSubmitFilter,
    onChangeLimit,
    onChangePage,
    filter,
    pagination,
    sort,
    // isLoading: query.isLoading,
    // totalPages: Math.ceil((query.data?.totalCount || 0) / pagination.limit),
    // totalCount: query.data?.totalCount || 0,
    // characters: query.data?.characters || [],
  };
};
export default useCharacters;
