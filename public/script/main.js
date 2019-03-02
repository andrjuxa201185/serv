document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let molecule = new Molecule(canvas, Point, 40);

  molecule.start(); 

  document.addEventListener("scroll", function (){
    let coord = canvas.getBoundingClientRect();
    if (coord.bottom < 0){
      molecule.stop();
    } else {
      molecule.start();
    }
  });



  function drowPoint(e){
    let i = Math.round(Math.random() * 39);
    molecule.point[i].setMouseCoord(e);
    molecule.point[i].setParam(e);
  }

  function follow (e){
    for (let i = 0; i < 40; i++) {
      molecule.point[i].speedX = (e.offsetX - molecule.point[i].positionX) / window.innerWidth * Math.random() * 100 ;
      molecule.point[i].speedY = (e.offsetY - molecule.point[i].positionY) / window.innerHeight * Math.random() * 100 ;
    }
  }

  function boom(e){
    canvas.removeEventListener("mousemove", follow);
    for (let i = 0; i < 40; i++) {
      molecule.point[i].setMouseCoord(e);
      molecule.point[i].setParam(e);
      molecule.point[i].color = "red";
      molecule.point[i].speedX = -10 + Math.random() * 20;
      molecule.point[i].speedY = -10 + Math.random() * 20;
    }
    setTimeout(()=>{
      canvas.addEventListener("mousemove", follow);
    }, 7000);
  }

  canvas.addEventListener("mousemove", follow);
  
  canvas.addEventListener("mousedown", function(){
    canvas.addEventListener("mousemove", drowPoint);
  });



  canvas.addEventListener("mousedown", boom);

  canvas.addEventListener("mouseup", function(){
    canvas.removeEventListener("mousemove", drowPoint);
  });


});

