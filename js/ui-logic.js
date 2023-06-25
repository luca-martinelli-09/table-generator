// Fix bug of dropdowns in modals

const modalBodies = document.getElementsByClassName("modal-body");
for (modalChild of modalBodies) {
  modalChild.parentElement.style = "overflow: visible";
  modalChild.parentElement.parentElement.style = "overflow: visible";
}

// Modals

const openModalsButtons = document.querySelectorAll("[data-action=openModal]");
for (modalButton of openModalsButtons) {
  modalButton.addEventListener("click", function () {
    const modal = document.getElementById(this.dataset.target);

    var style = document.createElement("style");
    style.innerHTML = ".bx--modal-container { overflow: visible !important; }";
    modal.shadowRoot.appendChild(style);

    modal.open = true;
  });
}

const closeModalsButtons = document.querySelectorAll("[data-action=closeModal]");
for (modalButton of closeModalsButtons) {
  modalButton.addEventListener("click", function () {
    const modal = this.parentElement.parentElement;
    modal.open = false;
  });
}

// Sortables

$("#availablePropertiesHeaders, #selectedPropertiesHeaders").sortable({
  connectWith: "#optionsHeaders .connectedSortable"
}).disableSelection();

$("#availablePropertiesSorting, #selectedPropertiesSorting").sortable({
  connectWith: "#optionSorting .connectedSortable"
}).disableSelection();

// Fill with values

const fillWithValues = document.getElementsByClassName("fillWithValues");
for (fillWithValue of fillWithValues) {
  fillWithValue.addEventListener("bx-combo-box-selected", function () {
    const selectedProperty = this.value;
    const targetMenu = document.getElementById(this.dataset.target);

    targetMenu.innerHTML = "";

    for (value of possibleValuesForProperty[selectedProperty]) {
      const comboBoxItem = document.createElement("bx-combo-box-item");
      comboBoxItem.innerText = sv(value) || loc.empty;
      comboBoxItem.value = sv(value) || "";

      targetMenu.appendChild(comboBoxItem);
    }
  });
}

// Show rows number input

dividerType.addEventListener("bx-dropdown-selected", function () {
  if (this.value == "rows") {
    dividerNumRows.style.display = "block";
  } else {
    dividerNumRows.style.display = "none";
  }
});

// Add void property

addVoidPropertyBtn.addEventListener("click", function () {
  const property = sv(addVoidPropertyName.value);
  if (rawData?.keys && property && !rawData.keys.includes(property)) {
    const tag = document.createElement("bx-tag");

    tag.dataset.value = property || "";
    tag.innerText = property || loc.empty;
    tag.setAttribute("type", "magenta");

    selectedPropertiesHeaders.appendChild(tag);
  }
})

// Add filter

addFilterBtn.addEventListener("click", function () {
  if (sv(filterProperty.value)) {
    let finalValue = filterValue.value;
    let finalType = "literal";

    if (sv(filterValueCustom.value)) {
      finalValue = filterValueCustom.value;

      if (filterUseRegex.checked) {
        finalType = "regex";
      }
    } else if (sv(filterValueProperty.value)) {
      finalValue = filterValueProperty.value;
      finalType = "attribute";
    }

    addFilterOption(filterProperty.value, {
      conj: filterConjunction.value,
      comp: filterComparator.value,
      val: finalValue,
      type: finalType,
    })
  }
});

// Add divider

addDividerBtn.addEventListener("click", function () {
  if (sv(dividerProperty.value)) {
    let count = -1;

    if (dividerType.value == "rows") {
      count = dividerNumRows.value;
    }

    addDividerOption(dividerProperty.value, count);
  }
});

// Add statistic

addStatisticBtn.addEventListener("click", function () {
  if (sv(statisticProperty.value)) {
    addStatisticOption(statisticProperty.value, statisticOperator.value);
  }
})

// Generate tables

createTableFromOptionsBtn.addEventListener("click", function () {
  const options = createOptionsFromDOM();
  const data = createDataFromOptions(options);

  createTable(data, options);
});

// Save options

saveOptionsBtn.addEventListener("click", function () {
  const name = saveOptionsName.value;
  if (sv(name)) {
    options = createOptionsFromDOM();
    const encryptedOptions = btoa(JSON.stringify(options));
    const optionID = Date.now() / 1000 | 0;

    const option = { id: optionID, name: name, options: encryptedOptions };
    addSavedOption(option);

    let savedOptions = localStorage.getItem("savedOptions") || '{}';
    savedOptions = JSON.parse(savedOptions);

    savedOptions[optionID] = option;
    localStorage.setItem("savedOptions", JSON.stringify(savedOptions));
  }
})