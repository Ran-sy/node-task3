const form = document.getElementById('form1');
const address = document.getElementById('address');
const error = document.getElementById('error');
const target = document.getElementById('location');
const forcast = document.getElementById('forcast');


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    weatherFunc()
})

let weatherFunc = async () => {
    try{
        const value = address.value;
        const res = await fetch(`http://localhost:3000/weather?address=${value}`);
        const data = await res.json();
        if(data.error) error.innerHTML = data.error
        else{
            target.innerText = data.location;
            forcast.innerText = data.forcast
        }
    }catch(e){
        error.innerHTML = e
    }
}