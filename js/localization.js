const localizationStrings = {
  default: {
    error: "Error",
    info: "Info",
    warning: "Warning",
    empty: "Empty value",
    urlNotDefined: "Data source URL not defined",
    dataReady: "Data are ready, set options and generate your table",
    noElements: "No elements to list",
    noProperties: "No headers selected",
    options: "Options",
    property: "Properties",
    headers: "Headers",
    headersInfo: "Drag and drop properties you want to show in the table generated.",
    availableProperties: "Availables properties",
    selectedProperties: "Selected properties",
    sorting: "Sorting",
    sortingInfo: "Drag and drop properties you want to use to sort data.You can change sort type by clicking on the selected property.",
    filters: "Filters",
    filtersInfo: "Add and remove filters. Conjunctions will be applied to same property filters.",
    newFilter: "New filter",
    conjunction: "Conjunction",
    comparator: "Comparator",
    value: "Value",
    dividers: "Dividers",
    dividersInfo: "Start new table/add a page break or add an arbitrary number of empty rows when a property change.",
    newDivider: "New divider",
    pageBreak: "Number of rows/Page break",
    statistics: "Statistics",
    statisticsInfo: "Generate statistics like count of unique values for properties, sums, averages.",
    newStatistic: "New statistic",
    operator: "Operator",
    savedOptions: "Saved options",
    savedOptionsInfo: "Save current options to share them or recover them quickly.",
    saveOptions: "Save options",
    name: "Name",
    generateTable: "Generate",
    print: "Print",
    download: "Download",
    data: "Data",
    loading: "Loading",
    add: "Add",
    save: "Save",
    or: "Or",
    and: "And",
    equalsTo: "Equals to",
    differentFrom: "Different from",
    greaterThan: "Greater than",
    greaterThanEqual: "Greater than or equal to",
    lessThan: "Less than",
    lessThanEqual: "Less than or equal to",
    useOneOf: "Use one of the following",
    dataValue: "Data value",
    customValue: "Custom value",
    useRegex: "Use regular expression",
    rowsNewTable: "Rows/New table",
    arbitraryNumRows: "Arbitrary number of rows",
    newTablePage: "New table/Page break",
    numRows: "Number of rows",
    countUnique: "Count unique values",
    sumAvg: "Sum and average",
    count: "Count",
    sum: "Sum",
    avg: "Average",
    total: "Total",
    NaN: "Not a number",
    saveAs: "Save as",
  },
  it: {
    error: "Errore",
    info: "Info",
    warning: "Attenzione",
    empty: "Nessun valore",
    urlNotDefined: "L'URL per la sorgente dei dati non è impostato",
    dataReady: "I dati sono pronti, cambia le opzioni e genera la tabella",
    noElements: "Nessun elemento da elencare",
    noProperties: "Nessuna proprietà selezionata da elencare",
    options: "Opzioni",
    property: "Proprietà",
    headersInfo: "Trascina le proprietà che vuoi mostrare nella tabella generata.",
    availableProperties: "Proprietà disponibili",
    selectedProperties: "Proprietà selezionate",
    sorting: "Ordinamento",
    sortingInfo: "Trascina le proprietà che vuoi usare per ordinare i dati. Puoi cambiare il tipo di orginamento cliccando sulla proprietà selezionata.",
    filters: "Filtri",
    filtersInfo: "Aggiungi e rimuovi filtri. Le congiunzioni saranno applicate solo ai filtri con le stesse proprietà.",
    newFilter: "Nuovo filtro",
    conjunction: "Congiunzione",
    comparator: "Comparatore",
    dividers: "Divisori",
    value: "Valore",
    dividersInfo: "Inizia una nuova tabella/Aggiungi un'interruzione di pagina o aggiungi un numero arbitrario di righe vuote quando una proprietà cambia.",
    newDivider: "Nuovo separatore",
    pageBreak: "Numero di righe/Interruzione di pagina",
    statistics: "Statistiche",
    statisticsInfo: "Genera statistiche come conteggio di valori univoci per le proprietà, somme, medie.",
    newStatistic: "Nuova statistica",
    operator: "Operatore",
    savedOptions: "Opzioni salvate",
    savedOptionsInfo: "Salva le opzioni correnti per poterle condividere o recuperare facilmente.",
    saveOptions: "Salva opzioni",
    name: "Nome",
    generateTable: "Genera",
    print: "Stampa",
    download: "Scarica",
    data: "Dati",
    loading: "Caricamento",
    add: "Aggiungi",
    save: "Salva",
    or: "O",
    and: "E",
    equalsTo: "Uguale a",
    differentFrom: "Diverso da",
    greaterThan: "Maggiore di",
    greaterThanEqual: "Maggiore o uguale a",
    lessThan: "Minore di",
    lessThanEqual: "Minore o uguale a",
    useOneOf: "Usa una delle seguenti opzioni",
    dataValue: "Valore dai dati",
    customValue: "Valore personalizzato",
    useRegex: "Usa espressioni regolari",
    rowsNewTable: "Righe/Nuova tabella",
    arbitraryNumRows: "Numero di righe arbitrario",
    newTablePage: "Nuova tabella/Interruzione di pagina",
    numRows: "Numbero di righe",
    countUnique: "Conta valori univoci",
    sumAvg: "Somma e media",
    count: "Conteggio",
    sum: "Somma",
    avg: "Media",
    total: "Totale",
    NaN: "Non un numero",
    saveAs: "Salva come",
  }
}

let loc = localizationStrings.default;

const language = window.navigator.userLanguage || window.navigator.language;
if (language) {
  loc = localizationStrings[language] || localizationStrings[language.substring(0, 2)] || loc;
}

const elementsToLocalize = document.querySelectorAll("[data-local]");
for (const el of elementsToLocalize) {
  const localizedString = loc[el.dataset.local] || localizationStrings.default[el.dataset.local];

  if (localizedString) {
    if (el.dataset.localattr) {
      el.setAttribute(el.dataset.localattr, localizedString);
    } else {
      el.innerText = localizedString;
    }
  }
}
