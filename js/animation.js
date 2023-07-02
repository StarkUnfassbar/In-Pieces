setTimeout(function(){
    document.querySelector('.block_initial').classList.remove("_active");
    document.querySelector('.block_welcome').classList.add("_active");
}, 3000);

let section0 = document.querySelector('#section-0');
let section1 = document.querySelector('#section-1');
let section2 = document.querySelector('#section-2');
let section3 = document.querySelector('#section-3');
let section4 = document.querySelector('#section-4');
let section5 = document.querySelector('#section-5');

let buttonWelcome = document.querySelector('#buttonWelcome');

let arrows = document.querySelectorAll('#popupButton');
let swap = document.querySelector('.swap_1');
let idSwap = 1;

let buttons = document.querySelectorAll('#popupCircle');
let intervalId = null;
let oldButton = null;
let isSwapping = false;

let buttonsExit = document.querySelectorAll('#popupExit');
let buttonsAll = document.querySelectorAll('#popupButtonAll');
let buttonExitName = document.querySelector('#input-name');
let buttonsSwap = document.querySelectorAll('#buttonSwap');

let blocksImg = section1.querySelectorAll('.block_image');
let blocksText = section1.querySelectorAll('.block_text');
let blocksRight = section1.querySelectorAll('.block_buttons_right');
let blocksLeft = section1.querySelectorAll('.block_buttons_left');
let blocksLink = document.querySelectorAll('.section1 .block_link, .section5 .block_link');
let sectionNubmer1 = true;

let buttonsLink = document.querySelectorAll('#popupButtonLinks');
let buttonsExitLink = document.querySelectorAll('#popupExitLinks');
let hrefsImage = document.querySelectorAll('#hrefImage');
let imageElement = document.querySelector('#wallpaper');
let idInfo;
let isRemoveInfo;

let buttonsCircle = document.querySelectorAll('#popupButtonCircle');
let buttonsCircleStatistic = document.querySelectorAll('#popupStatistics');
let buttonsCircleExit = document.querySelectorAll('#popupCircleExit');
let buttonsStatistic = section4.querySelectorAll('.statistic');
let buttonsStatisticExit = section4.querySelectorAll('#statisticButtonExit');
let blocksInformation = section4.querySelectorAll('.block_info');
let blockInformation;
let blockStatistic;
let blockMain;
let blockChart;
let blockChartActive;

let blockVideo = section4.querySelector("#blockVideo");
let video = section4.querySelector("#video");
let blocksVideoOpen = section4.querySelectorAll('#popupVideoOpen');
let blocksVideoClose = section4.querySelectorAll('#buttonVideoClose');

let buttonsLinkPhone = section1.querySelectorAll('.block_link_phone');
let buttonsLinkPhoneExit = section5.querySelectorAll('#popupExitLinks');

const linkButtons = document.querySelectorAll('#popupLinkButton');

const melody = document.querySelector('#melody');
melody.volume = 0.3;

buttonWelcome.addEventListener('click', () => {
  section0.classList.add('_hidden');
  melody.play();

  setTimeout(function(){
    section1.classList.remove('none');
  }, 50);
  setTimeout(function(){
    section1.classList.add('_active');
    section0.classList.add('none');
  }, 900);
  setTimeout(function(){
    changeTransition();
  }, 2500);
});

arrows.forEach((arrow) => {
  buttonHoverEffect(arrow);

  arrow.addEventListener('click', () => {
    if (arrow.classList.contains('button_arrow_up')) {
      swap.classList.remove('_active');

      if (idSwap == 1) {
        idSwap = 30;
      } else {
        idSwap--;
      }

      swap = document.querySelector('.swap_' + idSwap);
      swap.classList.add('_active');
    } else if (arrow.classList.contains('button_arrow_down')){
      swap.classList.remove('_active'); 

      if (idSwap == 30) {
        idSwap = 1;
      } else {
        idSwap++;
      }

      swap = document.querySelector('.swap_' + idSwap);
      swap.classList.add('_active');
    }

    const activeIndex = parseInt(swap.id.replace('swap_', ''));
    const swaps = document.querySelectorAll('.swap');
    
    for (let i = 0; i < swaps.length; i++) {
      const index = parseInt(swaps[i].id.replace('swap_', ''));
      
      if (index == activeIndex || index == activeIndex - 1 || index == activeIndex + 1 || (activeIndex == 1 && index == 30) || (activeIndex == 30 && index == 1)) {
        swaps[i].classList.remove('none');
      } else {
        swaps[i].classList.add('none');
      }
    }

    const bgColor = window.getComputedStyle(swap).getPropertyValue('background-color');
    document.documentElement.style.setProperty('--main-bg-color', bgColor);

    cycleThroughExit();
  });
});

buttons.forEach((button) => {
  buttonHoverEffect(button);

  button.addEventListener('click', () => {
    if (isSwapping) {
      clearInterval(intervalId);
      intervalId = null;
      isSwapping = false;
      buttons.forEach(btn => { 
        btn.classList.remove('button_arrow_stop'); 
        btn.querySelector('h1').textContent = 'Циклический просмотр'; 
      });
    } else {
      isSwapping = true;
      handleButtonClick();
      intervalId = setInterval(handleButtonClick, 3000);
      buttons.forEach(btn => { 
        btn.classList.add('button_arrow_stop') 
        btn.querySelector('h1').textContent = 'Стоп'; 
      });
    }
  });
});


buttonsExit.forEach((buttonExit) => {
  buttonHoverEffect(buttonExit);

  buttonExit.addEventListener('click', () => {
    section1.classList.remove('none');
    section2.classList.remove('_active');
    setTimeout(function () {
      section1.classList.add('_active');
      section2.classList.add('none');
      section1.classList.remove('_expansion');
      const bgColor = window.getComputedStyle(swap).getPropertyValue('background-color');
      document.documentElement.style.setProperty('--main-bg-color', bgColor);
    }, 300);

    buttonExitName.innerHTML = "";
  });
});

buttonsAll.forEach((buttonAll) => {
  buttonHoverEffect(buttonAll);

  buttonAll.addEventListener('click', () => {
    // section1.classList.remove('_active');
    section1.classList.add('_expansion');
    section2.classList.remove('none');
    setTimeout(function () {
      section1.classList.add('none');
      section2.classList.add('_active');
      document.documentElement.style.setProperty('--main-bg-color', '#181818');
    }, 300);

    setHrefName(buttonExitName);

    cycleThroughExit();
  });
});

buttonsSwap.forEach((buttonSwap) => {
  buttonSwap.addEventListener('click', () => {
    idSwap = parseInt(buttonSwap.getAttribute("data-number"));

    swap.classList.remove('_active');
    swap = document.querySelector('.swap_' + idSwap);
    swap.classList.add('_active');
    const activeIndex = parseInt(swap.id.replace('swap_', ''));
    const swaps = document.querySelectorAll('.swap');
    
    for (let i = 0; i < swaps.length; i++) {
      const index = parseInt(swaps[i].id.replace('swap_', ''));
      
      if (index == activeIndex || index == activeIndex - 1 || index == activeIndex + 1 || (activeIndex == 1 && index == 30) || (activeIndex == 30 && index == 1)) {
        swaps[i].classList.remove('none');
      } else {
        swaps[i].classList.add('none');
      }
    }

    section1.classList.remove('none');
    section2.classList.remove('_active');
    setTimeout(function () {
      section1.classList.add('_active');
      section2.classList.add('none');
      section1.classList.remove('_expansion');

      const bgColor = window.getComputedStyle(swap).getPropertyValue('background-color');
      document.documentElement.style.setProperty('--main-bg-color', bgColor);
    }, 300);

    buttonExitName.innerHTML = "";
  });
});


buttonsCircle.forEach((buttonCircle) => {
  buttonCircle.addEventListener('click', () => {
    blockInformation = blocksInformation[idSwap - 1];
    blockStatistic = blockInformation.querySelector('.block_info_statistic');
    blockMain = blockInformation.querySelector('.block_info_main');

    const StatisticLinks = blockStatistic.querySelectorAll('.line_link');
    const StatisticLinkActive = blockStatistic.querySelector('.line_link._active');
    linkStatistic(StatisticLinks, StatisticLinkActive);

    blockInformation.classList.remove('none');
    blockMain.classList.remove('none');
    blockMain.classList.add('_active');

    section4.classList.remove('none');
    section1.classList.add('_expansion');
    setTimeout(function () {
      section1.classList.add('none');
      section4.classList.add('_active');
      document.documentElement.style.setProperty('--main-bg-color', '#262626');
    }, 300);

    cycleThroughExit();
  });
});

buttonsCircleStatistic.forEach((buttonCircleStatistic) => {
  buttonCircleStatistic.addEventListener('click', () => {
    blockInformation = blocksInformation[idSwap - 1];
    blockStatistic = blockInformation.querySelector('.block_info_statistic');
    blockMain = blockInformation.querySelector('.block_info_main');

    const StatisticLinks = blockStatistic.querySelectorAll('.line_link');
    const StatisticLinkActive = blockStatistic.querySelector('.line_link._active');
    linkStatistic(StatisticLinks, StatisticLinkActive);

    blockInformation.classList.remove('none');
    blockStatistic.classList.remove('none');

    section4.classList.remove('none');
    section1.classList.add('_expansion');
    setTimeout(function () {
      section1.classList.add('none');
      section4.classList.add('_active');
      blockStatistic.classList.add('_active');
      document.documentElement.style.setProperty('--main-bg-color', '#262626');
    }, 300);

    cycleThroughExit();
  });
});

buttonsCircleExit.forEach((buttonCircleExit) => {
  buttonCircleExit.addEventListener('click', () => {
    blockInformation.classList.add('none');
    blockMain.classList.remove('_active');
    blockMain.classList.add('none');

    section1.classList.remove('none');
    section4.classList.remove('_active');
    setTimeout(function () {
      section1.classList.add('_active');
      section4.classList.add('none');
      section1.classList.remove('_expansion');
      const bgColor = window.getComputedStyle(swap).getPropertyValue('background-color');
      document.documentElement.style.setProperty('--main-bg-color', bgColor);
    }, 300);
  });
});

buttonsStatistic.forEach((buttonStatistic) => {
  buttonStatistic.addEventListener('click', () => {
    blockStatistic.classList.remove("none");
    setTimeout(function () {
      blockStatistic.classList.add("_active");
      blockMain.classList.remove("_active");
      blockMain.classList.add("none");
    }, 50);
  });
});

buttonsStatisticExit.forEach((buttonStatisticExit) => {
  buttonHoverEffect(buttonStatisticExit);
  buttonStatisticExit.addEventListener('click', () => {
    blockMain.classList.remove("none");
    setTimeout(function () {
      blockMain.classList.add("_active");
      blockStatistic.classList.remove("_active");
      blockStatistic.classList.add("none");
    }, 50);
  });
});


buttonsLink.forEach((buttonLink) => {
  buttonLink.addEventListener('click', () => {
    section3.classList.remove('none');
    setTimeout(function(){
      section3.classList.add('_active');

      idInfo = buttonLink.dataset.id;
      isRemoveInfo = true;
      blockInfo();

      setTimeout(function(){
        if (idInfo == 1) {
          setImageSrc();

          const buttonInfoName = section3.querySelector('.block_info_name');
          setHrefName(buttonInfoName);
        };
          
        const buttonInfo = section3.querySelector(`.block_info_${idInfo}`);
        buttonInfo.classList.add("_active");
      }, 50);
    }, 50);
    setTimeout(function(){
      if(!sectionNubmer1){
        section5.classList.add('none');
      }
    }, 500);

    cycleThroughExit();
  });
});

buttonsExitLink.forEach((buttonExitLink) => {
  buttonExitLink.addEventListener('click', () => {
    if(!sectionNubmer1){
      section5.classList.remove('none');
    }
    setTimeout(function(){
      section3.classList.remove('_active');

      isRemoveInfo = false;
      blockInfo();

    }, 50);
    setTimeout(function(){
      section3.classList.add('none');
      const buttonInfo = section3.querySelector(`.block_info_${idInfo}`);
      buttonInfo.classList.remove("_active");
    }, 500);
  });
});

hrefsImage.forEach((hrefImage) => {
  hrefImage.addEventListener('click', (event) => {
    event.preventDefault();
    const imageUrl = hrefImage.dataset.img;
    fetch(imageUrl)
      .then(response => response.blob())
      .then(imageBlob => {
        const downloadUrl = URL.createObjectURL(imageBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = hrefImage.dataset.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  });
});


blocksVideoOpen.forEach((blockVideoOpen) => {
  blockVideoOpen.addEventListener('click', () => {
    setHrefVideo();
    blockVideo.classList.remove("none");
    setTimeout(function(){
      blockVideo.classList.add("_active");
      melody.pause();
      section4.scrollTop = 0;
      section4.style.overflow = "hidden";
    }, 100);
  });
});

blocksVideoClose.forEach((blockVideoClose) => {
  blockVideoClose.addEventListener('click', () => {
    blockVideo.classList.remove("_active");
    setTimeout(function(){
      blockVideo.classList.add("none");
      video.src = '';
      melody.play();
      section4.style.cssText = "";
    }, 300);
  });
});


buttonsLinkPhone.forEach((buttonLinkPhone) => {
  buttonLinkPhone.addEventListener('click', () => {
    sectionNubmer1 = false;
    section5.classList.remove('none');
    setTimeout(function(){
      section5.classList.add('_active');
    }, 50);
    setTimeout(function(){
      section1.classList.add('none');
    }, 500);

    cycleThroughExit();
  });
});

buttonsLinkPhoneExit.forEach((buttonLinkPhoneExit) => {
  buttonLinkPhoneExit.addEventListener('click', () => {
    sectionNubmer1 = true;
    section1.classList.remove('none');
    setTimeout(function(){
      section5.classList.remove('_active');
    }, 50);
    setTimeout(function(){
      section5.classList.add('none');
    }, 500);

    cycleThroughExit();
  });
});



function linkStatistic(StatisticLinks, StatisticLinkActive){
  StatisticLinks.forEach((StatisticLink) => {
    StatisticLink.addEventListener('click', () => {
      if(StatisticLink != StatisticLinkActive){
        const idLink = StatisticLink.id;
        const idLinkActive = StatisticLinkActive.id;
        blockChart = blockStatistic.querySelector(`.block_chart_info[data-chart="${idLink}"]`);
        blockChartActive = blockStatistic.querySelector(`.block_chart_info[data-chart="${idLinkActive}"]`);
    
        blockChartActive.classList.remove("_active");
        setTimeout(function () {
          blockChartActive.classList.add("none");
          blockChart.classList.remove("none");
          setTimeout(function () {
            blockChartActive.classList.remove("_active");
            blockChart.classList.add("_active")
      
            StatisticLink.classList.add("_active");
            StatisticLinkActive.classList.remove("_active");
            StatisticLinkActive = StatisticLink;
          }, 50);
        }, 100);
      }
    });
  });
}

function blockInfo(){
  const buttonInfo = section3.querySelector(`.block_info_${idInfo}`);
  if(isRemoveInfo){
    buttonInfo.classList.remove('none');
  } else{
    buttonInfo.classList.add('none');
  }
}

function setHrefVideo() {
  switch (idSwap) {
    case 1:
      video.src = '//www.youtube.com/embed/0ah7xB2sblg?showinfo=0&iv_load_policy=3&controls=0&start=142&vq=hd720&autoplay=1';
      break;
    case 2:
      video.src = '//www.youtube.com/embed/kA8X9a9Wq7o?showinfo=0&iv_load_policy=3&controls=0&start=67&vq=hd720&autoplay=1';
      break;
    case 3:
      video.src = '//www.youtube.com/embed/NP8F6p5KyNY?showinfo=0&iv_load_policy=3&controls=0&start=32&vq=hd720&autoplay=1';
      break;
    case 4:
      video.src = '//www.youtube.com/embed/6Yxqz-QP93A?showinfo=0&iv_load_policy=3&controls=0&start=125&vq=hd720&autoplay=1';
      break;
    case 5:
      video.src = '//www.youtube.com/embed/bs7wbkOjcLg?showinfo=0&iv_load_policy=3&controls=0&start=5&vq=hd720&autoplay=1';
      break;
    case 6:
      video.src = '//www.youtube.com/embed/afgsYchpD_Q?showinfo=0&iv_load_policy=3&controls=0&start=330&autoplay=1';
      break;
    case 7:
      video.src = '//www.youtube.com/embed/FDzdbJRvWoo?showinfo=0&iv_load_policy=3&controls=0&start=15&vq=hd720&autoplay=1';
      break;
    case 8:
      video.src = '//www.youtube.com/embed/ouVOCsaOs6I?showinfo=0&iv_load_policy=3&controls=0&start=0&vq=hd720&autoplay=1';
      break;
    case 9:
      video.src = '//www.youtube.com/embed/ouVOCsaOs6I?showinfo=0&iv_load_policy=3&controls=0&start=0&vq=hd720';
      break;
    case 10:
      video.src = '//www.youtube.com/embed/2mzUxrFXdBE?showinfo=0&iv_load_policy=3&controls=0&start=8&vq=hd720&autoplay=1';
      break;
    case 11:
      video.src = '//www.youtube.com/embed/qfZvHR21krE?showinfo=0&iv_load_policy=3&controls=0&start=77&vq=hd720&autoplay=1';
      break;
    case 12:
      video.src = '//www.youtube.com/embed/bhTU__jVP8E?showinfo=0&iv_load_policy=3&controls=0&start=26&vq=hd720&autoplay=1';
      break;
    case 12:
      video.src = '//www.youtube.com/embed/5oFSLQn9nNE?showinfo=0&iv_load_policy=3&controls=0&start=11&vq=hd720&autoplay=1';
      break;
    case 14:
      video.src = '//www.youtube.com/embed/kqNeUmTry9Q?showinfo=0&iv_load_policy=3&controls=0&start=90&vq=hd720&autoplay=1';
      break;
    case 15:
      video.src = '//www.youtube.com/embed/f4AccPLXeEc?showinfo=0&iv_load_policy=3&controls=0&start=4&vq=hd720&autoplay=1';
      break;
    case 16:
      video.src = '//www.youtube.com/embed/GUfPuZrwR28?showinfo=0&iv_load_policy=3&controls=0&start=890&vq=hd720&autoplay=1';
      break;
    case 17:
      video.src = '//www.youtube.com/embed/dMcEztHmb1U?showinfo=0&iv_load_policy=3&controls=0&start=68&vq=hd720&autoplay=1';
      break;
    case 18:
      video.src = '//www.youtube.com/embed/3aWyJdRPY_k?showinfo=0&iv_load_policy=3&controls=0&start=0&vq=hd720&autoplay=1';
      break;
    case 19:
      video.src = '//www.youtube.com/embed/cpOJPIdYN5I?showinfo=0&iv_load_policy=3&controls=0&start=0&vq=hd720&autoplay=1';
      break;
    case 20:
      video.src = '//www.youtube.com/embed/wvTFbw-Agl0?showinfo=0&iv_load_policy=3&controls=0&start=22&vq=hd720&autoplay=1';
      break;
    case 21:
      video.src = '//www.youtube.com/embed/y6GaPkkGZGw?showinfo=0&iv_load_policy=3&controls=0&start=0&vq=hd720&autoplay=1';
      break;
    case 22:
      video.src = '//www.youtube.com/embed/9DZBdQeZfEk?showinfo=0&iv_load_policy=3&controls=0&start=60&vq=hd720&autoplay=1';
      break;
    case 23:
      video.src = '//www.youtube.com/embed/1tHB8h6Tykg?showinfo=0&iv_load_policy=3&controls=0&start=76&vq=hd720&autoplay=1';
      break;
    case 24:
      video.src = '//www.youtube.com/embed/_2hkNeoRSr0?showinfo=0&iv_load_policy=3&controls=0&start=76&vq=hd720&autoplay=1';
      break;
    case 25:
      video.src = '//www.youtube.com/embed/9EhPdgFccZk?showinfo=0&iv_load_policy=3&controls=0&start=10&vq=hd720&autoplay=1';
      break;
    case 26:
      video.src = '//www.youtube.com/embed/8MJqlM9zSNI?showinfo=0&iv_load_policy=3&controls=0&start=0&vq=hd720&autoplay=1';
      break;
    case 27:
      video.src = '//www.youtube.com/embed/pwazMM15-l0?showinfo=0&iv_load_policy=3&controls=0&start=0&vq=hd720&autoplay=1';
      break;
    case 28:
      video.src = '//www.youtube.com/embed/OmcHTLoC6ls?showinfo=0&iv_load_policy=3&controls=0&start=122&vq=hd720&autoplay=1';
      break;
    case 29:
      video.src = '//www.youtube.com/embed/8itjJDaBCNs?showinfo=0&iv_load_policy=3&controls=0&start=147&vq=hd720&autoplay=1';
      break;
    case 30:
      video.src = '//www.youtube.com/embed/W1_Swdmi4p8?showinfo=0&iv_load_policy=3&controls=0&start=168&vq=hd720&autoplay=1';
      break;
  }
}      

function setImageSrc() {
  switch (idSwap) {
    case 1:
      const files1 = ['2560x1600_crow.png', '1920x1080_crow.png', '1366x768_crow.png', '1024x1024_crow.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_1/' + files1[i];
        hrefsImage[i].dataset.name = files1[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_1/' + files1[1];
      break;
    case 2:
      const files2 = ['2560x1600_vaquita.png', '1920x1080_vaquita.png', '1366x768_vaquita.png', '1024x1024_vaquita.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_2/' + files2[i];
        hrefsImage[i].dataset.name = files2[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_2/' + files2[1];
      break;
    case 3:
      const files3 = ['2560x1600_tamarin.png', '1920x1080_tamarin.png', '1366x768_tamarin.png', '1024x1024_tamarin.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_3/' + files3[i];
        hrefsImage[i].dataset.name = files3[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_3/' + files3[1];
      break;
    case 4:
      const files4 = ['2560x1600_frog.png', '1920x1080_frog.png', '1366x768_frog.png', '1024x1024_frog.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_4/' + files4[i];
        hrefsImage[i].dataset.name = files4[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_4/' + files4[1];
      break;
    case 5:
      const files5 = ['2560x1600_owl.png', '1920x1080_owl.png', '1366x768_owl.png', '1024x1024_owl.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_5/' + files5[i];
        hrefsImage[i].dataset.name = files5[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_5/' + files5[1];
      break;
    case 6:
      const files6 = ['2560x1600_turtle.png', '1920x1080_turtle.png', '1366x768_turtle.png', '1024x1024_turtle.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_6/' + files6[i];
        hrefsImage[i].dataset.name = files6[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_6/' + files6[1];
      break;
    case 7:
      const files7 = ['2560x1600_oryx.png', '1920x1080_oryx.png', '1366x768_oryx.png', '1024x1024_oryx.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_7/' + files7[i];
        hrefsImage[i].dataset.name = files7[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_7/' + files7[1];
      break;
    case 8:
      const files8 = ['2560x1600_iguana.png', '1920x1080_iguana.png', '1366x768_iguana.png', '1024x1024_iguana.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_8/' + files8[i];
        hrefsImage[i].dataset.name = files8[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_8/' + files8[1];
      break;
    case 9:
      const files9 = ['2560x1600_seahorse.png', '1920x1080_seahorse.png', '1366x768_seahorse.png', '1024x1024_seahorse.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_9/' + files9[i];
        hrefsImage[i].dataset.name = files9[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_9/' + files9[1];
      break;
    case 10:
      const files10 = ['2560x1600_armadillo.png', '1920x1080_armadillo.png', '1366x768_armadillo.png', '1024x1024_armadillo.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_10/' + files10[i];
        hrefsImage[i].dataset.name = files10[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_10/' + files10[1];
      break;
    case 11:
      const files11 = ['2560x1600_sloth.png', '1920x1080_sloth.png', '1366x768_sloth.png', '1024x1024_sloth.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_11/' + files11[i];
        hrefsImage[i].dataset.name = files11[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_11/' + files11[1];
      break;
    case 12:
      const files12 = ['2560x1600_kakapo.png', '1920x1080_kakapo.png', '1366x768_kakapo.png', '1024x1024_kakapo.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_12/' + files12[i];
        hrefsImage[i].dataset.name = files12[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_12/' + files12[1];
      break;
    case 13:
      const files13 = ['2560x1600_echidna.png', '1920x1080_echidna.png', '1366x768_echidna.png', '1024x1024_echidna.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_13/' + files13[i];
        hrefsImage[i].dataset.name = files13[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_13/' + files13[1];
      break;
    case 14:
      const files14 = ['2560x1600_penguin.png', '1920x1080_penguin.png', '1366x768_penguin.png', '1024x1024_penguin.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_14/' + files14[i];
        hrefsImage[i].dataset.name = files14[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_14/' + files14[1];
      break;
    case 15:
      const files15 = ['2560x1600_damselfly.png', '1920x1080_damselfly.png', '1366x768_damselfly.png', '1024x1024_damselfly.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_15/' + files15[i];
        hrefsImage[i].dataset.name = files15[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_15/' + files15[1];
      break;
    case 16:
      const files16 = ['2560x1600_bear.png', '1920x1080_bear.png', '1366x768_bear.png', '1024x1024_bear.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_16/' + files16[i];
        hrefsImage[i].dataset.name = files16[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_16/' + files16[1];
      break;
    case 17:
      const files17 = ['2560x1600_parrotfish.png', '1920x1080_parrotfish.png', '1366x768_parrotfish.png', '1024x1024_parrotfish.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_17/' + files17[i];
        hrefsImage[i].dataset.name = files17[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_17/' + files17[1];
      break;
    case 18:
      const files18 = ['2560x1600_camel.png', '1920x1080_camel.png', '1366x768_camel.png', '1024x1024_camel.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_18/' + files18[i];
        hrefsImage[i].dataset.name = files18[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_18/' + files18[1];
      break;
    case 19:
      const files19 = ['2560x1600_butterfly.png', '1920x1080_butterfly.png', '1366x768_butterfly.png', '1024x1024_butterfly.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_19/' + files19[i];
        hrefsImage[i].dataset.name = files19[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_19/' + files19[1];
      break;
    case 20:
      const files20 = ['2560x1600_ostrich.png', '1920x1080_ostrich.png', '1366x768_ostrich.png', '1024x1024_ostrich.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_20/' + files20[i];
        hrefsImage[i].dataset.name = files20[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_20/' + files20[1];
      break;
    case 21:
      const files21 = ['2560x1600_panda.png', '1920x1080_panda.png', '1366x768_panda.png', '1024x1024_panda.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_21/' + files21[i];
        hrefsImage[i].dataset.name = files21[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_21/' + files21[1];
      break;
    case 22:
      const files22 = ['2560x1600_tapir.png', '1920x1080_tapir.png', '1366x768_tapir.png', '1024x1024_tapir.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_22/' + files22[i];
        hrefsImage[i].dataset.name = files22[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_22/' + files22[1];
      break;
    case 23:
      const files23 = ['2560x1600_sifaka.png', '1920x1080_sifaka.png', '1366x768_sifaka.png', '1024x1024_sifaka.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_23/' + files23[i];
        hrefsImage[i].dataset.name = files23[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_23/' + files23[1];
      break;
    case 24:
      const files24 = ['2560x1600_lynx.png', '1920x1080_lynx.png', '1366x768_lynx.png', '1024x1024_lynx.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_24/' + files24[i];
        hrefsImage[i].dataset.name = files24[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_24/' + files24[1];
      break;
    case 25:
      const files25 = ['2560x1600_rhino.png', '1920x1080_rhino.png', '1366x768_rhino.png', '1024x1024_rhino.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_25/' + files25[i];
        hrefsImage[i].dataset.name = files25[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_25/' + files25[1];
      break;
    case 26:
      const files26 = ['2560x1600_peccary.png', '1920x1080_peccary.png', '1366x768_peccary.png', '1024x1024_peccary.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_26/' + files26[i];
        hrefsImage[i].dataset.name = files26[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_26/' + files26[1];
      break;
    case 27:
      const files27 = ['2560x1600_okapi.png', '1920x1080_okapi.png', '1366x768_okapi.png', '1024x1024_okapi.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_27/' + files27[i];
        hrefsImage[i].dataset.name = files27[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_27/' + files27[1];
      break;
    case 28:
      const files28 = ['2560x1600_loris.png', '1920x1080_loris.png', '1366x768_loris.png', '1024x1024_loris.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_28/' + files28[i];
        hrefsImage[i].dataset.name = files28[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_28/' + files28[1];
      break;
    case 29:
      const files29 = ['2560x1600_hirola.png', '1920x1080_hirola.png', '1366x768_hirola.png', '1024x1024_hirola.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_29/' + files29[i];
        hrefsImage[i].dataset.name = files29[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_29/' + files29[1];
      break;
    case 30:
      const files30 = ['2560x1600_drill.png', '1920x1080_drill.png', '1366x768_drill.png', '1024x1024_drill.png'];
      for (let i = 0; i < 4; i++) {
        hrefsImage[i].dataset.img = 'image/section_3/href_img/swap_30/' + files30[i];
        hrefsImage[i].dataset.name = files30[i];
      }
      imageElement.src = 'image/section_3/href_img/swap_30/' + files30[1];
      break;
  }
}

function handleButtonClick() {
  swap.classList.remove('_active');
  let randomIndex = Math.floor(Math.random() * 30) + 1;
  while (randomIndex === idSwap) {
    randomIndex = Math.floor(Math.random() * 30) + 1;
  }
  idSwap = randomIndex;
  swap = document.querySelector('.swap_' + idSwap);
  swap.classList.remove('none');

  setTimeout(function () {
    swap.classList.add('_active');

    setTimeout(function () {
      const activeIndex = parseInt(swap.id.replace('swap_', ''));
      const swaps = document.querySelectorAll('.swap');
  
      for (let i = 0; i < swaps.length; i++) {
        const index = parseInt(swaps[i].id.replace('swap_', ''));
  
        if (index == activeIndex || index == activeIndex - 1 || index == activeIndex + 1 || (activeIndex == 1 && index == 30) || (activeIndex == 30 && index == 1)) {
          swaps[i].classList.remove('none');
        } else {
          swaps[i].classList.add('none');
        }
      }
    }, 300);

    const bgColor = window.getComputedStyle(swap).getPropertyValue('background-color');
    document.documentElement.style.setProperty('--main-bg-color', bgColor);
  }, 50);
}

function buttonHoverEffect(button) {
  button.addEventListener('mouseover', () => {
    button.classList.add('_active');
  });

  button.addEventListener('mouseout', () => {
    button.classList.remove('_active');
  });
}

function changeTransition() {
  blocksImg.forEach(block => {
    block.style.transition = "opacity 0.5s ease 0s, transform 0.3s ease 0s";
  });

  blocksText.forEach(block => {
    block.style.transition = "opacity 0.5s ease 0s, transform 0.3s ease 0s";
  });

  blocksRight.forEach(block => {
    block.querySelector('.button_arrow_up').style.transition = "opacity 0.5s ease 0s, transform 0.3s ease 0s";
    block.querySelector('.button_circle').style.transition = "opacity 0.5s ease 0s, transform 0.3s ease 0.1s";
    block.querySelector('.button_arrow_down').style.transition = "opacity 0.5s ease 0s, transform 0.3s ease 0.2s";
  });

  blocksLeft.forEach(block => {
    block.querySelector('.button_arrow_up').style.transition = "opacity 0.5s ease 0s, transform 0.3s ease 0s";
    block.querySelector('.button_arrow_down').style.transition = "opacity 0.5s ease 0s, transform 0.3s ease 0.1s";
  });

  blocksLink.forEach(block => {
    block.querySelector('.pieces').style.transition = "opacity 0.5s ease 0s, transform 0.3s ease 0s";
    block.querySelector('.how').style.transition = "opacity 0.5s ease 0.1s, transform 0.3s ease 0.1s";
    block.querySelector('.causes').style.transition = "opacity 0.5s ease 0.2s, transform 0.3s ease 0.2s";
    block.querySelector('.share').style.transition = "opacity 0.5s ease 0.3s, transform 0.3s ease 0.3s";
    block.querySelector('.button').style.transition = "opacity 0.5s ease 0.4s, transform 0.3s ease 0.4s";
  });
}

function cycleThroughExit(){
  if (isSwapping) {
    clearInterval(intervalId);
    intervalId = null;
    isSwapping = false;
    buttons.forEach(btn => { 
      btn.classList.remove('button_arrow_stop'); 
      btn.querySelector('h1').textContent = 'Cycle through'; 
    });
  }
}

function setHrefName(component) {
  switch (idSwap) {
    case 1:
      component.innerHTML = 'Шлемоносной птице-носорогу';
      break;
    case 2:
      component.innerHTML = 'Калифорнийской морской свинье';
      break;
    case 3:
      component.innerHTML = 'Золотистой львиной игрунке';
      break;
    case 4:
      component.innerHTML = 'Золотой ядовитой лягушке-дротику';
      break;
    case 5:
      component.innerHTML = 'Лесному Сычу';
      break;
    case 6:
      component.innerHTML = 'Атлантической ридлее';
      break;
    case 7:
      component.innerHTML = 'Сахарскому ориксу';
      break;
    case 8:
      component.innerHTML = 'Пятнистобрюхой фиджийской игуане';
      break;
    case 9:
      component.innerHTML = 'Капскому морскому коньку';
      break;
    case 10:
      component.innerHTML = 'Трёхпоясному броненосцу';
      break;
    case 11:
      component.innerHTML = 'Карликовому ленивцу';
      break;
    case 12:
      component.innerHTML = 'Какапо';
      break;
    case 13:
      component.innerHTML = 'Проехидне Брюйна';
      break;
    case 14:
      component.innerHTML = 'Африканским пингвинам';
      break;
    case 15:
      component.innerHTML = 'Огнетелке Элизабеты';
      break;
    case 16:
      component.innerHTML = 'Малайскому медведю';
      break;
    case 17:
      component.innerHTML = 'Гуакамайе';
      break;
    case 18:
      component.innerHTML = 'Двугорбому верблюду';
      break;
    case 19:
      component.innerHTML = 'Орнитоптере крез';
      break;
    case 20:
      component.innerHTML = 'Сомалийскому страусу';
      break;
    case 21:
      component.innerHTML = 'Малой панде';
      break;
    case 22:
      component.innerHTML = 'Чепрачному тапиру';
      break;
    case 23:
      component.innerHTML = 'Диадемовому сифаке';
      break;
    case 24:
      component.innerHTML = 'Пиренейской рыси';
      break;
    case 25:
      component.innerHTML = 'Суматранскому носорогу';
      break;
    case 26:
      component.innerHTML = 'Чакскому пекари';
      break;
    case 27:
      component.innerHTML = 'Окапи';
      break;
    case 28:
      component.innerHTML = 'Яванскому лори';
      break;
    case 29:
      component.innerHTML = 'Бубалу Хантера';
      break;
    case 30:
      component.innerHTML = 'Дриллу';
      break;
  }
}

linkButtons.forEach((linkButton) => {buttonHoverEffect(linkButton)});
