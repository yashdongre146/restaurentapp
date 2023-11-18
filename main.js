const price = document.getElementById('name');
const dish = document.getElementById('email');
const choosetable = document.getElementById('choosetable');
const form = document.getElementById('form');

axios.get('https://crudcrud.com/api/f5876974dd1b46ad964d2a212dd881fe/mydata')
  .then(res => {
    for (let ele of res.data) {
      // putting data on the screen
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${ele.price} - ${ele.dish} - ${ele.choosetable} `));

      const del = document.createElement('button');
      del.appendChild(document.createTextNode('delete'));
      del.className = "delete";

      li.appendChild(del);
      li.className = "item";
      li.id = ele._id;

      const headings = document.getElementsByTagName('h3');

      let items;
      for (let i = 0; i < headings.length; i++) {
        if (headings[i].textContent === ele.choosetable) {
          items = document.getElementById(`list${i + 1}`);
        }
      }

      items.appendChild(li);
    }
  })
  .catch(err => console.log(err))

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const obj = {
    price: price.value,
    dish: dish.value,
    choosetable: choosetable.value
  }

  // putting data into axios
  axios.post('https://crudcrud.com/api/f5876974dd1b46ad964d2a212dd881fe/mydata', obj)
    .then(res => {
      // putting data on the screen
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(`${price.value} - ${dish.value} - ${choosetable.value} `));

      const del = document.createElement('button');
      del.appendChild(document.createTextNode('delete'));
      del.className = "delete";

      li.appendChild(del);
      li.className = "item";
      li.id = res.data._id;

      const headings = document.getElementsByTagName('h3');

      let items;
      for (let i = 0; i < headings.length; i++) {
        if (headings[i].textContent === choosetable.value) {
          items = document.getElementById(`list${i + 1}`);
        }
      }

      items.appendChild(li);
    })
    .catch(err => console.log(err))
})

for (let i = 1; i < 4; i++) {
  // delete button
  document.getElementById(`list${i}`).addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      if (confirm('Are You Sure?')) {

        // targetting particular list
        var li = e.target.parentElement;
        document.getElementById(`list${i}`).removeChild(li);

        // removing from axios
        axios.delete(`https://crudcrud.com/api/f5876974dd1b46ad964d2a212dd881fe/mydata/${li.id}`)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
    }
  });
}



