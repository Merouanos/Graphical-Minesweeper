function Generate_map(number){
    let matrix=[];
    for(let i=0;i<number;i++)
    {
        let arr=[];
        for(let j=0;j<number;j++)
        arr.push(0);

        matrix.push(arr);
    }
    return matrix;

}

function Modifie_square(map,x,y)
{
    for(let i=x-1;i<=x+1;i++)
        for(let j=y-1;j<=y+1;j++)
        if(i<map.length && i>-1 && j<map[0].length && j>-1 &&(x!=i || y!=j))
            map[i][j]++;

}



function Generate_mines(map,mine_number)
{
    let random_x,random_y;
    for(let i=0;i<mine_number;i++)
    {
    do{
         random_x=Math.floor(Math.random()*map.length);
         random_y=Math.floor(Math.random()*map.length);
    }while(map[random_x][random_y]==-1);
    map[random_x][random_y]=-1;
    Modifie_square(map,random_x,random_y);
    };



}






function Display_zero(map,x,y,score){
    if(x<map.length && x>-1 && y<map[0].length && y>-1 && map[x][y]==0)
    {
        let cell=grid.getElementsByTagName("div")[x*(map[0].length)+y];
        cell.innerHTML=`${map[x][y]}`;
        map[x][y]=-2;
        Update_score(score);
        Display_zero(map,x-1,y,score);
        Display_zero(map,x+1,y,score);
        Display_zero(map,x,y+1,score);
        Display_zero(map,x,y-1,score);
    }


}







function Display_cell(map,cell,x,y,score)
{
    if(map[x][y]>-2 && x<map.length && x>-1 && y<map[0].length && y>-1)
    {
    if(map[x][y]==-1)
        {
            cell.style.backgroundImage="url(Assets/red.png)";
            cell.style.backgroundSize="contain";
            cell.style.backgroundRepeat="no-repeat";
            cell.style.backgroundPosition="center";
            cell.style.backgroundColor="red";
            explotion.play();
            Game_Over(map.length,false);
            
            
        }
        else
        {
            if(map[x][y]==0)
                Display_zero(map,x,y,score);
            else
            cell.innerHTML=`${map[x][y]}`;
            pickup.play();
            Update_score(score);
            if(score_value==Math.pow(map.length,2)-mine_number+1)
                Game_Over(map.length,true);
    }
            map[x][y]=-2;
        }

}


function Create_cell()
{
    let cell=document.createElement("div");
    cell.className="bg-slate-400 border-4 border-black hover:cursor-pointer hover:opacity-50 text-center p-6 box-border";
    return cell;
}






function Generate_grid(number)
{
    let grid=document.getElementById("grid");
    for(let i=0;i<Math.pow(number,2);i++)
        grid.appendChild(Create_cell());

}


function Delete_grid(number)
{
    let grid=document.getElementById("grid");
    for(let i=0;i<Math.pow(number,2);i++)
        grid.removeChild(grid.lastElementChild);
}





function Generate_score()
{
    let div=document.createElement("div");
    div.innerHTML=`Score : 0`;
    div.className="text-3xl text-center p-2";
    return div;
}

function Update_score(score)
{
    score_value++;
    score.innerHTML=`Score : ${score_value}`;
}

function Reset_score(score)
{
    score_value=0;
    score.innerHTML=`Score : 0`;
}


function Game_Over(number,win)
{
    game=false;
    let title=this.document.getElementById("over");
    let cell_ieme=grid.getElementsByTagName("div");
    
    for(let i=0;i<number;i++)
        for(let j=0;j<number;j++)
        {
         cell_ieme[i*number+j].className="bg-slate-400 opacity-50 text-center p-6 box-border";
         cell_ieme[i*number+j].innerHTML="";
        }
    title.className="absolute font-bold text-red-950 text-5xl text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
    if(win==true)
    {
        title.className="absolute font-bold text-green-950 text-5xl text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
    title.innerHTML=`Game Over
                    YOU WIN!!!`;
                    win_sound.play();
        
    }
else
title.innerHTML=`Game Over
                YOU LOSE`;
    
    this.document.forms[0].className="flex justify-evenly mt-5";
    restart=true;
}

function Restart(score)
{
    Delete_grid(8); 
    restart=false;
    this.document.getElementById("over").className=" hidden ";
    Reset_score(score);

}

let score=Generate_score();
let score_value;
let grid=document.getElementById("grid");
let game;
let restart=false;
let mine_number;
let grid_size;


const pickup = new Audio('Assets/Audio/pickupCoin.wav');
const explotion = new Audio('Assets/Audio/explosion.wav');
const select = new Audio('Assets/Audio/blipSelect.wav');
const win_sound= new Audio('Assets/Audio/win.mp3');

onsubmit=function(){
    select.play();
    event.preventDefault();
    this.document.body.className="";
    game=true;
    score_value=0;
    let diff=document.getElementById("size");
    if(restart)
    {
        Restart(score);

    }
    grid_size=8;
    if(diff.value==0)
        mine_number=3;
    else
    if(diff.value==1)
        mine_number=5
    else
    mine_number=8;
    let map=Generate_map(grid_size);
    Generate_mines(map,mine_number);
    Generate_grid(grid_size);
    this.document.forms[0].className+=" hidden ";
    this.document.getElementById("scores").appendChild(score);
    
    let cell_ieme=grid.getElementsByTagName("div");

    for(let i=0;i<map.length;i++)
    
        for(let j=0;j<map[0].length;j++)
        {
        let cell =cell_ieme[i*(map[0].length)+j];
        cell.onclick=function(){
            if(game)
                Display_cell(map,cell,i,j,score);
               
        }
    }
    

    



}

