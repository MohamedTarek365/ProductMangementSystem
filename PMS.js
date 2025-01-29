let title = document.getElementById("title")
let price = document.getElementById("price")
let tex = document.getElementById("tex")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let count = document.getElementById("count")
let total = document.getElementById("total")
let category = document.getElementById("category")
let create = document.getElementById("create")

let mood = 'create';
let up;

//get total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +ads.value + +tex.value) - +discount.value

        total.innerHTML = result;
        total.style.background = "#040"
    } else {
        total.innerHTML = "";
        total.style.background = "#ab0000"

    }

}

//create product
let datapro;
if (localStorage.product != null) { datapro = JSON.parse(localStorage.product) }
else { datapro = [] }


create.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        ads: ads.value,
        tex: tex.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != "" && price.value != "" && category.value != "") {
        if (mood === "create") {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);

            }
        } else {
            datapro[up] = newpro;
            mood = "create";
            create.innerHTML = 'create';
            count.style.display = 'block';


        } clearInput();
    }

    //save localstorage
    localStorage.setItem("product", JSON.stringify(datapro));

    showData();
}






//clear inputs

function clearInput() {
    title.value = "";
    price.value = "";
    tex.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    total.innerHTML = "";
    category.value = "";


}


//read

function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {


        table +=
            `<tr>
                  <td>${i + 1}</td>
                  <td>${datapro[i].title}</td>
                  <td>${datapro[i].price}</td>
                  <td>${datapro[i].tex}</td>
                  <td>${datapro[i].ads}</td>
                  <td>${datapro[i].discount}</td>
                  <td>${datapro[i].total}</td>
                  <td>${datapro[i].category}</td>
                  <td><button onclick="update(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

                </tr>`;
    }


    document.getElementById('tbody').innerHTML = table;
    //deleteAll 
    btndel = document.getElementById("deleteAll");
    if (datapro.length > 0) {
        btndel.innerHTML = `<button onclick="deleteAll()">deleteAll "  "(${datapro.length})</button>`

    } else {
        btndel.innerHTML = ``
    }


} showData();

//delete 
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();

}

//delete all
function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}



//count


//update

function update(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    tex.value = datapro[i].tex;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';

    create.innerHTML = "update";

    category.value = datapro[i].category;
    mood = 'update';
    up = i;
    scroll({ top: 0, behavior: "smooth" });

}


//sreach


let sreachMood = 'title';

function getSreachMood(id) {
    let sreach = document.getElementById('sreach');


    if (id == 'sreach by title') {
        sreachMood = 'title';
        sreach.placeholder = 'sreach by title';
    } else {
        sreachMood = 'category';
        sreach.placeholder = 'sreach by category';

    }
    sreach.focus()
    sreach.value = '';
    showData()
}

function sreachData(value) {

    let table = '';
    if (sreachMood == 'title') {

        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {


                table +=
                    `<tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].tex}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button onclick="update(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

            </tr>`;

            }
        }
    }

    else {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {


                table +=
                    `<tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].tex}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="update(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

    </tr>`;

            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}






//clean data