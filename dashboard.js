    let crops = [];
    let wheatYield = 0;
    let riceYield = 0;
    let cottonYield = 0;
function sendData() {
  const btn = document.getElementById("addBtn");
  btn.disabled = true;
  btn.innerText = "Saving...";
  const data = {
    cropName: document.getElementById("cropName").value,
    cropArea: document.getElementById("cropArea").value,
    cropType: document.getElementById("cropType").value,
    sowingDate: document.getElementById("sowingDate").value
  };
  fetch("https://script.google.com/macros/s/AKfycbxx18X3fq4PJPy5HdAU7tiWhwXO2wnk1fmqnd8E3WUL9PUgrX9D-ou3_Wv71rpm260GMg/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(() => {
    alert("Saved!");
  })
  .catch(() => {
    alert("Failed!");
  })
  .finally(() => {
    btn.disabled = false;
    btn.innerText = "Add";
  });
}
function irrigationUpdate(){
    let nameIrrigation = document.getElementById("cropName").value;
    let typeIrrigation = document.getElementById("cropType").value;
    let areaIrrigation = parseFloat(document.getElementById("cropArea").value);
    let dateIrrigation = new Date(document.getElementById("sowingDate").value);
    let dateIrrigation2 = document.getElementById("sowingDate").value;
    let currentDate = new Date();
    let irrigationDisplay = document.getElementById("irrigation-data");
    let age = Math.floor((currentDate - dateIrrigation)/(1000*60*60*24));
    let interval;
    if(typeIrrigation == "Wheat"){
        interval = 25; 
    }
    else if(typeIrrigation == "Rice"){
interval = 7;
    }
    else{
interval = 12;
    }
    let nextIrrigationInDays = interval - (age % interval);         
    irrigationDisplay.innerHTML = `<h2>Name: ${nameIrrigation}<br>Type: ${typeIrrigation}<br>Area: ${areaIrrigation}(Acres)<br>Sown Date: ${dateIrrigation2}<br>Age: ${age} Days<br>Interval: ${interval} Days<br>Next Irrigation in Days: ${nextIrrigationInDays} Days</h2>`;
}
function addCrop() {
    let name = document.getElementById("cropName").value;
    let type = document.getElementById("cropType").value;
    let area = parseFloat(document.getElementById("cropArea").value);
    let date = document.getElementById("sowingDate").value;
    let displayDiv = document.getElementById("display");
    crops.push({ name, type, area, date });
    displayDiv.innerHTML += `<p><strong>Name: </strong>${name} - <strong>Type: </strong>${type} - <strong>Area: </strong>${area} acres - <strong>Sown on </strong>${date}</p>`;
    displayDiv.innerHTML += `<hr>`;
    sendData();
    if(type == "Wheat"){
        wheatYield += area * 1570;
    }
    else if(type == "Rice"){
        riceYield += area * 2750;   
    }
    else{
        cottonYield += area * 650; 
    }
    irrigationUpdate();
    updateData();
    document.getElementById("cropName").value = "";
    document.getElementById("cropType").value = "";
    document.getElementById("cropArea").value = "";
    document.getElementById("sowingDate").value = "";
}
function removeCrop() {
    if (crops.length === 0) {
        alert("No records left to delete.");
        return;
    }
    let lastCrop = crops.pop();
    let displayDiv = document.getElementById("display");
    displayDiv.lastElementChild.remove();
    displayDiv.lastElementChild.remove();
    let irrigation = document.getElementById("irrigation-data");
    irrigation.firstElementChild.remove();
    if (lastCrop.type === "Wheat"){
         wheatYield -= lastCrop.area * 1570;
    }
    else if (lastCrop.type === "Rice"){ 
        riceYield -= lastCrop.area * 2750;
    }
    else {
        cottonYield -= lastCrop.area * 650;
    }
    updateData();
}

function updateData() {
    document.getElementById("wheatYieldEst").innerText = wheatYield + " Kg";
    document.getElementById("riceYieldEst").innerText = riceYield + " Kg";
    document.getElementById("cottonYieldEst").innerText = cottonYield + " Kg";
}
