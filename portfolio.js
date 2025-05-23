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

      // 1. All fields required
      if (!name || !mail || !contact || !message) {
        alert("⚠️ Please fill in all the fields.");
        return;
      }

      // 2. Name validation: at least 4 characters, only letters and spaces
      const nameRegex = /^[A-Za-z\s]{4,}$/;
      if (!nameRegex.test(name)) {
        alert("🧑 Name must be at least 4 characters and contain only letters and spaces.");
        return;
      }

      // 3. mail format validation
      const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!mailRegex.test(mail)) {
        alert("📧 Please enter a valid mail address.");
        return;
      }

      // 4. contact number validation: 10 digits only
      if (!/^\d{10}$/.test(contact)) {
        alert("📞 Please enter a valid 10-digit contact number.");
        return;
      }

             // Creating  message box with css
             const messageBox = document.createElement("p");
             messageBox.textContent = "Submitting...";
             messageBox.style.marginTop = "10px";
             messageBox.style.padding = "10px";
             messageBox.style.backgroundColor = "wheat";
             messageBox.style.color = "green";
             messageBox.style.border = "1px solid #ccc";
             messageBox.style.borderRadius="6px";

             // Appending to body (or below the form)
             this.parentNode.insertBefore(messageBox, this.nextSibling);

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
             messageBox.textContent = "done!";
             messageBox.style.marginTop = "10px";
             messageBox.style.padding = "10px";
             messageBox.style.backgroundColor = "#fff";
             messageBox.style.color = "blue";
             form.reset();
             setTimeout(()=>{
              messageBox.remove();
             },2000)
        } else {
          messageBox.remove();
          alert("❌ Submission failed: " + result.error);
        }
      } catch (error) {
        messageBox.remove();
        alert("❌ Submission failed: an error encountered");
      }
    });
  });

