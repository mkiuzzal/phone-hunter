const loadData = async (search ='iphone', isShowData) => {
  const load = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
  const data = await load.json();
  const phones = data.data;
  showPhone(phones , isShowData);

};


//this is show all phone use
const showPhone = (phones, isShowData) => {
  const geiID = document.getElementById("phone-container");
  const showAllButton = document.getElementById('btn-show');

  //Show all button show or hidden
  if (phones.length > 16 && !isShowData){
    showAllButton.classList.remove('hidden');
  }else{
    showAllButton.classList.add('hidden');
  }
  
  if(!isShowData){
    phones = phones.slice(0,16);
  }

//   this is empty string declare because every load data prev data already removed.
  geiID.innerHTML = '';
  phones.forEach((element) => {

    const div = document.createElement("div");
    div.classList = `card bg-base-100 drop-shadow-md`;
    div.innerHTML = `
    <figure class="px-10 pt-10">
        <img src="${element.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
            <h2 class="card-title">${element.phone_name}</h2>
            <p>This is Expansive collection and new model to this year</p>
            <p class="text-2xl">Price: 9999</p>
            <div class="card-actions">
            <button onclick="singlePhoneData('${element.slug}')" class="btn btn-primary text-white">Show Details</button>
        </div>
    </div>`;
    geiID.appendChild(div);
  });
  toggle(false)
};

// this is search function
const search = (isShowData) =>{
    toggle(true);
    const inputFelid = document.getElementById('search-felid');
    const inputValue = inputFelid.value;
     inputValue.toLowerCase();

    if(inputValue ===''){
      loadData();
    }else{
      loadData(inputValue, isShowData);
    }
}

//this is loading spinner function
const toggle = (isLoading)=>{
  const spinner = document.getElementById('loading-spinner');
  if(isLoading){
    spinner.classList.remove('hidden');
  }else{
    spinner.classList.add('hidden');
  }
}
const showAllData =()=>{
  search(true);
}

//find single phone data
const singlePhoneData = async (id)=>{
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await response.json();
  const info = data.data;
  // console.log(info);
  const showDetailsID = document.getElementById('Show-details-single-phone');
  showDetailsID.innerHTML = `
  <div class="flex justify-center"><img src="${info.image}" alt=""></div>
  <h3 class="text-2xl">${info.name}</h3>
  <p class="{#706F6F}"><span class=""font-extrabold text-{#403F3F">Storage: </span>${info.mainFeatures?.storage}</p>
  <p class="{#706F6F}"><span class=""font-extrabold text-{#403F3F">Display Size: </span>${info.mainFeatures?.displaySize}</p>
  <p class="{#706F6F}"><span class=""font-extrabold text-{#403F3F">ChipSet: </span>${info.mainFeatures?.chipSet}</p>
  <p class="{#706F6F}"><span class=""font-extrabold text-{#403F3F">Memory: </span>${info.mainFeatures?.memory}</p>
  <p class="{#706F6F}"><span class=""font-extrabold text-{#403F3F">Release Date: </span>${info?.releaseDate}</p>
  <p class="{#706F6F}"><span class=""font-extrabold text-{#403F3F">Brand: </span>${info.brand}</p>
  <p class="{#706F6F}"><span class=""font-extrabold text-{#403F3F">GPS: </span>${info.others?.GPS}</p>
  `;
  openModal(info);
}
//open modal
const openModal = (info)=>{
  console.log(info);
  open_modal.showModal();
}
// loadtotal data function call
loadData();
