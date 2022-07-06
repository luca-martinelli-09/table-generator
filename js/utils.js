function sendRequest(options) {
  const request = new XMLHttpRequest();

  o = {
    url: null,
    method: "GET",
    onComplete: null,
    onSuccess: null,
    onError: null,
    ...options
  }

  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      let data;
      try {
        data = JSON.parse(this.responseText);
      } catch (error) {
        o.onError(error);
      }

      if (o.onComplete) {
        o.onComplete(data);
      }

      if (this.status == 200) {
        if (o.onSuccess) {
          o.onSuccess(data);
        }
      } else {
        if (o.onError) {
          o.onError(data);
        }
      }
    }
  };

  request.open(o.method, o.url, true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  if (o.data) {
    request.send(JSON.stringify(o.data));
  } else {
    request.send();
  }
}

function createNotification(message, kind = "info") {
  const notification = document.createElement("bx-inline-notification");

  notification.setAttribute("subtitle", message);
  notification.setAttribute("kind", kind);

  notifications.appendChild(notification);
}

function getSubJSON(e, keys) {
  const el = {};
  for (k of keys) {
    el[k] = e[k];
  }

  return el;
}

function getUniqueValuesForProperty(data, property) {
  let values = data.map((el) => {
    return sv(el[property]) || ""
  });

  values = values.sort();
  values = values.filter((c, index) => {
    return values.indexOf(c) === index;
  });

  return values;
}

function sv(val) {
  if (val && val.trim().length > 0) {
    return val;
  }

  return null;
}

function createDataFromOptions(options) {
  let newData = [...rawData.data];

  const headers = options.headers;
  const sorts = options.sorts;
  const filters = options.filters;

  // Filters
  if (filters) {
    newData = newData.filter((el) => {
      let decision = true;

      for (property in filters) {
        const filter = filters[property];
        let filterDecision = true;

        for (i in filter) {
          const filterData = filter[i];
          let currentDecision = true;
          let elementPropertyValue = sv(el[property]) || "";

          let filterConjunction = filterData.conj;
          let filterComparator = filterData.comp;
          let filterVal = filterData.val;
          let filterValType = filterData.type;

          let comparisonVal = filterValType == "attribute" ? (sv(el[filterVal]) || "") : filterVal;

          switch (filterComparator) {
            case "=":
              if (filterValType == "regex") {
                const regex = new RegExp(comparisonVal);
                currentDecision = regex.test(elementPropertyValue);
              } else {
                currentDecision = elementPropertyValue == comparisonVal;
              }
              break;
            case ">":
              currentDecision = elementPropertyValue > comparisonVal;
              break;
            case ">=":
              currentDecision = elementPropertyValue >= comparisonVal;
              break;
            case "<":
              currentDecision = elementPropertyValue < comparisonVal;
              break;
            case "<=":
              currentDecision = elementPropertyValue <= comparisonVal;
            case "!=":
              if (filterValType == "regex") {
                const regex = new RegExp(comparisonVal);
                currentDecision = !regex.test(elementPropertyValue);
              } else {
                currentDecision = elementPropertyValue != comparisonVal;
              }
              break;
            default:
              break;
          }

          if (filterConjunction == "or" && i > 0) {
            filterDecision = filterDecision || currentDecision;
          } else {
            filterDecision = filterDecision && currentDecision;
          }
        }

        decision = decision && filterDecision;
      }

      return decision;
    });
  }

  // Sort data
  if (sorts) {
    newData = newData.sort((a, b) => {
      let comparisonResult = 0;

      for (const sort of sorts) {
        const property = sort.property;
        const orderType = sort.sort;

        let currentComparision = 0;
        if (a[property] > b[property]) {
          currentComparision = 1 * orderType;
        } else if (a[property] < b[property]) {
          currentComparision = -1 * orderType;
        }

        comparisonResult = comparisonResult || currentComparision;
      }

      return comparisonResult;
    });
  }

  // Remove duplicate values
  const JSONStrings = newData.map(e => {
    return JSON.stringify(getSubJSON(e, headers));
  });

  newData = newData.filter((e, i) => {
    return JSONStrings.indexOf(JSON.stringify(getSubJSON(e, headers))) === i;
  });

  return newData;
}

// Create CSV from array

function createCSV(csvRows) {
  csvText = "";
  for (const csvRow of csvRows) {
    csvText += '"' + csvRow.join('","') + '"\n';
  }

  return csvText;
}