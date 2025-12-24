AOS.init();
  var typed = new Typed('#element', {
    strings: ['I am into Web-Development', 'I am into frontend development', 'I am into backend development'],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true // Enables infinite looping
});

const hidden=true;
const btn = document.querySelector(".top2");
const body = document.querySelector('body')
const fun = ()=>{
  btn.classList.remove('hidden');
}

if(hidden==true){
  body.addEventListener("mouseover",(e)=>{
  e.preventDefault();
  let y=e.pageY;
  if(900>y){
    btn.classList.add("hidden");
  }
  else{
    fun();
  }
  });

};

//X setup
const inmenu = document.querySelector(".inmenu") ;
const navbar = document.querySelector("navbar")
inmenu.addEventListener("click" , ()=>{
  inmenu.classList.toggle('hide');
  navbar.classList.toggle("hidenav")
  
})


//form-handling with proper validation//
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();



      const name = form.name.value.trim();
      const mail = form.mail.value.trim();
      const contact = form.contact.value.trim();
      const message = form.message.value.trim();

      //All fields required
      if (!name || !mail || !contact || !message) {
        alert(" Please fill in all the fields.");
        return;
      }

      //Name validation: at least 2 characters, only letters and spaces
      const nameRegex = /^[A-Za-z\s]{2,}$/;
      if (!nameRegex.test(name)) {
        alert("🧑 Name must be at least 2 characters and contain only letters and spaces.");
        return;
      }

      //mail format validation
      const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!mailRegex.test(mail)) {
        alert("📧 Please enter a valid mail address.");
        return;
      }

      //contact number validation: 10 digits only
      if (!/^\d{10}$/.test(contact)) {
        alert("📞 Please enter a valid 10-digit contact number.");
        return;
      }

      const btns = document.getElementById('btn');
      btns.style.color = "red";
      btns.textContent = "Submiting...";

    //sending to backend
      const data = {
        name,
        mail,
        contact,
        message
      };

      //https://portfolio-backend-1azx.onrender.com 
      try {
        const response = await fetch("https://portfolio-backend-1azx.onrender.com/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await response.json();

        if (response.ok) {
            btns.textContent = "Done";
            btns.style.color="yellow"
            setTimeout(()=>{
              btns.textContent = "Submit";
              btns.style.color="White"
            },5000)
            form.reset();
        } else {
          btns.textContent = "Submit";
          btns.style.color="white"
        }
      } catch (error) {
        btns.textContent = "Submit";
        btns.style.color="white"
        alert("❌ Submission failed: an error encountered");
      }
    });
  });


  //heart-count
  const count = document.getElementById('count');
  const heart = document.getElementById('heart');
  const hasClicked = localStorage.getItem('hasClickedHeart');

  if (hasClicked) {
    heart.style.pointerEvents = 'none';
    heart.style.opacity = 0.6;
  }

  async function fetchCount() {
    try {
      const res = await fetch('https://portfolio-backend-1azx.onrender.com/api/likes');
      const data = await res.json();
      count.textContent = `${data.count}..`;
    } catch (error) {
      console.error('Failed to fetch count', error);
    }
  }
  
  fetchCount();
  setInterval(fetchCount, 5000);
  
  heart.addEventListener('click', async () => {
    if (!localStorage.getItem('hasClickedHeart')) {
      try {
        await fetch('https://portfolio-backend-1azx.onrender.com/api/like', {
          method: 'POST',
        });
        localStorage.setItem('hasClickedHeart', 'true');
        fetchCount();
        heart.style.pointerEvents = 'none';
        heart.style.opacity = 0.6;
      } catch (error) {
        console.error('Failed to send like', error);
      }
    }
  });
  

const btnpopup = () => {
  const btn = document.getElementById('blogs');
  btn.classList.toggle('popup');
};

const resumepopup = () => {
  const btn = document.getElementById('rsmbtn');
  btn.classList.toggle('rsmpop');
};
document.addEventListener("DOMContentLoaded", () => {
  setInterval(resumepopup, 2000);
  setInterval(btnpopup, 2000);
});


const d = document.getElementById("date")
d.textContent = new Date().getFullYear();

const age = document.getElementById("age")
const birthDate = new Date(2000, 7, 15); // Month is 0-based (August = 7)
const today = new Date();

age.textContent = today.getFullYear() - birthDate.getFullYear();