// Data
let rawData;

const possibleValuesForProperty = {};

let csvData;

// Data container
const tableContainer = document.getElementById("dataTables");

// Headers and Sorting
const availablePropertiesHeaders = document.getElementById("availablePropertiesHeaders");
const selectedPropertiesHeaders = document.getElementById("selectedPropertiesHeaders");

const availablePropertiesSorting = document.getElementById("availablePropertiesSorting");
const selectedPropertiesSorting = document.getElementById("selectedPropertiesSorting");


// Filters
const filterConjunction = document.getElementById("filterConjunction");
const filterProperty = document.getElementById("filterProperty");
const filterComparator = document.getElementById("filterComparator");
const filterValue = document.getElementById("filterValue");
const filterValueProperty = document.getElementById("filterValueProperty");
const filterValueCustom = document.getElementById("filterValueCustom");
const filterUseRegex = document.getElementById("filterUseRegex");
const addFilterBtn = document.getElementById("addFilterBtn");
const filtersList = document.getElementById("filtersList")

// Dividers
const dividerType = document.getElementById("dividerType");
const dividerNumRows = document.getElementById("dividerNumRows");
const dividerProperty = document.getElementById("dividerProperty");
const addDividerBtn = document.getElementById("addDividerBtn");
const dividersList = document.getElementById("dividersList");

// Statistics
const statisticOperator = document.getElementById("statisticOperator");
const statisticProperty = document.getElementById("statisticProperty");
const addStatisticBtn = document.getElementById("addStatisticBtn");
const statisticsList = document.getElementById("statisticsList");

// Savings
const saveOptionsName = document.getElementById("saveOptionsName");
const saveOptionsBtn = document.getElementById("saveOptionsBtn");
const savedOptionsList = document.getElementById("savedOptionsList");

// Create table
const createTableFromOptionsBtn = document.getElementById("createTableFromOptionsBtn");

// Notifications
const notifications = document.getElementById("notifications");

// Download
const downloadBtn = document.getElementById("downloadBtn");