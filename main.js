window.onload = () => {
    let $card = document.querySelector('.card');
    let $precio = document.getElementById('precio');
    let valor_precio = $precio.textContent;
    valor_precio = parseFloat(valor_precio);
    let $ves = document.getElementById('ves');
    let $usd = document.getElementById('usd');

    fetch('https://s3.amazonaws.com/dolartoday/data.json')
        .then(res => res.json())
        .then(data => {
            $precio.textContent = data.USD['transferencia']; 
            cal_usd_ves();
        })
        

    function cal_ves_usd(){
        let valor_ves = parseFloat($ves.value);  
        $usd.value = addCommas((valor_ves / $precio.textContent).toFixed(2));
        if(checkNaN($usd.value)){
            $usd.value = 0;
        }
    }

    function cal_usd_ves(){
        let valor_usd = parseFloat($usd.value);
        $ves.value =  addCommas((valor_usd * $precio.textContent).toFixed(2));
        if(checkNaN($ves.value)){
            $ves.value = 0;
        }
    }

    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function checkNaN(valor){
        if(valor == 'NaN')
            return true;
    }

    $ves.addEventListener('input',  cal_ves_usd);

    $usd.addEventListener('input',  cal_usd_ves);
}
