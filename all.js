var areaId = document.querySelector('.areaId');
var list = document.querySelector('.list');
var list_title = document.querySelector('.list_title');
var btn = document.querySelectorAll('.btn');

areaId.addEventListener('change', areaList, false);

for (i = 0; i < btn.length; i++) {
	btn[i].addEventListener('click', areaList, false);
}

function areaList(e) {
	var select = e.target.value;
	var str = '';
	var Zone = '';
	for (i = 0; i < data.length; i++) {
		if (select == data[i].Zone) {
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
			Zone = `<h2>${data[i].Zone}</h2>`;
		}
		else if (select == '--請選擇行政區--') {
			str = `<p class="area_select">--請選擇行政區--</p>`;
		}
	}
	list.innerHTML = str;
	list_title.innerHTML = Zone;
}