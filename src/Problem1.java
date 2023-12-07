import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;


public class Problem1 {
    /*
    Intentas preguntar por qué no pueden simplemente usar una máquina del tiempo ("no lo suficientemente potente") y
    hacia dónde te están enviando incluso ("al cielo") y por qué tu mapa parece en su mayoría en blanco ("seguro
    haces muchas preguntas") y espera, ¿acabas de decir el cielo? ("claro, ¿de dónde crees que viene la nieve?")
    cuando te das cuenta de que los Elfos ya te están cargando en una catapulta ("por favor, quédate quieto,
    necesitamos atarte").
    Mientras hacen los ajustes finales, descubren que su documento de calibración (tu entrada de rompecabezas) ha
    sido modificado por un Elfo muy joven que aparentemente estaba emocionado de mostrar sus habilidades artísticas.
    En consecuencia, los Elfos tienen problemas para leer los valores en el documento.
    El documento de calibración recién mejorado consiste en líneas de texto; en cada línea, el valor de calibración
    originalmente estaba compuesto por combinar el primer dígito y el último dígito (en ese orden) para formar un
    número de dos dígitos único.
    Por ejemplo:
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
    En este ejemplo, los valores de calibración de estas cuatro líneas son 12, 38, 15 y 77.
    Sumar estos valores produce 142.
    Considera todo tu documento de calibración. ¿Cuál es la suma de todos los valores de calibración?
 */
    private static class Holder{
        private char number1;
        private char number2;
        private Holder() {
            this.number1 = 0;
            this.number2 = 0;
        }
        public void addNumber(char newChar){
            if (Character.isDigit(newChar)){
                if (number1 == 0){
                    number1 = newChar;
                }
                number2 = newChar;
            }
        }
        public int returnSum() {
            if (Character.isDigit(number1) && Character.isDigit(number2)) {
                return Integer.parseInt(String.valueOf(number1) + number2);
            } else {
                System.err.println("Invalid characters for sum calculation");
                return 0; // Or handle the error in a way that makes sense for your application
            }
        }
    }
    public static void main(String[] args) throws IOException {
        String absPath = System.getProperty("user.dir") + "\\src\\inputPROBLEM1.txt";
        System.out.println(absPath);
        BufferedReader reader = new BufferedReader(new FileReader(absPath));
        String line;
        Holder h = null;
        int sum = 0;
        while ((line = reader.readLine()) != null) {
            h = new Holder();
            for (char c : line.toCharArray()) {
                h.addNumber(c);
            }
            sum += h.returnSum();
        }
        reader.close();
        System.out.println(sum); //-> Prints 53921
    }
}
