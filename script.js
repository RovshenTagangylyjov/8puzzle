// 01.28.2021
// It's my first js project. I've learned a lot of things from it,
// but i'm too lazy to optimeze the code)
// If you are reading this just play the game)))
document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const page3 = document.querySelector('.page3');
    const btn1 = document.querySelector('#start-btn');
    const btn2 = document.querySelector('#select-btn');
    const animationBar=document.querySelector('.animation-bar').children;
    const puzzle_pieces = document.querySelector('.puzzle').children; 
    const shuffleBtn = document.querySelector('#shuffle-btn');
    const selected = document.querySelector('#shuffle');
    const pics = document.querySelectorAll('.pic');
    const congrats = document.querySelector('#won');

    let k = 3;
    changeText = () => {
        animationBar[(k - 1) % 3].classList.remove('current-text');
        animationBar[k % 3].classList.add('current-text');
        k++;
    }
    setInterval(changeText, 2000);
    
    toSecond = () =>{
        page1.classList.remove('current-page');
        setTimeout(() => {
            page2.classList.add('current-page');
        }, 350);
    }
    
    var img;
    pics.forEach(x => x.addEventListener('click', () => {
        pics.forEach(y => {
            y.style.boxShadow = '';
            y.classList.remove('selected');
        })
        x.style.boxShadow = '0 0 7px 7px rgba(0, 0, 0, 0.4)';
        x.classList.add('selected');
        document.getElementById('select-btn').style.opacity = 1;
        for(var i=0; i<3; i++){
            if(pics[i].classList.contains('selected')){
                var l = i;
                switch(l){
                    case 0: 
                        img = "url('images/pic1.jpg')";
                        break;
                    case 1: 
                        img = "url('images/pic3.jpg')";
                        break;
                    case 2: 
                        img = "url('images/pic2.jpg')";
                        break;
                }
            }
        }
    }))
    
    toThird = () =>{
        page2.classList.remove('current-page');
        
        setTimeout(() => {
            page3.classList.add('current-page');
        }, 300);
        
        for(let i=1; i<9; i++)
        puzzle_pieces[i].style.backgroundImage = img;
        selected.addEventListener('click', () => {
            
            var myPromise = new Promise((myResolve) => {
                if(selected.value != 0) myResolve();
            })
            
            myPromise.then(() => {
                shuffleBtn.classList.remove('btn-disabled');
            });

        })
        shuffleBtn.addEventListener('click', shuffle);
    }
    
    btn1.addEventListener('click',toSecond);
    btn2.addEventListener('click',toThird);

    resetBorders = () =>{
        for(let i=1; i<9; i++){
            if(puzzle_pieces[i].classList.contains(puzzle_pieces[i].id))
                puzzle_pieces[i].style.border = '.3em solid green';
            else{
                puzzle_pieces[i].style.border = '.3em solid red';
            }
        }
    }
    
    move = (e) => {
        let pos = e.target.getBoundingClientRect();
        let tile = document.getElementById('a0').clientHeight;
        let emptyPos = document.getElementById('a0').getBoundingClientRect();
        let empty = document.getElementById('a0');
        if(((Math.abs(pos.top-emptyPos.top)-tile<tile) && (pos.left==emptyPos.left)) || ((Math.abs(pos.left-emptyPos.left)-tile<tile) && (pos.top==emptyPos.top))){
            let tempClass =  e.target.className;
            e.target.classList = empty.classList;
            empty.classList = tempClass;
            resetBorders();
        }
    }
    
    candidate = () =>{
        let emptyPos = document.getElementById('a0').getBoundingClientRect();
        let tile = document.getElementById('a0').clientHeight;
        for(let i=1; i<9; i++){
            let pos = puzzle_pieces[i].getBoundingClientRect();
            if(((Math.abs(pos.top-emptyPos.top)-tile<tile) && (pos.left==emptyPos.left)) || ((Math.abs(pos.left-emptyPos.left)-tile<tile) && (pos.top==emptyPos.top))){
                puzzle_pieces[i].firstChild.classList.add('candidate');
            }else{
                puzzle_pieces[i].firstChild.classList.remove('candidate');
            }
        }
    }
    
    onHover = () => {
        for(let i=1; i<9; i++){
            if(puzzle_pieces[i].firstChild.classList.contains('candidate')){
                puzzle_pieces[i].firstChild.classList.remove('onHover');
            }else{
                puzzle_pieces[i].firstChild.classList.add('onHover');
            }
        }
    }
    
    offHover = () => {
        for(let i=1;i<9;i++){
            puzzle_pieces[i].firstChild.classList.remove('onHover');
        }
    }
    
    let focus, ifWon;
    shuffle = () => {
        console.log('113131313');
        selected.style.display = 'none';
        shuffleBtn.style.display = 'none';
        document.getElementById('h1').style.display = 'none';
        let n = selected.value;
        var speed;
        switch(n){
            case '3':
                speed=500;
                break;
            case '30':
                speed=200;
                break;
            case '50':
                speed=100;
                break;
        }

        for(let i=1;i<9;i++){
            puzzle_pieces[i].style.transitionDuration = speed+'ms';
        }

        let k = 0;
        let prev = 0;
        
        while (k < n){
            setTimeout(() => {
                let tile = document.getElementById('a0').clientHeight;
                let emptyPos = document.getElementById('a0').getBoundingClientRect();
                let empty = document.getElementById('a0');
                let b = false;
                let pos;
                let randNum;
                
                while (!b){
                    randNum = Math.floor(Math.random() * 8) + 1;
                    if(prev==puzzle_pieces[randNum].id)continue;
                    pos = puzzle_pieces[randNum].getBoundingClientRect();
                    if(((Math.abs(pos.top-emptyPos.top) - tile < tile) && (pos.left == emptyPos.left)) || 
                    ((Math.abs(pos.left - emptyPos.left) - tile < tile) && (pos.top == emptyPos.top))){
                        b = true;
                    }    
                }

                curr = puzzle_pieces[randNum];
                let tempClass =  curr.className;
                curr.classList = empty.classList;
                empty.classList = tempClass;
                resetBorders();
                prev = curr.id;
            }, k * speed);
            k++;
        }

        setTimeout(() => {
            document.querySelector('#h2').style.display = 'block';
            document.querySelector('#h3').style.display = 'block';
            for(let i=1; i<9; i++){
                puzzle_pieces[i].style.transitionDuration = 500 + 'ms';
                puzzle_pieces[i].addEventListener("click",move);
            }
            focus = setInterval(candidate, 1);
            document.querySelector('.puzzle').addEventListener('mouseover', onHover);
            document.querySelector('.puzzle').addEventListener('mouseout', offHover);
            ifWon = setInterval(checkIfWon, 10);
        }, n * speed);

    }
    
    checkIfWon = () => {
        let b = true;
        for(let i = 0; i<9; i++){
            if(puzzle_pieces[i].id!=puzzle_pieces[i].className){
                b = false;
            }
        }
        if (b){
            won()
        };
    }
    
    won = () => {
        clearInterval(ifWon);
        ifWon = null;
        document.querySelector('#h2').style.display = 'none';
        document.querySelector('#h3').style.display = 'none';
        congrats.classList.remove('unvisible');
        congrats.classList.add('won');
        setTimeout(() => {
            congrats.classList.add('end');
        }, 100);
        window.onkeydown = (e) => {
            if(e.keyCode == '116'){
                reloadPuzzle_pieces();
            }
            e.preventDefault();
        }
    }
    
    reloadPuzzle_pieces = () =>{
        selected.style.display = 'block';
        shuffleBtn.style.display = 'block';
        document.querySelector('#h2').style.display= 'none';
        document.querySelector('#h3').style.display= 'none';
        document.querySelector('#h1').style.display= 'block';
        congrats.classList.add('unvisible');
        congrats.classList.remove('won');
        congrats.classList.remove('end');
        clearInterval(focus);
        
        for(let i=1;i<9;i++){
            puzzle_pieces[i].style.transitionDuration = 0;
            puzzle_pieces[i].firstChild.classList.add('candidate');
            puzzle_pieces[i].removeEventListener("click",move);
        } 
        
        window.onkeydown = (e) => {
            if(e.keyCode == '116') document.location.reload(true);
            e.preventDefault();
        }
    }
    
})