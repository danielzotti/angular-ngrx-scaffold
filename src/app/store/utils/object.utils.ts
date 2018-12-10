export interface ISortingParam {
  name: string;
  type?: 'string' | 'date' | 'number';
  order?: 1 | -1;
}

export function toArray(entities) {
  const arr = [];
  Object.keys(entities).map(function(key, index) {
    arr[index] = entities[key];
  });
  return arr;
}

export function toArraySorted(entities, ...params: Array<ISortingParam>) {
  const arr = toArray(entities);
  if (arr) {
    return arr.sort((e1, e2) => sortByMultiple(e1, e2, ...params));
  }
  return arr;
}

export function arrToObject(obj, param = 'id') {
  return obj.reduce(function(map, c) {
    map[c[param]] = c;
    return map;
  }, {});
}

export function sortByMultiple(e1, e2, ...sortingParams: Array<ISortingParam>) {
  if (!e1 || !e2) {
    return 0;
  }

  for (let i = 0; i < sortingParams.length; i++) {
    let { name, type, order } = sortingParams[i];
    if (!name || !e1[name] || !e2[name]) {
      return 0;
    }
    if (!type || typeof type !== 'string') {
      type = 'number';
    }
    if (!order || typeof order !== 'number') {
      order = 1;
    }

    switch (type) {
      case 'number':
        if (e1[name] > e2[name]) {
          return 1 * order;
        }
        if (e1[name] < e2[name]) {
          return -1 * order;
        }
        continue;
      case 'string':
        if (e1[name].localeCompare(e2[name]) === 1) {
          return 1 * order;
        }
        if (e1[name].localeCompare(e2[name]) === -1) {
          return -1 * order;
        }
        continue;
      case 'date':
        if (new Date(e1[name]) > new Date(e2[name])) {
          return 1 * order;
        }
        if (new Date(e1[name]) < new Date(e2[name])) {
          return -1 * order;
        }
        continue;
      default:
        return 0;
    }
  }
}

// export function sortById(e1, e2) {
//   return e1.id - e2.id;
// }

// export function sortByNumber(e1, e2, param = 'id') {
//   return e1[param] - e2[param];
// }

// export function sortByString(e1, e2, param = 'name') {
//   return e1[param].localeCompare(e2[param]);
// }

// export function sortByDate(e1, e2, param = 'startDate') {
//   const d1 = new Date(e1[param]);
//   const d2 = new Date(e2[param]);
//   return d1 < d2 ? -1 : 1;
// }

// export function toArraySortedByFunction(entities, sortFunction = sortById) {
//   const arr = toArray(entities);
//   if (arr && sortFunction) {
//     return arr.sort(sortFunction);
//   }
//   return arr;
// }

// export function toArraySorted(entities, param, sortFunction = sortByNumber) {
//   const arr = toArray(entities);
//   if (arr && sortFunction) {
//     return arr.sort((e1, e2) => sortFunction(e1, e2, param));
//   }
//   return arr;
// }

// export function toArraySortedByString(entities, param?) {
//   return toArraySorted(entities, param, sortByString);
// }

// export function toArraySortedByNumber(entities, param?) {
//   return toArraySorted(entities, param, sortByNumber);
// }

// export function toArraySortedByDate(entities, param?) {
//   return toArraySorted(entities, param, sortByDate);
// }
