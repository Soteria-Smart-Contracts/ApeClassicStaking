let HENSname;

async function UpdateDetails(){
    await getCLDbal();
    await getFlexDeposited();
    await getUnclaimed();
    await getEstimated();
    await getActiveLocks();
    await LoadLocks();
    await CheckPresaleUser();
    await GetHENS()
    console.log("Details Updated")

    document.getElementById('flexbal').innerText = CLDbal;
    document.getElementById('Lockbal').innerText = CLDbal;
    document.getElementById('LockActive').innerText = (ActiveLockNum + " / 3");
    document.getElementById('flexdepo').innerText = FlexBal;
    document.getElementById('statdepo').innerText = FlexBal;
    document.getElementById('statunclaimed').innerText = Unclaimed;
    document.getElementById('expected').innerText = Estimated;

    SetInstances();

    if(ActiveLockNum < 3){
        document.getElementById('Lock').style.display = "flex";
    }
    else if(ActiveLockNum = 3){
        document.getElementById('Lock').style.display = "none";
    }
}

async function GetEstimatedReturn(){
    if(PreSaleUser == true){
        document.getElementById('30dp').innerText = "3";
        document.getElementById('90dp').innerText = "11";
        document.getElementById('180dp').innerText = "25";
        document.getElementById('365dp').innerText = "63";
        document.getElementById('ROIleft').innerText = "Fixed " + "30%" + " return in CLD per annum";

        document.getElementById('CR1').innerText = ((((document.getElementById('One').value) / 100) * 103).toFixed(2)).toString();
        document.getElementById('CR2').innerText = ((((document.getElementById('Two').value) / 100) * 111).toFixed(2)).toString();
        document.getElementById('CR3').innerText = ((((document.getElementById('Three').value) / 100) * 125).toFixed(2)).toString();
        document.getElementById('CR4').innerText = ((((document.getElementById('Four').value) / 100) * 163).toFixed(2)).toString();
    }else{
        document.getElementById('CR1').innerText = ((((document.getElementById('One').value) / 100) * 102.5).toFixed(2)).toString();
        document.getElementById('CR2').innerText = ((((document.getElementById('Two').value) / 100) * 108.75).toFixed(2)).toString();
        document.getElementById('CR3').innerText = ((((document.getElementById('Three').value) / 100) * 120).toFixed(2)).toString();
        document.getElementById('CR4').innerText = ((((document.getElementById('Four').value) / 100) * 150).toFixed(2)).toString();
    }
}

async function UpdateUnclaimed(){
    await getUnclaimed();
    document.getElementById('statunclaimed').innerText = Unclaimed;
}

async function GetHENS(){
    HENSname = await hens.js.getNameOfOwner(account)
    if(HENSname == ''){
        HENSname = "Connected"
    }

    console.log("If there is an error above, its normal and not a problem, try catch does not work for Metamask errors")
}

function DiplayBoxLeft(type){
    document.getElementById('ConfirmLeft').style.display = "initial";
    if(type == 1){
        document.getElementById('InputLeftDeposit').style.display = "block";
    }
    if(type == 2){
        document.getElementById('InputLeftWithdraw').style.display = "block";
    }
}


async function SetInstances(){
    index = 1;

    document.getElementById("slot" + (1).toString()).innerText = "Slot Empty";
    document.getElementById("slot" + (2).toString()).innerText = "Slot Empty";
    document.getElementById("slot" + (3).toString()).innerText = "Slot Empty";

    while(index <= ActiveLockNum){
        dleft = await GetDaysLeft(index);
        amount = ((Locks[index].DepositAmount / 10**18).toFixed(2)).toString();
        string = amount + " CLD | " + (dleft).toString() + " Days Left";
        document.getElementById("slot" + (index).toString()).innerText = string;

        index++;
    }
}

async function DisplayInstance(number){
    if(number > ActiveLockNum){
        DisplayRight();
        return;
    }
    document.getElementById('ViewLock').style.display = "initial";
    CurrentInstanceID = Locks[number][0];

    dleft = await GetDaysLeft(number);
    amount = ((Locks[number].DepositAmount / 10**18).toFixed(2)).toString();
    amountclaim = ((Locks[number].WithdrawAmount / 10**18).toFixed(2)).toString();
    earned = ((parseFloat(amountclaim) - parseFloat(amount)).toFixed(2)).toString();

    document.getElementById('DL').innerText = (dleft).toString() + " Days Left";
    document.getElementById('AD').innerText = amount;
    document.getElementById('AC').innerText = amountclaim;
    document.getElementById('CE').innerText = earned;

    if(parseInt(Locks[number][5]) < Math.floor(Date.now() / 1000)){
        document.getElementById('ClaimB').style.display = "inline-block";
        document.getElementById('DL').innerText = "Ready to Claim";
    }
}

function DiplayBoxRight(type){
    document.getElementById('ConfirmRight').style.display = "initial";
    if(type == 1){
        document.getElementById('Input30').style.display = "block";
    }
    if(type == 2){
        document.getElementById('Input90').style.display = "block";
    }
    if(type == 3){
        document.getElementById('Input180').style.display = "block";
    }
    if(type == 4){
        document.getElementById('Input365').style.display = "block";
    }
}


function CloseViewBox(){
    document.getElementById('ClaimB').style.display = "none"
    document.getElementById('ViewLock').style.display = "none";
}

function setMaxDepositLeft(){
    document.getElementById('depositinputleft').value = (CLDbal - 0.01).toFixed(2);
}

function setMaxDepositRight(ID){
    if(ID == 1){
        document.getElementById('One').value = (CLDbal - 0.01).toFixed(2);
    }
    if(ID == 2){
        document.getElementById('Two').value = (CLDbal - 0.01).toFixed(2);
    }
    if(ID == 3){
        document.getElementById('Three').value = (CLDbal - 0.01).toFixed(2);
    }
    if(ID == 4){
        document.getElementById('Four').value = (CLDbal - 0.01).toFixed(2);
    }
}

function setMaxWithdrawLeft(){
    document.getElementById('withdrawinputleft').value = (FlexBal - 0.01).toFixed(2);
}

function CloseBoxLeft(){
    document.getElementById('ConfirmLeft').style.display = "none";
    document.getElementById('InputLeftDeposit').style.display = "none";
    document.getElementById('InputLeftWithdraw').style.display = "none";
}

function CloseBoxRight(){
    document.getElementById('ConfirmRight').style.display = "none";
    document.getElementById('Input30').style.display = "none";
    document.getElementById('Input90').style.display = "none";
    document.getElementById('Input180').style.display = "none";
    document.getElementById('Input365').style.display = "none";

}

function ClearLeft(){
    document.getElementById('ROIleft').style.display = "none";
    document.getElementById('OptionsLeft').style.display = "none";
    document.getElementById('StatsLeft').style.display = "none";
}

function ClearRight(){
    document.getElementById('Instances').style.display = "none";
    document.getElementById('Lock').style.display = "none";
}

function DisplayLeft(){
    document.getElementById('ROIleft').style.display = "initial";
    document.getElementById('OptionsLeft').style.display = "flex";
    document.getElementById('StatsLeft').style.display = "flex";
}

function DisplayRight(){
    if(ActiveLockNum < 3){
        document.getElementById('Lock').style.display = "initial";
    }
    document.getElementById('Instances').style.display = "flex";
}

function showOverlay(){
    document.getElementById('overlay').style.display = "block";
    document.body.style.overflow = "hidden";
}

function removeOverlay(){
    document.getElementById('overlay').style.display = "none";
    document.body.style.overflow = "auto";
}