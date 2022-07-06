function prepareTable(headers) {
  const dataTable = document.createElement("bx-data-table");
  const table = document.createElement("bx-table");
  const tableHead = document.createElement("bx-table-head");
  const tableRow = document.createElement("bx-table-header-row")

  for (const header of headers) {
    const tableHeaderCell = document.createElement("bx-table-header-cell");
    tableHeaderCell.innerText = header;

    tableRow.appendChild(tableHeaderCell);
  }

  tableHead.appendChild(tableRow);
  table.appendChild(tableHead);

  table.setAttribute("size", "large");

  dataTable.appendChild(table);

  return dataTable;
}

function createEmptyRow(numTds) {
  const tableRow = document.createElement("bx-table-row");

  for (let j = 0; j < numTds; j++) {
    const tableCell = document.createElement("bx-table-cell");
    tableCell.innerText = "‎";

    tableRow.appendChild(tableCell)
  }

  return tableRow;
}

function createTableFooter(text, span) {
  const tableFoot = document.createElement("bx-table-head");
  const tableRow = document.createElement("bx-table-header-row");
  const tableCell = document.createElement("bx-table-header-cell");

  tableCell.innerHTML = text;

  tableRow.appendChild(tableCell);

  for (let i = 0; i < span - 1; i++) {
    const emptyCell = document.createElement("bx-table-header-cell");
    tableRow.appendChild(emptyCell);
  }

  tableFoot.classList.add("table-footer");
  tableFoot.appendChild(tableRow);

  return tableFoot;
}

function createTable(data, options) {
  tableContainer.innerHTML = "";
  notifications.innerHTML = "";

  if (data.length <= 0) {
    createNotification(loc.noElements);
    return;
  }

  const headers = options.headers;
  const dividers = options.dividers;
  const statistics = options.statistics;

  if (!headers || headers.length <= 0) {
    createNotification(loc.noProperties, "warning");
    return;
  }

  let dataTable = prepareTable(headers);
  let table = dataTable.querySelector("bx-table");
  let tableBody = document.createElement("bx-table-body");
  let stats = {};
  let rowsCounter = 0;
  let comesFromInterruction = false;

  csvData = [];
  csvData.push(options.headers);

  let prevElement;
  for (element of data) {
    // Dividers
    if (prevElement && dividers) {
      for (property in dividers) {
        const rowsToGenerate = dividers[property];

        if (prevElement[property] !== element[property] && !comesFromInterruction) {
          if (rowsToGenerate > 0) {
            for (let i = 0; i < rowsToGenerate; i++) {
              const emptyRow = createEmptyRow(options.headers.length);
              tableBody.appendChild(emptyRow);
            }
          } else {
            table.appendChild(tableBody);
            table.appendChild(createTableFooter(loc.total + ": " + rowsCounter, headers.length));
            tableContainer.appendChild(dataTable);

            if (Object.keys(statistics).length > 0) {
              createTableStats(stats, rowsCounter, options);
            }

            const pageBreak = document.createElement("div");
            pageBreak.classList.add("page-break");
            tableContainer.appendChild(pageBreak);

            dataTable = prepareTable(headers);
            table = dataTable.querySelector("bx-table");
            tableBody = document.createElement("bx-table-body");

            stats = {};
            rowsCounter = 0;
            comesFromInterruction = true;
          }
        }
      }
    }

    const csvRow = [];
    const tableRow = document.createElement("bx-table-row");

    for (const header of headers) {
      const tableCell = document.createElement("bx-table-cell");
      tableCell.innerText = sv(element[header]) || "";
      tableRow.appendChild(tableCell);

      csvRow.push(element[header]);
    }

    for (const header of Object.keys(rawData.data[0])) {
      stats[header] = stats[header] || { nums: {}, sum: 0 }

      const currValue = sv(element[header]) ? element[header] : loc.empty;
      const uniqueValuesCount = stats[header].nums[currValue] || 0;
      stats[header].nums[currValue] = uniqueValuesCount + 1;

      try {
        stats[header].sum += parseInt(element[header]);
      } catch (e) {
        stats[header].sum = NaN;
      }
    }

    tableBody.appendChild(tableRow);
    csvData.push(csvRow);

    prevElement = element;
    comesFromInterruction = false;
    rowsCounter += 1;
  }

  table.appendChild(tableBody);
  table.appendChild(createTableFooter(loc.total + ": " + rowsCounter, headers.length));
  tableContainer.appendChild(dataTable);

  if (Object.keys(statistics).length > 0) {
    createTableStats(stats, rowsCounter, options);
  }

  createDownloadButton();
}

function createTableStats(stats, rowsCounter, options) {
  const statistics = options.statistics;

  const dataTableStats = document.createElement("bx-data-table");
  const tableStats = document.createElement("bx-table");

  tableStats.setAttribute("size", "short");

  const tableHeader = document.createElement("bx-table-head");

  const tableTitleRow = document.createElement("bx-table-header-row");
  tableTitleRow.classList.add("stats-title-row");

  const tableTitleCell = document.createElement("bx-table-header-cell");
  tableTitleCell.innerHTML = "<h4 class='stats-title'>" + loc.statistics + "</h4>";
  tableTitleRow.appendChild(tableTitleCell);

  for (let i = 0; i < 4; i++) {
    const emptyCell = document.createElement("bx-table-header-cell");
    tableTitleRow.appendChild(emptyCell);
  }

  tableHeader.appendChild(tableTitleRow);


  const tableHeaderRow = document.createElement("bx-table-header-row");

  for (const header of [loc.property, loc.value, loc.count, loc.sum, loc.avg]) {
    const tableHeaderCell = document.createElement("bx-table-header-cell");
    tableHeaderCell.innerText = header;

    tableHeaderRow.appendChild(tableHeaderCell);
  }

  tableHeader.appendChild(tableHeaderRow);
  tableStats.appendChild(tableHeader);

  const tableBody = document.createElement("bx-table-body");

  for (property in statistics) {
    const rowsToAdd = [];

    for (const operator of statistics[property]) {
      const propertyCell = statisticProperty.querySelector("[value='" + property + "']").innerHTML;
      const sum = stats[property].sum;
      const avg = sum / rowsCounter;

      const sumText = (isNaN(sum) ? loc.NaN : sum.toString());
      const avgText = (isNaN(avg) ? loc.NaN : avg.toString());

      switch (operator) {
        case "count":
          let uniqueCounter = [];

          for (uniqueKey of Object.keys(stats[property].nums)) {
            uniqueCounter.push({ val: uniqueKey, count: stats[property].nums[uniqueKey] });
          }

          uniqueCounter = uniqueCounter.sort((a, b) => b.count - a.count);

          for (counter of uniqueCounter) {
            rowsToAdd.push([
              propertyCell, counter.val, counter.count, "", ""
            ])
          }

          break;
        default:
          rowsToAdd.push([
            propertyCell, "", rowsCounter, sumText, avgText
          ])

          break;
      }
    }

    for (const rowToAdd of rowsToAdd) {
      const tableRow = document.createElement("bx-table-row");
      for (cellToAdd of rowToAdd) {
        const tableCell = document.createElement("bx-table-cell");
        tableCell.innerText = cellToAdd;

        tableRow.appendChild(tableCell);
      }

      tableBody.appendChild(tableRow);
    }
  }

  tableStats.appendChild(tableBody);
  dataTableStats.appendChild(tableStats);
  tableContainer.appendChild(dataTableStats);
}