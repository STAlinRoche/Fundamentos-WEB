function calcularCosto(){
    const alumnos = parseInt(document.getElementById('alumnos').value);
    let costoporAlumno = 0;
    let totalPagar = 0;

    if(alumnos >= 100){
        costoporAlumno = 65;
    }else if(alumnos >= 50 && alumnos <=99){
        costoporAlumno = 70;
    }else if(alumnos >= 30 && alumnos <=49){
        costoporAlumno=95;
    }else if (alumnos < 30){
        costoporAlumno = 4000
    }

    totalPagar = alumnos * costoporAlumno;

    document.getElementById("resultado").innerHTML =
    `Costo por alumno: $${(alumnos >= 30 ? costoporAlumno : costoporAlumno)}<br>
        Total a pagar: $${totalPagar}`;
}