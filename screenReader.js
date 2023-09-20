let msg = new SpeechSynthesisUtterance();
let voices = speechSynthesis.getVoices();
msg.voice = voices[0];
let tags = document.querySelectorAll('p'); // add more tags for you project
let buttons = document.querySelectorAll('button');

// tags.forEach((tag) => {
//     tag.addEventListener('click', (e) => {
        
//         msg.text = e.target.innerText;
//         tag.style.backgroundColor = "MediumSpringGreen";
//         speechSynthesis.speak(msg);
        
//         let interval = setInterval(() => {
//             if(!speechSynthesis.speaking){
//                 tag.style.removeProperty('background-color');
//                 clearInterval(interval);
//             }
//         }, 100);
        
//     });
// });

buttons.forEach((b) => {
  b.addEventListener('click', (e) => {
    console.log(b);
    let t = b.parentElement.querySelectorAll('p');
    for (let i = 0; i < t.length; i++) {
      console.log(t[i].innerText);
      msg.text = t[i].innerText;
      t[i].style.backgroundColor = "MediumSpringGreen";
      speechSynthesis.speak(msg);
      
      let interval = setInterval(() => {
          if(!speechSynthesis.speaking){
              t[i].style.removeProperty('background-color');
              clearInterval(interval);
          }
      }, 200);
    }
  });
});