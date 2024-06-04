function fetchData(callback) {
  // Simulate async operation (using setTimeout)
  setTimeout(() => {
    const data = { message: "Retrieved data!" };
    callback(null, data); // Success
  }, 1000);
}

function processData(data, callback) {
  // Do some processing
  const processedData = data.message.toUpperCase();
  callback(null, processedData); // Success
}

fetchData(function(err, data) {
  if (err) {
    console.error(err);
    return;
  }
  processData(data, function(err, processedData) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(processedData); // "RETRIEVED DATA!"
  });
});



// converted code structure

async function fetchData() {
  // Simulate async operation (returning a Promise)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: "Retrieved data!" };
      resolve(data);
    }, 1000);
  });
}

async function processData(data) {
  // Do some processing
  return data.message.toUpperCase();
}

(async () => {
  try {
    const data = await fetchData();
    const processedData = await processData(data);
    console.log(processedData); // "RETRIEVED DATA!"
  } catch (err) {
    console.error(err);
  }
})();
