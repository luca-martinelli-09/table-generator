// Empty when loaded
function emptyWhenLoaded() {
  for (toEmpty of document.getElementsByClassName("emptyWhenLoaded")) {
    toEmpty.innerHTML = "";
  }
}

// Sorts

function setSort(el, sort) {
  if (sort > 0) {
    el.dataset.sort = 1;
    el.setAttribute("type", "blue");
    el.innerText = el.dataset.value + " | AZ";
  } else {
    el.dataset.sort = -1;
    el.setAttribute("type", "teal");
    el.innerText = el.dataset.value + " | ZA";
  }
}

function toggleSort(el) {
  if (el.dataset.sort > 0) {
    setSort(el, -1);
  } else {
    setSort(el, 1);
  }
}

function addSort(el) {
  el.setAttribute("type", "blue");
  el.dataset.sort = 1;
  el.innerText = el.innerText = el.dataset.value + " | AZ";
}

// Properties autofill

function fillWithProperties(data, headers) {
  const fillWithProperties = document.getElementsByClassName("fillWithProperties");

  for (const property of headers) {
    possibleValuesForProperty[property] = getUniqueValuesForProperty(data, property);

    const tag = document.createElement("bx-tag");
    const comboBoxItem = document.createElement("bx-combo-box-item");

    tag.dataset.value = sv(property) || "";
    tag.innerText = sv(property) || loc.empty;
    tag.setAttribute("type", "magenta");

    comboBoxItem.innerText = sv(property) || loc.empty;
    comboBoxItem.setAttribute("value", (sv(property) || ""));

    for (needToFill of fillWithProperties) {
      if (needToFill.tagName == "BX-TILE") {
        const cloneTag = tag.cloneNode(true);

        if (needToFill.dataset.map) {
          window[needToFill.dataset.map](cloneTag);
        }

        if (needToFill.dataset.click) {
          cloneTag.dataset.click = needToFill.dataset.click;
          cloneTag.addEventListener("click", function () {
            window[this.dataset.click](this);
          });
        }

        needToFill.appendChild(cloneTag);
      } else if (needToFill.tagName == "BX-COMBO-BOX") {
        const cloneComboBoxItem = comboBoxItem.cloneNode(true);
        needToFill.appendChild(cloneComboBoxItem);
      }
    }
  }
}

// Options

function createRemoveButton() {
  const rmBtnTd = document.createElement("bx-table-cell");
  rmBtnTd.style.width = 0;
  const rmBtn = document.createElement("bx-btn");
  rmBtn.setAttribute("size", "sm");
  rmBtn.setAttribute("kind", "ghost")
  rmBtn.innerHTML = `
    <svg fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path>
      <title>Trash can</title>
    </svg>
  `;

  rmBtn.addEventListener("click", function () {
    this.parentElement.parentElement.remove();
  });

  rmBtnTd.appendChild(rmBtn);

  return rmBtnTd;
}

function addHeaderOption(property) {
  const headerTag = availablePropertiesHeaders.querySelector("[data-value='" + property + "']");

  if (headerTag) {
    headerTag.remove();
    selectedPropertiesHeaders.appendChild(headerTag);
  }
}

function addSortOption(sort) {
  const sortTag = availablePropertiesSorting.querySelector("[data-value='" + sort.property + "']");

  if (sortTag) {
    setSort(sortTag, sort.sort);

    sortTag.remove();
    selectedPropertiesSorting.appendChild(sortTag);
  }
}

function addFilterOption(property, filter) {
  const tRow = document.createElement("bx-table-row");

  tRow.dataset.conjunction = filter.conj;
  tRow.dataset.comparator = filter.comp;
  tRow.dataset.property = property;
  tRow.dataset.type = filter.type;
  tRow.dataset.value = filter.val;

  tRow.appendChild(createRemoveButton())

  const fCTd = document.createElement("bx-table-cell");
  const conjunctionOption = filterConjunction.querySelector("[value='" + filter.conj + "']");
  fCTd.innerText = conjunctionOption.innerHTML;
  tRow.appendChild(fCTd);

  const fPTd = document.createElement("bx-table-cell");
  const propertyOption = filterProperty.querySelector("[value='" + property + "']");
  fPTd.innerText = propertyOption.innerHTML;
  tRow.appendChild(fPTd);

  const fCoTd = document.createElement("bx-table-cell");
  const comparatorOption = filterComparator.querySelector("[value='" + filter.comp + "']");
  fCoTd.innerText = comparatorOption.innerHTML;
  tRow.appendChild(fCoTd);

  const fVTd = document.createElement("bx-table-cell");
  fVTd.innerText = filter.val;

  if (filter.type == "attribute") {
    const propertyValOption = filterValueProperty.querySelector("[value='" + filter.val + "']");
    fVTd.innerText = propertyValOption.innerHTML;
  } else if (filter.type == "regex") {
    fVTd.innerText = "/" + filter.val + "/g";
  }

  tRow.appendChild(fVTd);

  filtersList.appendChild(tRow);
}

function addDividerOption(property, count) {
  const tRow = document.createElement("bx-table-row");

  tRow.dataset.property = property;
  tRow.dataset.value = count;

  tRow.appendChild(createRemoveButton())

  const propTd = document.createElement("bx-table-cell");
  const propertyOption = dividerProperty.querySelector("[value='" + property + "']");
  propTd.innerText = propertyOption.innerHTML;
  tRow.appendChild(propTd);

  const rowsTd = document.createElement("bx-table-cell");
  rowsTd.innerText = count <= 0 ? loc.newTablePage : count;
  tRow.appendChild(rowsTd);

  dividersList.appendChild(tRow);
}

function addStatisticOption(property, operator) {
  const tRow = document.createElement("bx-table-row");

  tRow.dataset.property = property;
  tRow.dataset.operator = operator;

  tRow.appendChild(createRemoveButton())

  const operationTd = document.createElement("bx-table-cell");
  const operatorOption = statisticOperator.querySelector("[value='" + operator + "']");
  operationTd.innerText = operatorOption.innerHTML;
  tRow.appendChild(operationTd);

  const propertyTd = document.createElement("bx-table-cell");
  const propertyOption = statisticProperty.querySelector("[value='" + property + "']");
  propertyTd.innerText = propertyOption.innerHTML;
  tRow.appendChild(propertyTd);

  statisticsList.appendChild(tRow);
}

function addSavedOption(option) {
  const tRow = document.createElement("bx-table-row");

  tRow.dataset.id = option.id;

  const removeButton = createRemoveButton();
  removeButton.addEventListener("click", function () {
    const optionID = this.parentElement.dataset.id;

    let savedOptions = localStorage.getItem("savedOptions") || '{}';
    savedOptions = JSON.parse(savedOptions);

    delete savedOptions[optionID];
    localStorage.setItem("savedOptions", JSON.stringify(savedOptions));
  });

  tRow.appendChild(removeButton)

  const nameCell = document.createElement("bx-table-cell");

  const nameCellHref = document.createElement("a");
  nameCellHref.href = location.origin + location.pathname + "?q=" + option.options + "&name=" + option.name;
  nameCellHref.innerText = option.name;

  nameCell.appendChild(nameCellHref);
  tRow.appendChild(nameCell);

  savedOptionsList.appendChild(tRow);
}

// Options to DOM and viceversa

function createOptionsFromDOM() {
  const headers = [];
  for (const header of selectedPropertiesHeaders.childNodes) {
    headers.push(header.dataset.value);
  }

  const sorts = [];
  for (const sorting of selectedPropertiesSorting.childNodes) {
    sorts.push({ property: sorting.dataset.value, sort: parseInt(sorting.dataset.sort) });
  }

  const filters = {};
  for (const filter of filtersList.childNodes) {
    const filterConjunction = filter.dataset.conjunction;
    const filterProperty = filter.dataset.property;
    const filterComparator = filter.dataset.comparator;
    const filterValue = filter.dataset.value;
    const filterValueType = filter.dataset.type;

    filters[filterProperty] = (filters[filterProperty] || []);
    filters[filterProperty].push({ conj: filterConjunction, comp: filterComparator, val: filterValue, type: filterValueType });
  }

  const dividers = {};
  for (const divider of dividersList.childNodes) {
    const dividerProperty = divider.dataset.property;
    const dividerValue = divider.dataset.value;

    dividers[dividerProperty] = (dividers[dividerProperty] || 0)
    dividers[dividerProperty] += parseInt(dividerValue);
  }

  const statistics = {};
  for (const statistic of statisticsList.childNodes) {
    const statisticProperty = statistic.dataset.property;
    const statisticOperator = statistic.dataset.operator;

    statistics[statisticProperty] = (statistics[statisticProperty] || [])
    statistics[statisticProperty].push(statisticOperator);
  }

  options = {
    headers: headers,
    sorts: sorts,
    filters: filters,
    dividers: dividers,
    statistics: statistics
  }

  return options;
}

function resetOptions() {
  while (tag = selectedPropertiesHeaders.firstChild) {
    tag.remove();
    availablePropertiesHeaders.appendChild(tag);
  }

  while (tag = selectedPropertiesSorting.firstChild) {
    tag.remove();
    availablePropertiesSorting.appendChild(tag);
  }

  filtersList.innerHTML = "";
  dividersList.innerHTML = "";
  statisticsList.innerHTML = "";
}

function createDOMFromOptions(options) {
  resetOptions();

  for (property of options.headers) {
    addHeaderOption(property);
  }

  for (sort of options.sorts) {
    addSortOption(sort);
  }

  for (property in options.filters) {
    for (filter of options.filters[property]) {
      addFilterOption(property, filter);
    }
  }

  for (property in options.dividers) {
    count = options.dividers[property];
    addDividerOption(property, count);
  }

  for (property in options.statistics) {
    for (statistic of options.statistics[property]) {
      addStatisticOption(property, statistic);
    }
  }
}

function createDownloadButton() {
  const csvText = createCSV(csvData);
  downloadBtn.href = "data:text/csv;charset=UTF-8," + "\uFEFF" + encodeURI(csvText);

  const todayMillis = Date.now() / 1000 | 0;
  downloadBtn.download = `export_${todayMillis}.csv`;
}