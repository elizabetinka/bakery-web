
const form = document.getElementById("scheduleForm");
const tableContainer = document.getElementById("tableContainer");

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const partyType = document.getElementById("partyType").value;
    const money = document.getElementById("money").value;
    const maxClasses = document.getElementById("maxNum").value;
    const language = document.getElementById("language").value;

    generateTable(partyType, maxClasses,money, language);
});

function getCakesCupcakes(partyType, maxClasses){
    cakes_count = 0;
    cupcakes_count = 0;
    num = parseInt(maxClasses);

    if (partyType == "porp"){
        cakes_count = Math.min(3,Math.ceil(num/(3)))
        cupcakes_count = Math.min(10,num)
    }
    if (partyType == "birt"){
        cakes_count = Math.min(3,Math.ceil(num/(2)))
    }
    if (partyType == "katering"){
        cupcakes_count = Math.min(10,num*2)
    }
    return [cakes_count,cupcakes_count]
}

function getCupcake(money,language){
    if (money == "low"){
        if (language =="ru"){
            return { name: "Макарун", price: "30",count:"1шт"};
        }
        else{
            return { name: "Macaroon", price: "30",count:"1шт"};
        }
    }
    if (money == "middle"){
        if (language =="ru"){
            return { name: "Брауни", price: "300",count:"1шт"};
        }
        else{
            return { name: "Brauni", price: "300",count:"1шт"};
        }
    }
    if (money == "high"){
        if (language =="ru"){
            return { name: "Меренговый рулет", price: "700",count:"1шт"};
        }
        else{
            return { name: "Merenge roolet", price: "700",count:"1шт"};
        }
    }
}

function getCake(money,language){
    if (money == "low"){
        if (language =="ru"){
            return { name: "Медовик", price: "2700",count:"1кг"};
        }
        else{
            return { name: "Medovic", price: "2700",count:"1кг"};
        }
    }
    if (money == "middle"){
        if (language =="ru"){
            return { name: "Черный лес", price: "2750",count:"1кг"};
        }
        else{
            return { name: "Black tree", price: "2750",count:"1кг"};
        }
    }
    if (money == "high"){
        if (language =="ru"){
            return { name: "Муссовый торт 3 шоколада", price: "2850",count:"1кг"};
        }
        else{
            return { name: "Muss 3 chokolate", price: "2850",count:"1кг"};
        }
    }
}

function generateTable(partyType, maxClasses, money,language) {
    
    tableContainer.innerHTML = "";

    const table = document.createElement("table");
    table.classList.add("schedule_table");

    counts = getCakesCupcakes(partyType, maxClasses)
    cakes_count = counts[0]
    cupcakes_count = counts[1]

    sum = 0
    
    for (let i = 0; i < cakes_count ; i++) {
        const row = document.createElement("tr");
        cake = getCake(money,language);
        const nameCell = document.createElement("td");
        nameCell.textContent = cake.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = cake.price;
        row.appendChild(priceCell);
        sum+=parseInt(cake.price);

        const countCell = document.createElement("td");
        countCell.textContent = cake.price;
        row.appendChild(countCell);

        table.appendChild(row);
    }

    for (let i = 0; i < cupcakes_count ; i++) {
        const row = document.createElement("tr");
        cake = getCupcake(money,language);
        const nameCell = document.createElement("td");
        nameCell.textContent = cake.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = cake.price;
        row.appendChild(priceCell);
        sum+=parseInt(cake.price);

        const countCell = document.createElement("td");
        countCell.textContent = cake.count;
        row.appendChild(countCell);

        table.appendChild(row);
    }

    let ro = document.createElement("tr");
    let cell = document.createElement("td");
    cell.textContent = "Итого";
    ro.appendChild(cell);
    table.appendChild(ro);

    cell = document.createElement("td");
    cell.textContent = sum;
    ro.appendChild(cell);
    table.appendChild(ro);

    cell = document.createElement("td");
    cell.textContent = cupcakes_count+cakes_count;
    ro.appendChild(cell);
    table.appendChild(ro);

    tableContainer.appendChild(table);
}


document.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('cakeFormData'));
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const input = document.querySelector(`[name=${key}]`);
            if (input) input.value = savedData[key];
        });
    }
});

form.addEventListener('input', () => {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    localStorage.setItem('cakeFormData', JSON.stringify(formObject));
});
