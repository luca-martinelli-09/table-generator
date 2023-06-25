# Table Generator

## Installation
Simply copy the repository where you want. In the `head` tag of `index.html`, change `DATA_SOURCE_URL` with the data source URL, which must response with a JSON object in the form

```json
{
  "status": "success",
  "data": [{...}, ...],
  "keys": []
}
```

or

```json
{
  "status": "error",
  "message": "Error message"
}
```

in case of errors loading data.

## What is

Table generator is a web applications that let you create tables from a JSON data source.

### Headers and Sort
You can choose which properties show in tables, and sort elements by these properties.

### Filters

You can filter comparing properties with values taken from data, other properties and custom values. For custom values Regex is supported.

### Dividers

You can choose to create a new table and add a page break or add an arbitrary number of empty rows when the value of a chosen property changes. This can be helpful to group data by one property or divide gropus of rows to better recognize them.

### Statistics

Statistics can be added to the end of the tables statistics in order to print useful information about data. Support for counting values for a certain property, sum and average.

### Export

Data can be exported in CSV or can be printed.

## Save
You can save options to recover or share them quickly. Saved options are stored using [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Localization

Table Generator comes out with support to English and Italian languages.

## Design system

Table Generator is based on the Open Source IBM's [Carbon Design System](https://carbondesignsystem.com/).
