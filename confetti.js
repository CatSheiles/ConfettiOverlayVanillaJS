const startbtn = document.querySelector('.button');
const canvas = document.querySelector('.confetti');
const ctx = canvas.getContext("2d");                        // define draw ctx(context) with getContext method

let confetties = [];                                        // making more than 1 confetti

let confetti;

let colors = ["#F4C430", "#F400A1", "#F4BBFF", "#F25022"];  // saffron,hollywoodCerise,electricLavender,orangeRed

class Confetti {
    constructor(x, y, width, height, color) {               // building a confetti piece
        this.x = x;
        this.y = y;                                         // remember y value is vertical so will move confetti down
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

function draw() {                                           // draw function - what happens every time a confetti is drawn and moves
    ctx.canvas.width  = window.innerWidth;                  // inner width/height sets canvas to whatever screen size is - overwriting html 500x500 test size
    ctx.canvas.height = window.innerHeight;

                                                            // first section here is the first piece of confetti - doesn't need to stay but keeping to show how you get from 1piece to 200.
    ctx.clearRect(0, 0, canvas.width, canvas.height);       // clears whole canvas every time before redraw so that confettis become a single piece instead of 1 long smear:)
    confetti.y+= 1.8;                                       // moving 1 confetti down 1 place
    ctx.fillStyle = confetti.color;                         // now recall color
    ctx.fillRect(confetti.x, confetti.y, confetti.width, confetti.height);   // and recall a confetti piece

    confetties.forEach(piece => {
        piece.y+= 1.8;                                      // drawing all 200 pieces of confetti and moving them down-piece.y
                                                            // +=1.8 is speed of confetti - can easily increase/decrease
        ctx.fillStyle = piece.color;
        ctx.fillRect(piece.x, piece.y, piece.width, piece.height);
    });

    window.requestAnimationFrame(draw);                     // continues to call draw indefinately
}

startbtn.addEventListener('click', () => {
    console.log('click');
    startbtn.classList.toggle('active')

                                                            // 1st single confetti draw - so that it starts drawing when startbtn clicked,
                                                            //   it keeps looping so this 1st confetti will appear each button click
    confetti = new Confetti (250, 200, 4, 16, "#F9429E");   // draw 1stLead confetti in roseBonbonColor 4&16 are width/height of 1st lead confetti

    ctx.fillStyle = confetti.color;                         // setting property for confetti
    ctx.fillRect(confetti.x, confetti.y, confetti.width, confetti.height); // filling rectangle with confetti object value

    for (let i = 0; i < 200; i++) {
        confetties.push(new Confetti(
            Math.random() * canvas.width, 
            (Math.random() * canvas.height) - canvas.height,  // brackets in this math determine broken up pieces of confetti if brackets not included you get 1 big blurb across canvas of confetti at position zero
            4, 16,                                            // instead of x,y,width,height, randomMath gives random amount of confetti - 4&16 are width/height of 200 confetti - can increase/decrease sizes
            colors[Math.floor(Math.random() * colors.length)] // randomly selects a color from color array at top of js
            ));                                             
    }
   
    window.requestAnimationFrame(draw);                 // call the inbuilt windows function - requestAnimationFrame to begin moving confetti
})

ctx.canvas.width  = window.innerWidth;                  // calling width&height a second time as original call is when start button click & this is when page loads
ctx.canvas.height = window.innerHeight;
