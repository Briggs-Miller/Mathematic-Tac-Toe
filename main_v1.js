rand_int = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
rand_list = function(list) {
    return list[Math.floor(Math.random() * list.length)];
}

var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var binary = [-1, 1];
var random_binary = binary[Math.floor(Math.random() * binary.length)];
var turn = 1;
var available_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var available_positions = [];
var Player1 = "";
var Player2 = "";
var Player1role = "";
var Player2role = "";
var activeplayer = "";
var Players = [];
var i = "";
var Player1Score = 0;
var Player2Score = 0;
var grid_lines_positions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var number_of_players = "";
var winning_combinations = [[1, 4, 7],[2, 5, 8],[3,6,9],[4,5,6]];
var spreading_number_positions = [[0, 5, 7],[1, 3, 8],[1, 5, 6], [2, 3, 7], [0,4,8],[2,4,6]];
var number_of_players = 0;
var game_status = "";
var difficulty = 0;
var settings = "on";
//Get human input when submitted
var wordsToBold=["ATTACKER","DEFENDER","WINS!!","WINS","play again"];
var help = 0;
var winsAI_EASY = 0;
var gamesAI_EASY = 0;
var winsAI_MED = 0;
var gamesAI_MED = 0;
var winsAI_HARD = 0;
var gamesAI_HARD = 0;
var easyaverage = 0;
var mediumaverage = 0;
var hardaverage = 0;
var totalaverage = 0;
var games = gamesAI_EASY+gamesAI_MED+gamesAI_HARD;
var stats = [winsAI_EASY,gamesAI_EASY,winsAI_MED,gamesAI_MED,winsAI_HARD,gamesAI_HARD];

function makeBold(input, wordsToBold) {
    return input.replace(new RegExp('(\\b)(' + wordsToBold.join('|') + ')(\\b)','ig'), '$1<b>$2</b>$3');
}

//cookie codes
function setCookie(cname, cvalue) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("setting cookie as"+cname+"stats of"+cvalue);
    document.cookie = cname + "=" + cvalue + ";" + "expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var cookiestats = getCookie(Player1);
    if (cookiestats != "") {
        console.log("Welcome again " + Player1 + "Your stats are" + cookiestats);
        stats = cookiestats.split(",").map(Number);
        winsAI_EASY = stats[0];
        gamesAI_EASY = stats[1];
        winsAI_MED = stats[2];
        gamesAI_MED = stats[3];
        winsAI_HARD = stats[4];
        gamesAI_HARD = stats[5];
        console.log("stats are",stats);
    } 
    else {
        console.log("Creating a new cookie for " + Player1);
        stats = [winsAI_EASY,gamesAI_EASY,winsAI_MED,gamesAI_MED,winsAI_HARD,gamesAI_HARD];
        setCookie(Player1, stats);    
    }
}

function update_cookie() {
    console.log("updating cookie");
    stats = [winsAI_EASY,gamesAI_EASY,winsAI_MED,gamesAI_MED,winsAI_HARD,gamesAI_HARD];
    setCookie(Player1, stats);
}

function update_stats() {
    console.log("updating stats");
    console.log("player2 is",Player2);
    if (Player2 == "Easy AI") {
        console.log("this was an game against easy");
        if (winningplayer == Player1) {
            console.log("The player won against easy");
            winsAI_EASY +=1;
        }
    }        
    else if (Player2 == "Medium AI") {
        if (winningplayer == Player1) {
                winsAI_MED +=1;
        }
    }
    else if (Player2 == "Hard AI") {
        if (winningplayer == Player1) {
                winsAI_HARD +=1;
        }
    }
    stats = [winsAI_EASY,gamesAI_EASY,winsAI_MED,gamesAI_MED,winsAI_HARD,gamesAI_HARD];
    console.log("Updated stats after adding the games/score",stats);
}

function reset_stats() {
    winsAI_EASY = 0;
    gamesAI_EASY = 0;
    winsAI_MED = 0;
    gamesAI_MED = 0;
    winsAI_HARD = 0;
    gamesAI_HARD = 0;
    if (Player2 == "Easy AI") {
        gamesAI_EASY +=1;
    }
    else if (Player2 == "Medium AI") {
        gamesAI_MED +=1;
    }
    else if (Player2 == "Hard AI") {
        gamesAI_HARD +=1;
    }
    stats = [winsAI_EASY,gamesAI_EASY,winsAI_MED,gamesAI_MED,winsAI_HARD,gamesAI_HARD];
}

//turn codes

GET_HUMAN_INPUT = function() {
    for (i = 0; i < grid_inputs.length; ++i) {
        if (grid_inputs[i].disabled !== true) {
            if (grid_inputs[i].value != 0) {
                submitted_value = +grid_inputs[i].value;
                break;
            }
        }
    }
}

//AI CODE
//code to find available positions left on the board
function get_available_positions() {
    available_positions = []
    console.log("Running get available positions function");
    grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
    for (i = 0; i < grid_inputs.length; ++i) {
        if (grid_inputs[i].disabled != true) {
            available_positions.push(i);
        }
    }
    console.log("Available Positions are",available_positions);
    return available_positions;
}

//Code to pick random position
function RANDOM_POSITION() {
    get_available_positions();
    console.log("Available Positions",available_positions);
    var AI_position = available_positions[Math.floor(Math.random() * available_positions.length)];
    console.log("Getting random position",AI_position)
    return AI_position;
}

//AI EASY taking a turn
PLACE_RANDOM_NUMBER_IN_RANDOM_POSITION = function() {
    submitted_value = rand_list(available_numbers);
    i = RANDOM_POSITION();
    console.log("putting random number into random position");
    document.getElementById("grid_"+i).value = +submitted_value;
    return false;
}

PLACE_NUMBER_ADJACENT = function() {
    for (i = 0; i < 8; ++i) {
        if (grid_inputs[i].disabled == true) {
            console.log("grid input is",(grid_inputs[i]));
            if (i != 4) {
                if ((i == 0) || (i == 2) || (i ==3) || (i = 5)) {
                    console.log("grid input is disabled",grid_inputs[i]);
                    i = i+3;
                    console.log("should place new number in grid",i);
                    document.getElementById("grid_"+i).value = +submitted_value;
                    return false;
                }
                else if ((i == 1) || (i == 6) || (i==7)) {
                    i = i+1;
                    document.getElementById("grid_"+i).value = +submitted_value;
                    return false;
                }
                else if (i = 8) {
                    i = i-1;
                    document.getElementById("grid_"+i).value = +submitted_value;
                    return false;
                }
            }
        }
    }
}

NO_WINNING_MOVE_SETUP = function() {
    console.log("checking to see if there is an option that won't set up a winning move")
    get_available_positions();
    possible_options = [];
    bad_options = [];
    bad_numbers = [];
    winning_lines_with_two_numbers_to_go = [];
    for (i = 0; i < grid_lines_positions.length; ++i) {
        //iterate through possible winning combinations
        for (g = 0; g < grid_lines_positions[i].length; ++g) {
            //iterate through each box of that combination
            if (document.getElementById("grid_"+grid_lines_positions[i][g]).disabled != true) {
                winning_array_positions = [0, 1, 2];
                winning_array_positions.splice(g,1); //splicing the current position out so can be compared with the two other positions
                a = winning_array_positions[0];
                b = winning_array_positions[1];
                //if all three boxes in a line are empty, they are potentially safe options
                if ((grid[grid_lines_positions[i][a]] == 0) && (grid[grid_lines_positions[i][b]] == 0)) {
                    for (n = 0; n < available_numbers.length; ++n) {
                        ok_number = available_numbers[n];
                        ok_position = grid_lines_positions[i][g];
                        ok_option = [ok_number,ok_position];
                        possible_options.push(ok_option);
                    }
                    //check to see if the three empty spaces are able to add to 15 given the remaining numbers - useful for EXPERT.
                    //can remove these as options if they can add to 15 or prioritise them by the defender if they can't.
                }
                //if one only one of the boxes is empty, check to see if two remaining numbers will add to 15
                else if (grid[grid_lines_positions[i][a]] || grid[grid_lines_positions[i][b]] != 0) {
                    for (n = 0; n < available_numbers.length; ++n) {
                        new_available_numbers = available_numbers.slice(0);
                        new_available_numbers.splice(n,1)
                        for (j = 0; j < new_available_numbers.length; ++j) {
                            if ((new_available_numbers[j]+available_numbers[n]+grid[grid_lines_positions[i][a]]+grid[grid_lines_positions[i][b]]) == 15) {
                                bad_number = available_numbers[n];
                                bad_position = grid_lines_positions[i][g];
                                bad_option = [bad_number,bad_position];
                                bad_options.push(bad_option);
                            }
                            else if ((new_available_numbers[j]+available_numbers[n]+grid[grid_lines_positions[i][a]]+grid[grid_lines_positions[i][b]]) != 15) {
                                ok_number = available_numbers[n];
                                ok_position = grid_lines_positions[i][g];
                                ok_option = [ok_number,ok_position];
                                possible_options.push(ok_option);
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("bad options are",bad_options);
    //remove possible options if they are in bad options

    for (b = 0; b < bad_options.length; b++) {
        for(var x = possible_options.length; x--;){
            if ((bad_options[b][0] == possible_options[x][0]) && (bad_options[b][1] == possible_options[x][1])) {
                possible_options.splice(x,1);
            }
        }
    }
    console.log("possible options minus bad options",possible_options);
}

//after listing the possible safe options; take one of them
TAKE_NO_WINNING_OPTION_MOVE = function() {
    if ((possible_options.length === 1) || (possible_options.length === 0)) {
        console.log("has detected the the length is either 1 or 0");
        PLACE_RANDOM_NUMBER_IN_RANDOM_POSITION();
    }
    else {
        check_option = rand_list(possible_options);
        console.log("check_option is",check_option);
        if ((turn == 2) && (activeplayer == "Hard AI")) {
            console.log("making sure the cpu uses a 1 or a 9");
            while ((check_option[0] != 1) && (check_option[0] != 9)) {
                check_option = rand_list(possible_options);
            }
        }
        submitted_value = check_option[0];
        i = check_option[1];
        console.log("the value is",submitted_value,"the position is",i);
        document.getElementById("grid_"+i).value = +submitted_value;
        console.log("Printing AI number and position on the board");
    }
}

FIND_WINNING_COMBINATIONS_ONE_NUMBER_TO_PLACE = function() {
    console.log("Finding if there are winning combinations with one number to go");
    winning_number_and_position_next_turn = [];
    for (i = 0; i < grid_lines_positions.length; ++i) {
        grid_lines_positions[i]
        for (g = 0; g < grid_lines_positions[i].length; ++g) {
            //checking to find two numbers in a winning position
            winning_array_positions = [0, 1, 2];
            winning_array_positions.splice(g,1); //splicing the current position out so can be compared with the two other positions
            a = winning_array_positions[0];
            b = winning_array_positions[1];
            if ((grid[grid_lines_positions[i][g]] == 0) && (grid[grid_lines_positions[i][a]] != 0) && (grid[grid_lines_positions[i][b]] != 0)) {
                console.log("There are two numbers in a potential winning position in position",grid_lines_positions[i][g],grid_lines_positions[i]);
                for (h = 0; h < available_numbers.length; ++h) {
                    if (available_numbers[h] + grid[grid_lines_positions[i][a]] + grid[grid_lines_positions[i][b]] == 15) {
                        winning_pair = [];
                        console.log("with this number it would total 15",available_numbers[h]);
                        console.log("it would win if placed at",grid_lines_positions[i][g]);
                        console.log("The winning positions would be",available_numbers[h],grid_lines_positions[i][g],grid[grid_lines_positions[i][a]],grid_lines_positions[i][a],grid[grid_lines_positions[i][b]],grid_lines_positions[i][b]);
                        //log the number in the possible winning_numbers
                        winning_pair.push(available_numbers[h]);
                        winning_pair.push(grid_lines_positions[i][g]);
                        console.log("winning pair is",winning_pair);
                        winning_number_and_position_next_turn.push(winning_pair);
                    }
                }
            }
        }
    }
    console.log("Possible winning combinations are",winning_number_and_position_next_turn);
}
PLACE_NUMBER_IN_WINNING_POSITION = function() {
    console.log("Take the winning option if available as ATTACKER");
    for (i = 0; i < grid_lines_positions.length; ++i) {
        grid_lines_positions[i]
        //iterate through possible winning combinations
        for (g = 0; g < grid_lines_positions[i].length; ++g) {
            //checking to find two numbers in a winning position
            winning_array_positions = [0, 1, 2];
            winning_array_positions.splice(g,1); //splicing the current position out so can be compared with the two other positions

            a = winning_array_positions[0];
            b = winning_array_positions[1];
            if ((grid[grid_lines_positions[i][g]] == 0) && (grid[grid_lines_positions[i][a]] != 0) && (grid[grid_lines_positions[i][b]] != 0)) {
                console.log("There are two numbers in a winning position - i",i,grid_lines_positions[i]);
                for (h = 0; h < available_numbers.length; ++h) {
                    if (available_numbers[h] + grid[grid_lines_positions[i][a]] + grid[grid_lines_positions[i][b]] == 15) {
                        submitted_value = available_numbers[h];
                        i = grid_lines_positions[i][g];
                        console.log("FOUND A WINNING POSITION!!!");
                        document.getElementById("grid_"+i).value = +submitted_value;
                        return false;
                    }
                }
            }
        }
    }
}

SETUP_DOUBLE_WINNING_OPTION = function() {
    these_numbers_will_set_up_a_win = [];
    console.log("trying to set up double winning option");
    for (i = 0; i < grid_lines_positions.length; ++i) {
        console.log("checking each winning line option");
        //iterate through possible winning combinations
        for (g = 0; g < grid_lines_positions[i].length; ++g) {
            console.log("checking each box to see if it is empty");
            //iterate through each box of that combination
            if (grid[grid_lines_positions[i][g]] == 0) {
                console.log("this box",grid_lines_positions[i][g],"is empty.  Checking the other boxes");
                winning_array_positions = [0, 1, 2];
                winning_array_positions.splice(g,1);
                a = winning_array_positions[0];
                b = winning_array_positions[1];
                //if all three boxes in a line are empty, it will not bother continue to check this option
                if ((grid[grid_lines_positions[i][a]] == 0) || (grid[grid_lines_positions[i][b]] == 0)) {
                    console.log("one of the other boxes is empty in these positions",grid_lines_positions[i]);
                    for (n = 0; n < available_numbers.length; ++n) {
                        new_available_numbers = available_numbers.slice(0);
                        new_available_numbers.splice(n,1)
                        for (j = 0; j < new_available_numbers.length; ++j) {
                            console.log("checking to see if there is a setup number with two numbers left", new_available_numbers[j],available_numbers[n],"and the third that is already there in this line",grid_lines_positions[i]);
                            if ((new_available_numbers[j]+available_numbers[n]+grid[grid_lines_positions[i][a]]+grid[grid_lines_positions[i][b]]) == 15) {
                                console.log("there are two numbers that setup a winning move in this line.  They are",new_available_numbers[j],available_numbers[n]);
                                bad_number = available_numbers[n];
                                bad_position = grid_lines_positions[i][g];
                                new_grid_lines_positions = grid_lines_positions.slice(0);
                                new_grid_lines_positions.splice(i, 1);
                                newest_available_numbers = new_available_numbers.slice(0);
                                newest_available_numbers.splice(j,1);
                                console.log("the number",bad_number,"will be checked in position",bad_position,"in one of the remaining winning options",new_grid_lines_positions);
                                for (h = 0; h < new_grid_lines_positions.length; ++h) {
                                    if (new_grid_lines_positions[h].includes(bad_position)) {
                                        remove = new_grid_lines_positions[h].indexOf(bad_position);
                                        new_grid_lines_positions[h].splice(remove, 1);
                                        for (k = 0; k < newest_available_numbers.length; ++k) {
                                            if ((newest_available_numbers[k]+bad_number+grid[new_grid_lines_positions[h][0]]+grid[new_grid_lines_positions[h][1]]) == 15) {
                                                console.log("found a double win set up.  Putting number",bad_number,"in position",bad_position);
                                                submitted_value = bad_number;
                                                i = bad_position;
                                                document.getElementById("grid_"+i).value = +submitted_value;
                                                return false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


AI_HARD_TURN = function() {
    console.log("AI HARD TURN IS HAPPENING");
    if (activerole == "ATTACKER") {
        if (PLACE_NUMBER_IN_WINNING_POSITION() == false) {
            return false;
        }
        else if (turn == 1) {
            PLACE_RANDOM_NUMBER_IN_RANDOM_POSITION();
        }
        else if (turn < 6) {
            console.log("Attempt to set up winning sequence");
            winning_combinations = [[1, 4, 7],[2, 5, 8],[3,6,9]];
            spreading_number_positions = [[0, 5, 7],[1, 3, 8],[1, 5, 6],[2, 3, 7],[0,4,8],[2,4,6]];

            console.log("checking to see if it can put a 3rd number in and complete a sequence");
            for (i = 0; i < spreading_number_positions.length; i++)  {
                for (g = 0; g < spreading_number_positions[i].length; g++)  {
                    //checking to see if the box is empty and then check to see if it can finish a sequence
                    if (grid[spreading_number_positions[i][g]] == 0) {
                        console.log("this box is empty.",spreading_number_positions[i][g],"check to see if the other two are full");
                        winning_array_positions = [0, 1, 2];
                        c = winning_array_positions.splice(g,1); //splicing the current position out so can be compared with the two other positions
                        a = winning_array_positions[0];
                        b = winning_array_positions[1];
                        console.log("the three positions are",spreading_number_positions[i][a],spreading_number_positions[i][b],spreading_number_positions[i][g]);
                        if ((grid[spreading_number_positions[i][a]] != 0) && (grid[spreading_number_positions[i][b]] != 0)) {
                            console.log("two other boxes in this spread are full.  The numbers are",grid[spreading_number_positions[i][a]],"and",grid[spreading_number_positions[i][b]]);
                            for (h = 0; h < winning_combinations.length; h++) {
                                console.log("checking to see if they are in a winning combination set");
                                if ((winning_combinations[h].includes(grid[spreading_number_positions[i][a]]))&&(winning_combinations[h].includes(grid[spreading_number_positions[i][b]]))) {
                                    console.log("there are two numbers in a winning combination in a winning sequence.  Check to see if third number is available.")
                                    console.log("The winning combination is",winning_combinations[h]);
                                    remove_a = winning_combinations[h].indexOf(grid[spreading_number_positions[i][a]]);
                                    winning_combinations[h].splice(remove_a, 1);
                                    remove_b = winning_combinations[h].indexOf(grid[spreading_number_positions[i][b]]);
                                    winning_combinations[h].splice(remove_b, 1);
                                    console.log("The existing numbers are",grid[spreading_number_positions[i][a]],grid[spreading_number_positions[i][b]]);
                                    console.log("Those numbers have been removed leaving this number to complete setup",winning_combinations[h][0]);
                                    if (available_numbers.includes(winning_combinations[h][0]) == true) {
                                        //place the number in the third position completing the set
                                        submitted_value = winning_combinations[h][0];
                                        i = spreading_number_positions[i][g];
                                        document.getElementById("grid_"+i).value = +submitted_value;
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log("No sequence could be completed.  Checking to see if a 2nd number can be placed in a sequence");
            for (i = 0; i < spreading_number_positions.length; i++)  {
                for (g = 0; g < spreading_number_positions[i].length; g++)  {
                    //checking to see if the box is empty and then check to see if it can finish a sequence
                    if (grid[spreading_number_positions[i][g]] == 0) {
                        console.log("this box is empty.",spreading_number_positions[i][g],"check to see if there is a number in only one of the other two boxes");
                        winning_array_positions = [0, 1, 2];
                        c = winning_array_positions.splice(g,1); //splicing the current position out so can be compared with the two other positions
                        a = winning_array_positions[0];
                        b = winning_array_positions[1];
                        console.log("the three positions are",spreading_number_positions[i][a],spreading_number_positions[i][b],spreading_number_positions[i][g]);
                        if (((grid[spreading_number_positions[i][a]] != 0)&&(grid[spreading_number_positions[i][b]] == 0))||((grid[spreading_number_positions[i][b]] != 0)&&(grid[spreading_number_positions[i][a]] == 0))) {
                            console.log("one of other boxes is empty and one if full.  The numbers are",grid[spreading_number_positions[i][a]],"and",grid[spreading_number_positions[i][b]]);
                            //find which one has a numbe in it
                            if (grid[spreading_number_positions[i][a]] != 0) {
                                check_number = grid[spreading_number_positions[i][a]];
                            }
                            else if (grid[spreading_number_positions[i][b]] != 0) {
                                check_number = grid[spreading_number_positions[i][b]];
                            }

                            for (h = 0; h < winning_combinations.length; h++) {
                                console.log("checking to see if the two other numbers are available to be placed");
                                if (winning_combinations[h].includes(check_number)) {
                                    console.log("this is a possible winning combination with",check_number);
                                    console.log("The winning combination is",winning_combinations[h]);
                                    console.log("Check to see if the other two numbers are still available");
                                    remove_a = winning_combinations[h].indexOf(check_number);
                                    winning_combinations[h].splice(remove_a, 1);
                                    if ((available_numbers.includes(winning_combinations[h][0]))&&(available_numbers.includes(winning_combinations[h][1]))) {
                                        console.log("The two other numbers are still available.  Placing the one of the two available numbers in the empty box");
                                        possible_number = [winning_combinations[h][0],winning_combinations[h][1]];
                                        submitted_value = rand_list(possible_number);
                                        i = spreading_number_positions[i][g];
                                        document.getElementById("grid_"+i).value = +submitted_value;
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log("No sequence could be completed.  Checking to see if CPU can set up a new sequence of three");
            for (i = 0; i < spreading_number_positions.length; i++)  {
                if ((grid[spreading_number_positions[i][0]] == 0)&&(grid[spreading_number_positions[i][1]] == 0)&&(grid[spreading_number_positions[i][2]] == 0)) {
                    console.log("the three boxes in this spread positions",spreading_number_positions[i],"are empty.  Check to see if there is a number sequence left");
                    for (g=0; g<winning_combinations.length; g++) {
                        //check to see if the numbers in the winning combinations are all still available
                        if ((available_numbers.includes(winning_combinations[g][0]))&&(available_numbers.includes(winning_combinations[g][1]))&&(available_numbers.includes(winning_combinations[g][2]))) {
                            console.log("all three available numbers of",winning_combinations[g],"are still available.  Placing one of the three numbers in one of the three available positions");
                            submitted_value = rand_list(winning_combinations[g]);
                            i = rand_list(spreading_number_positions[i]);
                            document.getElementById("grid_"+i).value = +submitted_value;
                            return false;
                        }
                    }
                }
            }

        console.log("no setup is possible; take a Medium Turn instead");
        AI_MED_TURN();
        }
        else {
            console.log("It is turn 6 or later; just put in random numbers and hope for the best");
            AI_MED_TURN();
        }
    }

    if (activerole == "DEFENDER") {
        if (turn == 1) {
            first_number = [1, 5, 9];
            submitted_value = rand_list(first_number);
            i = 4;
            document.getElementById("grid_"+i).value = +submitted_value;
        }
        else if (turn == 2) {
            console.log("Defender is taking the second turn");
            if (available_numbers.includes(1) == false) {
                console.log("the number 1 has been used already");
                second_number = [2, 3];
                submitted_value = rand_list(second_number);
                i = 4
                document.getElementById("grid_"+i).value = +submitted_value;
            }
            else if (available_numbers.includes(2) == false) {
                second_number = [1, 3];
                submitted_value = rand_list(second_number);
                i = 4
                document.getElementById("grid_"+i).value = +submitted_value;
            }
            else if (available_numbers.includes(3) == false) {
                second_number = [1, 2];
                submitted_value = rand_list(second_number);
                i = 4
                document.getElementById("grid_"+i).value = +submitted_value;
            }
            else if (available_numbers.includes(4) == false) {
                second_number = [1,7];
                submitted_value = rand_list(second_number);
                PLACE_NUMBER_ADJACENT();
            }
            else if (available_numbers.includes(6) == false) {
                second_number = [3,9];
                submitted_value = rand_list(second_number);
                PLACE_NUMBER_ADJACENT();
                document.getElementById("grid_"+i).value = +submitted_value;
            }
            else if (available_numbers.includes(7) == false) {
                second_number = [8, 9];
                submitted_value = rand_list(second_number);
                i = 4
                document.getElementById("grid_"+i).value = +submitted_value;
            }
            else if (available_numbers.includes(8) == false) {
                second_number = [7, 9];
                submitted_value = rand_list(second_number);
                i = 4
                document.getElementById("grid_"+i).value = +submitted_value;
            }
            else if (available_numbers.includes(9) == false) {
                second_number = [7, 8];
                submitted_value = rand_list(second_number);
                i = 4
                document.getElementById("grid_"+i).value = +submitted_value;
            }
            else if (available_numbers.includes(5) == false) {
                NO_WINNING_MOVE_SETUP();
                TAKE_NO_WINNING_OPTION_MOVE();
            }
        }
        else {
            FIND_WINNING_COMBINATIONS_ONE_NUMBER_TO_PLACE();
            get_available_positions();
            if (winning_number_and_position_next_turn.length == 1) {
                console.log("There is one winning position detected.  Now working out a safe block");
                NO_WINNING_MOVE_SETUP();
                for (i = 0; i < possible_options.length; ++i) {
                    number_check = possible_options[i][0];
                    position_check = possible_options[i][1];
                    if ((number_check == winning_number_and_position_next_turn[0][0]) && (position_check != winning_number_and_position_next_turn[0][1])) {
                        console.log("use the number in another safe location");
                        submitted_value = number_check;
                        i = position_check;
                        document.getElementById("grid_"+i).value = +submitted_value;
                        return false;
                    }
                    else if ((number_check != winning_number_and_position_next_turn[0][0]) && (position_check == winning_number_and_position_next_turn[0][1])) {
                        console.log("use a different safe number in the required location");
                        submitted_value = number_check;
                        i = position_check;
                        document.getElementById("grid_"+i).value = +submitted_value;
                        return false;
                    }
                }
                console.log("cannot find a safe single block");
                TAKE_NO_WINNING_OPTION_MOVE();
                return false;
            }
            else if (winning_number_and_position_next_turn.length > 1) {
                console.log("There are at least two winning positions.  Will now do a double block");
                NO_WINNING_MOVE_SETUP();
                console.log("the winning numbers and positions next turn are",winning_number_and_position_next_turn);
                //check options to see if they are in possible_options//
                for (i = 0; i < possible_options.length; ++i) {
                    number_check = possible_options[i][0];
                    position_check = possible_options[i][1];
                    console.log("checking possible number",possible_options[i][0],"in position",possible_options[i][1]);

                    if ((number_check == winning_number_and_position_next_turn[0][0]) && (position_check == winning_number_and_position_next_turn[1][1])) {
                        console.log("safe double block has been found");
                        submitted_value = number_check;
                        i = position_check;
                        document.getElementById("grid_"+i).value = +submitted_value;
                        return false;
                    }
                    else if ((number_check == winning_number_and_position_next_turn[1][0]) && (position_check == winning_number_and_position_next_turn[0][1])) {
                        console.log("safe double block has been found");
                        submitted_value = number_check;
                        i = position_check;
                        document.getElementById("grid_"+i).value = +submitted_value;
                        return false;
                    }
                console.log("cannot find a safe double block");
                }
                for (i = 0; i < possible_options.length; ++i) {
                    console.log("double block not working, will try for single block");
                    if ((number_check == winning_number_and_position_next_turn[0][0]) && (position_check != winning_number_and_position_next_turn[0][1])) {
                        console.log("use the number in another safe location");
                        submitted_value = number_check;
                        i = position_check;
                        document.getElementById("grid_"+i).value = +submitted_value;
                        return false;
                    }
                    else if ((number_check != winning_number_and_position_next_turn[0][0]) && (position_check == winning_number_and_position_next_turn[0][1])) {
                        console.log("use a different safe number in the required location");
                        submitted_value = number_check;
                        i = position_check;
                        document.getElementById("grid_"+i).value = +submitted_value;
                        return false;
                    }
                }
                console.log("cannot find safe single block");
                TAKE_NO_WINNING_OPTION_MOVE();
                return false;
            }

            else {
                console.log("There are no winning moves in play; take a safe move");
                NO_WINNING_MOVE_SETUP();
                TAKE_NO_WINNING_OPTION_MOVE();
                return false;
            }

        }
    }
}

AI_MED_TURN = function() {
    get_available_positions();

    if (activerole == "ATTACKER") {
        console.log("USING ATTACKER CODE");
        if (turn == 1) {
            PLACE_RANDOM_NUMBER_IN_RANDOM_POSITION();
        }
        else {
            if (PLACE_NUMBER_IN_WINNING_POSITION() == false) {
                return false;
            }
            else if (SETUP_DOUBLE_WINNING_OPTION() == false) {
                return false;
            }
            else {
                PLACE_RANDOM_NUMBER_IN_RANDOM_POSITION();
            }
        }
    }

    else if (activerole == "DEFENDER") {
        console.log("USING DEFENDER CODE");
        if (turn == 1) {
            PLACE_RANDOM_NUMBER_IN_RANDOM_POSITION();
        }
        else {
            FIND_WINNING_COMBINATIONS_ONE_NUMBER_TO_PLACE();
            //use the number in a random other position
            if (winning_number_and_position_next_turn.length >1) {
                get_available_positions();
                submitted_value = winning_number_and_position_next_turn[0][0];
                remove = available_positions.indexOf(winning_number_and_position_next_turn[0][1]);
                available_positions.splice(remove, 1);
                i = rand_list(available_positions);
                console.log("BLOCKING WINNING POSITION BY USING THAT NUMBER",submitted_value,"SOMEWHERE ELSE",i);
                document.getElementById("grid_"+i).value = +submitted_value;
                return false;
            }
            else {
                NO_WINNING_MOVE_SETUP();
                TAKE_NO_WINNING_OPTION_MOVE();
            }
        }
    }
}

//FORMATTING/VISUAL CODE

//setting up the scoring table
disable_all_inputs = function() {
    grid_inputs = document.querySelectorAll("#board table input");
    for (i = 0; i < grid_inputs.length; ++i) {
        grid_inputs[i].disabled = true;
        }
    console.log("Disable All Inputs")
}

clear_all_inputs = function() {
    grid_inputs = document.querySelectorAll("#board table input");
    for (i = 0; i < grid_inputs.length; ++i) {
        grid_inputs[i].value = "";
        grid_inputs[i].disabled = false;
        }
    console.log("Clear All Inputs")
}

function print_scoreboard() {
    console.log("printing scoreboard");
    if (Player1Score == 1) {
        document.getElementById("player1score").innerHTML = Player1Score+" win";
    }
    else if (Player1Score != 1) {
        document.getElementById("player1score").innerHTML = Player1Score+" wins";
    }
    if (Player2Score == 1) {
        document.getElementById("player2score").innerHTML = Player2Score+" win";
    }
    else if (Player2Score !=1) {
        document.getElementById("player2score").innerHTML = Player2Score+" wins";
    }
    
}

//this adds the class 'used' so that the display is none on the used number (makes it invisible)
function remove_used_number(b) {
    var element = document.getElementById("used_"+b);
    element.classList.add("transparent");
}

function show(this_thing) {
    var element = document.getElementById("this_thing");
    element.classList.remove("used");
    element.classList.remove("transparent");
    element.classList.remove("hide");
    element.classList.remove("throw");
}

//colours the winning boxes if the attacker wins
function winningboxes(a) {
    var element = document.getElementById("grid_"+a);
    element.classList.add("winning");
}

//removes the winning colours - called when a new game begins
function removewinningboxes() {
    grid_inputs = document.querySelectorAll("#board table input");
    for (i = 0; i < grid_inputs.length; ++i) {
        var element = document.getElementById("grid_"+i);
        element.classList.remove("winning");
    }
}

//makes all the numbers visible - called when a new game begins
function show_all_numbers() {
    for (i = 1; i < 10; ++i) {
        var element = document.getElementById("used_"+i);
        element.classList.remove("transparent");
    }
    console.log("Remove winning colour class")
}

function remove_all_list_options() {
    var x = document.getElementById("Player2");
    x.remove(0);
    x.remove(0);
    x.remove(0);
    x.remove(0);
    x.remove(0);
}

function add_list_options(ID,TEXT,VALUE) {
    var x = document.getElementById(ID);
    var opt = document.createElement("option");
    opt.text = TEXT;
    opt.value = VALUE;
    x.add(opt);
}


load_page = function() {
    if (number_of_players == 0) {
        document.getElementById("status_update").innerHTML = "Play One player (against computer) <br/> or <br/>Two Players (pass and play)"
    }
    else if (number_of_players == 1) {
        document.getElementById("status_update").innerHTML = "Please enter your name and select computer difficulty, then press <br/>'Start New Game'";
    }
    else if (number_of_players == 2) {
        document.getElementById("status_update").innerHTML = "Please enter names for both players then press 'Start New Game'";
    }
    disable_all_inputs();
}

//print active player/scores/etc.
print_player = function() {
    if ((turn == 1) && (activerole == "ATTACKER")) {
        update = " has the the first turn.  You cannot use the middle square on your first turn as the ATTACKER."
        document.getElementById("status_update").innerHTML = activeplayer + makeBold(update, wordsToBold);
    }
    else if ((turn == 1) && (activerole == "DEFENDER")) {
        update = " has the the first turn as the DEFENDER."
        document.getElementById("status_update").innerHTML = activeplayer + makeBold(update, wordsToBold);
    }


}

//function that gets called when a new active box is clicked, it clears all the other active boxes so user cannot enter two numbers at once
clear_active_inputs = function() {
    grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
    for (i = 0; i < grid_inputs.length; ++i) {
        if (grid_inputs[i].disabled != true) {
            grid_inputs[i].value = "";
        }
    }
    console.log("Clear Active Inputs")
}

//clear active inputs on focus
grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
for (i = 0; i < grid_inputs.length; ++i) {

    grid_inputs[i].onfocus = clear_active_inputs;
}

//GAME FUNCTION CODE

//check to see if a winning combination is present
check_for_winning_combination = function(grid) {
    console.log("Starting to check for winning combinations");
    grid_lines_positions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (i = 0; i < grid_lines_positions.length; ++i) {
        if (grid[grid_lines_positions[i][0]]&&grid[grid_lines_positions[i][1]]&&grid[grid_lines_positions[i][2]] != 0) {
            if (grid[grid_lines_positions[i][0]] + grid[grid_lines_positions[i][1]] + grid[grid_lines_positions[i][2]] == 15) {
                console.log("USING NEW FORMULA TO GET ATTACKING WINNER");
                for (g = 0; g < grid_lines_positions[i].length; ++g) {
                    winningboxes(grid_lines_positions[i][g]);
                }
                return true;
            }
        }
    }
    console.log("Nothing adds to 15 yet")
    return false;
}

//once human/AI has submitted a number, check it, validate it, print it.
answer_was_submitted = function() {
    console.log("answer_was_submitted")

    //check that number has not been used and in valid range
    submitted_value = 0;
    grid_inputs = document.querySelectorAll("#board table input"); // select all "input" elements under the element with the id "question-settings"
    if (activeplayer == "Easy AI") {
        PLACE_RANDOM_NUMBER_IN_RANDOM_POSITION();
    }
    else if (activeplayer == "Medium AI") {
        AI_MED_TURN();
    }
    else if (activeplayer == "Hard AI") {
        AI_HARD_TURN();
    }
    else {
        GET_HUMAN_INPUT();
    }

    // check the number is in range
    console.log("This is submitted value",submitted_value);
    //we now have the new submitted value ready to validate
    if (submitted_value < 1 || submitted_value >9) {
        update = "The number " + submitted_value + " is not between 1 and 9.  " + activeplayer + " (" + activerole + "), Please try again."
        document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
        clear_active_inputs();
        return false;
    }

    // check if number already used
    for (g = 0; g < grid.length; ++g) {

        if (submitted_value == grid[g]) {
            update = "The number " + submitted_value + " has already been used.<br/>" + activeplayer + " (" + activerole + "). Please try again."
            document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
            return false;
        }
    }


    //validate if it is a decimal or not
    if (submitted_value % 1 != 0) {
        update = "The number " + submitted_value + " is not a whole number.<br/>" + activeplayer + " (" + activerole + "). Please try again.";
        document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
        clear_active_inputs();
        return false;
    }

    grid[i] = +submitted_value;

    document.getElementById("grid_"+i).disabled = true; //disable the box that has had an input
    remove_used_number(submitted_value); //make the number invisible on the list of available numbers

    //adding a turn and switching the active role (need to change or add player)
    turn += 1;
    
    //check to see if someone has won
    if(check_for_winning_combination(grid) === true) {
        if (Player1role == "ATTACKER") {
            winningplayer = Player1;
            update = Player1 + " WINS as ATTACKER!!<br/>Would you like to play again?";
            document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
            update_stats();
            Player1Score += 1;
            update_cookie();
            game_status = "finished";
            //remove throw and throw confirm turn button
            var element = document.getElementById("reset_button");
            element.classList.remove("throw");
            var element = document.getElementById("submit_button");
            element.classList.add("throw");
            print_scoreboard();
            
        }
        else if (Player2role == "ATTACKER") {
            winningplayer = Player2;
            update = Player2 + " WINS as ATTACKER!!<br/>Would you like to play again?";
            document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
            update_stats();
            Player2Score += 1;
            update_cookie();
            game_status = "finished";
            var element = document.getElementById("reset_button");
            element.classList.remove("throw");
            var element = document.getElementById("submit_button");
            element.classList.add("throw");
            print_scoreboard();
            
        }
        disable_all_inputs();
        return false;
    }
    if (turn == 10) {
    console.log("Check if all the boxes are full after checking for no winning combination")
        if (Player1role == "DEFENDER") {
            winningplayer = Player1;
            update = Player1 + " WINS as DEFENDER!!<br/>Would you like to play again?";
            document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
            Player1Score += 1;
            update_stats();
            update_cookie();
            game_status = "finished";
            var element = document.getElementById("reset_button");
            element.classList.remove("throw");
            var element = document.getElementById("submit_button");
            element.classList.add("throw");
            print_scoreboard();
            return false;

        }
        else if (Player2role == "DEFENDER") {
            winningplayer = Player2;
            update = Player2 + " WINS as DEFENDER!!<br/>Would you like to play again?";
            document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
            Player2Score += 1;
            update_stats();
            update_cookie();
            game_status = "finished";
            var element = document.getElementById("reset_button");
            element.classList.remove("throw");
            var element = document.getElementById("submit_button");
            element.classList.add("throw");
            print_scoreboard();
            
            return false;

        }
        return false;
    }


    //removing number for available numbers list
    var index = available_numbers.indexOf(submitted_value);
    if (index > -1) {
        available_numbers.splice(index, 1);
    }

    //switching the active player
    if (activeplayer == Player1) {
        console.log("Changing the active player who is",activeplayer);
        activeplayer = Player2;
        console.log("New active player is",activeplayer);
    }

    else if(activeplayer == Player2) {
        console.log("Changing the active player who is",activeplayer);

        activeplayer = Player1;
        console.log("New active player is",activeplayer);
    }
    //switching the active role
    console.log("Active role is",activerole)
    if (activerole == "ATTACKER") {
        activerole = "DEFENDER";
        console.log("New active role is",activerole)
    }
    else if(activerole == "DEFENDER") {
        activerole = "ATTACKER";
        console.log("New active role is",activerole)
    }
    //activate the middle box if it is turn two and the active player is the defender.  Will need to change once player_turn changes
    if ((turn==2)&&(activerole=="DEFENDER")&&(grid[4] == 0)) {
    console.log("Reactivating middle box when required")
    document.getElementById("grid_4").disabled = false;;
    }
    update = activeplayer + " (" + activerole + ") <br/> It is now your turn."
    document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
    if (activeplayer == "Easy AI" || activeplayer == "Medium AI" || activeplayer == "Hard AI") {
        answer_was_submitted();
    }

    //update commentary and active player
    print_player();
    return true;
}

submit_turn = function () {
    answer_was_submitted();

}

show_overlay = function() {
    var element = document.getElementById("Main");
    element.classList.add("relative");
    document.getElementById("overlay").style.display = "flex"

}

hide_overlay = function() {
    console.log("Player 2 is",Player2);
    if (Player2 == "Easy AI") {
        document.getElementById('AI_EASY').checked = true;
        document.getElementById('AI_MED').checked = false;
        document.getElementById('AI_HARD').checked = false;
    }
    else if (Player2 == "Medium AI") {
        document.getElementById('AI_EASY').checked = false;
        document.getElementById('AI_MED').checked = true;
        document.getElementById('AI_HARD').checked = false;
    }
    else if (Player2 == "Hard AI") {
        document.getElementById('AI_EASY').checked = false;
        document.getElementById('AI_MED').checked = false;
        document.getElementById('AI_HARD').checked = true;
    }
    if (number_of_players == 1) {
        document.getElementById('player_number1').checked = true;
        document.getElementById('player_number2').checked = false;
        document.getElementById("Player1").value = Player1;
    }
    else if (number_of_players == 2) {
        document.getElementById('player_number1').checked = true;
        document.getElementById('player_number2').checked = false;
        document.getElementById("Player1").value = Player1;
        document.getElementById("Player2").value = Player2;
    }
    var element = document.getElementById("Main");
    element.classList.remove("relative");
    document.getElementById("overlay").style.display = "none"
}

unlock_settings = function() {
    console.log("Unlocking settings");
    settings = "on";
    var element = document.getElementById("new_players");
    element.classList.remove("throw");
    var element = document.getElementById("container");
    element.classList.remove("height");
    var element = document.getElementById("buttons");
    element.classList.add("throw");
    game_status = "finished";
    hide_overlay();
    Player1Score = 0;
    Player2Score = 0;
    reset_stats();
    var element = document.getElementById("setup");
    element.classList.remove("hide_settings_while_inactive");
    var element = document.getElementById("scoreboard");
    element.classList.add("hide_banner_while_inactive");
    var element = document.getElementById("Main");
    element.classList.add("hide_banner_while_inactive");
    var element = document.getElementById("logo");
    element.classList.remove("hide_banner_while_inactive");
    print_scoreboard();
    window.scrollTo(0, 0);
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    load_page();
}

//reset the game/players
reset_game = function() {
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ) {

        if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    }
    Player1Score = 0;
    Player2Score = 0;
    print_scoreboard();
    new_game();
}

//get the settings and start the game based on them
new_game = function () {
    if (game_status == "started") {
        update = "Please finish the current game first.<br/>" + activeplayer + " (" + activerole + "), it is your turn.";
        document.getElementById("status_update").innerHTML = makeBold(update, wordsToBold);
        return false;
    }
    else {
        Player1 = document.getElementById("Player1").value;

        if (number_of_players == 2) {
            Player2 = document.getElementById("Player2").value;
        }
        else {
            Player2 = difficulty;
        }

        if (Player1 == "NONE" || Player2 == "NONE") {
            load_page();
            return false;
        }

        if (Player1 == "") {
            Player1 = "Player 1";
        }

        if (Player2 == "") {
            Player2 = "Player 2";
        }

        if (Player1 === Player2) {
            document.getElementById("status_update").innerHTML = "Please select different names for Player 1 and Player 2.";
            return false;
        }

        if (Player2 == "AI_EASY") {
            Player2 = "Easy AI";
        }
        else if (Player2 == "AI_MED") {
            Player2 = "Medium AI";
        }
        else if (Player2 == "AI_HARD") {
            Player2 = "Hard AI";
        }
        checkCookie();
        if (Player2 == "Easy AI") {
            gamesAI_EASY +=1;
        }
        else if (Player2 == "Medium AI") {
            gamesAI_MED +=1;
        }
        else if (Player2 == "Hard AI") {
            gamesAI_HARD +=1;
        }
        update_cookie(); //FIX
        
        document.getElementById("P1_name_text").innerHTML = Player1;
        document.getElementById("P2_name_text").innerHTML = Player2;

        Players = [Player1, Player2];

        //randomise roles
        randomise_roles = binary[Math.floor(Math.random() * binary.length)];
        if (randomise_roles == 1) {
            Player1role = "ATTACKER";
            Player2role = "DEFENDER";
        }
        else {
            Player1role = "DEFENDER";
            Player2role = "ATTACKER";
        }

        //randomise the first active player
        first_active_player = binary[Math.floor(Math.random() * binary.length)];

        if (first_active_player == 1) {
            activeplayer = Player1;
            activerole = Player1role;
        }
        else {
            activeplayer = Player2;
            activerole = Player2role;
        }

        removewinningboxes();
        show_all_numbers();
        grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        turn = 1;
        available_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        available_positions = []
        print_player();
        clear_all_inputs();


        settings = "off";
        var element = document.getElementById("container");
        element.classList.add("height");
        var element = document.getElementById("Main");
        element.classList.remove("hide_banner_while_inactive");
        var element = document.getElementById("logo");
        element.classList.add("hide_banner_while_inactive");
        var element = document.getElementById("setup");
        element.classList.add("hide_settings_while_inactive");
        var element = document.getElementById("new_players");
        element.classList.add("throw");
        var element = document.getElementById("buttons");
        element.classList.remove("throw");
        var element = document.getElementById("reset_button");
        element.classList.add("throw");
        var element = document.getElementById("submit_button");
        element.classList.remove("throw");
        var element = document.getElementById("scoreboard");
        element.classList.remove("hide_banner_while_inactive");

        //block out middle box if attacker goes first
        window.scrollTo(0, 0);
        if ((turn==1)&&(activerole=="ATTACKER")) {
            document.getElementById("grid_4").disabled = true;
        }
        game_status = "started";
        if (activeplayer == "Easy AI" || activeplayer == "Medium AI" || activeplayer == "Hard AI") {
            answer_was_submitted();
        }
    }
}



//INTERFACE CODE - mouse, keyboard and buttons

answer_keydown = function(event) {
    if (event.keyCode == 13) {
        console.log("refresh causes this to fire");
        submit_turn();
    }
}

next_help = function() {
    window.scrollTo(0, 0);
    var element = document.getElementById("setup");
    element.classList.add("hide_settings_while_inactive");
    var element = document.getElementById("scoreboard");
    element.classList.add("hide_settings_while_inactive");
    var element = document.getElementById("Main");
    element.classList.remove("hide_banner_while_inactive");
    var element = document.getElementById("Main");
    element.classList.add("relative");
    if (help != 0) {
        console.log("help is",help);

        var element = document.getElementById("overlay"+help);
        element.classList.add("throw");
    }
    help += 1
    if (help !=6) {
        console.log("help is",help);
        var element = document.getElementById("overlay"+help);
        element.classList.remove("throw");
    }

    else if (help == 6) {
        var element = document.getElementById("setup");
        element.classList.remove("hide_settings_while_inactive");
        var element = document.getElementById("scoreboard");
        element.classList.remove("hide_settings_while_inactive");
        var element = document.getElementById("Main");
        element.classList.add("hide_banner_while_inactive");
        var element = document.getElementById("Main");
        element.classList.remove("relative");
        help = 0;
    }
}

previous_help = function() {
    window.scrollTo(0, 0);
    var element = document.getElementById("overlay"+help);
    element.classList.add("throw");
    help = help - 1;
    if (help != 0) {
        var element = document.getElementById("overlay"+help);
        element.classList.remove("throw");
    }
    else if (help == 0) {
        var element = document.getElementById("setup");
        element.classList.remove("hide_settings_while_inactive");
        var element = document.getElementById("scoreboard");
        element.classList.remove("hide_settings_while_inactive");
        var element = document.getElementById("Main");
        element.classList.add("hide_banner_while_inactive");
        var element = document.getElementById("Main");
        element.classList.remove("relative");
    }
}

show_statistics = function() {
    console.log("displaying stats from array");
    stats = [winsAI_EASY,gamesAI_EASY,winsAI_MED,gamesAI_MED,winsAI_HARD,gamesAI_HARD];
    if (stats[1] != 0) {
        easyaverage = Number(((stats[0]/stats[1])*100).toFixed(2));
    }
    else {
        easyaverage = 0;
    }
    if (stats[3] != 0) {
        mediumaverage = Number(((stats[2]/stats[3])*100).toFixed(2));
    }
    else {
        mediumaverage = 0;
    }
    if (stats[5] != 0) {
        hardaverage = Number(((stats[4]/stats[5])*100).toFixed(2));
    }
    else {
        hardaverage = 0;
    }
    total_games = gamesAI_EASY+gamesAI_MED+gamesAI_HARD;
    total_wins = winsAI_EASY+winsAI_MED+winsAI_HARD
    if (total_games !=0) {
        totalaverage = Number(((total_wins/total_games)*100).toFixed(2));
    }
    else {
        totalaverage = 0;
    }
    
    document.getElementById("stats_heading").innerHTML =" Statistics: " + Player1;
    document.getElementById("easy_wins").innerHTML = stats[0];
    document.getElementById("easy_games").innerHTML = stats[1];
    document.getElementById("easy_average").innerHTML = easyaverage + "%";
    document.getElementById("medium_wins").innerHTML = stats[2];
    document.getElementById("medium_games").innerHTML = stats[3];
    document.getElementById("medium_average").innerHTML = mediumaverage + "%";    
    document.getElementById("hard_wins").innerHTML = stats[4];
    document.getElementById("hard_games").innerHTML = stats[5];
    document.getElementById("hard_average").innerHTML = hardaverage + "%";    
    document.getElementById("total_wins").innerHTML = total_wins;
    document.getElementById("total_games").innerHTML = total_games;
    document.getElementById("total_average").innerHTML = totalaverage + "%";    
    
    window.scrollTo(0, 0);
    var element = document.getElementById("topscoresoverlay");
    element.classList.remove("throw");
    var element = document.getElementById("Main");
    element.classList.add("relative");
}

hide_stats = function() {
    console.log("hiding stats overlay");
    window.scrollTo(0, 0);
    var element = document.getElementById("topscoresoverlay");
    element.classList.add("throw");
    var element = document.getElementById("Main");
    element.classList.remove("relative"); 
}

reset_cookie_stats = function() {
    document.cookie = Player1 + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    reset_stats();
    Player1Score = 0;
    Player2Score = 0;
    print_scoreboard();
    show_statistics();
}


// buttons
document.getElementById("submit").onclick = submit_turn;
document.getElementById("reset").onclick = new_game;
document.getElementById("resetgame").onclick = reset_game;
document.getElementById("change_settings").onclick = show_overlay;
document.getElementById("continue_game").onclick = hide_overlay;
document.getElementById("confirm_change_settings").onclick = unlock_settings;
document.getElementById("check_stats").onclick = show_statistics;
document.getElementById("Close").onclick = hide_stats;
document.getElementById("resetstats").onclick = reset_cookie_stats;

for ( i= 0; i < 6; ++i) {
    document.getElementById("help"+i).onclick = next_help;
}
for (i= 0; i < 5; ++i) {
    document.getElementById("back"+i).onclick = previous_help;
}

for (i = 0; i < 9; ++i) {
    document.getElementById("grid_"+i).onkeydown = answer_keydown;
}

setting_was_changed = function() {
    console.log('the settings were changed');
    if (settings == "off") {
        console.log("Player 1 or Player 2 has a score and/or the game has started");
        console.log(Player1Score,Player2Score,game_status);
        show_overlay();
    }
    else if (settings == "on") {
        number_of_players = 0;
        console.log("number of players",number_of_players);
        players_radiobuttons = document.getElementsByName("player_number");
        for (var i = 0, length = players_radiobuttons.length; i < length; i++) {
            if (players_radiobuttons[i].checked) {
                number_of_players = players_radiobuttons[i].value;
                break; // no sense continuing the loop
            }
        }

        difficulty = 0;
        AI_radiobuttons = document.getElementsByName("AI_level");
        for (var i=0, length = AI_radiobuttons.length; i < length; i++) {
            if (AI_radiobuttons[i].checked) {
                difficulty = AI_radiobuttons[i].value;
            }
        }

        if (number_of_players == 1) {
            console.log("number of players",number_of_players);
            //hide player 2 name
            var element = document.getElementById("P2_name");
            element.classList.add("used");
            var element = document.getElementById("AI_DIFFICULTY");
            element.classList.remove("throw");
        }

        else if (number_of_players == 2) {
            console.log("number of players",number_of_players);
            //hide difficulty options
            var element = document.getElementById("AI_DIFFICULTY");
            element.classList.add("throw");
            var element = document.getElementById("P2_name");
            element.classList.remove("used");
        }
        load_page();
    }
}



setting_was_changed();




// Any time a setting is changed, call the setting_was_changed() function.
// -- get all the input elements under the #question-settings element
settings_inputs = document.querySelectorAll("#Players input"); // select all "input" elements under the element with the id "settings"
for (i = 0; i < settings_inputs.length; ++i) {
    settings_inputs[i].onchange = setting_was_changed;
}
