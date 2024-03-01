let lang, activeButtonLabel;

function setupLabels(lang_in)
{
    lang = lang_in;
    document.title = Language[lang]['title'];
    document.getElementById('calculator_link').innerHTML = Language[lang]['calcpagelink'];
    document.getElementById('defgcd').innerHTML = Language[lang]['defhgcd'];
    document.getElementById('deflcm').innerHTML = Language[lang]['defhlcm'];
    document.getElementById('defnof').innerHTML = Language[lang]['defhnof'];

    switch ( activeButtonLabel )
    {
        case 'defgcd': showDefinitionOfGCD();break;
        case 'deflcm': showDefinitionOfLCM();break;
        case 'deflnof': showDefinitionOfNOF();break;
    }
}

function showDefinitionOfGCD()
{
    document.getElementById('definition_output_container').innerHTML = Language[lang]['defgcd'];
    document.getElementById('definition_output_container').style.backgroundColor = 'turquoise';
    activeButtonLabel = 'defgcd';
}

function showDefinitionOfLCM()
{
    document.getElementById('definition_output_container').innerHTML = Language[lang]['deflcm'];
    document.getElementById('definition_output_container').style.backgroundColor = 'turquoise';
    activeButtonLabel = 'deflcm';
}

function showDefinitionOfNOF()
{
    document.getElementById('definition_output_container').innerHTML = Language[lang]['deflnof'];
    document.getElementById('definition_output_container').style.backgroundColor = 'turquoise';
    activeButtonLabel = 'deflnof';
}

const Language =
{
    'hu':
    {
        'title': "Definíciók",
        'calcpagelink': "Kalkulátor",
        'defhgcd': "LegNagyobb Közös Osztó",
        'defhlcm': "LegKisebb Közös Többszörös",
        'defhnof': "Szám osztóinak száma",
        'defgcd':
        `A Legnagyobb Közös Osztó (LNKO) egy olyan matematikai fogalom, amely a legnagyobb olyan számot jelenti, ami osztója két vagy több pozitív egész számnak.<br>
        A prímtényezős felbontás azt jelenti, hogy a számokat prímszámok szorzataként írjuk fel.<br>
        Például, ha két számot, mondjuk 24-et és 36-ot szeretnénk felbontani prímtényezős alakra:<br>
        24 = 2<sup>3</sup> <b>×</b> 3<sup>1</sup><br>
        36 = 2<sup>2</sup> <b>×</b> 3<sup>2</sup><br>
        A legnagyobb közös osztó meghatározásához megnézzük, melyek a közös prímszámok (metszet), amik megjelentek a prímtényezős felbontásokban.<br>
        A közös prímszámokat a felbontásokban szereplő legkisebb kitevőn vesszük és összeszorozzuk őket.<br>
        A szorzat a legnagyobb közös osztó lesz.<br>
        Ebben az esetben a 2 és a 3 mindkét szám prímtényezős felbontásában előfordul, de a 2 kétszer szerepel, míg a 3 csak egyszer.<br>
        Tehát a 2 prímhatványai közül a kisebbet választjuk, azaz LNKO(24, 36) = 2<sup>2</sup> <b>=</b> 4.<br>
        A legnagyobb közös osztó kiszámítása hasznos például egyszerűbb törtek egyszerűsítésekor vagy polinomok oszthatósági vizsgálatánál.`,
        'deflcm':
        `A Legkisebb Közös Többszörös (LKKT) a két vagy több szám közös többszöröseinek legkisebbike.<br>
        A prímtényezős felbontás az a módszer, amelyben a számokat prímtényezőik szorzatára bontjuk.<br>
        Például, ha két számot, mondjuk 45-öt és 65-öt szeretnénk felbontani prímtényezős alakra:<br>
        45 = 3<sup>2</sup> <b>×</b> 5<sup>1</sup><br>
        65 = 5<sup>1</sup> <b>×</b> 13<sup>1</sup><br>
        A legkisebb közös többszörös meghatározásához megnézzük, melyek az előforduló prímszámok (unió), amik megjelentek a prímtényezős felbontásokban.<br>
        Az előforduló prímszámokat a felbontásokban szereplő legnagyobb kitevőn vesszük és összeszorozzuk őket.<br>
        A szorzat a legkisebb közös többszörös lesz.<br>
        Ebben az esetben a 3, 5 és 13 számok a prímtényezős felbontásokban előfordulnak.<br>
        A 3, 5 és 13 számok prímhatványai közül a legnagyobbat választjuk, azaz LKKT(45, 65) = 2<sup>2</sup> <b>=</b> 585.`,
        'deflnof':
        `Egy szám összes osztójának meghatározása az adott szám prímtényezős felbontásából meghatározható.<br>
        A prímtényezős felbontás azt jelenti, hogy a számokat prímszámok szorzataként írjuk fel.<br>
        A prímtényezős felbontás után a prím hatványalapok hatványkitevőjének "kombinálásával" meghatározhatjuk az összes lehetséges osztóját a számnak, mégpedig úgy, hogy a hatványkitevőkhöz sorra hozzáadunk 1-et, majd ezeket összeszorozva megkapjuk az összes lehetséges osztók számát.<br>
        Példa: Meghatározandó az 1800 osztóinak száma<br>
        1800 prímtényezős felbontásban:<br>
        1800 = 2<sup>3</sup> <b>×</b> 3<sup>2</sup> <b>×</b> 5<sup>2</sup><br>
        Ebből megállapítható, hogy a prím hatványkitevők 3, 2 és 2.<br>
        Mivel a prím hatványalapok állhatnak a 0. hatványon is, ezért a hatványkitevőkhöz hozzá kell adni 1-et, így az összes lehetséges előállítható szám:<br>
        (3 + 1) <b>×</b> (2 + 1) <b>×</b> (2 + 1) <b>=</b> 36.<br>
        A páros osztók száma meghatározható, mivel az egyetlen páros prímszám a <i>2</i>, így ebben az esetben a <i>2</i> nem állhat a 0. hatványon.<br>
        Tehát: (3 + 0) <b>×</b> (2 + 1) <b>×</b> (2 + 1) <b>=</b> 27, melyből a páratlan osztók száma meghatározható az összes osztók számából kivonva a páros osztók számát, mely jelen esetben 36 <b>-</b> 27 <b>=</b> 9.`,
    },

    'en':
    {
        'title': "Definitions",
        'calcpagelink': "Calculator",
        'defhgcd': "Greatest Common Divisor",
        'defhlcm': "Least Common Multiple",
        'defhnof': "Factors of number",
        'defgcd':
        `The Greatest Common Divisor (GCD) is a mathematical concept that means the largest number that is a divisor of two or more positive integers.<br>
        Prime factorization means that numbers are written as products of prime numbers.<br>
        For example, if we want to decompose two numbers, say 24 and 36, into prime factorial form:<br>
        24 = 2<sup>3</sup> <b>×</b> 3<sup>1</sup><br>
        36 = 2<sup>2</sup> <b>×</b> 3<sup>2</sup><br>
        To determine the greatest common divisor, we look at the common prime numbers (intersection) that appeared in the prime factorizations.<br>
        We take the common prime numbers by the smallest exponent in the resolutions and multiply them together.<br>
        The product will be the greatest common divisor.<br>
        In this case, 2 and 3 occur in the prime factorization of both numbers, but 2 appears twice and 3 only once.<br>
        So we choose the smaller of the prime powers of 2, i.e. GCD(24, 36) = 2<sup>2</sup> <b>=</b> 4.<br>
        Calculating the greatest common divisor is useful, for example, when simplifying simpler fractions or checking the divisibility of polynomials.`,
        'deflcm':
        `The Least Common Multiple (LCM) is the smallest common multiple of two or more numbers.<br>
        Prime factorization is the method in which numbers are divided into products of their prime factors.<br>
        For example, if we want to break down two numbers, say 45 and 65, into prime factors:<br>
        45 = 3<sup>2</sup> <b>×</b> 5<sup>1</sup><br>
        65 = 5<sup>1</sup> <b>×</b> 13<sup>1</sup><br>
        To determine the least common multiple, we look at the occurring prime numbers (union) that appeared in the prime-factor resolutions.<br>
        We take the prime numbers that occur by the largest exponent in the resolutions and multiply them together.<br>
        The product will be the least common multiple.<br>
        In this case, the numbers 3, 5 and 13 occur in the resolutions with prime factors.<br>
        We choose the largest of the prime powers of the numbers 3, 5 and 13, i.e. LCM(45, 65) = 2<sup>2</sup> <b>=</b> 585.`,
        'deflnof':
        `All the divisors of a number can be determined from the prime factorization of the given number.<br>
        The prime factorization means that the numbers are written as a product of prime numbers.<br>
        After the prime factor decomposition, by "combining" the power exponents of the prime power bases, we can determine all the possible divisors of the number, namely by adding 1 to the power exponents one after the other, and then multiplying them to get the number of all possible divisors.<br>
        Example: Determine the number of divisors of 1800<br>
        In 1800 prime factor resolution:<br>
        1800 = 2<sup>3</sup> <b>×</b> 3<sup>2</sup> <b>×</b> 5<sup>2</sup><br>
        From this it can be concluded that the prime power exponents are 3, 2 and 2.<br>
        Since the prime power bases can also stand on the 0th power, 1 must be added to the power exponents, so all possible numbers that can be produced are:<br>
        (3 + 1) <b>×</b> (2 + 1) <b>×</b> (2 + 1) <b>=</b> 36.<br>
        The number of even divisors can be determined because the only even prime number is <i>2</i>, so in this case <i>2</i> cannot be a power of 0.<br>
        So: (3 + 0) <b>×</b> (2 + 1) <b>×</b> (2 + 1) <b>=</b> 27, from which the number of odd divisors can be determined subtracting the number of even divisors from the total number of divisors, which in this case is 36 <b>-</b> 27 <b>=</b> 9.`
    },
};