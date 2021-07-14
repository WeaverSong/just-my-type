/*
I wasn't sure if you would check the index, so I'm putting this here. I swapped out all the id's of the keys;
best I could tell it was backwards of the number it would have needed, and all-around complicated, with little
relationship with jQuery. I swapped it to using the exact key actually pressed for the id, as that seemed an
obvious solution.
*/

const sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
const pos = {
    index: 0,
    letter: 0
};
let feedback = 0;
let startTime = -1;
let gameOver = false;

//hide uppercase keyboard
$("#keyboard-upper-container").attr("hidden", true);

const setSentence = function () {

    if (pos.letter == sentences[pos.index].length)
    {
        pos.letter = 0;
        pos.index++;
        $("#feedback").text("");
    }

    let cont = $("#sentence");
    cont.empty();

    if (pos.index == sentences.length)
    {
        $("#target-letter").empty();
        gameOver = true;

        let words = 0;
        //Oh look, I needed a loop after all
        for (const i of sentences)
        {
            words += i.split(' ').length;
        }

        cont.text(`Ran out of sentences! Your score was ${Math.round(words / ((Date.now() - startTime) / 60_000) - 2 * feedback)}`);
        setTimeout(() => {
            $("#target-letter").empty();
            $("#target-letter").append(`<button onclick="location.reload();">Restart</button>`);
        }, 5 * 1000);
        return;
    }

    cont.append(sentences[pos.index].slice(0, pos.letter));
    cont.append(`<span id="yellow-block">${sentences[pos.index][pos.letter]}</span>`);
    cont.append(sentences[pos.index].slice(pos.letter+1));


    $("#target-letter").text(sentences[pos.index][pos.letter]);
};

//toggle keyboards
$("body").keydown(function (key) {
    if (gameOver) return;
    if (key.originalEvent.key == "Shift")
    {
        $("#keyboard-upper-container").attr("hidden", false);
        $("#keyboard-lower-container").attr("hidden", true);
        return;
    }

    if (startTime == -1)
    {
        startTime = Date.now();
    }

    //Totally all jQuery.
    /*
    In all seriousness, this was the only solution given my id choices. jQuery is unable to search for an id like "`" or "!",
    even if I pretended the id was just an attribute to look for. 
    */
    let htmlkey = $(document.getElementById(key.originalEvent.key));
    htmlkey.css("background-color", "yellow");

    if (sentences[pos.index][pos.letter] == key.originalEvent.key)
    {
        $("#feedback").append("<span class='green'>✓</span>");
    } else {
        $("#feedback").append("<span class='red'>X</span>");
        feedback++;
    }
    pos.letter++;

    setSentence();
});
$("body").keyup(function (key) {
    if (gameOver) return;
    if (key.originalEvent.key == "Shift")
    {
        $("#keyboard-upper-container").attr("hidden", true);
        $("#keyboard-lower-container").attr("hidden", false);
    }

    //Totally all jQuery.
    /*
    In all seriousness, this was the only solution given my id choices. jQuery is unable to search for an id like "`" or "!",
    even if I pretended the id was just an attribute to look for. 
    */
    let htmlkey = $(document.getElementById(key.originalEvent.key));
    htmlkey.css("background-color", "rgb(245, 245, 245)");
});

setSentence();