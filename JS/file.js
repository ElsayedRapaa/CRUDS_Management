// Selector Elements
let the_Title = document.querySelector('.input-title .title'),
    the_Price = document.querySelector('.input-price > div .price'),
    the_Taxes = document.querySelector('.input-price > div .taxes'),
    the_Ads = document.querySelector('.input-price > div .ads'),
    the_Discount = document.querySelector('.input-price > div .discount'),
    total_Price = document.querySelector('.input-price > div .total-price'),
    the_Count = document.querySelector('.input-count .count'),
    the_Category = document.querySelector('.input-category .category'),
    the_Create = document.querySelector('.btn-create .create'),
    the_Search = document.querySelector('.input-search .search'),
    the_ser_Title = document.querySelector('.btn-search .search-title'),
    the_ser_Categ = document.querySelector('.btn-search .search-category'),
    del_All = document.querySelector('.btn-delete-all .delete-all'),
    del_All_Num = document.querySelector('.btn-delete-all .delete-all span');

let the_Mood = 'create';
let the_Index;


// Function Sum the Total Price
function sum_Price() {

    if (the_Price.value != '') {

        let result = (+the_Price.value + +the_Taxes.value + +the_Ads.value) - +the_Discount.value

        total_Price.innerHTML = result;

        total_Price.classList.add('add-price');

    } else {

        total_Price.innerHTML = '0';

        total_Price.classList.remove('add-price');

    };

};

// Function Create Product

let new_Product_Local = localStorage.getItem('new_product'),
    data_Product;

if (new_Product_Local !== null) {

    data_Product = JSON.parse(new_Product_Local);

} else {

    data_Product = [];

};

the_Create.onclick = function() {

    let new_Data = {
        title: the_Title.value.toLowerCase(),
        price: the_Price.value,
        taxes: the_Taxes.value,
        ads: the_Ads.value,
        discount: the_Discount.value,
        total: total_Price.textContent,
        count: the_Count.value,
        category: the_Category.value.toLowerCase()
    };

    if (the_Title.value != '' && the_Price.value != '' && the_Category.value != '' && new_Data.count < 100) {
        if (the_Mood === 'create') {
            if (new_Data.count > 1) {
                for (let i = 0; i < new_Data.count; i++) {
                    data_Product.push(new_Data);
                };
            } else {
                data_Product.push(new_Data);
            };
        } else {
            data_Product[the_Index] = new_Data;
            the_Count.style.display = 'block';
            the_Create.innerHTML = 'Create';
            the_Mood = 'create';
        };
        clean_Inputs();
    };

    localStorage.setItem('new_product', JSON.stringify(data_Product));

    Show_Data();
};

// Clean Inputs
function clean_Inputs() {
    the_Title.value = '';
    the_Price.value = '';
    the_Taxes.value = '0';
    the_Ads.value = '0';
    the_Discount.value = '0';
    total_Price.textContent = '0';
    total_Price.classList.remove('add-price');
    the_Count.value = '';
    the_Category.value = '';
};

// Read
function Show_Data() {

    let table = '';

    for (let i = 0; i < data_Product.length; i++) {

        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${data_Product[i].title}</td>
        <td>${data_Product[i].price}</td>
        <td>${data_Product[i].taxes}</td>
        <td>${data_Product[i].ads}</td>
        <td>${data_Product[i].discount}</td>
        <td>${data_Product[i].total}</td>
        <td>${data_Product[i].category}</td>
        <td><button onclick="update_Product(${i})" class="update">Update</button></td>
        <td><button onclick="delete_Data(${i})" class="delete">Delete</button></td>
    </tr>
        `
    };

    document.querySelector('.tbody-table').innerHTML = table;

    if (data_Product.length > 0) {
        del_All.style.display = 'block';
        del_All_Num.textContent = data_Product.length
    } else {
        del_All.style.display = 'none';
    };

};
Show_Data();

// Delete
function delete_Data(i) {

    data_Product.splice(i, 1);
    localStorage.new_product = JSON.stringify(data_Product);
    Show_Data();

};

function delete_All() {
    data_Product.splice(0);
    localStorage.clear();
    Show_Data();
};

// Update
function update_Product(i) {
    the_Title.value = data_Product[i].title;
    the_Price.value = data_Product[i].price;
    the_Taxes.value = data_Product[i].taxes;
    the_Ads.value = data_Product[i].ads;
    the_Discount.value = data_Product[i].discount;
    sum_Price();
    the_Category.value = data_Product[i].category;
    the_Count.style.display = 'none';
    the_Create.innerHTML = 'Update';
    the_Mood = 'update';
    the_Index = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
    // console.log(i);
}

// Search

let search_Mood = 'Title';

function get_Search_Mood(id) {

    if (id == 'search-title') {
        search_Mood = 'Title';
    } else {
        search_Mood = 'Category';
    };
    the_Search.placeholder = 'Search By ' + search_Mood;
    the_Search.focus();
    the_Search.onblur = function() {
        the_Search.placeholder = 'Search';
    };
    the_Search.value = '';
    Show_Data();
};

function search_Data(value) {

    let table = '';

    for (let i = 0; i < data_Product.length; i++) {

        if (search_Mood == 'Title') {
            if (data_Product[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
            <td>${i + 1}</td>
            <td>${data_Product[i].title}</td>
            <td>${data_Product[i].price}</td>
            <td>${data_Product[i].taxes}</td>
            <td>${data_Product[i].ads}</td>
            <td>${data_Product[i].discount}</td>
            <td>${data_Product[i].total}</td>
            <td>${data_Product[i].category}</td>
            <td><button onclick="update_Product(${i})" class="update">Update</button></td>
            <td><button onclick="delete_Data(${i})" class="delete">Delete</button></td>
        </tr>
            `
            }
        } else {
            if (data_Product[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
            <td>${i + 1}</td>
            <td>${data_Product[i].title}</td>
            <td>${data_Product[i].price}</td>
            <td>${data_Product[i].taxes}</td>
            <td>${data_Product[i].ads}</td>
            <td>${data_Product[i].discount}</td>
            <td>${data_Product[i].total}</td>
            <td>${data_Product[i].category}</td>
            <td><button onclick="update_Product(${i})" class="update">Update</button></td>
            <td><button onclick="delete_Data(${i})" class="delete">Delete</button></td>
        </tr>
            `
            };
        };

        document.querySelector('.tbody-table').innerHTML = table;

    };
};