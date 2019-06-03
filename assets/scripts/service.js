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