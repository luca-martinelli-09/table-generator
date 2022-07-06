let opts;

function getData(url) {
  sendRequest({
    url: url,
    onComplete: () => {
      emptyWhenLoaded();
      resetOptions();
    },
    onSuccess: (data) => {
      if (data.status == 'success') {
        rawData = data;

        fillWithProperties(data.data, data.keys);
        createNotification(loc.dataReady, "success");

        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(prop),
        });

        if (params.q) {
          try {
            const options = JSON.parse(atob(params.q));
            opts = options;

            createDOMFromOptions(options);
            const data = createDataFromOptions(options);
            createTable(data, options);

            if (params.name) {
              document.title = params.name + " | Table Generator";
            }
          } catch (error) { }
        }
      } else {
        createNotification(data.message, "error");
      }
    },
    onError: (data) => {
      createNotification(data.message, "error");
    }
  });
}

if (localStorage.getItem("savedOptions")) {
  const savedOptions = JSON.parse(localStorage.getItem("savedOptions"));
  for (const options of Object.keys(savedOptions)) {
    addSavedOption(savedOptions[options]);
  }
}

if (DATA_SOURCE_URL) {
  getData(DATA_SOURCE_URL);
} else {
  emptyWhenLoaded();
  resetOptions();
  createNotification(loc.urlNotDefined, "error");
}