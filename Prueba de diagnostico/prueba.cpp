#include<stdio.h>
#include<iostream>

using namespace std;

int main() {


    int suma, resta, multiplicacion, division;
    int a, b;

    cout << "Ingrese dos numeros: " << endl;
    cin >> a >> b;

    if (a > b) {
        suma = a + b;
        resta = a - b;
        cout << "La suma y resta es: " << suma << resta << endl;

    } else {
        multiplicacion = a * b;
        division = a / b;
        cout << "La multiplicacion y division es: " << multiplicacion << division << endl;
    }


    return 0;



}