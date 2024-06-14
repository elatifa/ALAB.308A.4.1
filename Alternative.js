


function displayAlternative(breedInfo) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const breedNameNode = document.createTextNode(breedInfo.name);
    const breedDescriptionNode = document.createTextNode(breedInfo.description);
  
    thead.innerHTML = '<tr><th>Breed</th><th>Description</th></tr>';
    const breedRow = document.createElement('tr');
    breedRow.appendChild(document.createElement('td')).appendChild(breedNameNode);
    breedRow.appendChild(document.createElement('td')).appendChild(breedDescriptionNode);
    tbody.appendChild(breedRow);
  
    table.appendChild(thead);
    table.appendChild(tbody);
    table.className = 'breed-table';
    infoDump.innerHTML = '';
    infoDump.appendChild(table);
  }

  
axios.defaults.headers.common['x-api-key'] = "live_5p8QUa8BdRSpqcjqA2ZxqNxrRnHUYXbZT1JH0J5sTVWXxV3JyTi5kZ3TVYaaeVf0";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}';

const progressBar = document.getElementById('progressBar');

axios.interceptors.push({
    request: request => {
      console.log('Request started at', new Date().getTime());
      document.body.style.cursor = 'progress';
      return request;
    },
    response: response => {
      console.log('Response received at', new Date().getTime());
      document.body.style.cursor = 'default';
      return response;
    }
  });
  axios.get(`/images/search?breed_ids=abys&limit=10`, {
    onDownloadProgress: updateProgress
  });
  
  function updateProgress(progressEvent) {
    console.log(progressEvent);
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    progressBar.style.width = `${percentCompleted}%`;
  }

axios.get(`/images/search?breed_ids=${breedId}&limit=10`)
  .then(response => {
    const breedInfo = response.data;
    displayAlternative(breedInfo);
  })
  .catch(error => {
    console.error(error);
  });