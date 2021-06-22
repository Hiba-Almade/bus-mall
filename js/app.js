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
let firstIndex;
let secondIndex;
let lastIndex;
let prefFirst = -1;
let prefSecond = -1;
let prefLast = -1;


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
    let newObj = new Images(imgArray[i].split('.')[0], imgArray[i])
}

//console.log('first' , Images.all)

function getData() {
    let data = JSON.parse(localStorage.getItem('imgLs'));
    if (data) {
        Images.all = data;

    }
}

getData();
// console.log('after git', Images.all);



function render() {
    do {
        firstIndex = randomNumber(0, imgArray.length - 1);
    } while (firstIndex === prefFirst || firstIndex === prefSecond || firstIndex === prefLast);


    do {
        secondIndex = randomNumber(0, imgArray.length - 1);
    } while (firstIndex === secondIndex || secondIndex === prefFirst || secondIndex === prefSecond || secondIndex === prefLast);

    do {
        lastIndex = randomNumber(0, imgArray.length - 1);
    } while (firstIndex === lastIndex || secondIndex === lastIndex || lastIndex === prefFirst || lastIndex === prefSecond || lastIndex === prefLast);
    prefLast = lastIndex;
    prefFirst = firstIndex;
    prefSecond = secondIndex;

    //console.log(firstIndex, secondIndex, lastIndex);
    // console.log("last" , prefFirst , prefSecond , prefLast);

    firstImg.src = Images.all[firstIndex].path;
    secondImg.src = Images.all[secondIndex].path;
    lastImg.src = Images.all[lastIndex].path;

    Images.all[firstIndex].time++;
    Images.all[secondIndex].time++;
    Images.all[lastIndex].time++;
}

//console.log('afer time', Images.all);

function eventHandler(e) {

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
        drawChart();
    }
    localStorage.setItem('imgLs', JSON.stringify(Images.all));
}

imgSection.addEventListener('click', eventHandler);

render();



// button 
let flag = true;
let list = document.getElementById('list');
function listRender() {

    if (flag == true) {
        for (let i = 0; i < Images.all.length; i++) {
            let itemList = document.createElement('li');
            list.appendChild(itemList);
            itemList.textContent = `${Images.all[i].name} had ${Images.all[i].click} votes, and was seen ${Images.all[i].time} times.`
        }
        flag = false;
    }
    else {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        flag = true;
        listRender();
    }
}

function drawChart() {

    let name = [];
    let time = [];
    let click = [];

    for (let i = 0; i < Images.all.length; i++) {
        name.push(Images.all[i].name);
        time.push(Images.all[i].time);
        click.push(Images.all[i].click);
    }

    let ctx = document.getElementById('myChart').getContext('2d');

    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: name,
            datasets: [{
                label: '# of views',
                data: time,
                backgroundColor: 'rgba(147, 0, 207, 1)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            }, {
                label: '# of clicks',
                data: click,
                backgroundColor: 'rgba(0, 46, 255, 0.5)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}


// function clear() {
//     localStorage.clear();
// }
