import { saveMeas, getSingleMeas, onGetMeas, deleteMeas, updateMeas } from './firebase.js';

const measForm = document.getElementById('meas-form');
const measContainer = document.getElementById('meas-container');

let editStatus = false
let id = ''

window.addEventListener('DOMContentLoaded', async () => {

  onGetMeas((querySnapshot) => {
    let html = '';

    measContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const meas = doc.data();
      measContainer.innerHTML += `
            <div class = "card card-body mt-2 border-primary">
              <h3 class="h5" style="font-size:150%;">${meas.date}</h3>
              <p></p>
              <p>${meas.weight} Kg</p>
              <p>BMI de ${meas.bmi}</p>
              <p>${meas.percent} % de grasa</p>
              <div>
              <button class='btn btn-primary btn-delete' data-id= "${doc.id}" >Delete</button>
              <button class='btn btn-secondary btn-edit' data-id= "${doc.id}" >Edit</button>
              </div>
            </div>
      `;
    });

    const btnsDelete = measContainer.querySelectorAll('.btn-delete')
    const btnsEdit = measContainer.querySelectorAll('.btn-edit')

    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({ target: { dataset } }) => {

        if (confirm("¿Quieres borrar este registro?")) { deleteMeas(dataset.id) }

      })
    })

    btnsEdit.forEach(btn => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await getSingleMeas(dataset.id)
        const measure = doc.data()

        measForm['meas-date'].value = measure.date
        measForm['meas-weight'].value = measure.weight
        measForm['meas-bmi'].value = measure.bmi
        measForm['meas-percent'].value = measure.percent

        editStatus = true
        id = dataset.id
        measForm['btn-meas-save'].innerText = 'Update'
      })
    })

  });
});



measForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const date = measForm['meas-date']
  const weight = measForm['meas-weight']
  const bmi = measForm['meas-bmi']
  const percent = measForm['meas-percent']

  if (!editStatus) {
    saveMeas(date.value, weight.value, bmi.value, percent.value)
  } else {
    updateMeas(id, {
      date: date.value,
      weight: weight.value,
      bmi: bmi.value,
      percent: percent.value
    })
    editStatus = false;
  }

  measForm.reset();
})