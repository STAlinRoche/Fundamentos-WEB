function numerosPAres(){

    const arregloPares = [];
    let suma = 0;
    let producto = 1;

    for (let i = 20; i <= 40; i++) {
        if (i % 2 === 0) {
            arregloPares.push(i);
            suma += i;
            producto *= i;
        }
    }

    console.log("utilizando tostring", arregloPares.toString());
    console.log("utilizando join", arregloPares.join(", "));

    //shift
    const primerElemento = arregloPares.shift();
    console.log("primer elemento eliminado:", primerElemento);

    //unshift
    arregloPares.unshift(100);
    console.log("arreglo despues de unshift:", arregloPares.slice(0, 5));

    //splice
    const eliminado = arregloPares.splice(20, 5);
    console.log("elementos eliminados con splice:", eliminado);

    // slice
    const nuevoArreglo = arregloPares.slice(0, 5);
    console.log("nuevo arreglo con slice:", nuevoArreglo);

    //resultados
    console.log(`suma : ${suma}`);
    console.log(`producto : ${producto}`);
    console.log(`arreglo pares: ${arregloPares}`);  

}

numerosPAres();