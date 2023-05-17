soundstatus=false
darkstatus=false
let Kahootintro= new Audio("audios/Kahootintro.mp3")
function $(id){
    return document.getElementById(id)
}
function annoy(){
    if(!soundstatus){
    $("soundswitch").innerHTML="Sound: ON"
    Kahootintro.play()
    soundstatus=true
    }else{
    $("soundswitch").innerHTML="Sound: OFF"
    Kahootintro.load()
    soundstatus=false
    }
}
function dark(){
    if(!darkstatus){
    $("darkswitch").innerHTML="Dark Mode: ON"
    darkstatus=true
    }else{
    $("darkswitch").innerHTML="Dark Mode: OFF"
    darkstatus=false
    }
    dispupdate()
}
function dispupdate(){
    if(darkstatus){
        document.body.style.color="white"
        document.body.style.backgroundColor="rgb(35, 35, 49)"
        $("settingscontainer").style.backgroundColor="#1b1f54"
        $("settingscontainer").style.border="2px solid white"
        $("darkswitch").style.backgroundColor="#2c2c2c"
        $("darkswitch").style.color="white"
        $("soundswitch").style.backgroundColor="#2c2c2c"
        $("soundswitch").style.color="white"
        $("darkswitch").style.border="1px solid white"
        $("soundswitch").style.border="1px solid white"
        $("name").style.backgroundColor="#2c2c2c"
        $("name").style.color="white"
    }else{
        document.body.style.color="black"
        document.body.style.backgroundColor="white"
        $("settingscontainer").style.backgroundColor="white"
        $("settingscontainer").style.border="2px solid black"
        $("darkswitch").style.backgroundColor="lightgrey"
        $("darkswitch").style.color="black"
        $("soundswitch").style.backgroundColor="lightgrey"
        $("soundswitch").style.color="black"
        $("darkswitch").style.border="1px solid black"
        $("soundswitch").style.border="1px solid black"
        $("name").style.backgroundColor="lightgrey"
        $("name").style.color="black"
    }
}
function verify(){
    if ($("name").value.trim()==""){
        alert('Enter a name before playing')
    }else if ($("name").value.length>25){
        alert('Name must not exceed 25 bytes')
    }else{
        localStorage.setItem("name",$("name").value)
        localStorage.setItem("sound",soundstatus)
        localStorage.setItem("dark",darkstatus)
        window.open(`quiz.html`,"_parent");
    }
}
