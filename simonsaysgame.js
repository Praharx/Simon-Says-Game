gameSeq = [];
userSeq = [];
highscore = [];

let colors = ['orange','teal','pink','blue'];

let start = false;
let level = 0;
let h3=document.querySelector('h3');
let h2=document.querySelector('h2');

document.addEventListener('keypress',function(){
    if (start == false){
        start =true;
    }

    levelUp();
})

function flashGame(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },650);
}

function flashUser(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },350);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randCol = colors[randIdx];
    let randbtn = document.querySelector(`.${randCol}`);
    
    gameSeq.push(randCol);

    
    flashGame(randbtn);
}

function checkAns(idx){
    if(userSeq[idx]=== gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h3.innerHTML = `Game Over!!! Your score was <b>${level}</b> <br>Press any key to restart.`
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },250);
        highscore.push(`${level}`);
        let score=0;
        for(let i=0;i<highscore.length;i++){
            if(highscore[i]>score){
                score=highscore[i];
            }
        }
        console.log(highscore);
        console.log(score);
        h2.innerText = `Your highScore is ${score}`;
        reset();
    }
}


function btnPress(){
    btn =this;
    flashUser(btn);

    userCol = this.getAttribute('id');
    userSeq.push(userCol);
    checkAns(userSeq.length-1);
}

btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener('click',btnPress)
}

function reset(){
    start=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}

