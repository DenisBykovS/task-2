//создал массив для отображения ходов коня
let word = [
    'a8','b8','c8','d8','e8','f8','g8','h8',
    'a7','b7','c7','d7','e7','f7','g7','h7',
    'a6','b6','c6','d6','e6','f6','g6','h6',
    'a5','b5','c5','d5','e5','f5','g5','h5',
    'a4','b4','c4','d4','e4','f4','g4','h4',
    'a3','b3','c3','d3','e3','f3','g3','h3',
    'a2','b2','c2','d2','e2','f2','g2','h2',
    'a1','b1','c1','d1','e1','f1','g1','h1'
]
//получил доступ к полю где отображается шахматная доска
let field = document.getElementById('field');
//отрисовал шахматную доску и вставил эллементы из массива word в каждую клетку
function draw (){
    for(let i = 0; i < word.length; i++){
        let cell = document.createElement('div');
        field.appendChild(cell);
        cell.classList.add('excel');
        cell.setAttribute('id',word[i]);
    }
}
    draw();
//получил все клетки доски
    let excel = document.querySelectorAll('.excel');

    let x = 1;
    let y = 8;
//задал координаты каждой клетке по осям X Y
    for(let i = 0; i < excel.length; i++){
        if(x > 8){
            x = 1;
            y--;
        }
        excel[i].setAttribute('posx',x);
        excel[i].setAttribute('posy',y);
        x++;
        //раскрасил доску
        if((i % 2 == 0 && y % 2 == 0) || (i % 2 != 0 && y % 2 != 0)){
            excel[i].style.backgroundColor = 'black';
        } else {
            excel[i].style.backgroundColor = 'red';
        }
    }
//определяю позицию которую задали в поле input
    function position(pos){
        for(let i = 0; i < excel.length; i++){
            if(excel[i].getAttribute('id') == pos){
                let currentX = excel[i].getAttribute('posx');
                let currentY = excel[i].getAttribute('posy');
                nextStep(currentX,currentY)
            }
        }
    }
//определяю следуйщий возможные шаги коня и выважу их
    function nextStep (currentX,currentY){
        let vars = [
            document.querySelector(`.excel[posx="${+currentX+1}"][posy="${+currentY+2}"]`),
            document.querySelector(`.excel[posx="${+currentX+1}"][posy="${+currentY-2}"]`),
            document.querySelector(`.excel[posx="${+currentX+2}"][posy="${+currentY+1}"]`),
            document.querySelector(`.excel[posx="${+currentX+2}"][posy="${+currentY-1}"]`),
            document.querySelector(`.excel[posx="${+currentX-1}"][posy="${+currentY-2}"]`),
            document.querySelector(`.excel[posx="${+currentX-1}"][posy="${+currentY+2}"]`),
            document.querySelector(`.excel[posx="${+currentX-2}"][posy="${+currentY-1}"]`),
            document.querySelector(`.excel[posx="${+currentX-2}"][posy="${+currentY+1}"]`)
        ]

        let posFigure = [];

        for(let i = vars.length-1;i >= 0;i--){
            if(!vars[i]){
                vars.splice(i,1);
            }else{
                posFigure.push(vars[i].getAttribute('id'));
            }
        }

        let coordinate = '';

        for(let i = 0;i < posFigure.length;i++){
            let resultStep = document.querySelector('.result-step');
            coordinate +=  posFigure[i]+' ';
            resultStep.innerText =coordinate;
        }
    }

    nextStep();
//навесил обработчик события на кнопку результат
    let result = document.querySelector('.result');
    result.addEventListener('click', addition);

//считываю место положения коня из поля input
    function addition (){
        let step = document.querySelector('.step').value;
        position(step)
    }
//навесил обработчик события на кнопку OK
    let del = document.querySelector('.delete');
    del.addEventListener('click', delStep);
//функция для очистки поля ввода и вывода ходов коня
    function delStep (){
        let step = document.querySelector('.step').value = '';
        let resultStep = document.querySelector('.result-step').innerText = '';
    }