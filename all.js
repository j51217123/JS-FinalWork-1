const areaId = document.querySelector('.areaId');
const list = document.querySelector('.list');
const listTitle = document.querySelector('.list_title');
const areaButton = document.querySelectorAll('.btn');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let btnNum
let currentData = data;  // 利用 currentData 來判斷要使用 data 還是 zoneData (預設 data)
let currentPage = 1;

for (let i = 0; i < areaButton.length; i++) {
	areaButton[i].addEventListener('click', selectZone)
}
areaId.addEventListener('change', selectZone);

pagination(data); // 1
changePage(currentPage, data);  // default page

function pagination(allData) {
	const page = document.querySelector('.pagination');
	btnNum = Math.ceil(allData.length / 10); // 要分幾頁
	let str = '';
	for (let i = 0; i < btnNum; i++) {
		str += `<span class='dataPage' data-index=${i + 1}>${i + 1}</span>`
	}
	page.innerHTML = str;
	const btn = document.querySelectorAll('.pagination span');
	for (let i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click', function (e) {
			changePage(e, allData)
		})
	}
}

function changePaginationTextColor() {
	const dataSetElement = (document.querySelectorAll(`[data-index="${currentPage}"]`))[0]; // 抓取目前所選擇的頁面
	dataSetElement.setAttribute('class', 'dataSetElement');
	const select_DataSetElement = (document.querySelectorAll(`[data-index]`)); // 抓取目前所選擇的頁面
	for (i = 0; i < select_DataSetElement.length; i++) {
		if (currentPage !== parseInt(select_DataSetElement[i].innerText)) {
			select_DataSetElement[i].removeAttribute('class')
		}
	}
}

prev.addEventListener('click', function prev() {
	if (currentPage == 1) return
	let prevPage = currentPage - 1;
	changePage(prevPage, currentData);
})

next.addEventListener('click', function next() {
	if (currentPage == btnNum) return
	let nextPage = currentPage + 1;
	changePage(nextPage, currentData);
})

function changePage(e, data) { // function
	currentPage = (typeof (e) === 'number') ? e : +(e.target.dataset.index);
	const items = 10; // 一頁多少物件
	const pageIndexStart = (currentPage - 1) * items;
	const pageIndexEnd = currentPage * items;
	let str = '';
	for (let i = pageIndexStart; i < pageIndexEnd; i++) {
		if (i >= data.length) { break };
		str += `<li class="card">
								<div class="card_imagebox">
									<h1 class="card_title">${data[i].Name}</h1>							
									<div class="card_image" style="background-image:url(${data[i].Picture1})"></div>
								</div>
								<div class="card_info">
									<p>
									<i class="fas fa-clock"></i>
									${data[i].Opentime}
									</p>
									<p>
									<i class="fas fa-map-marker-alt"></i>
									${data[i].Add}
									</p>
									<div class="card_info_telgroup">
										<p>
										<i class="fas fa-mobile-alt" style="margin-right: 3px"></i>
										${data[i].Tel}
										</p>
										<p>
										<i class="fas fa-tag"></i>
										${data[i].Ticketinfo}
										</p>
									</div>
								</div>
							</li>`
	};
	list.innerHTML = str;
	pagination(data);
	changePaginationTextColor()
}

function selectZone(e) {
	zoneData = [];
	zoneData.length = 0;
	currentPage = 1;
	if (e.target.value !== '--請選擇行政區--') {
		for (let i = 0; i < data.length; i++) {
			if (e.target.value == data[i].Zone) {
				zoneData.push(data[i]);
			}
		}
		pagination(currentData); // 依照 zoneData 資料重新渲染按鈕數
		changePage(currentPage, zoneData);
		currentData = zoneData; //  帶入 prev & next function 41、47行
	} else {
		changePage(1, data)
	}
}
