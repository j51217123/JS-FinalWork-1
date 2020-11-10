const areaId = document.querySelector('.areaId');
const list = document.querySelector('.list');
const listTitle = document.querySelector('.list_title');
const areaButton = document.querySelectorAll('.btn');


for (let i = 0; i < areaButton.length; i++) {
	areaButton[i].addEventListener('click', selectZone)
}

function pagination(allData) {
	const page = document.querySelector('.pagination');
	let btnNum = Math.ceil(allData.length / 10); // 要分幾頁
	let str = '';
	for (let i = 0; i < btnNum; i++) {
		str += `<span class='dataPage' data-index=${i + 1}>${i + 1}</span>`
	}
	page.innerHTML = str;
	const btn = document.querySelectorAll('.pagination span');
	for (let i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click', function (e) {
			console.log(e)
			changePage(e, allData)
		})
	}
}
changePage(1, data);  // default page
pagination(data);


function changePage(e, data) {
	let index = (typeof (e) === 'number') ? e : +(e.target.dataset.index)
	// console.log(index)
	const items = 10; // 一頁多少物件
	const pageIndexStart = (index - 1) * items;
	const pageIndexEnd = index * items;
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
	pagination(data)  // 再次更新按鈕列表


	const prev = document.querySelector('.prev');
	prev.addEventListener('click', function (data) {
		var prevPage = function test(data) {
			for (var i = 0; i < data.length; i++) {
				if (index != 0) {
					var delData = data[i].splice(0, `${(index * 10) - 10} `)
					console.log(delData)
				}
			}
			list.innerHTML = delData;
		}
		list.innerHTML = prevPage;
		console.log(prevPage, 'prevPage')
	})
}



areaId.addEventListener('change', selectZone);

const zoneData = [];

function selectZone(e) {
	zoneData.length = 0;
	if (e.target.value !== '--請選擇行政區--') {
		for (let i = 0; i < data.length; i++) {
			if (e.target.value == data[i].Zone) {
				zoneData.push(data[i]);
			}
		}
		changePage(1, zoneData); // default page
	}
	else {
		changePage(1, data)
	}
}



