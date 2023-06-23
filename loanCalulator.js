
const  history =[];
let k =0;
let table = document.getElementById("table");
function cheack(num){
    if(parseInt(num)<num){
        num=parseInt(num)+1;
    }
    let s = num.toString();
    let str = s.split("");
    let ans="";
    let count=0;
    for (let i = str.length-1; i >=0; i--) {
        count++;
        const element = str[i];
        ans+=element;
        if((str.length>3&&count==3)||(str.length>5&&count==5)){
        ans+=",";
        }
    }
    return ans.split("").reverse().join("");
}
function AllData(obj){
  
        const data = {
            rate:0,
            perMonthDeposite :0,
            perYearDeposite:0,
            perYearInst :0,
            totalInterest :0,
            totalAmount:0,
            amountWithTotalInterest :0,
          
        }
        
        data.rate=obj.rate;
        data.totalAmount = obj.amount;
        data.perYearInst  = obj.amount*(obj.rate/100);
        data.totalInterest = data.perYearInst*obj.year;
        data.amountWithTotalInterest = (data.totalInterest)+(obj.amount);
        data.perMonthDeposite = data.amountWithTotalInterest/(obj.year*12);
        data.perYearDeposite = data.perMonthDeposite*12;


        for(const key in data){
            data[key] = cheack(data[key]);
        };
        data.rate=obj.rate;

        return data;
}

function update(obj){
        let div = document.getElementById('result');


        const data = AllData(obj);
        let tr = document.createElement("tr");
        for(const key in data){
            let td = document.createElement("td");
            td.innerText = data[key];
            if(data[key]>parseInt(data[key])){
                td.innerText = data[key].toFixed(2);
            }
            tr.append(td);
        };
       
          
          
      
          table.append(tr);
        
    
  }
  function leftValue(str){
    let div = document.getElementById('result');
        div.innerHTML=`<p>Please fill ${str} box !!</p>`
        div.style.color="red";
        setTimeout(()=>{
            div.innerHTML="";
        },3000);
}
const cal = (event)=>{
    event.preventDefault();
    let array  = document.querySelectorAll("form input");
   
    const amount = parseInt(array[0].value);
    const rate = parseFloat(array[1].value);
    const year = parseInt(array[2].value);

        // const amount = 780000;
        // const rate = 5.7;
        // const year = 7;
        
    if(amount&&rate&&year){
        let obj={
            amount:amount,
            rate:rate,
            year:year
        }
        history[k++]=obj;
        update(obj);
    }
    else{
        if(amount&&rate){
            leftValue("Year");
        }
        else if(amount&&year){
            leftValue("Interest rate");
        }
        else if(year&&rate){
            leftValue("Amount");
        }
        else{
            leftValue("");
        }
    }
}

function clearTable(){
      table.innerHTML = `<tr>
      <th>Rate (%)</th>
      <th>Deposite / Month</th>
      <th>Deposite / Year</th>
      <th>Interest / Year</th>
      <th>Total Interest</th>
      <th>Total Amount</th>
      <th>Total Payable Amount</th>
  </tr>`;

}
function popUp(){
    let popUp2 = document.getElementById("popUp");
    table = document.getElementById("popUptable");
    clearTable();
    // if( popUp2.style.display='block'){
        popUp2.style.display='block';

    // }
    // else{
    //     popUp2.style.display='block';
    // }
    for (let i = 0; i < history.length; i++) {
        const element = history[i];
        update(element);
        
    }
}
function popUpclose(){
    let popUp2 = document.getElementById("popUp");
    table = document.getElementById("table");
        popUp2.style.display='none';
}


let clear = document.getElementById("clear");
clear.addEventListener("click",clearTable);
let his = document.getElementById("historybtn");
his.addEventListener("click",popUp);

document.getElementById("popUpCancel").addEventListener("click",popUpclose);

document.getElementById("form").addEventListener('submit',cal);