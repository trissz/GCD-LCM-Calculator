let lang, n;

function setupLabels(lang_in)
{
    lang = lang_in;
    document.title = Language[lang]['title'];
    document.getElementById('definition_link').innerHTML = Language[lang]['defpagelink'];
    document.getElementById('noi').innerHTML = Language[lang]['noi'];
    document.getElementById('init_btn').innerHTML = Language[lang]['initbtn'];

    if ( n ) init();
}

function init()
{
    document.getElementById('output_container').innerHTML = '';
    document.getElementById('output_container').style.backgroundColor = '';
    document.getElementById('output_container').style.boxShadow = '';
    n = document.getElementById('number_of_inputs').value;
    let out = '';
    
    for ( let i = 0; i < n; i ++ )
    {
        out += `<div class="ni_container"><div class="input_label" id="l${i+1}">${Language[lang]['in']}<div class="input_index">${i+1}</div><b>:</b> </div><input class="number_input" id="${i+1}" type="number"></div>`;
    }

    document.getElementById('input_container').innerHTML = out + `<div id="btn_container"><button id="gcd_btn" onclick="document.getElementById('output_container').innerHTML = '';computeGCDWithPrimeFactors();outputPrimeFactors(getPrimeFactors());">${Language[lang]['gcdbtn']}</button>` +
    `<button id="lcm_btn" onclick="document.getElementById('output_container').innerHTML = '';computeLCMWithPrimeFactors();outputPrimeFactors(getPrimeFactors());">${Language[lang]['lcmbtn']}</button>` +
    `<button id="gcd_lcm_btn" onclick="document.getElementById('output_container').innerHTML = '';computeGCDAndLCMWithPrimeFactors();outputPrimeFactors(getPrimeFactors());">${Language[lang]['gcdlcmbtn']}</button></div>` +
    `<button id="number_of_factors_btn" onclick="document.getElementById('output_container').innerHTML = '';computeNumberOfFactorsOfInputNumbers();outputPrimeFactors(getPrimeFactors());">${Language[lang]['nofbtn']}</button></div><hr>`;
}

function getInput()
{
    let inputArr = [];

    for ( let i = 1; i <= n; i ++ )
    {
        inputArr.push(Math.abs(parseInt(document.getElementById(i).value)));
    }

    return inputArr;
}

function isInputFilled()
{
    for ( let i = 1; i <= n; i ++ )
    {
        if ( !document.getElementById(i).value ) return false;
    }

    return true;
}

function isPrime(num)
{
    for ( let i = 2; i <= Math.sqrt(num); i ++ )
    {
        if ( num % i == 0 ) return false;
    }

    return true;
}

function getPrimeFactors()
{
    if ( !isInputFilled() ) return;

    let inputArr = getInput();
    let inputPrimeFactors = [], primeFactors = [];

    for ( let i = 0; i < n; i ++ )
    {
        let actPrime = 2;

        while ( !isPrime(inputArr[i]) )
        {
            if ( inputArr[i] % actPrime == 0 ){inputArr[i] /= actPrime; primeFactors.push(actPrime);}
            else {for ( let j = 2; j <= Math.sqrt(inputArr[i]); j ++ ) if ( inputArr[i] % j == 0 ){actPrime = j; break;}}
        }

        primeFactors.push(inputArr[i]);

        inputPrimeFactors.push(primeFactors);
        primeFactors = [];
    }

    return inputPrimeFactors;
}

function getElementIntersection(arr)
{
    if ( !arr ) return;

    let elements = [], section = new Set();

    for ( let i = 0; i < arr.length; i ++ ) elements.push(new Set(arr[i]));

    for ( let i = 0; i < arr.length; i ++ )
    {
        for ( let j = 0; j < arr[i].length; j ++ )
        {
            let containsEvery = true;

            for ( let k = 0; k < elements.length; k ++ ) if ( !elements[k].has(arr[i][j]) ) containsEvery = false;
            
            if ( containsEvery ) section.add(arr[i][j]);
        }
    }

    return section;
}

function outputPrimeFactors(primeFactors)
{
    for ( let i = 0; i < primeFactors.length; i ++ )
    {
        let divisor = 1, out = `<p class="prime_paragraph">${document.getElementById(i+1).value}:<p><table class="prime_table" id="prime_table${i}">`;

        for ( let j = 0; j < primeFactors[i].length; j ++ )
        {
            out += `<tr><td>${document.getElementById(i+1).value / divisor}</td><td>${primeFactors[i][j]}</td></tr>`;

            divisor *= primeFactors[i][j];
        }

        out += '<tr><td>';
        if ( document.getElementById(i+1).value < 0 ) out += '-1'; else out += '1';
        out += '</td><td></td></tr></table><div class="prime_factor_container">';

        for ( let j = 0; j < primeFactors[i].length - 1; j ++ )
        {
            out += primeFactors[i][j] + "&nbsp<b>×</b>&nbsp";
        }

        out += primeFactors[i][primeFactors[i].length - 1] + "&nbsp<b>=</b>&nbsp";

        let elements = new Set(primeFactors[i]);
        elements = Array.from(elements);

        for ( let j = 0; j < elements.length - 1; j ++ )
        {
            out += elements[j] + "<sup>" + primeFactors[i].filter(element => element === elements[j]).length + "</sup>&nbsp<b>×</b>&nbsp";
        }

        document.getElementById('output_container').innerHTML += out + elements[elements.length - 1] + "<sup>" + primeFactors[i].filter(element => element === elements[elements.length - 1]).length + '</sup></div><hr class="factor_horizontal_rule">';
    }
}

function outputGCD(gcd_val, solutionPrimeFactors)
{
    if ( gcd_val != 1 ) document.getElementById('output_container').innerHTML += `<div id="gcd_container"><div id="gcd_label"></div><div id="gcd_value"></div>${solutionPrimeFactors}</div>`;
    else document.getElementById('output_container').innerHTML += '<div id="gcd_container"><div id="gcd_label"></div><div id="gcd_value"></div></div>';
    document.getElementById('output_container').style.backgroundColor = 'rgb(255, 255, 255, 0.2)';
    document.getElementById('output_container').style.boxShadow = '0.5em 0.5em 0.5em rgba(0, 0, 0, 0.8)';
    document.getElementById('gcd_label').innerHTML = Language[lang]['gcdl'];
    document.getElementById('gcd_value').innerHTML = gcd_val;
}

function computeGCDWithPrimeFactors()
{
    if ( !isInputFilled() ) return;

    let inputPrimeFactors = getPrimeFactors(), gcd = 1, solutionPrimeFactors = '<div class="arrow_container">&#x21d0</div><div class="solution_prime_factor_container">';

    let intersectionElements = Array.from(getElementIntersection(inputPrimeFactors));

    for ( let i = 0; i < intersectionElements.length; i ++ )
    {
        let minPower = Infinity;

        for ( let j = 0; j < inputPrimeFactors.length; j ++ )
        {
            if ( minPower > inputPrimeFactors[j].filter(element => element === intersectionElements[i]).length ) minPower = inputPrimeFactors[j].filter(element => element === intersectionElements[i]).length;
        }

        gcd *= Math.pow(intersectionElements[i], minPower);

        if ( i != intersectionElements.length - 1 ) solutionPrimeFactors += intersectionElements[i] + "<sup>" + minPower + "</sup>&nbsp<b>×</b>&nbsp";
        else solutionPrimeFactors += intersectionElements[i] + "<sup>" + minPower + "</sup>";
    }

    outputGCD(gcd, solutionPrimeFactors + "</div>");
}

function gcd(a, b)
{
    if ( b == 0 ) return a;
    return gcd(b, a % b);
}

function computeGCDWithEuclideanAlgorithm()
{
    if ( !isInputFilled() ) return;

    let inputArr = getInput();

    if ( inputArr.length === 0 ) return null;
    if ( inputArr.length === 1 ) return inputArr[0];

    let result = inputArr[0];

    for ( let i = 1; i < inputArr.length; i ++ )
    {
        result = gcd(result, inputArr[i]);
    }

    return result;
}

function getElementUnion(arr)
{
    let elements = new Set();

    for ( let i = 0; i < arr.length; i ++ )
    {
        for ( let j = 0; j < arr[i].length; j ++ )
        {
            elements.add(arr[i][j]);
        }
    }

    return elements;
}

function outputLCM(lcm_val, solutionPrimeFactors)
{
    if ( lcm_val != 1 ) document.getElementById('output_container').innerHTML += `<div id="lcm_container"><div id="lcm_label"></div><div id="lcm_value"></div>${solutionPrimeFactors}</div>`;
    else document.getElementById('output_container').innerHTML += '<div id="lcm_container"><div id="lcm_label"></div><div id="lcm_value"></div></div>';
    document.getElementById('output_container').style.backgroundColor = 'rgb(255, 255, 255, 0.2)';
    document.getElementById('output_container').style.boxShadow = '0.5em 0.5em 0.5em rgba(0, 0, 0, 0.8)';
    document.getElementById('lcm_label').innerHTML = Language[lang]['lcml'];
    document.getElementById('lcm_value').innerHTML = lcm_val;
}

function computeLCMWithPrimeFactors()
{
    if ( !isInputFilled() ) return;

    let inputPrimeFactors = getPrimeFactors(), lcm = 1, solutionPrimeFactors = '<div class="arrow_container">&#x21d0</div><div class="solution_prime_factor_container">';

    let unionElements = Array.from(getElementUnion(inputPrimeFactors));

    for ( let i = 0; i < unionElements.length; i ++ )
    {
        let maxPower = 1;

        for ( let j = 0; j < inputPrimeFactors.length; j ++ )
        {
            if ( maxPower < inputPrimeFactors[j].filter(element => element === unionElements[i]).length ) maxPower = inputPrimeFactors[j].filter(element => element === unionElements[i]).length;
        }

        lcm *= Math.pow(unionElements[i], maxPower);

        if ( i != unionElements.length - 1 ) solutionPrimeFactors += unionElements[i] + "<sup>" + maxPower + "</sup>&nbsp<b>×</b>&nbsp";
        else solutionPrimeFactors += unionElements[i] + "<sup>" + maxPower + "</sup>";
    }

    console.log(computeLCMWithEuclideanAlgorithm());

    outputLCM(lcm, solutionPrimeFactors + "</div>");
}

function lcm(a, b)
{
    return a * b / gcd(a, b);
}

function computeLCMWithEuclideanAlgorithm()
{
    if ( !isInputFilled() ) return;

    let inputArr = getInput();

    if ( inputArr.length === 0 ) return null;
    if ( inputArr.length === 1 ) return inputArr[0];

    let result = inputArr[0];

    for ( let i = 1; i < inputArr.length; i ++ )
    {
        result = lcm(result, inputArr[i]);
    }

    return result;
}

function computeGCDAndLCMWithPrimeFactors()
{
    computeGCDWithPrimeFactors();
    computeLCMWithPrimeFactors();
}

function computeNumberOfFactorsOfInputNumbers()
{
    let inputNumbers = getInput(), inputPrimeFactors = getPrimeFactors();

    for ( let i = 0; i < n; i ++ )
    {
        let elements = Array.from(new Set(inputPrimeFactors[i])), numberOfFactors = 1, count, out = '';

        out += '<div class="number_of_factors_container"><div class="number_of_factors_label">' + inputNumbers[i] + " - " + Language[lang]['nofl'] + '</div><div class="number_of_factors_process">';

        for ( let j = 0; j < elements.length - 1; j ++ )
        {
            count = inputPrimeFactors[i].filter(element => element === elements[j]).length;
            numberOfFactors *= count + 1;
            out += "(" + count + "&nbsp+&nbsp1)&nbsp<b>×</b>&nbsp";
        }

        numberOfFactors *= inputPrimeFactors[i].filter(element => element === elements[elements.length - 1]).length + 1;

        out += "(" + inputPrimeFactors[i].filter(element => element === elements[elements.length - 1]).length + `&nbsp+&nbsp1)&nbsp<b>=</b>&nbsp${numberOfFactors}</div><div class="number_of_even_factors_container">${Language[lang]['noefl']}`;

        let numberOfEvenFactors = numberOfFactors / ( inputPrimeFactors[i].filter(element => element === 2).length + 1 ) * inputPrimeFactors[i].filter(element => element === 2).length;

        out += `${numberOfEvenFactors}</div><div class="number_of_odd_factors_container">` + Language[lang]['noofl'] + (numberOfFactors - numberOfEvenFactors) + '</div></div><div class="number_of_factors_manual_horizontal_rule"></div>';

        document.getElementById('output_container').style.backgroundColor = 'rgb(255, 255, 255, 0.2)';
        document.getElementById('output_container').style.boxShadow = '0.5em 0.5em 0.5em rgba(0, 0, 0, 0.8)';
        document.getElementById('output_container').innerHTML += out;
    }
}

const Language =
{
    'hu':
        {
            'title': "Kalkulátor",
            'noi': "Bemeneti számok száma: ",
            'initbtn': "Létrehozás",
            'in': "Bemeneti szám ",
            'gcdbtn': "LegNagyobb Közös Osztó meghatározása",
            'lcmbtn': "LegKisebb Közös Többszörös meghatározása",
            'gcdl': "LegNagyobb Közös Osztó: ",
            'lcml': "LegKisebb Közös Többszörös: ",
            'gcdlcmbtn': "LegNagyobb Közös Osztó és LegKisebb Közös Többszörös meghatározása",
            'nofbtn': "Bemeneti számok osztóinak meghatározása",
            'nofl': "Bemeneti szám osztóinak száma: ",
            'noefl': "Páros osztóinak száma: ",
            'noofl': "Páratlan osztóinak száma: ",
            'defpagelink': "Definíciók",
        },

    'en':
        {
            'title': "Calculator",
            'noi': "Please enter the number of inputs: ",
            'initbtn': "Initialize",
            'in': "Input number ",
            'gcdbtn': "Calculate Greatest Common Divisor",
            'lcmbtn': "Calculate Least Common Multiple",
            'gcdl': "Greatest Common Divisor: ",
            'lcml': "Least Common Multiple: ",
            'gcdlcmbtn': "Calculate Greatest Common Divisor and Least Common Multiple",
            'nofbtn': "Calculate number of factors of input numbers",
            'nofl': "Number of factors of input number: ",
            'noefl': "Number of even factors: ",
            'noofl': "Number of odd factors: ",
            'defpagelink': "Definitions",
        },
};