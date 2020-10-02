var flag = false;
var winner_found_yet=false;
var col = 3;
var row = 3;
var player1=0,player2=0;


var single_player=true;
var dual_player=false;

$("#msg").text("Player score- 0                            Computer Score- 0")


var arr = new Array(col);
for (var i = 0; i < col; i++)
    arr[i] = new Array(row);

for (var i = 0; i < row; i++)
    for (var j = 0; j < col; j++)
        arr[i][j] = 0;

        

function is_winner(a,b,c)
{
    if(a==b && a==c && a!=0)
    return true;
    return false;
}


function check_all_possible_winners()
{
    for(var i=0;i<col;i++)
    if(is_winner(arr[i][0],arr[i][1],arr[i][2]))
    return arr[i][0];
    
    
    for(var i=0;i<col;i++)
    if(is_winner(arr[0][i],arr[1][i],arr[2][i]))
    return arr[0][i];

    if(is_winner(arr[0][0],arr[1][1],arr[2][2]))
    return arr[0][0];

    if(is_winner(arr[0][2],arr[1][1],arr[2][0]))
    return arr[0][2];
    
    var count=0;

    for(var i=0;i<col;i++)
    for(var j=0;j<row;j++)
    if(arr[i][j]===0)
    return 4;
    
    return 0;
}

function winning_chance()
{
    //return -1 if x is winner
    
    //return 1 if 0 is winner

    //return 4 if  game not end yet
    
    //return 0 if game is tie

    var w=check_all_possible_winners();
    if(w==1)
    return -1;
    if(w==2)
    return 1;

    return w;
    
    
}

///////////////////    Buttons    /////////////////////////////
$("#play_again").click(function () {
    reset();
    
});

$("#new_game").click(function () {
    reset();
    player1 = 0, player2 = 0;


});

$("#single").click(function(){
     player1 = 0, player2 = 0;
    dual_player=false;
    single_player=true;
    reset();
    $("#msg").text(`Your score-${player1}    Computer Score- ${player2}`)
});

$("#dual").click(function(){
     player1 = 0, player2 = 0;
    dual_player=true;
    single_player=false;
    reset();
    $("#msg").text(`Player1 score-${player1}    Player2 Score- ${player2}`)
});





$(".second").click(function () {

    var Id = jQuery(this).attr("id");
    var x, y;
    x = Math.floor((Id - 1) / col);
    y = Id - 1 - col * x;
    
    if(single_player){
    if (arr[x][y] === 0 && !winner_found_yet) {
        
            $(this).text("X");
            arr[x][y] = 1;
            var winner=winning_chance();
   
        if(winner!=4){
        show_winner(winner);
        winner=4;
       
        }
          if(!winner_found_yet)
            comps_turn();
    }
    }
    if(dual_player)
    {
        if (arr[x][y] === 0 && !winner_found_yet) {
            if(!flag)
            {
                $(this).text("X");
                arr[x][y] = 1;
            }
            else{
                $(this).text("O");
                 arr[x][y] = 2;
            }
          flag=!flag;  
        }
    }
    var winner=winning_chance();
   
        if(winner!=4){
        show_winner(winner);
        winner=4;
       
        }

});






function reset(){
    $("#win").text(null);
    winner_found_yet=false;

    for (var i = 0; i < row; i++)
        for (var j = 0; j < col; j++)
            arr[i][j] = 0;

    var second = $(".second");
    for (var i = 0; i < second.length; i++)
        second.text(null);


}

function show_winner(winner){

    if(!winner_found_yet){
    if(winner==-1){
    $("#win").text("winner is X");
    player1++;
    }
    else if(winner==1){
    $("#win").text("winner is O");
    player2++;
    }
    else $("#win").text("Tie");
    if(single_player)
    $("#msg").text(`Your score-${player1}    Computer Score- ${player2}`);
    if(dual_player)
    $("#msg").text(`Player1 score-${player1}    Player2 Score- ${player2}`)
    
    }
    winner_found_yet=true;

}

function comp_guess(next_turn)
{
    // //base case
    var winner= winning_chance();
    if(winner!=4)
    return winner;


    // //computer turn 
    if(next_turn)
    {
        var Value=-1;
        for(var i=0;i<3;i++)
        for(var j=0;j<3;j++)
         if(arr[i][j]===0)
        {
            arr[i][j]=2;
            var next=comp_guess(!next_turn);

            if(Value<next)
            Value=next;

            arr[i][j]=0;

            if(Value===1)
            return 1;

        }
        

    }
    else  // person turn
    {
        var Value=1;

        for(var i=0;i<3;i++)
        for(var j=0;j<3;j++)
         if(arr[i][j]===0)
        {
            arr[i][j]=1;
            var next=comp_guess(!next_turn);

            if(Value>next)
            Value=next;

            arr[i][j]=0;
            
            if(Value===-1)
            return -1;

        }
    }
    return 1;
}


function comps_turn()
{
    var count=0;

    for(var i=0;i<col;i++)
    for(var j=0;j<col;j++)
    if(arr[i][j])
    count++;

    if(count===1)
    {  var id;
        if(arr[1][1])
        arr[0][0]=2,id=1;

        else arr[1][1]=2,id=5;

        $(`#${id}`).text("O");
        console.log(id);
        return;
    }



    var x,y;
    var result_x,result_y,id=-1;

    var value=-2;
    for(var i=1;i<=9;i++)
    {
        x = Math.floor((i- 1) / col);
        y = i - 1 - col * x;
        
        if(arr[x][y]===0)
         {
             arr[x][y]=2;
             var cur_value=comp_guess(false);
             if(cur_value>value)
             {
                 value=cur_value;
                 result_x=x,result_y=y;
                 id=i;
             }
             if(value===1)
             {
                 $(`#${id}`).text("O");
                 return;
             }
             arr[x][y]=0;

         }   
    
    }
   if(id===-1)
   return;
    $(`#${id}`).text("O");
    arr[result_x][result_y]=2;

    var winner=winning_chance();
   
   
}
