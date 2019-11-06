import _ from "lodash";
export function paginate(restuarants, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(restuarants)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
