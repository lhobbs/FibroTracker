export function addFoodEntry(food) {
    console.log('in service', food)
    fetch('https://us-central1-fibrotracker.cloudfunctions.net/addFood', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(food)
      }).then(function(response) {
          console.log('response', response)
        // return response.json();
        return response;
      })
      .catch(err => console.error(err));
}

export function getFoodEntries() {
    return fetch('https://us-central1-fibrotracker.cloudfunctions.net/getFood', {
        method: 'GET',
        // headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        // body: JSON.stringify(food)
      }).then(function(response) {
          //console.log('response', response['_bodyInit'])
          var data = JSON.parse(response['_bodyInit'])
          var result = Object.keys(data).map(function(key) {
            data['key'] = key;
            return data[key];
          });
        //   console.log('result', result) 
         return result; 
      })
      .catch(err => console.error(err));
}