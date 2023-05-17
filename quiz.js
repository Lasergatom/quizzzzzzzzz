var answered=false
var question=0
var corrans=false
var score=0
var correct_answers=0,wrong_answers=0
var username=localStorage.getItem("name")
var soundstatus=localStorage.getItem("sound")
var darkstatus=localStorage.getItem("dark")
var overtime=false
var phonk=new Audio("audios/Kahootphonk.mp3")
var lose=new Audio("audios/Lose.mp3")
var win= new Audio("audios/Victory.mp3")
var progressStartValue = 1500,
    progressEndValue = 0,
    speed = 10;
audiolist=[phonk,lose,win]
function $(id){
    return document.getElementById(id)
}
function hover(id,color1,color2){
    $(id).onmouseover = function() {if (!(answered)){$(id).style.backgroundColor=color1}};
    $(id).onmouseout = function() {if (!(answered)){$(id).style.backgroundColor=color2}};
}
function sound(soundfile){
    if (soundstatus=="true"){
        soundfile.play()
    }
}
function pauser(soundfile){
    if (soundstatus=="true"){
        soundfile.load()
    }
}
function load(){
    audiolist.map(function(value){value.load()})
    question++
    questions=JSON.parse(localStorage.getItem("questions"))
    if (questions["data"].length<question){
        results()
    }else{
        $("pi").innerHTML=String(question)+"/"+String(questions["data"].length)
        dataset=questions["data"][question-1]
        $("question").innerHTML=dataset["qnum"]+". "+dataset["title"]
        $("A").innerHTML=dataset["options"][0]
        $("B").innerHTML=dataset["options"][1]
        $("C").innerHTML=dataset["options"][2]
        $("D").innerHTML=dataset["options"][3]
        $("A").style.backgroundColor="rgb(219, 34, 34)"
        $("B").style.backgroundColor="rgb(49, 125, 232)"
        $("C").style.backgroundColor="rgb(213, 174, 1)"
        $("D").style.backgroundColor="rgb(10, 163, 10)"
        hover("A","rgb(255, 106, 106)","rgb(219, 34, 34)")
        hover("B","rgb(125, 179, 255)","rgb(49, 125, 232)")
        hover("C","rgb(234, 206, 81)","rgb(213, 174, 1)")
        hover("D","rgb(75, 223, 75)","rgb(10, 163, 10)")
        $("qimg").src=dataset["qimg"]
        $("next").style.display="none"
        $("score").innerHTML=`Score: ${score}`
        corrans=dataset["ans"]
        answered=false
        draw()
    }
    
}
function init(){
    $("score").innerHTML=`Score: ${score}`
    $("name").innerHTML=`Name: ${username}`
    if (localStorage.getItem("leaderboard")==null){
        localStorage.setItem("leaderboard",JSON.stringify(
            {
                "data":[
                /*{rank: 1, username: "gay max", Score: 10000},
                {rank: 2, username: "gay max", Score: 9999},
                {rank: 3, username: "gay max", Score: 8888},
                {rank: 4, username: "gay max", Score: 7777},
                {rank: 5, username: "gay max", Score: 196},
                {rank: 6, username: "gay max", Score: 195},
                {rank: 7, username: "gay max", Score: 194},
                {rank: 8, username: "gay max", Score: 193},
                {rank: 9, username: "gay max", Score: 192},
                {rank: 10, username: "gay max", Score: 191},
                {rank: 11, username: "gay max", Score: 190}*/
                ]
            })
        )
    }
    if (localStorage.getItem("questions")){
        localStorage.setItem("questions",JSON.stringify(
            {
                "data":[
                    {"qnum":1,"title":"How do you do outputs in Python?","qimg":"imgs/pythonlogo.png","options":["console.log","printf","cout","print"],"ans":"D"},
                    {"qnum":2,"title":"Which programming language is used in Unity?","qimg":"imgs/unitylogo.png","options":["C++","Assembly","C#","Golang"],"ans":"C"},
                    {"qnum":3,"title":"Which Launguage is the most popular?","qimg":"imgs/launguages.png","options":["Python","Java","Javascript","Brainfk"],"ans":"A"},
                    {"qnum":4,"title":"what does ++ in javascript mean?","qimg":"imgs/jslogo.png","options":["minus by 1","duplicate","add by 1","add by 2"],"ans":"C"},
                    {"qnum":5,"title":"Which js framework as made by meta?","qimg":"imgs/metalogo.png","options":["Vue","React","Angular","node.js"],"ans":"B"},
                    {"qnum":6,"title":"Which python framework was made by google?","qimg":"imgs/googlelogo.png","options":["Pytorch","Scikit-learn","Tensor Flow","Django"],"ans":"C"},
                    {"qnum":7,"title":"which is not an OOP launguage?","qimg":"imgs/OOP.png","options":["C","C++","C#","Java"],"ans":"A"}
                ]
            })
        )
    }
    $("options").style.display="none"
    $("qimg").style.display="none"
    $("leaderboard").style.display="none"
    ql=JSON.parse(localStorage.getItem("questions"))
    $("pi").innerHTML="0/"+ql["data"].length
    if(darkstatus=="true"){
        document.body.style.color="white"
        document.body.style.backgroundColor="rgb(35, 35, 49)"
    }
}
function ldupdate(ds){
    top10=false
    data=JSON.parse(localStorage.getItem("leaderboard"))
    for (a=0;a<Math.min(data["data"].length,10);a++){
        var row = document.getElementById("leaderboard").insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = data["data"][a]["rank"]
        cell2.innerHTML = data["data"][a]["username"]
        cell3.innerHTML = data["data"][a]["Score"]
        cell1.className='rankdisp'
        cell2.className='namedisp'
        cell3.className='scoredisp'
        if(data["data"][a]["rank"]==ds["rank"]){
            row.style.backgroundColor='#9E7BB3'
            cell2.innerHTML = data["data"][a]["username"]+" (You)"
            top10=true
        }
        if (data["data"][a]["rank"]==1){
            row.style.backgroundColor='#FFC637'
        }else if (data["data"][a]["rank"]==2){
            row.style.backgroundColor='#B5B7BB'
        }else if (data["data"][a]["rank"]==3){
            row.style.backgroundColor='#CD7F32'
        }else if (data["data"][a]["rank"]!=ds["rank"]){
            row.style.backgroundColor='#00FFFF'
        }
    }
    if(!top10){ 
        var row = document.getElementById("leaderboard").insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = ds["rank"]
        cell2.innerHTML = ds["username"]+" (You)"
        cell3.innerHTML = ds["Score"]
        cell1.className='rankdisp'
        cell2.className='namedisp'
        cell3.className='scoredisp'
        row.style.backgroundColor='#9E7BB3'
    }
}
function start(){
    $("options").style.display="table"
    $("qimg").style.display="block"
    $("start").style.display="none"
    $("rules").style.display="none"
    load()
}
function submit(ans){
    if (answered==false){
        var collection = document.getElementsByClassName("option");
        if (overtime==true){
            wrong_answers++
            sound(lose)
            for (let i = 0; i < collection.length; i++) {
                if (collection[i].id==corrans){
                    collection[i].style.backgroundColor="limegreen"
                }else{
                    collection[i].style.backgroundColor="red"
                }
            }
            overtime=false
        }else if (ans==corrans){
            correct_answers++
            si=Math.ceil(1000*(progressStartValue/1500))
            score+=si
            $("score").innerHTML=`Score: ${score} (+${si})`
            sound(win)
            for (let i = 0; i < collection.length; i++) {
                if (collection[i].id==corrans){
                    collection[i].style.backgroundColor="limegreen"
                }else{
                    collection[i].style.backgroundColor="lightgray"
                }
            }
        }else{
            wrong_answers++
            sound(lose)
            for (let i = 0; i < collection.length; i++) {
                if (collection[i].id==corrans){
                    collection[i].style.backgroundColor="limegreen"
                }else if (collection[i].id==ans){
                    collection[i].style.backgroundColor="red"
                }else{
                    collection[i].style.backgroundColor="lightgray"
                }
            }
        }
    }
    answered=true
    $("next").style.display="block"  
}
function results(){
    data=JSON.parse(localStorage.getItem("leaderboard"))
    ds=data["data"]
    $("leaderboard").style.display="table"
    $("leaderboard").style.color="black"
    userdata={"rank":data["data"].length+1,"username":username,"Score":score}
    ds.push(userdata)
    for(a=ds.length-1;a>0;a--){
        if(ds[a].Score>ds[a-1].Score){
            temp1=ds[a].username
            ds[a].username=ds[a-1].username
            ds[a-1].username=temp1
            temp2=ds[a].Score
            ds[a].Score=ds[a-1].Score
            ds[a-1].Score=temp2
            userdata=ds[a-1]
        }else{
            break
        }
    }
    localStorage.setItem("leaderboard",JSON.stringify(data))
    ldupdate(userdata)
    $("topdisp").innerHTML="Results"
    $("topdisp").style.backgroundColor="rgb(10, 163, 10)"
    $("question").innerHTML="Leaderboard (Top 10)"
    $("pi").style.display="none"
    $("qimg").style.display="none"
    $("options").style.display="none"
    $("next").onclick= function() { showwinrate(); }
    $("next").style.backgroundColor="rgb(10, 163, 10)"
}
function showwinrate(){
    $("question").innerHTML="Win Rate"
    $("leaderboard").style.display="none"
    $("pie").style.display="block"
    $("piepercentage").style.display="block"
    $("pie").style.background = `conic-gradient(red ${(wrong_answers/(correct_answers+wrong_answers)*360)}deg, limegreen 0deg)`
    $("piepercentage").innerHTML=`Correct answer: ${Math.ceil(correct_answers/(correct_answers+wrong_answers)*100)}%<br>Wrong answer: ${Math.floor(wrong_answers/(correct_answers+wrong_answers)*100)}%`
    $("next").onclick = function() { location.replace("index.html") }
    $("next").style.width="750px"
    $("next").innerHTML="Return to Titlescreen"
}
//circle code
function draw(){
let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value");
    progressStartValue = 1500    
    progressEndValue = 0    
    speed = 10
    sound(phonk)
let progress = setInterval(() => {
    progressStartValue--;
    if (progressStartValue<375){
        color="#e01f1f"
    }else if (progressStartValue<750){
        color="#ffbb00"
    }else{
        color="#3ae82a"
    }
    progressValue.textContent = Math.ceil(progressStartValue/100)
    circularProgress.style.background = `conic-gradient(${color} ${progressStartValue * 0.24}deg, #ededed 0deg)`
    if(progressStartValue == progressEndValue){
        pauser(phonk)
        overtime=true
        submit("")
        clearInterval(progress);
    }
    if (answered==true){
        pauser(phonk)
        clearInterval(progress);
    }
}, speed);
}
