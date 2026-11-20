const response = await fetch("./datas/data2026fall.json");

if (!response.ok) {
    throw new Error(`JSONの読み込みに失敗: ${response.status}`);
}

const data = await response.json();
const classRooms = Object.keys(data.classrooms);
const dataLength = classRooms.length; //配列のデータ数

const params = new URLSearchParams(window.location.search); //URLパラメータの取得
const dayOfWeek = params.get('dayOfWeek'); //dayOfWeekの値を取得
// const place = params.get('place'); //dayOfWeekの値を取得

const dayOfWeekText = document.getElementById('dayofweek-text');
const dayOfWeekArray = {
    Monday:"月曜日",
    Tuesday:"火曜日",
    Wednesday:"水曜日",
    Thursday:"木曜日",
    Friday:"金曜日",
    Saturday:"土曜日",
    Sunday:"日曜日"
}

const option = document.querySelectorAll('option');

function result(e){

    const tbody = document.getElementById('tbody');
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < dataLength; i++){
        const tr = document.createElement("tr");

        const tdClass = document.createElement("td"); //教室名
        tdClass.textContent = classRooms[i];
        tdClass.classList.add('classroom-name');
        tr.appendChild(tdClass);

        for(let j = 0; j < 7; j++){
            const tdFlag = document.createElement("td"); //n限目の空き状況
            if(data.classrooms[classRooms[i]].schedule[e][j] == 0){
                tdFlag.textContent = "空";
                tdFlag.classList.add('empty');
            } else {
                tdFlag.textContent = "満";
                tdFlag.classList.add('occupied');
            }
            tr.appendChild(tdFlag);
        }
        
        const tdSup = document.createElement("td"); //補足
        if(data.classrooms[classRooms[i]].hasOutlets){
            tdSup.textContent = "あり";
            tdSup.classList.add('has-socket');
        } else {
            tdSup.textContent = "なし";
            tdSup.classList.add('no-socket');
        }
        tr.appendChild(tdSup);
        fragment.appendChild(tr);
    }
    tbody.appendChild(fragment);
    
    option.forEach(option => {
        if (option.value == e) {
            option.selected = true;
        } else {
            option.selected = false; // 他のoptionのselectedを外す
        }
    });
}

if (dayOfWeek && dayOfWeekArray[dayOfWeek]) {
    result(dayOfWeek);
    dayOfWeekText.textContent = dayOfWeekArray[dayOfWeek];
}
// result("Monday"); //test用