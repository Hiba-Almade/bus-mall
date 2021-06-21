'use strict';

let imgArray = [
    'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg',
    'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
    'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
    'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg',
    'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'
];

let imgSection = document.getElementById('imgSection');
let firstImg = document.getElementById('img1');
let secondImg = document.getElementById('img2');
let lastImg = document.getElementById('img3');
let listSection = document.getElementById('listSection');

let count = 0;
let round = 25;

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function Images(name, path) {
    this.name = name;
    this.path = `./img/${path}`;
    this.time = 0;
    this.click = 0;
    Images.all.push(this);
}

Images.all = [];

for (let i = 0; i < imgArray.length; i++) {
    new Images(imgArray[i].split('.')[0], imgArray[i])
}

let firstIndex;
let secondIndex;
let lastIndex;
function render() {
    firstIndex = randomNumber(0, imgArray.length - 1);

    do {
        secondIndex = randomNumber(0, imgArray.length - 1);
    } while (firstIndex === secondIndex);
    do {
        lastIndex = randomNumber(0, imgArray.length - 1);
    } while (firstIndex === lastIndex || secondIndex === lastIndex);

    firstImg.src = Images.all[firstIndex].path;
    secondImg.src = Images.all[secondIndex].path;
    lastImg.src = Images.all[lastIndex].path;

    Images.all[firstIndex].time++;
    Images.all[secondIndex].time++;
    Images.all[lastIndex].time++;
}

function eventHandler(e) {
    // if((e.target.id === 'img1' || e.target.id === 'img2' || e.target.id === 'img3') && count < 25){
    //   render();
    //   console.log(count);
    //   count++;

    // }
    if (count < round) {
        if (e.target.id === 'img1') {
            Images.all[firstIndex].click++;
            render();
            //  console.log(count, Images.all[firstIndex].click, Images.all[firstIndex].time);
            count++;
        } else if (e.target.id === 'img2') {
            Images.all[secondIndex].click++;
            render();
            //   console.log(count, Images.all[secondIndex].click, Images.all[secondIndex].time);
            count++;
        } else if (e.target.id === 'img3') {
            Images.all[lastIndex].click++;
            render();
            //    console.log(count, Images.all[lastIndex].click, Images.all[lastIndex].time);
            count++;
        }
    } else {
        firstImg.src = 'https://cianaatech.com/wp-content/uploads/2021/03/placeholder.png';
        secondImg.src = 'https://cianaatech.com/wp-content/uploads/2021/03/placeholder.png';
        lastImg.src = 'https://cianaatech.com/wp-content/uploads/2021/03/placeholder.png';
        imgSection.removeEventListener('click', eventHandler);
        document.getElementById("resultButton").disabled = false;
    }
}

imgSection.addEventListener('click', eventHandler);

render();

// button 
let flag = true;
let list=document.getElementById('list');
function listRender() {

    if (flag == true) {
        for (let i = 0; i < Images.all.length; i++) {
            let itemList = document.createElement('li');
            list.appendChild(itemList);
            itemList.textContent = `${Images.all[i].name} had ${Images.all[i].click} votes, and was seen ${Images.all[i].time} times.`
        }
        flag=false;
    }
    else {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        flag = true;
        listRender();
    }
}
